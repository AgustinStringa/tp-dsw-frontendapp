import { AuthService } from '../../../core/services/auth.service';
import { ClientHomeComponent } from '../client-home/client-home.component';
import { Component } from '@angular/core';
import { IClientHomeInformation } from '../../../core/services/home.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ClientHomeComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public userSignal = this.authService.userSignal;
  public homeInformation: IClientHomeInformation | undefined;
  public formatedDateTo: string | null = null;

  constructor(private authService: AuthService) {}
}
