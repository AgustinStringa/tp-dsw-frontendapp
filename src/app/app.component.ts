import { Component, effect } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { ChatWindowComponent } from './pages/chat/chat-window/chat-window.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    FooterComponent,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    NavbarComponent,
    ChatWindowComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app-gimnasio';
  showChat = false;

  constructor(private authService: AuthService) {
    this.updateChatVisibility();

    effect(() => {
      this.updateChatVisibility();
    });
  }

  private updateChatVisibility(): void {
    const user = this.authService.userSignal();

    if (user !== null) this.showChat = true;
    else this.showChat = false;
  }
}
