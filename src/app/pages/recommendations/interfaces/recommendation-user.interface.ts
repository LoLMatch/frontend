export interface RecommendationUser {
  age: number;
  country: string;
  languages: string[];
  level: number;
  losses: number;
  name: string;
  favourite_champion: PreferedChampion,
  favourite_line: Lane,
  preferred_champions_and_lines: PreferedChampion[];
  rank: Rank;
  sex: Sex;
  tier: Tier;
  wins: number;
  long_description: string;
  short_description: string,
}

export interface PreferedChampion {
  champion_id: number,
  champion_name: string,
  line: Lane
}

export type Lane = "Top Lane" | "Jungle" | "Mid Lane" | "Bot Lane" | "Support";
export type Rank = "I" | "II" | "III" | "IV";
export type Tier = "IRON" | "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "EMERALD" | "DIAMOND" | "MASTER" | "GRANDMASTER" | "CHALLENGER";
export type Sex = "M" | "W";