import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'ds-dashboard',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  username: string;

  constructor(
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    void this.authService.loadProfile().then((user) => {
      this.username = user.username;
      this.changeDetectorRef.detectChanges();
    });
  }


}
