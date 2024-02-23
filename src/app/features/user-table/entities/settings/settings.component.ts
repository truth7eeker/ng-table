import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

import { ToggleComponent } from '../toggle/toggle.component';
import { TableConfigService } from 'src/app/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, ToggleComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  tableConfigService:TableConfigService = inject(TableConfigService)
  faGear = faGear
  showPopup = signal<boolean>(false)

  togglePopup() {
    this.showPopup.set(!this.showPopup())
  }
}
