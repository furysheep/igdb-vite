export enum AgeRatingsCategory {
  ESRB = 1,
  PEGI = 2,
  CERO = 3,
  USK = 4,
  GRAC = 5,
  CLASS_IND = 6,
  ACB = 7,
}

export enum AgeRatingsRating {
  Three = 1,
  Seven,
  Twelve,
  Sixteen,
  Eighteen,
  RP,
  EC,
  E,
  E10,
  T,
  M,
  AO,
  CERO_A,
  CERO_B,
  CERO_C,
  CERO_D,
  CERO_Z,
  USK_0,
  USK_6,
  USK_12,
  USK_18,
  GRAC_ALL,
  GRAC_Twelve,
  GRAC_Fifteen,
  GRAC_Eighteen,
  GRAC_TESTING,
  CLASS_IND_L,
  CLASS_IND_Ten,
  CLASS_IND_Twelve,
  CLASS_IND_Fourteen,
  CLASS_IND_Sixteen,
  CLASS_IND_Eighteen,
  ACB_G,
  ACB_PG,
  ACB_M,
  ACB_MA15,
  ACB_R18,
  ACB_RC,
}

export type AgeRating = {
  id: number
  category: AgeRatingsCategory
  rating: number
}

export type Screenshot = {
  id: number
  game: number
  height: number
  width: number
  url: string
  image_id: string
}

export type Cover = {
  id: number
  alpha_channel: boolean
  animated: boolean
  game: number
  height: number
  width: number
  url: string
  image_id: string
}

export type Video = {
  id: number
  game: number
  name: string
  video_id: string
}

export type Game = {
  id: number
  age_ratings: AgeRating[]
  aggregated_rating: number
  aggregated_rating_count: number
  alternative_names: number[]
  bundles: number[]
  category: number
  collection: number
  cover: Cover
  external_games: number[]
  name: string
  screenshots: Screenshot[]
  slug: string
  status: number
  summary: string
  url: string
  videos: Video[]
}
