export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      accelerator_credits: {
        Row: {
          base_questions: number
          created_at: string
          credit_type: string
          earned_credits: number
          id: string
          metadata: Json | null
          multiplier: number
          question_id: string | null
          source_id: string | null
          user_id: string
        }
        Insert: {
          base_questions?: number
          created_at?: string
          credit_type: string
          earned_credits: number
          id?: string
          metadata?: Json | null
          multiplier?: number
          question_id?: string | null
          source_id?: string | null
          user_id: string
        }
        Update: {
          base_questions?: number
          created_at?: string
          credit_type?: string
          earned_credits?: number
          id?: string
          metadata?: Json | null
          multiplier?: number
          question_id?: string | null
          source_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      achievements: {
        Row: {
          achievement_type: string
          id: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_type: string
          id?: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_type?: string
          id?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ap_subject_progress: {
        Row: {
          created_at: string
          id: string
          last_practiced_at: string | null
          questions_attempted: number
          questions_correct: number
          subject_id: string
          unit_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_practiced_at?: string | null
          questions_attempted?: number
          questions_correct?: number
          subject_id: string
          unit_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_practiced_at?: string | null
          questions_attempted?: number
          questions_correct?: number
          subject_id?: string
          unit_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      battle_answers: {
        Row: {
          answered_at: string
          id: string
          is_correct: boolean
          points_earned: number
          question_index: number
          room_id: string
          time_taken_ms: number
          user_id: string
        }
        Insert: {
          answered_at?: string
          id?: string
          is_correct: boolean
          points_earned?: number
          question_index: number
          room_id: string
          time_taken_ms: number
          user_id: string
        }
        Update: {
          answered_at?: string
          id?: string
          is_correct?: boolean
          points_earned?: number
          question_index?: number
          room_id?: string
          time_taken_ms?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "battle_answers_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "battle_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      battle_participants: {
        Row: {
          answers_correct: number
          current_question: number
          finished_at: string | null
          id: string
          joined_at: string
          room_id: string
          score: number
          user_id: string
        }
        Insert: {
          answers_correct?: number
          current_question?: number
          finished_at?: string | null
          id?: string
          joined_at?: string
          room_id: string
          score?: number
          user_id: string
        }
        Update: {
          answers_correct?: number
          current_question?: number
          finished_at?: string | null
          id?: string
          joined_at?: string
          room_id?: string
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "battle_participants_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "battle_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      battle_rooms: {
        Row: {
          battle_mode: string
          created_at: string
          current_question_index: number
          host_id: string
          id: string
          is_solo: boolean
          max_players: number
          question_count: number
          room_code: string
          started_at: string | null
          status: string
          subject: string
          time_limit_seconds: number | null
        }
        Insert: {
          battle_mode?: string
          created_at?: string
          current_question_index?: number
          host_id: string
          id?: string
          is_solo?: boolean
          max_players?: number
          question_count?: number
          room_code: string
          started_at?: string | null
          status?: string
          subject?: string
          time_limit_seconds?: number | null
        }
        Update: {
          battle_mode?: string
          created_at?: string
          current_question_index?: number
          host_id?: string
          id?: string
          is_solo?: boolean
          max_players?: number
          question_count?: number
          room_code?: string
          started_at?: string | null
          status?: string
          subject?: string
          time_limit_seconds?: number | null
        }
        Relationships: []
      }
      daily_challenges: {
        Row: {
          bonus_xp: number
          challenge_date: string
          completed_at: string
          id: string
          score: number
          total_questions: number
          user_id: string
        }
        Insert: {
          bonus_xp?: number
          challenge_date?: string
          completed_at?: string
          id?: string
          score: number
          total_questions?: number
          user_id: string
        }
        Update: {
          bonus_xp?: number
          challenge_date?: string
          completed_at?: string
          id?: string
          score?: number
          total_questions?: number
          user_id?: string
        }
        Relationships: []
      }
      email_rate_limits: {
        Row: {
          created_at: string
          email: string
          endpoint: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          endpoint: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          endpoint?: string
          id?: string
        }
        Relationships: []
      }
      fighter_avatars: {
        Row: {
          aura_color: string | null
          base_type: string
          created_at: string
          helmet_style: string | null
          id: string
          scar_overlay: string | null
          updated_at: string
          user_id: string
          weapon: string | null
        }
        Insert: {
          aura_color?: string | null
          base_type?: string
          created_at?: string
          helmet_style?: string | null
          id?: string
          scar_overlay?: string | null
          updated_at?: string
          user_id: string
          weapon?: string | null
        }
        Update: {
          aura_color?: string | null
          base_type?: string
          created_at?: string
          helmet_style?: string | null
          id?: string
          scar_overlay?: string | null
          updated_at?: string
          user_id?: string
          weapon?: string | null
        }
        Relationships: []
      }
      flagged_questions: {
        Row: {
          ai_fix_generated_at: string | null
          ai_suggested_fix: Json | null
          created_at: string
          id: string
          issue_type: string
          notes: string | null
          question_id: string
          question_type: string
          resolution_notes: string | null
          resolved_at: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          ai_fix_generated_at?: string | null
          ai_suggested_fix?: Json | null
          created_at?: string
          id?: string
          issue_type: string
          notes?: string | null
          question_id: string
          question_type: string
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: string
          user_id?: string | null
        }
        Update: {
          ai_fix_generated_at?: string | null
          ai_suggested_fix?: Json | null
          created_at?: string
          id?: string
          issue_type?: string
          notes?: string | null
          question_id?: string
          question_type?: string
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      friendships: {
        Row: {
          addressee_id: string
          created_at: string
          id: string
          requester_id: string
          status: string
          updated_at: string
        }
        Insert: {
          addressee_id: string
          created_at?: string
          id?: string
          requester_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          addressee_id?: string
          created_at?: string
          id?: string
          requester_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      password_reset_codes: {
        Row: {
          code: string
          created_at: string
          email: string
          expires_at: string
          id: string
          used: boolean
        }
        Insert: {
          code: string
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          used?: boolean
        }
        Update: {
          code?: string
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          used?: boolean
        }
        Relationships: []
      }
      practice_tests: {
        Row: {
          completed_at: string
          english_score: number | null
          id: string
          math_score: number | null
          test_type: string
          time_taken_seconds: number | null
          total_score: number | null
          user_id: string
        }
        Insert: {
          completed_at?: string
          english_score?: number | null
          id?: string
          math_score?: number | null
          test_type?: string
          time_taken_seconds?: number | null
          total_score?: number | null
          user_id: string
        }
        Update: {
          completed_at?: string
          english_score?: number | null
          id?: string
          math_score?: number | null
          test_type?: string
          time_taken_seconds?: number | null
          total_score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_emoji: string | null
          avatar_url: string | null
          created_at: string
          exam_type: string
          id: string
          pinned_subjects: string[]
          show_on_leaderboards: boolean
          theme_color: string | null
          updated_at: string
          username: string
        }
        Insert: {
          avatar_emoji?: string | null
          avatar_url?: string | null
          created_at?: string
          exam_type?: string
          id: string
          pinned_subjects?: string[]
          show_on_leaderboards?: boolean
          theme_color?: string | null
          updated_at?: string
          username: string
        }
        Update: {
          avatar_emoji?: string | null
          avatar_url?: string | null
          created_at?: string
          exam_type?: string
          id?: string
          pinned_subjects?: string[]
          show_on_leaderboards?: boolean
          theme_color?: string | null
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      question_attempts: {
        Row: {
          created_at: string
          difficulty_rating: number | null
          domain: string
          first_missed_at: string | null
          id: string
          is_correct: boolean
          miss_reason: string | null
          miss_reason_noted_at: string | null
          next_review_at: string | null
          question_id: string
          question_type: string
          review_count: number
          skill: string
          time_taken_ms: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          difficulty_rating?: number | null
          domain: string
          first_missed_at?: string | null
          id?: string
          is_correct: boolean
          miss_reason?: string | null
          miss_reason_noted_at?: string | null
          next_review_at?: string | null
          question_id: string
          question_type: string
          review_count?: number
          skill: string
          time_taken_ms?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          difficulty_rating?: number | null
          domain?: string
          first_missed_at?: string | null
          id?: string
          is_correct?: boolean
          miss_reason?: string | null
          miss_reason_noted_at?: string | null
          next_review_at?: string | null
          question_id?: string
          question_type?: string
          review_count?: number
          skill?: string
          time_taken_ms?: number | null
          user_id?: string
        }
        Relationships: []
      }
      quiz_scores: {
        Row: {
          created_at: string
          id: string
          percentage: number
          score: number
          subject: string
          total_questions: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          percentage: number
          score: number
          subject: string
          total_questions: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          percentage?: number
          score?: number
          subject?: string
          total_questions?: number
          user_id?: string
        }
        Relationships: []
      }
      rating_history: {
        Row: {
          id: string
          new_rating: number
          old_rating: number
          question_difficulty: number
          question_id: string
          rating_change: number
          rating_type: string
          recorded_at: string
          user_id: string
          was_correct: boolean
        }
        Insert: {
          id?: string
          new_rating: number
          old_rating: number
          question_difficulty: number
          question_id: string
          rating_change: number
          rating_type: string
          recorded_at?: string
          user_id: string
          was_correct: boolean
        }
        Update: {
          id?: string
          new_rating?: number
          old_rating?: number
          question_difficulty?: number
          question_id?: string
          rating_change?: number
          rating_type?: string
          recorded_at?: string
          user_id?: string
          was_correct?: boolean
        }
        Relationships: []
      }
      rulebook_notes: {
        Row: {
          attempt_id: string | null
          created_at: string
          error_pattern: string | null
          id: string
          notes: string | null
          prevention_rule: string | null
          question_id: string
          trigger_phrase: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          attempt_id?: string | null
          created_at?: string
          error_pattern?: string | null
          id?: string
          notes?: string | null
          prevention_rule?: string | null
          question_id: string
          trigger_phrase?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          attempt_id?: string | null
          created_at?: string
          error_pattern?: string | null
          id?: string
          notes?: string | null
          prevention_rule?: string | null
          question_id?: string
          trigger_phrase?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rulebook_notes_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "question_attempts"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_questions: {
        Row: {
          created_at: string
          id: string
          question_id: string
          question_type: string
          user_id: string
          was_wrong: boolean | null
        }
        Insert: {
          created_at?: string
          id?: string
          question_id: string
          question_type: string
          user_id: string
          was_wrong?: boolean | null
        }
        Update: {
          created_at?: string
          id?: string
          question_id?: string
          question_type?: string
          user_id?: string
          was_wrong?: boolean | null
        }
        Relationships: []
      }
      skill_ratings: {
        Row: {
          created_at: string
          english_questions_answered: number
          english_rating: number
          id: string
          math_questions_answered: number
          math_rating: number
          overall_rating: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          english_questions_answered?: number
          english_rating?: number
          id?: string
          math_questions_answered?: number
          math_rating?: number
          overall_rating?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          english_questions_answered?: number
          english_rating?: number
          id?: string
          math_questions_answered?: number
          math_rating?: number
          overall_rating?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      streaks: {
        Row: {
          current_streak: number
          id: string
          last_practice_date: string | null
          longest_streak: number
          updated_at: string
          user_id: string
        }
        Insert: {
          current_streak?: number
          id?: string
          last_practice_date?: string | null
          longest_streak?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          current_streak?: number
          id?: string
          last_practice_date?: string | null
          longest_streak?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      study_plans: {
        Row: {
          baseline_score: number | null
          created_at: string
          daily_minutes: number
          daily_reminder_enabled: boolean | null
          exam_date: string
          id: string
          is_active: boolean
          last_daily_reminder_sent: string | null
          last_reminder_shown: string | null
          last_weekly_reminder_sent: string | null
          reminder_time: string | null
          target_score: number | null
          updated_at: string
          user_id: string
          weekly_reminder_enabled: boolean | null
        }
        Insert: {
          baseline_score?: number | null
          created_at?: string
          daily_minutes?: number
          daily_reminder_enabled?: boolean | null
          exam_date: string
          id?: string
          is_active?: boolean
          last_daily_reminder_sent?: string | null
          last_reminder_shown?: string | null
          last_weekly_reminder_sent?: string | null
          reminder_time?: string | null
          target_score?: number | null
          updated_at?: string
          user_id: string
          weekly_reminder_enabled?: boolean | null
        }
        Update: {
          baseline_score?: number | null
          created_at?: string
          daily_minutes?: number
          daily_reminder_enabled?: boolean | null
          exam_date?: string
          id?: string
          is_active?: boolean
          last_daily_reminder_sent?: string | null
          last_reminder_shown?: string | null
          last_weekly_reminder_sent?: string | null
          reminder_time?: string | null
          target_score?: number | null
          updated_at?: string
          user_id?: string
          weekly_reminder_enabled?: boolean | null
        }
        Relationships: []
      }
      topic_mastery: {
        Row: {
          accuracy_percentage: number
          created_at: string
          id: string
          is_mastered: boolean
          mastered_at: string | null
          questions_attempted: number
          questions_correct: number
          subject: string
          topic_key: string
          topic_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          accuracy_percentage?: number
          created_at?: string
          id?: string
          is_mastered?: boolean
          mastered_at?: string | null
          questions_attempted?: number
          questions_correct?: number
          subject: string
          topic_key: string
          topic_name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          accuracy_percentage?: number
          created_at?: string
          id?: string
          is_mastered?: boolean
          mastered_at?: string | null
          questions_attempted?: number
          questions_correct?: number
          subject?: string
          topic_key?: string
          topic_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_feedback: {
        Row: {
          created_at: string
          email: string | null
          feedback_type: string
          id: string
          message: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          feedback_type: string
          id?: string
          message: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          feedback_type?: string
          id?: string
          message?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_notification_settings: {
        Row: {
          created_at: string
          id: string
          reminder_email: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          reminder_email?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          reminder_email?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message: string
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      writing_lab_sessions: {
        Row: {
          ai_features_used: string[] | null
          completed: boolean | null
          created_at: string
          essay_type: string
          id: string
          module: string
          time_spent_seconds: number | null
          user_id: string
        }
        Insert: {
          ai_features_used?: string[] | null
          completed?: boolean | null
          created_at?: string
          essay_type: string
          id?: string
          module: string
          time_spent_seconds?: number | null
          user_id: string
        }
        Update: {
          ai_features_used?: string[] | null
          completed?: boolean | null
          created_at?: string
          essay_type?: string
          id?: string
          module?: string
          time_spent_seconds?: number | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      leaderboard_scores: {
        Row: {
          avatar_emoji: string | null
          avg_percentage: number | null
          quiz_count: number | null
          total_score: number | null
          username: string | null
        }
        Relationships: []
      }
      profiles_public: {
        Row: {
          avatar_emoji: string | null
          avatar_url: string | null
          created_at: string | null
          id: string | null
          theme_color: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_emoji?: string | null
          avatar_url?: string | null
          created_at?: string | null
          id?: string | null
          theme_color?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_emoji?: string | null
          avatar_url?: string | null
          created_at?: string | null
          id?: string | null
          theme_color?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      streak_leaderboard: {
        Row: {
          avatar_emoji: string | null
          current_streak: number | null
          longest_streak: number | null
          username: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_admin_user_stats: {
        Args: never
        Returns: {
          avatar_emoji: string
          correct_answers: number
          created_at: string
          questions_answered: number
          quizzes_completed: number
          user_id: string
          username: string
        }[]
      }
      get_leaderboard_profile: {
        Args: { profile_id: string }
        Returns: {
          avatar_emoji: string
          username: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_friend: {
        Args: { _friend_id: string; _user_id: string }
        Returns: boolean
      }
      is_in_same_battle: {
        Args: { _profile_id: string; _viewer_id: string }
        Returns: boolean
      }
      is_room_participant: {
        Args: { _room_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
