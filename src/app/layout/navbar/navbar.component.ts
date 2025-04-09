import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { filter } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MdbCollapseDirective } from 'mdb-angular-ui-kit/collapse';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { NgClass } from '@angular/common';
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
export class NavbarComponent implements OnInit {
  private currentRoute = '';
  public userSignal = this.authService.userSignal;

  @ViewChild('togglerFirstExample') togglerFirstExample!: MdbCollapseDirective;

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

  closeNavbar() {
    if (
      this.togglerFirstExample &&
      this.togglerFirstExample.collapsed === false
    ) {
      this.togglerFirstExample.toggle();
    }
  }

  async logout() {
    this.closeNavbar();
    if (await this.authService.logout()) this.router.navigate(['/']);
  }
}
