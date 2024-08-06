import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = ''; // 
  password: string = ''; 

  isEmailEmpty(): boolean {
    return this.email.length === 0;
  }
  isPasswordEmpty(): boolean {
    return this.password.length === 0;
  }


}
