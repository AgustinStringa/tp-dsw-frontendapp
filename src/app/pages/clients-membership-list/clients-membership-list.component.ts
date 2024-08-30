import { Component, Input } from '@angular/core';
import UserClass from '../../core/interfaces/client.js';

@Component({
  selector: 'app-clients-membership-list',
  standalone: true,
  imports: [],
  templateUrl: './clients-membership-list.component.html',
  styleUrl: './clients-membership-list.component.css',
})
export class ClientsMembershipListComponent {
  @Input() clientList: UserClass[] = [];
}
