import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/shared/auth.service';
import { User } from '../../users/shared/user.model';

interface Link {
  route: string;
  icon: string;
  title: string;
  subtitle: string;
}

const LINKS: Link[] = [
  {
    route: 'dashboard',
    icon: 'dashboard',
    title: 'Dashboard',
    subtitle: 'Activity summary'
  },
  {
    route: 'courses',
    icon: 'school',
    title: 'Courses',
    subtitle: 'Courses you teach'
  },
  {
    route: 'files',
    icon: 'folder',
    title: 'Files',
    subtitle: 'Your stored files'
  }
];

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  @ViewChild('drawer') drawerRef?: ElementRef<MatSidenav>;

  links = LINKS;
  visible = true;
  subscription?: Subscription;
  isHandset$?: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) { }

  get user(): User {
    return this.authService.user!;
  }

  ngOnInit(): void {
    this.subscription = this.authService.showNavEmitter.subscribe(
      visible => this.visible = visible
    );

    this.isHandset$ = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }

  toggleDrawer(): void {
    this.drawerRef?.nativeElement.toggle();
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
