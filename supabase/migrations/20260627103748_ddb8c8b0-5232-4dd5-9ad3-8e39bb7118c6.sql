
CREATE OR REPLACE FUNCTION public.get_classroom_code(_classroom_id uuid)
RETURNS text LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT c.class_code FROM public.classrooms c
  WHERE c.id = _classroom_id
    AND (c.teacher_id = auth.uid() OR public.has_role(auth.uid(), 'admin'::app_role))
$$;
