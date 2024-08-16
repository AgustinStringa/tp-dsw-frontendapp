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
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  user: string = '';

  isLoginVisible: boolean = true;

  isFieldEmpty(fieldName: string): boolean {
    return (this as any)[fieldName].length === 0;
  }
}
