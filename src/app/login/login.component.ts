import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = ''; //
  password: string = '';
  isLoginVisible: boolean = true;

  isEmailEmpty(): boolean {
    return this.email.length === 0;
  }

  isPasswordEmpty(): boolean {
    return this.password.length === 0;
  }
}
