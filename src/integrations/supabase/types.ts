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
      adaptive_teaching_sections: {
        Row: {
          exam_family: string
          example_problems: Json | null
          generated_at: string
          id: string
          markdown_body: string
          model: string
          section: string
          skill: string
          user_id: string
        }
        Insert: {
          exam_family: string
          example_problems?: Json | null
          generated_at?: string
          id?: string
          markdown_body: string
          model?: string
          section: string
          skill: string
          user_id: string
        }
        Update: {
          exam_family?: string
          example_problems?: Json | null
          generated_at?: string
          id?: string
          markdown_body?: string
          model?: string
          section?: string
          skill?: string
          user_id?: string
        }
        Relationships: []
      }
      adaptive_weakness_clusters: {
        Row: {
          accuracy: number
          attempts_count: number
          avg_time_ratio: number
          domain: string
          exam_family: string
          id: string
          last_attempt_at: string | null
          mastery_level: number
          priority_score: number
          section: string
          skill: string
          trap_susceptibility: number
          updated_at: string
          user_id: string
        }
        Insert: {
          accuracy?: number
          attempts_count?: number
          avg_time_ratio?: number
          domain: string
          exam_family: string
          id?: string
          last_attempt_at?: string | null
          mastery_level?: number
          priority_score?: number
          section: string
          skill: string
          trap_susceptibility?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          accuracy?: number
          attempts_count?: number
          avg_time_ratio?: number
          domain?: string
          exam_family?: string
          id?: string
          last_attempt_at?: string | null
          mastery_level?: number
          priority_score?: number
          section?: string
          skill?: string
          trap_susceptibility?: number
          updated_at?: string
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
      assessment_questions: {
        Row: {
          cognitive_tags: string[] | null
          correct_key: string
          created_at: string
          difficulty: number
          domain: string
          exam_family: string
          id: string
          options: Json
          section: string
          skill: string
          solution_markdown: string | null
          stem: string
          subskill: string | null
          test_code: string | null
          time_target_seconds: number | null
          trap_type: string | null
          updated_at: string
          wrong_answer_explanations: Json | null
        }
        Insert: {
          cognitive_tags?: string[] | null
          correct_key: string
          created_at?: string
          difficulty: number
          domain: string
          exam_family: string
          id?: string
          options: Json
          section: string
          skill: string
          solution_markdown?: string | null
          stem: string
          subskill?: string | null
          test_code?: string | null
          time_target_seconds?: number | null
          trap_type?: string | null
          updated_at?: string
          wrong_answer_explanations?: Json | null
        }
        Update: {
          cognitive_tags?: string[] | null
          correct_key?: string
          created_at?: string
          difficulty?: number
          domain?: string
          exam_family?: string
          id?: string
          options?: Json
          section?: string
          skill?: string
          solution_markdown?: string | null
          stem?: string
          subskill?: string | null
          test_code?: string | null
          time_target_seconds?: number | null
          trap_type?: string | null
          updated_at?: string
          wrong_answer_explanations?: Json | null
        }
        Relationships: []
      }
      assignment_progress: {
        Row: {
          assignment_id: string
          completed_at: string | null
          id: string
          questions_completed: number
          questions_correct: number
          updated_at: string
          user_id: string
        }
        Insert: {
          assignment_id: string
          completed_at?: string | null
          id?: string
          questions_completed?: number
          questions_correct?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          assignment_id?: string
          completed_at?: string | null
          id?: string
          questions_completed?: number
          questions_correct?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignment_progress_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          classroom_id: string
          created_at: string
          due_date: string
          id: string
          question_count: number
          subject: string
          teacher_id: string
          title: string
          updated_at: string
        }
        Insert: {
          classroom_id: string
          created_at?: string
          due_date: string
          id?: string
          question_count?: number
          subject?: string
          teacher_id: string
          title: string
          updated_at?: string
        }
        Update: {
          classroom_id?: string
          created_at?: string
          due_date?: string
          id?: string
          question_count?: number
          subject?: string
          teacher_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_classroom_id_fkey"
            columns: ["classroom_id"]
            isOneToOne: false
            referencedRelation: "classrooms"
            referencedColumns: ["id"]
          },
        ]
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
      bulk_generate_jobs: {
        Row: {
          batches_run: number
          completed_at: string | null
          created_at: string
          failures: number
          id: string
          inserted: number
          label: string
          last_error: string | null
          preset_key: string
          priority: number
          spec: Json
          started_at: string | null
          status: string
          target: number
          total_runtime_ms: number
          updated_at: string
        }
        Insert: {
          batches_run?: number
          completed_at?: string | null
          created_at?: string
          failures?: number
          id?: string
          inserted?: number
          label: string
          last_error?: string | null
          preset_key: string
          priority?: number
          spec: Json
          started_at?: string | null
          status?: string
          target: number
          total_runtime_ms?: number
          updated_at?: string
        }
        Update: {
          batches_run?: number
          completed_at?: string | null
          created_at?: string
          failures?: number
          id?: string
          inserted?: number
          label?: string
          last_error?: string | null
          preset_key?: string
          priority?: number
          spec?: Json
          started_at?: string | null
          status?: string
          target?: number
          total_runtime_ms?: number
          updated_at?: string
        }
        Relationships: []
      }
      classroom_members: {
        Row: {
          classroom_id: string
          id: string
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          classroom_id: string
          id?: string
          joined_at?: string
          role?: string
          user_id: string
        }
        Update: {
          classroom_id?: string
          id?: string
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "classroom_members_classroom_id_fkey"
            columns: ["classroom_id"]
            isOneToOne: false
            referencedRelation: "classrooms"
            referencedColumns: ["id"]
          },
        ]
      }
      classrooms: {
        Row: {
          class_code: string
          created_at: string
          description: string | null
          id: string
          name: string
          teacher_id: string
          updated_at: string
        }
        Insert: {
          class_code: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          teacher_id: string
          updated_at?: string
        }
        Update: {
          class_code?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          teacher_id?: string
          updated_at?: string
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
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
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
      kid_profiles: {
        Row: {
          avatar_emoji: string | null
          created_at: string
          display_name: string
          grade_level: string | null
          id: string
          parent_id: string
          updated_at: string
        }
        Insert: {
          avatar_emoji?: string | null
          created_at?: string
          display_name: string
          grade_level?: string | null
          id?: string
          parent_id: string
          updated_at?: string
        }
        Update: {
          avatar_emoji?: string | null
          created_at?: string
          display_name?: string
          grade_level?: string | null
          id?: string
          parent_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      onboarding_events: {
        Row: {
          created_at: string
          event: string
          exam: string | null
          goal: string | null
          id: string
          meta: Json | null
          stage: string | null
          step_index: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event: string
          exam?: string | null
          goal?: string | null
          id?: string
          meta?: Json | null
          stage?: string | null
          step_index?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event?: string
          exam?: string | null
          goal?: string | null
          id?: string
          meta?: Json | null
          stage?: string | null
          step_index?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      parent_links: {
        Row: {
          child_id: string
          created_at: string
          id: string
          link_code: string
          parent_id: string
          status: string
        }
        Insert: {
          child_id: string
          created_at?: string
          id?: string
          link_code: string
          parent_id: string
          status?: string
        }
        Update: {
          child_id?: string
          created_at?: string
          id?: string
          link_code?: string
          parent_id?: string
          status?: string
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
      personality_results: {
        Row: {
          assessment_type: string
          completed_at: string
          created_at: string
          id: string
          raw_scores: Json
          result_data: Json
          result_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assessment_type: string
          completed_at?: string
          created_at?: string
          id?: string
          raw_scores: Json
          result_data: Json
          result_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assessment_type?: string
          completed_at?: string
          created_at?: string
          id?: string
          raw_scores?: Json
          result_data?: Json
          result_type?: string
          updated_at?: string
          user_id?: string
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
          diagnostic_completed_at: string | null
          exam_type: string
          grade_level: string | null
          id: string
          is_parent: boolean
          num_kids: number
          pinned_subjects: string[]
          primary_goal: string | null
          show_on_leaderboards: boolean
          summary_email: string | null
          theme_color: string | null
          updated_at: string
          username: string
          weekly_summary_enabled: boolean
        }
        Insert: {
          avatar_emoji?: string | null
          avatar_url?: string | null
          created_at?: string
          diagnostic_completed_at?: string | null
          exam_type?: string
          grade_level?: string | null
          id: string
          is_parent?: boolean
          num_kids?: number
          pinned_subjects?: string[]
          primary_goal?: string | null
          show_on_leaderboards?: boolean
          summary_email?: string | null
          theme_color?: string | null
          updated_at?: string
          username: string
          weekly_summary_enabled?: boolean
        }
        Update: {
          avatar_emoji?: string | null
          avatar_url?: string | null
          created_at?: string
          diagnostic_completed_at?: string | null
          exam_type?: string
          grade_level?: string | null
          id?: string
          is_parent?: boolean
          num_kids?: number
          pinned_subjects?: string[]
          primary_goal?: string | null
          show_on_leaderboards?: boolean
          summary_email?: string | null
          theme_color?: string | null
          updated_at?: string
          username?: string
          weekly_summary_enabled?: boolean
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
          kid_profile_id: string | null
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
          kid_profile_id?: string | null
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
          kid_profile_id?: string | null
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
        Relationships: [
          {
            foreignKeyName: "question_attempts_kid_profile_id_fkey"
            columns: ["kid_profile_id"]
            isOneToOne: false
            referencedRelation: "kid_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      question_overrides: {
        Row: {
          created_at: string
          edited_by: string | null
          id: string
          notes: string | null
          override_data: Json
          question_id: string
          question_type: string
          source_flag_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          edited_by?: string | null
          id?: string
          notes?: string | null
          override_data: Json
          question_id: string
          question_type: string
          source_flag_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          edited_by?: string | null
          id?: string
          notes?: string | null
          override_data?: Json
          question_id?: string
          question_type?: string
          source_flag_id?: string | null
          updated_at?: string
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
      solution_analyses: {
        Row: {
          ai_analysis: string
          created_at: string
          id: string
          question_id: string
          question_text: string
          question_type: string
          student_approach: string
          user_id: string
        }
        Insert: {
          ai_analysis: string
          created_at?: string
          id?: string
          question_id: string
          question_text: string
          question_type?: string
          student_approach: string
          user_id: string
        }
        Update: {
          ai_analysis?: string
          created_at?: string
          id?: string
          question_id?: string
          question_text?: string
          question_type?: string
          student_approach?: string
          user_id?: string
        }
        Relationships: []
      }
      streaks: {
        Row: {
          current_streak: number
          freeze_month: string | null
          freeze_tokens: number
          freezes_used_this_month: number
          id: string
          last_practice_date: string | null
          longest_streak: number
          updated_at: string
          user_id: string
        }
        Insert: {
          current_streak?: number
          freeze_month?: string | null
          freeze_tokens?: number
          freezes_used_this_month?: number
          id?: string
          last_practice_date?: string | null
          longest_streak?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          current_streak?: number
          freeze_month?: string | null
          freeze_tokens?: number
          freezes_used_this_month?: number
          id?: string
          last_practice_date?: string | null
          longest_streak?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      student_attempts: {
        Row: {
          chosen_key: string | null
          confidence: number | null
          created_at: string
          flagged: boolean
          id: string
          is_correct: boolean
          question_id: string
          session_id: string | null
          time_seconds: number
          user_id: string
        }
        Insert: {
          chosen_key?: string | null
          confidence?: number | null
          created_at?: string
          flagged?: boolean
          id?: string
          is_correct: boolean
          question_id: string
          session_id?: string | null
          time_seconds?: number
          user_id: string
        }
        Update: {
          chosen_key?: string | null
          confidence?: number | null
          created_at?: string
          flagged?: boolean
          id?: string
          is_correct?: boolean
          question_id?: string
          session_id?: string | null
          time_seconds?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_attempts_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "assessment_questions"
            referencedColumns: ["id"]
          },
        ]
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
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
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
      user_consents: {
        Row: {
          agreed_at: string
          consent_key: string
          consent_type: string
          id: string
          ip_address: string | null
          user_id: string
        }
        Insert: {
          agreed_at?: string
          consent_key: string
          consent_type: string
          id?: string
          ip_address?: string | null
          user_id: string
        }
        Update: {
          agreed_at?: string
          consent_key?: string
          consent_type?: string
          id?: string
          ip_address?: string | null
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
      award_accelerator_credits: {
        Args: {
          _base_questions?: number
          _credit_type: string
          _days_since_miss?: number
          _difficulty_rating?: number
          _metadata?: Json
          _question_id?: string
          _source_id?: string
        }
        Returns: string
      }
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
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
      get_home_dashboard_stats: { Args: { p_user_id: string }; Returns: Json }
      get_leaderboard_profile: {
        Args: { profile_id: string }
        Returns: {
          avatar_emoji: string
          username: string
        }[]
      }
      get_my_email_prefs: {
        Args: never
        Returns: {
          summary_email: string
          weekly_summary_enabled: boolean
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
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
      recompute_weakness_clusters: {
        Args: { _exam_family?: string; _user_id: string }
        Returns: number
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
