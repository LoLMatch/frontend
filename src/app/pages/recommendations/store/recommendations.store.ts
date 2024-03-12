import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { RecommendationsApiService } from "@pages/recommendations/api/recommendations.api.service";
import { RecomendationUpdateRequest } from "@pages/recommendations/interfaces/recommendation-update.interface";
import { RecommendationUser } from "@pages/recommendations/interfaces/recommendation-user.interface";
import { GetRecommendations, SetRecommendation } from "@pages/recommendations/store/recommendations.actions";
import { of, switchMap, tap } from "rxjs";

export interface RecommendationsStateModel {
  recommendationsUsers: RecommendationUser[];
  actualIndex: number;
  isAlreadyLoadingNextRecommendations: boolean,
}

@State<RecommendationsStateModel>({
  name: 'recommendations',
  defaults: {
    recommendationsUsers: [],
    actualIndex: 0,
    isAlreadyLoadingNextRecommendations: false,
  }
})
@Injectable()
export class RecommendationsState {

  constructor(
    private recommendationsApiService: RecommendationsApiService,
  ) { }

  @Selector()
  static getRecommendationsState(state: RecommendationsStateModel): RecommendationsStateModel {
    return state;
  }
  @Selector()
  static getActualRecommendation(state: RecommendationsStateModel): RecommendationUser {
    return state?.recommendationsUsers[state?.actualIndex] || null;
  }

  @Action(GetRecommendations)
  getRecommendations({ getState, patchState }: StateContext<RecommendationsStateModel>, action: GetRecommendations) {

    if (getState().recommendationsUsers.length - getState().actualIndex < 5) {
      patchState({ isAlreadyLoadingNextRecommendations: true });
      return this.recommendationsApiService.getNewRecommendations(10).pipe(
        tap((recommendationsUsers: RecommendationUser[]) => { patchState({ recommendationsUsers, isAlreadyLoadingNextRecommendations: false }) }),
      );
    }
    return of(null);
  }

  @Action(SetRecommendation)
  loadHistoricalMessages({ getState, patchState }: StateContext<RecommendationsStateModel>, action: SetRecommendation) {
    const { actualIndex, recommendationsUsers, isAlreadyLoadingNextRecommendations } = getState();
    const request: RecomendationUpdateRequest = {
      recommendation: recommendationsUsers[actualIndex]?.name,
      status: action.recommendationStatus,
    };
    return this.recommendationsApiService.setRecommendation(request).pipe(
      tap(() => patchState({ actualIndex: actualIndex + 1 })),
      switchMap(() => {
        if (recommendationsUsers?.length - actualIndex < 5 && !isAlreadyLoadingNextRecommendations) {
          patchState({ isAlreadyLoadingNextRecommendations: true });
          return this.recommendationsApiService.getNewRecommendations(10).pipe(
            tap((res) => patchState({ recommendationsUsers: [...recommendationsUsers, ...res], isAlreadyLoadingNextRecommendations: false }))
          );
        } else
          return of(null);
      }
      )
    );
  }

}