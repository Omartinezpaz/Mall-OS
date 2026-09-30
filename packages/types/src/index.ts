export * from './database.types.ts';

export type Mall = Database['public']['Tables']['malls']['Row'];
export type Store = Database['public']['Tables']['stores']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Offer = Database['public']['Tables']['offers']['Row'];
export type Coupon = Database['public']['Tables']['coupons']['Row'];
export type CouponRedemption = Database['public']['Tables']['coupon_redemptions']['Row'];
export type Event = Database['public']['Tables']['events']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Membership = Database['public']['Tables']['memberships']['Row'];

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

import type { Database } from './database.types.ts';
