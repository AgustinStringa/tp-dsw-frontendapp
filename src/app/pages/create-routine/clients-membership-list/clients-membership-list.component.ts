import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import Client from '../../../core/classes/client';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { FormsModule } from '@angular/forms';
import { IMembership } from '../../../core/interfaces/membership.interface';
import { SimpleChanges } from '@angular/core';

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
  imports: [FormsModule],
  templateUrl: './clients-membership-list.component.html',
  styleUrl: './clients-membership-list.component.css',
})
export class ClientsMembershipListComponent implements OnChanges {
  @Input() clientList: Client[] = [];
  @Output() clientChange = new EventEmitter<Client | null>();
  clientForRoutineList: ClientForRoutine[] = [];
  filteredClients: ClientForRoutine[] = [];
  selectedClient: WritableSignal<ClientForRoutine | null> = signal(null);
  searchTerm = '';

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
      this.filteredClients = [...this.clientForRoutineList];
    }
  }
  filterClients(): void {
    if (!this.searchTerm) {
      this.filteredClients = [...this.clientForRoutineList];
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();

    this.filteredClients = this.clientForRoutineList.filter((client) => {
      const fullName = `${client.firstName.toLowerCase()} ${client.lastName.toLowerCase()}`;
      const reverseName = `${client.lastName.toLowerCase()} ${client.firstName.toLowerCase()}`;

      return fullName.includes(term) || reverseName.includes(term);
    });
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

  formatDate(dateFrom: Date): string {
    return format(dateFrom, 'dd/MM/yyyy', { locale: es });
  }
}
