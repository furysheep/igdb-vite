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

export type MultiplayerMode = {
  campaigncoop: boolean
  dropin: boolean
  lancoop: boolean
  offlinecoop: boolean
  offlinecoopmax: number
  onlinecoop: boolean
  onlinecoopmax: number
  onlinemax: number
  offlinemax: number
  platform: number
  splitscreen: boolean
  splitscreenonline: boolean
}

export type GameMode = {
  id: number
  name: string
  slug: string
}

export type Collection = {
  games: number[]
  name: string
  slug: string
}

export type Franchise = {
  games: number[]
  name: string
  slug: string
}

export type GameEngine = {
  id: number
  name: string
  slug: string
}

export type Platform = {
  abbreviation: string
  alternative_name: string
  category: number
  generation: number
  name: string
  platform_family: number
  platform_logo: number
  slug: string
}

export type Game = {
  id: number
  age_ratings: AgeRating[]
  aggregated_rating: number
  aggregated_rating_count: number
  alternative_names: number[]
  bundles: number[]
  category: number
  collection: Collection
  cover: Cover
  external_games: number[]
  first_release_date: number
  franchises: Franchise[]
  involved_companies: InvolvedCompany[]
  game_modes: GameMode[]
  game_engines: GameEngine[]
  genres: Genre[]
  name: string
  multiplayer_modes: MultiplayerMode[]
  player_perspectives: PlayerPerspective[]
  platforms: Platform[]
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
  similar_games: Game[]
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
