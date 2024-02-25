import { Component, inject, effect, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import { TableConfigService, UsersService } from 'src/app/core';
import { ITableColumn } from 'src/app/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  usersService: UsersService = inject(UsersService)
  tableConfigService: TableConfigService = inject(TableConfigService)
 
  faCircle = faCircle

  @ViewChild('userTable') userTable: ElementRef

  constructor() {
    effect(() => {
      const columns = this.tableConfigService.columns().filter(c => c.show)
      this.changeColumnNum(columns.length)
    })
  }

  selectHeader(header: ITableColumn) {
    this.tableConfigService.setSortingOrder(header);
    this.usersService.sort(header)
  }

  changeColumnNum(num: number) {
    this.userTable.nativeElement.style.gridTemplateColumns = `repeat(${num}, minmax(min-content, 1fr))`
  }

  goBack() {
    this.usersService.filter('')
  }

}
