export interface RecommendationUser {
  age: number;
  country: string;
  languages: string[];
  level: number;
  losses: number;
  name: string;
  preferred_champions_and_lines: PreferedChampions;
  rank: Rank;
  sex: Sex;
  tier: Tier;
  wins: number;
}

export type PreferedChampions = Record<string, Lane>;
export type Lane = "Top Lane" | "Jungle" | "Mid Lane" | "Bot Lane" | "Support";
export type Rank = "I" | "II" | "III" | "IV";
export type Tier = "IRON" | "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "EMERALD" | "DIAMOND" | "MASTER" | "GRANDMASTER" | "CHALLENGER";
export type Sex = "M" | "W";