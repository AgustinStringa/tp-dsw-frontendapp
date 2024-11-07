import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { SimpleChanges } from '@angular/core';
import Client from '../../../core/classes/client.js';
import { IMembership } from '../../../core/interfaces/membership.interface.js';

class ClientForRoutine extends Client {
  public selected: boolean;
  constructor(
    id: string,
    lastName: string,
    firstName: string,
    dni: string,
    email: string,
    currentMembership: IMembership
  ) {
    super(id, lastName, firstName, dni, email, currentMembership);
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
  @Input() clientList: Client[] = [];
  @Output() clientChange = new EventEmitter<Client | null>();
  clientForRoutineList: ClientForRoutine[] = [];
  selectedClient: WritableSignal<ClientForRoutine | null> = signal(null);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientList']) {
      this.clientForRoutineList = [];
      this.clientList.forEach((c) => {
        const newClient = new ClientForRoutine(
          c.id,
          c.lastName,
          c.firstName,
          c.dni,
          c.email,
          c.currentMembership
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
        c.currentMembership
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
