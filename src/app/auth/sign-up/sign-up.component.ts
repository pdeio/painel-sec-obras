import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/common/components/toast/toast.service';
import { AppConfig } from 'src/app/common/config/app.config';
import { BasicRoutes } from 'src/app/common/config/routes.config';
import { MustMatch } from 'src/app/common/helpers/mustMatch';
import { HttpService } from 'src/app/common/services/http.service';
import { LoginService } from '../sign-in/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../auth-layout.scss'],
  providers: [LoginService]
})
export class SignUpComponent implements OnDestroy {
  loading = false;
  subs: Subscription;
  config = AppConfig;
  routes = BasicRoutes;
  form: FormGroup = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
      fantasy_name: ['', [Validators.required, Validators.maxLength(40)]],
      base_name: [''],
    },
    {
      validator: MustMatch('password', 'password_confirmation'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private loginService: LoginService,
    private httpService: HttpService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.loading = true;
    this.toast.warning('Criando sua imobiliária...');
    this.subs = this.loginService.getCSRF().subscribe(() => {
      this.create();
    });
  }

  create(): void {
    this.toast.warning('redirecionando para o painel...');
    this.subs = this.httpService
      .post('realtor', this.form.value)
      .subscribe((result: { isLogged: boolean }) => {
        if (result.isLogged) {
          this.toast.success('Tudo pronto, já pode começar!');
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
