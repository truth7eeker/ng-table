import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, debounceTime, timer } from 'rxjs';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { UsersService, SpinnerService, TableConfigService } from 'src/app/core';
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
  tableConfigService: TableConfigService = inject(TableConfigService)

  valueChanged: Subject<string> = new Subject()
 
  ngOnInit() {
    this.valueChanged.pipe(debounceTime(1000)).subscribe(val => {
      
      const timer$ = timer(500)
      this.spinnerService.show()

      timer$.subscribe(() => {
        this.spinnerService.hide()
        this.usersService.filter(val);
      })
      
    })
  }

  ngOnDestroy(): void {
    this.valueChanged.unsubscribe()
  }

  keyUp(val: string) {
    this.valueChanged.next(val)

  }
}
