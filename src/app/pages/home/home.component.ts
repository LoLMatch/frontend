import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { RoutesPath } from '@core/constants/routes.const';
import { KeyStorage } from '@core/enums/key-storage.enum';
import { AuthService } from '@core/services/auth/auth.service';
import { LocalStorageService } from '@core/services/localStorage/local-storage.service';
import { LayoutComponent } from '@layout/layout.component';
import { Store } from '@ngxs/store';
import { ChatService } from '@pages/messages/services/chat.service';
import { LoadContacts } from '@pages/messages/store/contacts.actions';
import { Observable, Subject, combineLatest, filter, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'ds-home',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private store: Store,
    private chatService: ChatService
  ) { }

  sth$: Observable<any>;
  private onDestroy$ = new Subject<void>();

  ngOnInit(): void {
    combineLatest([this.authService.loadProfile(), this.authService.getToken()]).pipe(
      tap(([user, token])=> {
        this.localStorageService.setItem(KeyStorage.UserId, user?.id);
        this.localStorageService.setItem(KeyStorage.TOKEN, token);

        this.chatService.setMyId(user?.id);
        this.chatService.init(token);

        this.store.dispatch(new LoadContacts(user.id));
      }),
      takeUntil(this.onDestroy$),
    ).subscribe();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd && !(event as NavigationEnd).url.includes(RoutesPath.MESSAGES)),
      takeUntil(this.onDestroy$),
    ).subscribe(() => {
      this.chatService.setActiveContactId(null);        // Nie wiem czy to wystarczy, żeby zerować aktywny kontakt,
    });                                                 // czy nie będzie przypadków kiedy to nie zadziała ??
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
