import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from './toast.service';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: [],
  host: { '[class.ngb-toasts]': 'true' },
})
export class ToastComponent implements OnInit {
  constructor(public toastService: ToastService) {}

  isTemplate(toast: any): boolean {
    return toast.textOrTpl instanceof TemplateRef;
  }
  ngOnInit(): void {}
}
