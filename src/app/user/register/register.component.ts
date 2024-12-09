import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { routes } from '../../app.routes';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  formData!: FormGroup;
  constructor(private userService: UserService, private router: Router) {
    this.formData = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9]+@gmail\.com$/),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.maxLength(6),
        ]),
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  // password and confirm passwornd match validator
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password &&
      confirmPassword &&
      password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  }

  register() {
    console.log('register form is working');
    if (this.formData.valid) {
      this.userService.registerUser(this.formData.value).subscribe({
        next: (res) => {
          console.log('api res',res);
          
          if (res.err) {
            alert(res.message);
          } else if (res.message === 'user saved successfully') {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          alert('Registration failed. Please try again later.');
          console.error(err); // Log error for debugging
        },
      });
    } else {
      this.formData.markAllAsTouched();
    }
  }
}
