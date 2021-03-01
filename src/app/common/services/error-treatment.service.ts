import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../components/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorTreatmentService {
  subs: Subscription;
  errorClass = 'danger';
  warningClass = 'warning';
  constructor(private toastService: ToastService) {}

  public notify(error: HttpErrorResponse): void {
    const response: any = error;
    let errorMessages = '';
    switch (error.status) {
      case 0:
        // not connection with server!
        this.toastService.alert(
          'Espere um pouco e verifique se sua conexão está funcionano corretamente.',
          'O servidor não está respondendo!'
        );
        break;
      case 401:
        // not authenticated!
        errorMessages = response.error.error || 'Você não está logado.';
        this.toastService.alert('Não autenticado!', errorMessages);
        break;
      case 403:
        // not authenticated!
        this.toastService.alert('Não permitido!', error.error.message);
        break;
      case 422:
        // Unprocessable Entity
        // se sao erros do validate do laravel
        if (response.error.errors) {
          const errors = response.error.errors;
          for (const field in errors) {
            if (errors.hasOwnProperty(field)) {
              for (const errorMsg of errors[field]) {
                errorMessages += '-  ' + errorMsg + '<br>';
              }
            }
          }
        } else if (response.error) {
          // se è erro customizado
          errorMessages += '-  ' + response.error + '<br>';
        }
        this.toastService.alert(errorMessages, 'Atenção!');
        break;
      case 400:
        // bad request
        this.toastService.alert(
          'Os dados enviados, estão incorretos.',
          'Ooops!'
        );
        break;
      case 404:
        // NOT FOUND
        this.toastService.alert(
          'Não foi encontrado ou não existe mais.',
          'Ooops!'
        );
        break;
      case 408:
        // TIMEOUT
        this.toastService.alert('Tempo de requisição esgotou.', 'Ooops!');
        break;
      case 429:
        // TOO MANY ATTEMPS
        this.toastService.alert(
          'Muitas tentativas enviadas. Espere um pouco.',
          'Ooops!'
        );
        break;
      case 500:
        // server error!
        this.toastService.alert(
          'Erro interno do servidor. Tente mais tarde.',
          'Ooops!'
        );
        break;
      default:
        this.toastService.alert('Houve um erro inesperado.', 'Ooops!');
        break;
    }
  }
}
