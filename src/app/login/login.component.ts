import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service.js';

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
  constructor(private router: Router, private authService: AuthService) {}

  isFieldEmpty(fieldName: string): boolean {
    return (this as any)[fieldName].length === 0;
  }

  onSubmit(): void {
    if (this.isLoginVisible) {
      this.authService.login(this.email, this.password).subscribe({
        next: (response: any) => {
          console.log(response);
          this.router.navigate(['/create-routine']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        },
      });
    } else {
    }
  }
}
