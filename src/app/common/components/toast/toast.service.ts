import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = [];

  /**
   * show toast modal

   */
  show(textOrTpl: any, options: any = { classname: 'danger' }): void {
    this.toasts.push({ textOrTpl, ...options });
  }

  /**
   * show simple success message
   * @param message String
   */
  success(message = '', title = '', toastToRemove?: Toast): Toast {
    if (toastToRemove) {
      this.remove(toastToRemove);
    }
    const toast: Toast = this.create(title, message, 'success');
    this.fire(toast);
    return toast;
  }
  /**
   * show simple warning message
   * @param message String
   */
  warning(message = '', title = '', toastToRemove?: Toast): Toast {
    if (toastToRemove) {
      this.remove(toastToRemove);
    }
    const toast: Toast = this.create(title, message, 'warning');
    this.fire(toast);
    return toast;
  }


  alert(message = '', title = '', toastToRemove?: Toast): Toast {
    if (toastToRemove) {
      this.remove(toastToRemove);
    }
    const toast: Toast = this.create(title, message, 'danger');
    this.fire(toast);
    return toast;
  }

  create(titleS = '', msgS = '', type = ''): Toast {
    const toast: Toast = {
      toast: {
        title : titleS,
        msg: msgS
      },
      options: {
        classname: type,
      }
    };
    return toast;
  }


  remove(toast: Toast): void {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  fire(toast: Toast): Toast {
    this.toasts.push(toast);
    return toast;
  }
}

interface ToastMsg {
  title: string;
  msg: string;
}

interface ToastOptions {
  classname: string;
}
export interface Toast {
  toast: ToastMsg;
  options: ToastOptions;
}
