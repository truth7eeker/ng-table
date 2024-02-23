import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { UsersService, SpinnerService } from 'src/app/core';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SettingsComponent, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  usersService: UsersService = inject(UsersService)
  spinnerService: SpinnerService = inject(SpinnerService)
  valueChanged: Subject<string> = new Subject()

  ngOnInit() {
    this.valueChanged.pipe(debounceTime(500)).subscribe(val => {
      this.spinnerService.showWithTimeout(500)
      this.usersService.filter(val)
    })
  }

  ngOnDestroy(): void {
    this.spinnerService.clearTimeout()
  }
  
  keyUp(val: string) {
    this.valueChanged.next(val)
  }
}
