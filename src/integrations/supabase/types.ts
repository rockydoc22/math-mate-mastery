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
          created_at: string
          current_question_index: number
          host_id: string
          id: string
          max_players: number
          question_count: number
          room_code: string
          started_at: string | null
          status: string
          subject: string
        }
        Insert: {
          created_at?: string
          current_question_index?: number
          host_id: string
          id?: string
          max_players?: number
          question_count?: number
          room_code: string
          started_at?: string | null
          status?: string
          subject?: string
        }
        Update: {
          created_at?: string
          current_question_index?: number
          host_id?: string
          id?: string
          max_players?: number
          question_count?: number
          room_code?: string
          started_at?: string | null
          status?: string
          subject?: string
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
      flagged_questions: {
        Row: {
          created_at: string
          id: string
          issue_type: string
          notes: string | null
          question_id: string
          question_type: string
          reporter_ip: string | null
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          issue_type: string
          notes?: string | null
          question_id: string
          question_type: string
          reporter_ip?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          issue_type?: string
          notes?: string | null
          question_id?: string
          question_type?: string
          reporter_ip?: string | null
          status?: string
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
          id: string
          theme_color: string | null
          updated_at: string
          username: string
        }
        Insert: {
          avatar_emoji?: string | null
          avatar_url?: string | null
          created_at?: string
          id: string
          theme_color?: string | null
          updated_at?: string
          username: string
        }
        Update: {
          avatar_emoji?: string | null
          avatar_url?: string | null
          created_at?: string
          id?: string
          theme_color?: string | null
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      question_attempts: {
        Row: {
          created_at: string
          domain: string
          id: string
          is_correct: boolean
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
          domain: string
          id?: string
          is_correct: boolean
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
          domain?: string
          id?: string
          is_correct?: boolean
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
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
