export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      crew_members: {
        Row: {
          awards: string[] | null
          bio: string | null
          created_at: string | null
          experience_years: number | null
          id: string
          location: string | null
          profile_id: string | null
          specialties: string[] | null
          stage_name: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          awards?: string[] | null
          bio?: string | null
          created_at?: string | null
          experience_years?: number | null
          id?: string
          location?: string | null
          profile_id?: string | null
          specialties?: string[] | null
          stage_name?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          awards?: string[] | null
          bio?: string | null
          created_at?: string | null
          experience_years?: number | null
          id?: string
          location?: string | null
          profile_id?: string | null
          specialties?: string[] | null
          stage_name?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crew_members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          is_verified: boolean | null
          last_name: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          id: string
          is_verified?: boolean | null
          last_name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          is_verified?: boolean | null
          last_name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          customer_id: string | null
          id: string
          rating: number | null
          show_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          rating?: number | null
          show_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          rating?: number | null
          show_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_show_id_fkey"
            columns: ["show_id"]
            isOneToOne: false
            referencedRelation: "shows"
            referencedColumns: ["id"]
          },
        ]
      }
      seats: {
        Row: {
          id: string
          row_number: number
          seat_number: number
          section: string | null
          theater_id: string | null
        }
        Insert: {
          id?: string
          row_number: number
          seat_number: number
          section?: string | null
          theater_id?: string | null
        }
        Update: {
          id?: string
          row_number?: number
          seat_number?: number
          section?: string | null
          theater_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seats_theater_id_fkey"
            columns: ["theater_id"]
            isOneToOne: false
            referencedRelation: "theaters"
            referencedColumns: ["id"]
          },
        ]
      }
      show_crew: {
        Row: {
          crew_member_id: string | null
          id: string
          role_in_show: string
          show_id: string | null
        }
        Insert: {
          crew_member_id?: string | null
          id?: string
          role_in_show: string
          show_id?: string | null
        }
        Update: {
          crew_member_id?: string | null
          id?: string
          role_in_show?: string
          show_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "show_crew_crew_member_id_fkey"
            columns: ["crew_member_id"]
            isOneToOne: false
            referencedRelation: "crew_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "show_crew_show_id_fkey"
            columns: ["show_id"]
            isOneToOne: false
            referencedRelation: "shows"
            referencedColumns: ["id"]
          },
        ]
      }
      shows: {
        Row: {
          age_rating: string | null
          created_at: string | null
          description: string | null
          director_id: string | null
          duration: number | null
          end_date: string | null
          genre: string | null
          id: string
          poster_url: string | null
          price: number
          start_date: string | null
          status: Database["public"]["Enums"]["show_status"] | null
          theater_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          age_rating?: string | null
          created_at?: string | null
          description?: string | null
          director_id?: string | null
          duration?: number | null
          end_date?: string | null
          genre?: string | null
          id?: string
          poster_url?: string | null
          price: number
          start_date?: string | null
          status?: Database["public"]["Enums"]["show_status"] | null
          theater_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          age_rating?: string | null
          created_at?: string | null
          description?: string | null
          director_id?: string | null
          duration?: number | null
          end_date?: string | null
          genre?: string | null
          id?: string
          poster_url?: string | null
          price?: number
          start_date?: string | null
          status?: Database["public"]["Enums"]["show_status"] | null
          theater_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shows_director_id_fkey"
            columns: ["director_id"]
            isOneToOne: false
            referencedRelation: "crew_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shows_theater_id_fkey"
            columns: ["theater_id"]
            isOneToOne: false
            referencedRelation: "theaters"
            referencedColumns: ["id"]
          },
        ]
      }
      showtimes: {
        Row: {
          available_seats: number
          created_at: string | null
          date_time: string
          id: string
          show_id: string | null
        }
        Insert: {
          available_seats: number
          created_at?: string | null
          date_time: string
          id?: string
          show_id?: string | null
        }
        Update: {
          available_seats?: number
          created_at?: string | null
          date_time?: string
          id?: string
          show_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "showtimes_show_id_fkey"
            columns: ["show_id"]
            isOneToOne: false
            referencedRelation: "shows"
            referencedColumns: ["id"]
          },
        ]
      }
      theaters: {
        Row: {
          address: string
          capacity: number
          city: string
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          owner_id: string | null
          updated_at: string | null
        }
        Insert: {
          address: string
          capacity: number
          city: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          owner_id?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          capacity?: number
          city?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          owner_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "theaters_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          booking_reference: string
          created_at: string | null
          customer_id: string | null
          id: string
          price: number
          seat_id: string | null
          showtime_id: string | null
          status: Database["public"]["Enums"]["ticket_status"] | null
          updated_at: string | null
        }
        Insert: {
          booking_reference: string
          created_at?: string | null
          customer_id?: string | null
          id?: string
          price: number
          seat_id?: string | null
          showtime_id?: string | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          updated_at?: string | null
        }
        Update: {
          booking_reference?: string
          created_at?: string | null
          customer_id?: string | null
          id?: string
          price?: number
          seat_id?: string | null
          showtime_id?: string | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_seat_id_fkey"
            columns: ["seat_id"]
            isOneToOne: false
            referencedRelation: "seats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_showtime_id_fkey"
            columns: ["showtime_id"]
            isOneToOne: false
            referencedRelation: "showtimes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_booking_reference: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      seat_status: "available" | "reserved" | "sold" | "maintenance"
      show_status: "draft" | "published" | "cancelled" | "completed"
      ticket_status: "available" | "reserved" | "sold" | "cancelled"
      user_role: "admin" | "theater_owner" | "crew_member" | "customer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      seat_status: ["available", "reserved", "sold", "maintenance"],
      show_status: ["draft", "published", "cancelled", "completed"],
      ticket_status: ["available", "reserved", "sold", "cancelled"],
      user_role: ["admin", "theater_owner", "crew_member", "customer"],
    },
  },
} as const
