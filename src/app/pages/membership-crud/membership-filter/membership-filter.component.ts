import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
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
export class MembershipFilterComponent implements OnChanges {
  @Output() filterMemberships = new EventEmitter<IMembership[]>();
  @Input() memberships: IMembership[] | null = [];
  @Input() outstandingMemberships: IMembership[] | null = [];
  private filteredMemberships: IMembership[] = [];
  public showOnlyPayPending = false;
  public searchValue = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.applyFilters();
  }

  clearFilters() {
    if (this.memberships) {
      this.searchValue = '';
      this.showOnlyPayPending = false;
      const defaultMemberships = [...this.memberships];
      this.filterMemberships.emit(defaultMemberships);
    }
  }

  applySearchFilter() {
    if (
      !this.memberships ||
      !this.outstandingMemberships ||
      !this.filterMemberships
    )
      return;

    this.filteredMemberships = this.filteredMemberships.filter(
      (m) =>
        this.deleteDiacritic(m.client.firstName.toLowerCase())
          .concat(' ')
          .concat(this.deleteDiacritic(m.client.lastName.toLowerCase()))
          .match(this.deleteDiacritic(this.searchValue).toLowerCase()) ||
        this.deleteDiacritic(m.client.lastName.toLowerCase())
          .concat(' ')
          .concat(this.deleteDiacritic(m.client.firstName.toLowerCase()))
          .match(this.deleteDiacritic(this.searchValue).toLowerCase())
    );
  }

  applyToggleFilter() {
    if (!this.memberships || !this.outstandingMemberships) return;
    if (this.showOnlyPayPending) {
      this.filteredMemberships = this.outstandingMemberships;
    } else {
      this.filteredMemberships = this.memberships;
    }
  }

  deleteDiacritic(text: string) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  applyFilters() {
    this.applyToggleFilter();
    this.applySearchFilter();
    this.filterMemberships.emit(this.filteredMemberships);
  }
}
