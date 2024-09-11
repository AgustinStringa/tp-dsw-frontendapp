import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import ClientClass from '../../core/interfaces/client.js';
import Client from '../../core/interfaces/client.js';
import { NgClass } from '@angular/common';
import { SimpleChanges } from '@angular/core';
import CurrentMembership from '../../core/interfaces/currentMembership.interface.js';
class ClientForRoutine extends Client {
  public selected: boolean;
  constructor(
    id: string,
    lastName: string,
    firstName: string,
    dni: string,
    email: string,
    memberships: CurrentMembership[]
  ) {
    super(id, lastName, firstName, dni, email, memberships);
    this.selected = false;
  }
}
@Component({
  selector: 'app-clients-membership-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './clients-membership-list.component.html',
  styleUrl: './clients-membership-list.component.css',
})
export class ClientsMembershipListComponent implements OnChanges {
  @Input() clientList: ClientClass[] = [];
  @Output() clientChange = new EventEmitter<Client | null>();
  clientForRoutineList: ClientForRoutine[] = [];
  selectedClient: WritableSignal<ClientForRoutine | null> = signal(null);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientList']) {
      this.clientList.forEach((c) => {
        const newClient = new ClientForRoutine(
          c.id,
          c.lastName,
          c.firstName,
          c.dni,
          c.email,
          c.memberships
        );
        this.clientForRoutineList.push(newClient);
      });
    }
  }
  toggleSelected(c: ClientForRoutine) {
    if (this.selectedClient() == null || !c.selected) {
      this.clientForRoutineList.forEach((c) => (c.selected = false));
      this.selectedClient.set(c);
      c.selected = true;
      const clientToEmit = new Client(
        c.id,
        c.lastName,
        c.firstName,
        c.dni,
        c.email,
        c.memberships
      );
      this.clientChange.emit(clientToEmit);
      return;
    } else if (c.selected) {
      c.selected = false;
      this.selectedClient.set(null);
      this.clientChange.emit(null);
      return;
    }
  }
}
