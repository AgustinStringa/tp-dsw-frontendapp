import { Component } from '@angular/core';
import {
  RouterLink,
  ActivatedRoute,
  Router,
  NavigationEnd,
} from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { NgClass, NgIf } from '@angular/common';
import { filter } from 'rxjs';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MdbCollapseModule, RouterLink, NgClass, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private currentRoute: string = '';
  isDropdownOpen = false;
  constructor(private router: Router) {}

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
}
