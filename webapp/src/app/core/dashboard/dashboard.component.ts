import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  constructor(private authService: AuthService) { }

  onLogout(): void {
    this.authService.logout();
  }

}
