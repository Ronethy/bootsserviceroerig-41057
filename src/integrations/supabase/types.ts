export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          content: string
          created_at: string | null
          id: number
          image_url: string
          title: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: number
          image_url: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: number
          image_url?: string
          title?: string
        }
        Relationships: []
      }
      contact_info: {
        Row: {
          address: string
          created_at: string | null
          email: string
          hours: string
          id: number
          location_image: string | null
          phone: string
        }
        Insert: {
          address: string
          created_at?: string | null
          email: string
          hours: string
          id?: number
          location_image?: string | null
          phone: string
        }
        Update: {
          address?: string
          created_at?: string | null
          email?: string
          hours?: string
          id?: number
          location_image?: string | null
          phone?: string
        }
        Relationships: []
      }
      footer_content: {
        Row: {
          company_description: string
          company_name: string
          copyright_text: string
          created_at: string
          email_url: string | null
          facebook_url: string | null
          id: number
          imprint_link_text: string
          instagram_url: string | null
          privacy_link_text: string
          terms_link_text: string
        }
        Insert: {
          company_description?: string
          company_name?: string
          copyright_text?: string
          created_at?: string
          email_url?: string | null
          facebook_url?: string | null
          id?: number
          imprint_link_text?: string
          instagram_url?: string | null
          privacy_link_text?: string
          terms_link_text?: string
        }
        Update: {
          company_description?: string
          company_name?: string
          copyright_text?: string
          created_at?: string
          email_url?: string | null
          facebook_url?: string | null
          id?: number
          imprint_link_text?: string
          instagram_url?: string | null
          privacy_link_text?: string
          terms_link_text?: string
        }
        Relationships: []
      }
      for_sale_items: {
        Row: {
          created_at: string | null
          description: string
          id: number
          image_urls: string[]
          price: number
          title: string
          year_built: number | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: number
          image_urls: string[]
          price: number
          title: string
          year_built?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: number
          image_urls?: string[]
          price?: number
          title?: string
          year_built?: number | null
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          created_at: string | null
          description: string
          id: number
          image_url: string
          title: string
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: number
          image_url: string
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: number
          image_url?: string
          title?: string
        }
        Relationships: []
      }
      hero_content: {
        Row: {
          created_at: string | null
          id: number
          image_url: string
          subtitle: string
          title: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          image_url: string
          subtitle: string
          title: string
        }
        Update: {
          created_at?: string | null
          id?: number
          image_url?: string
          subtitle?: string
          title?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string
          icon: string
          id: number
          image_urls: string[]
          title: string
        }
        Insert: {
          created_at?: string | null
          description: string
          icon: string
          id?: number
          image_urls?: string[]
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string
          icon?: string
          id?: number
          image_urls?: string[]
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
