export interface RecomendationUpdateRequest {
  recommendation: string,
  status: RecommendationStatus,
}

export type RecommendationStatus = 'accept' | 'reject';

export interface RecomendationUpdateResponse {
  message: string,
}