import { Injectable, signal, inject } from '@angular/core';

import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  spinnerService: NgxSpinnerService = inject(NgxSpinnerService)
  loading = signal<boolean>(false)

  show() {
    this.spinnerService.show();
    this.loading.set(true)
  }

  hide() {
    this.spinnerService.hide();
    this.loading.set(false)
  }
}
