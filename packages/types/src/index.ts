export * from './database.types';

export type Mall = Database['public']['Tables']['malls']['Row'];
export type Store = Database['public']['Tables']['stores']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Offer = Database['public']['Tables']['offers']['Row'];
export type Coupon = Database['public']['Tables']['coupons']['Row'];
export type CouponRedemption = Database['public']['Tables']['coupon_redemptions']['Row'];
export type Event = Database['public']['Tables']['events']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Membership = Database['public']['Tables']['memberships']['Row'];
export type Product = Database['public']['Tables']['products']['Row'];
export type Contest = Database['public']['Tables']['contests']['Row'];
export type ConciergeNotification = Database['public']['Tables']['concierge_notifications']['Row'];
export type AuditLog = Database['public']['Tables']['audit_log']['Row'];
export type Invitation = Database['public']['Tables']['invitations']['Row'];
export type MallSettings = Database['public']['Tables']['mall_settings']['Row'];

export interface ProductColorVariant {
  name: string;
  hex?: string;
  image_url?: string | null;
  images: string[];
}

export interface ActivatedCouponResult {
  coupon_id: string;
  code: string;
  expires_at: string;
  offer_id: string;
  mall_id: string;
}

export interface RedeemedCouponResult {
  coupon_id: string;
  offer_title: string;
  benefit_label: string;
  store_name: string;
  redeemed_at: string;
}

export interface CommunityContact {
  id: string;
  user_id: string;
  contact_user_id: string;
  nickname: string;
  relation: 'family' | 'friend' | 'partner' | 'child';
  status: 'pending' | 'accepted' | 'blocked';
  visible_to_contact: boolean;
  created_at: string;
}

export interface CommunityInvite {
  id: string;
  from_user_id: string;
  code: string;
  expires_at: string;
  accepted_by?: string | null;
  accepted_at?: string | null;
  created_at: string;
}

export interface CommunityLocation {
  user_id: string;
  mall_id: string;
  floor_id: string;
  zone_store_id?: string | null;
  zone_name: string;
  is_in_mall: boolean;
  is_kids_mode_active: boolean;
  kids_mode_challenge?: string | null;
  is_sharing: boolean;
  updated_at: string;
}

export interface CommunityTier {
  user_id: string;
  tier: 'free' | 'premium';
  max_contacts: number;
  updated_at: string;
}

export interface CommunityMemberWithLocation extends CommunityContact {
  location?: CommunityLocation | null;
  avatar_color?: string;
  monogram?: string;
  minutes_ago?: number;
}

import type { Database } from './database.types';
