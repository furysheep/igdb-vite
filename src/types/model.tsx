export enum AgeRatingsCategory {
  ESRB = 1,
  PEGI,
  CERO,
  USK,
  GRAC,
  CLASS_IND,
  ACB,
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
  type: 'screenshot'
}

export type Video = {
  id: number
  game: number
  name: string
  video_id: string
  type: 'video'
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

export type Genre = {
  id: number
  created_at: number
  name: string
  slug: string
  updated_at: number
  url: string
  checksum: string
}

export type Theme = {
  id: number
  name: string
  slug: string
}

export type PlayerPerspective = {
  id: number
  name: string
  slug: string
}

export type Website = {
  id: number
  category: number
  url: string
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
  first_release_date: number
  involved_companies: InvolvedCompany[]
  genres: Genre[]
  name: string
  player_perspectives: PlayerPerspective[]
  screenshots: Screenshot[]
  slug: string
  status: number
  summary: string
  storyline: string
  themes: Theme[]
  total_rating: number
  total_rating_count: number
  url: string
  videos: Video[]
  websites: Website[]
}

export type Company = {
  id: number
  country: number
  description: string
  developed: number[]
  logo: number
  name: string
  published: number[]
  slug: string
  start_date: number
  start_date_category: number
  websites: number[]
}

export type InvolvedCompany = {
  company: Company
  developer: boolean
  porting: boolean
  publisher: boolean
  supporting: boolean
}
