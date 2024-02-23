import { Component, OnInit, inject, signal} from '@angular/core';

import { TableComponent, HeaderComponent, FooterComponent } from '../../entities';
import { SpinnerComponent } from 'src/app/shared';
import { SpinnerService, UsersService } from 'src/app/core';

@Component({
  selector: 'app-table-widget',
  standalone: true,
  imports: [TableComponent, HeaderComponent, FooterComponent, SpinnerComponent],
  templateUrl: './table-widget.component.html',
  styleUrl: './table-widget.component.css'
})
export class TableWidgetComponent implements OnInit {
  spinnerService:SpinnerService = inject(SpinnerService)
  usersService: UsersService = inject(UsersService)
  firstLoad = signal<boolean>(true)

  ngOnInit() {
    this.spinnerService.showWithTimeout(2000)
    this.firstLoad.set(false)
  }

  ngOnDestroy() {
    this.spinnerService.clearTimeout()
  }
}
