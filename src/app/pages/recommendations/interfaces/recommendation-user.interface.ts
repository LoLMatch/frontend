export interface RecommendationUser {
  age: number;
  country: string;
  languages: string[];
  level: number;
  losses: number;
  name: string;
  preferred_champions_and_lines: Record<string, Lane>;
  rank: Rank;
  sex: Sex;
  tier: Tier;
  wins: number;
}

export type Lane = "Top Lane" | "Jungle" | "Mid Lane" | "Bot Lane" | "Support";
export type Rank = "I" | "II" | "III" | "IV";
export type Tier = "IRON" | "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND" | "MASTER" | "GRANDMASTER" | "CHALLENGER";
export type Sex = "M" | "W";