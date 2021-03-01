import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ SignInComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SignInComponent,
      }
    ]),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SignInModule { }
