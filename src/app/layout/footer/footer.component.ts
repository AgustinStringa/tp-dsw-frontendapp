import { Component, effect } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MdbFormsModule, MdbRippleModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  isClient = true;

  constructor(private authService: AuthService) {
    effect(() => {
      const user = this.authService.userSignal();
      if (user == null) return;
      this.isClient = user.isClient;
    });
  }
}
