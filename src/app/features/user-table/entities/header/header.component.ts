import { Component, OnInit, inject } from '@angular/core';
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
export class HeaderComponent implements OnInit {
  usersService: UsersService = inject(UsersService)
  spinnerService: SpinnerService = inject(SpinnerService)
  valueChanged: Subject<string> = new Subject()

  ngOnInit() {
    this.valueChanged.pipe(debounceTime(1000)).subscribe(val => {
      this.spinnerService.showWithTimeout(1000)
      this.usersService.filter(val)
    })
  }

  keyUp(val: string) {
    this.valueChanged.next(val)
  }
}
