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
      malls: {
        Row: {
          id: string;
          slug: string;
          name: string;
          branding: Json;
          currency: string;
          locale: string;
          timezone: string;
          status: 'active' | 'inactive';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          branding?: Json;
          currency?: string;
          locale?: string;
          timezone?: string;
          status?: 'active' | 'inactive';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          branding?: Json;
          currency?: string;
          locale?: string;
          timezone?: string;
          status?: 'active' | 'inactive';
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      memberships: {
        Row: {
          id: string;
          user_id: string;
          mall_id: string;
          role: 'shopper' | 'tenant' | 'mall_admin';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          mall_id: string;
          role: 'shopper' | 'tenant' | 'mall_admin';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          mall_id?: string;
          role?: 'shopper' | 'tenant' | 'mall_admin';
          created_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          mall_id: string;
          slug: string;
          name: string;
          icon: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          mall_id: string;
          slug: string;
          name: string;
          icon?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          mall_id?: string;
          slug?: string;
          name?: string;
          icon?: string | null;
          sort_order?: number;
          created_at?: string;
        };
      };
      stores: {
        Row: {
          id: string;
          mall_id: string;
          category_id: string | null;
          name: string;
          slug: string;
          description: string | null;
          logo_url: string | null;
          floor: number;
          unit: string | null;
          phone: string | null;
          opening_hours: Json;
          map_ref: Json | null;
          status: 'active' | 'inactive' | 'temporary';
          can_publish_offers: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          mall_id: string;
          category_id?: string | null;
          name: string;
          slug: string;
          description?: string | null;
          logo_url?: string | null;
          floor?: number;
          unit?: string | null;
          phone?: string | null;
          opening_hours?: Json;
          map_ref?: Json | null;
          status?: 'active' | 'inactive' | 'temporary';
          can_publish_offers?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          mall_id?: string;
          category_id?: string | null;
          name?: string;
          slug?: string;
          description?: string | null;
          logo_url?: string | null;
          floor?: number;
          unit?: string | null;
          phone?: string | null;
          opening_hours?: Json;
          map_ref?: Json | null;
          status?: 'active' | 'inactive' | 'temporary';
          can_publish_offers?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      offers: {
        Row: {
          id: string;
          mall_id: string;
          store_id: string;
          title: string;
          description: string | null;
          benefit_label: string;
          terms: string | null;
          image_url: string | null;
          starts_at: string;
          ends_at: string;
          total_coupons: number;
          per_user_limit: number;
          activated_count: number;
          redeemed_count: number;
          status: 'draft' | 'pending' | 'active' | 'paused' | 'ended';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          mall_id: string;
          store_id: string;
          title: string;
          description?: string | null;
          benefit_label: string;
          terms?: string | null;
          image_url?: string | null;
          starts_at: string;
          ends_at: string;
          total_coupons?: number;
          per_user_limit?: number;
          status?: 'draft' | 'pending' | 'active' | 'paused' | 'ended';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          mall_id?: string;
          store_id?: string;
          title?: string;
          description?: string | null;
          benefit_label?: string;
          terms?: string | null;
          image_url?: string | null;
          starts_at?: string;
          ends_at?: string;
          total_coupons?: number;
          per_user_limit?: number;
          status?: 'draft' | 'pending' | 'active' | 'paused' | 'ended';
          created_at?: string;
          updated_at?: string;
        };
      };
      coupons: {
        Row: {
          id: string;
          mall_id: string;
          offer_id: string;
          user_id: string;
          code: string;
          status: 'active' | 'redeemed' | 'expired' | 'cancelled';
          activated_at: string;
          expires_at: string;
          redeemed_at: string | null;
        };
      };
      coupon_redemptions: {
        Row: {
          id: string;
          mall_id: string;
          coupon_id: string;
          store_id: string;
          redeemed_by: string;
          redeemed_at: string;
        };
      };
      events: {
        Row: {
          id: string;
          mall_id: string;
          store_id: string | null;
          title: string;
          description: string | null;
          image_url: string | null;
          starts_at: string;
          ends_at: string;
          status: 'draft' | 'published';
          created_at: string;
          updated_at: string;
        };
      };
      analytics_events: {
        Row: {
          id: number;
          mall_id: string;
          user_id: string | null;
          session_id: string | null;
          event_type: string;
          entity_type: string | null;
          entity_id: string | null;
          properties: Json;
          occurred_at: string;
        };
      };
    };
    Functions: {
      activate_coupon: {
        Args: { p_offer_id: string };
        Returns: Json;
      };
      redeem_coupon: {
        Args: { p_code: string };
        Returns: Json;
      };
      track_event: {
        Args: {
          p_mall_id: string;
          p_event_type: string;
          p_entity_type?: string;
          p_entity_id?: string;
          p_session_id?: string;
          p_properties?: Json;
        };
        Returns: void;
      };
    };
  };
}
