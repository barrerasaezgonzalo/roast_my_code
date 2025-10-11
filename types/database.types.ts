export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      roasts: {
        Row: {
          id: string;
          user_id: string | null;
          code: string;
          language: string;
          roaster_mode: string;
          roast_result: Json;
          score: number;
          is_public: boolean;
          reactions_count: number;
          shareable_slug: string;
          ip_address: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          code: string;
          language: string;
          roaster_mode: string;
          roast_result: Json;
          score: number;
          is_public?: boolean;
          reactions_count?: number;
          shareable_slug: string;
          ip_address?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          code?: string;
          language?: string;
          roaster_mode?: string;
          roast_result?: Json;
          score?: number;
          is_public?: boolean;
          reactions_count?: number;
          shareable_slug?: string;
          ip_address?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_stats: {
        Row: {
          user_id: string;
          total_roasts: number;
          average_score: number;
          best_score: number;
          worst_score: number;
          total_lines_analyzed: number;
          achievements: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          total_roasts?: number;
          average_score?: number;
          best_score?: number;
          worst_score?: number;
          total_lines_analyzed?: number;
          achievements?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          total_roasts?: number;
          average_score?: number;
          best_score?: number;
          worst_score?: number;
          total_lines_analyzed?: number;
          achievements?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      rate_limits: {
        Row: {
          id: string;
          identifier: string;
          requests_count: number;
          window_start: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          identifier: string;
          requests_count?: number;
          window_start?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          identifier?: string;
          requests_count?: number;
          window_start?: string;
          created_at?: string;
        };
      };
    };
  };
}
