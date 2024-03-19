import { RecommendationStatus } from "@pages/recommendations/interfaces/recommendation-update.interface";

export class GetRecommendations {
  static readonly type = '[Recommendations] Get recommendations';
}

export class SetRecommendation {
  static readonly type = '[Recommendations] Set recommendation';
  constructor(public recommendationStatus: RecommendationStatus) { }
}