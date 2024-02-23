import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@core/constants/api.const';
import { environment } from '@env/environment';
import { RecomendationUpdateRequest, RecomendationUpdateResponse } from '@pages/recommendations/interfaces/recommendation-update.interface';
import { RecommendationUser } from '@pages/recommendations/interfaces/recommendation-user.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecommendationsApiService {

  constructor(
    private http: HttpClient
  ) { }

  getNewRecommendations(amount = 10): Observable<RecommendationUser[]> {
    const params = new HttpParams().append("number_of_recommendations", amount);
    return this.http.get<RecommendationUser[]>(`${environment.httpBackendPython}${API.RECOMMENDATIONS_GET.replace(':summoner_name', 'Alokin1112')}`, { params });
  }

  setRecommendation(recommendation: RecomendationUpdateRequest): Observable<RecomendationUpdateResponse> {
    return this.http.post<RecomendationUpdateResponse>(`${environment.httpBackendPython}${API.RECOMMENDATIONS_UPDATE.replace(':summoner_name', 'Alokin1112')}`, recommendation);
  }

}
