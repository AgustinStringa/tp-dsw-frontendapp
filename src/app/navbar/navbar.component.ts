import { Component } from '@angular/core';
import {
  RouterLink,
  ActivatedRoute,
  Router,
  NavigationEnd,
} from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { NgClass } from '@angular/common';
import { filter } from 'rxjs';
import { AuthService } from '../services/auth.service.js';
import { IUser } from '../core/interfaces/user.interface.js';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MdbCollapseModule,
    RouterLink,
    NgClass,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private currentRoute: string = '';
  public user: IUser | null = null;
  constructor(private router: Router, private authService: AuthService) {
    this.user = authService.getUser();
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }
}
