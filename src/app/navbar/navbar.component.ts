import { Component } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { NgClass } from '@angular/common';
import { filter } from 'rxjs';
import { AuthService } from '../services/auth.service.js';
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
  public userSignal = this.authService.userSignal;
  isDropdownOpen = false;

  constructor(private router: Router, public authService: AuthService) {
    this.authService.getUser();
    if (this.userSignal() === null) {
      this.router.navigate(['/']);
    }
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

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  async logout() {
    if (await this.authService.logout()) this.router.navigate(['/']);
  }
}
