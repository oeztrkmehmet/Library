import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserForAuthenticationDto } from './models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs';
declare var alertify:any;

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasNumber = /[0-9]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const minLength = value.length >= 4;

    const passwordValid = hasNumber && hasUpperCase && minLength;

    return !passwordValid ? { passwordStrength: true } : null;
  };
}
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
  formRegister: FormGroup;
  errorMessage: string = '';
  showError: boolean = false;
  isRegister: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute,private fb: FormBuilder) {
    this.loginForm = new FormGroup({
      userName: new FormControl('userName', [Validators.required]),
      password: new FormControl('password', [Validators.required])
    });
    this.formRegister = this.fb.group({
      userNameRegister: [null, [Validators.required, Validators.email]],
      passwordRegister: [null, [Validators.required,passwordValidator()]],
      nameSurname: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
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
          localStorage.setItem('token', response);
          this.router.navigate([this.returnUrl]);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error;
          this.showError = true;
        }
      });
  }
  openRegister(){
    this.formRegister.reset();
    this.isRegister=true;
  }
  CloseRegister(){
    this.formRegister.reset();
    this.isRegister=false;
  }


  registerUser() {
    if (this.formRegister.valid) {
     
      this.authService.registerUser({
        userName: this.formRegister.value.userNameRegister,
        password: this.formRegister.value.passwordRegister, 
        nameSurname: this.formRegister.value.nameSurname,
        phoneNumber: this.formRegister.value.phoneNumber
      }).pipe(first()).subscribe(
        (response) => {
          
          alertify.set('notifier', 'position', 'top-right');
          alertify.success('User Registered');
          this.CloseRegister();
          this.formRegister.reset();
          // this.loginForm.reset();
        },
        (error) => {
          alertify.set('notifier', 'position', 'top-right');
          alertify.error('User Could Not Be Registered');
          this.CloseRegister();
          this.formRegister.reset();
          // this.loginForm.reset();
        }
      );
    } else {
      window.alert('Zorunlu Alanları Giriniz.');
    }
  }
  
}
