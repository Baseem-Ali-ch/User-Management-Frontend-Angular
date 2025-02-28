import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup,  ReactiveFormsModule,  Validators, } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectError, selectLoading, selectUser } from '../../states/user/user.selector';
import { login, loginSuccess } from '../../states/user/user.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginData: FormGroup

  // emit the current values
  loading$ = this.store.select(selectLoading)
  error$ = this.store.select(selectError)
  user$ = this.store.select(selectUser)
  
  constructor(private userservice: UserService, private router: Router, private store: Store<any>) {

    this.loginData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }
  
  login() {
    if (!this.loginData.valid) {
      return this.loginData.markAllAsTouched()
    }

    this.store.dispatch(login(this.loginData.value))
    this.user$.subscribe((res) => {
      if (res) {
        this.store.dispatch(loginSuccess({
          user: res,
          token: ''
        }))
      }
    });


  }
}
