import { Injectable, signal, inject } from '@angular/core';

import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  spinnerService: NgxSpinnerService = inject(NgxSpinnerService)
  loading = signal<boolean>(false)
  timerIds: any[] = []

  show() {
    this.spinnerService.show();
    this.loading.set(true)
  }

  hide() {
    this.spinnerService.hide();
    this.loading.set(false)
  }

  showWithTimeout(timeout: number) {
    this.show();
    const timerId = setTimeout(() => {
      this.hide();
    }, timeout);
    this.timerIds.push(timerId)
  }

  clearTimeout() {
    this.timerIds.forEach(id => clearTimeout(id))
  }

}
