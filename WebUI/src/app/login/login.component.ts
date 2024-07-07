import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserForAuthenticationDto } from './models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
  private returnUrl: string = '';
  loginForm: FormGroup;
  errorMessage: string = '';
  showError: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) {
    this.loginForm = new FormGroup({
      userName: new FormControl('userName', [Validators.required]),
      password: new FormControl('password', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  validateControl = (controlName: string) => {
    return this.loginForm.get(controlName)?.invalid && this.loginForm.get(controlName)?.touched;
  }

  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.get(controlName)?.hasError(errorName);
  }

  loginUser = (loginFormValue: any) => {
    this.showError = false;
    const login = { ...loginFormValue };
    const userForAuth: UserForAuthenticationDto = {
      userName: login.userName,
      password: login.password
    };

    this.authService.loginUser('api/Account/Login', userForAuth)
      .subscribe({
        next: (response: string) => {
          console.log('res', response);
          localStorage.setItem('token', response);
          this.router.navigate([this.returnUrl]);
        },
        error: (err: HttpErrorResponse) => {
          console.log('err', err);
          this.errorMessage = err.error;
          this.showError = true;
        }
      });
  }
}
