import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMembership } from '../../../core/interfaces/membership.interface.js';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-membership-filter',
  standalone: true,
  imports: [MatSlideToggleModule, FormsModule],
  templateUrl: './membership-filter.component.html',
  styleUrls: ['./membership-filter.component.css'],
})
export class MembershipFilterComponent {
  @Output() filterMemberships = new EventEmitter<IMembership[]>();
  @Input() memberships: IMembership[] | null = [];
  private filteredMemberships: IMembership[] = [];
  public showPayPending = false;
  public searchValue = '';

  clearFilters() {
    if (this.memberships) {
      this.searchValue = '';
      this.showPayPending = false;
      const defaultMemberships = [...this.memberships];
      this.filterMemberships.emit(defaultMemberships);
    }
  }

  applySearchFilter() {
    if (this.memberships) {
      this.filteredMemberships = this.memberships.filter(
        (m) =>
          m.client.firstName.includes(this.searchValue) ||
          m.client.lastName.includes(this.searchValue)
      );
    }
  }

  applyToggleFilter() {
    if (!this.memberships) return;
    if (this.showPayPending) {
      this.filteredMemberships = this.filteredMemberships.filter(
        (m) => m.debt && m.debt > 0
      );
    } else {
      this.filteredMemberships = this.filteredMemberships.filter(
        (m) => !m.debt || m.debt == 0
      );
    }
  }

  applyFilters() {
    this.applySearchFilter();
    this.applyToggleFilter();
    this.filterMemberships.emit(this.filteredMemberships);
  }
}
