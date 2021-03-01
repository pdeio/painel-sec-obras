import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/common/components/toast/toast.service';
import { AppConfig } from 'src/app/common/config/app.config';
import { BasicRoutes } from 'src/app/common/config/routes.config';
import { AuthService } from '../auth.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../auth-layout.scss'],
  providers: [LoginService]
})
export class SignInComponent implements OnDestroy{
  config = AppConfig;
  routes = BasicRoutes;
  subs: Subscription;
  form: FormGroup = this.fb.group({
    email: ['teste@gmail.com', [Validators.required, Validators.email]],
    password: ['bitmorocks', [Validators.required, Validators.minLength(6)]],
    remember: [true, Validators.required],
  });

  loading = false;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private toast: ToastService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.loading = true;
    this.subs = this.loginService.getCSRF().subscribe(() => {
      this.loading = false;
      this.login();
    });
  }

  login(): void {
    this.toast.warning('conferindo suas credenciais..');
    this.subs = this.loginService
      .login(
        this.form.get('email').value,
        this.form.get('password').value,
        this.form.get('remember').value
      )
      .subscribe(
        (resp: boolean) => {
          this.loading = false;
          if (resp) {
            this.toast.success('perfeito, está liberado!');
            this.authService.login();
            this.router.navigateByUrl(this.authService.redirectUrl);
          } else {
            this.toast.alert('OPS! seu email ou senha está errado.');
          }
        },
        (resp: HttpErrorResponse) => {
          if (resp.status === 401 && resp.error.id) {
            // então é problema de verificação de email
            // mostro link para reenviar email
            /* this.userId = resp.error.id;
            this.showResendLink = true;
            this.alertClass = 'alert-danger';
            this.message = resp.error.error; */
          } else {
            // this.showPopup = false;
          }
        }
      );
  }

  ngOnDestroy(){
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
