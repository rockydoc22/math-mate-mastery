
-- Step 1: Create all tables first
CREATE TABLE public.classrooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid NOT NULL,
  name text NOT NULL,
  class_code text NOT NULL UNIQUE,
  description text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.classroom_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  classroom_id uuid NOT NULL REFERENCES public.classrooms(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  role text NOT NULL DEFAULT 'student',
  joined_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(classroom_id, user_id)
);

CREATE TABLE public.assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  classroom_id uuid NOT NULL REFERENCES public.classrooms(id) ON DELETE CASCADE,
  teacher_id uuid NOT NULL,
  title text NOT NULL,
  subject text NOT NULL DEFAULT 'math',
  question_count integer NOT NULL DEFAULT 10,
  due_date date NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.assignment_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  questions_completed integer NOT NULL DEFAULT 0,
  questions_correct integer NOT NULL DEFAULT 0,
  completed_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(assignment_id, user_id)
);

CREATE TABLE public.parent_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL,
  child_id uuid NOT NULL,
  link_code text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(parent_id, child_id)
);

-- Step 2: Enable RLS
ALTER TABLE public.classrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classroom_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_links ENABLE ROW LEVEL SECURITY;

-- Step 3: Policies for classrooms
CREATE POLICY "Teachers can create classrooms" ON public.classrooms FOR INSERT TO authenticated WITH CHECK (auth.uid() = teacher_id);
CREATE POLICY "Teachers can view own classrooms" ON public.classrooms FOR SELECT TO authenticated USING (auth.uid() = teacher_id);
CREATE POLICY "Teachers can update own classrooms" ON public.classrooms FOR UPDATE TO authenticated USING (auth.uid() = teacher_id);
CREATE POLICY "Teachers can delete own classrooms" ON public.classrooms FOR DELETE TO authenticated USING (auth.uid() = teacher_id);
CREATE POLICY "Students can view joined classrooms" ON public.classrooms FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.classroom_members cm WHERE cm.classroom_id = classrooms.id AND cm.user_id = auth.uid()));

-- Policies for classroom_members
CREATE POLICY "Teachers can manage members" ON public.classroom_members FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.classrooms c WHERE c.id = classroom_members.classroom_id AND c.teacher_id = auth.uid()));
CREATE POLICY "Students can view own membership" ON public.classroom_members FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Students can join" ON public.classroom_members FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND role = 'student');
CREATE POLICY "Students can leave" ON public.classroom_members FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Policies for assignments
CREATE POLICY "Teachers can manage assignments" ON public.assignments FOR ALL TO authenticated USING (auth.uid() = teacher_id);
CREATE POLICY "Students can view class assignments" ON public.assignments FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.classroom_members cm WHERE cm.classroom_id = assignments.classroom_id AND cm.user_id = auth.uid()));

-- Policies for assignment_progress
CREATE POLICY "Students manage own progress" ON public.assignment_progress FOR ALL TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Teachers view assignment progress" ON public.assignment_progress FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.assignments a WHERE a.id = assignment_progress.assignment_id AND a.teacher_id = auth.uid()));

-- Policies for parent_links
CREATE POLICY "Parents manage own links" ON public.parent_links FOR ALL TO authenticated USING (auth.uid() = parent_id);
CREATE POLICY "Children view accept links" ON public.parent_links FOR ALL TO authenticated USING (auth.uid() = child_id);
