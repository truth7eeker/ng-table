import { Component, inject } from '@angular/core';

import { NgxSpinnerService, NgxSpinnerModule } from "ngx-spinner";

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [NgxSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  spinnerService: NgxSpinnerService = inject(NgxSpinnerService)
 
}
