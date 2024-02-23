import { Component, input, inject } from '@angular/core';
import { ITableColumn } from 'src/app/core/models';

import { TableConfigService } from 'src/app/core';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.css'
})
export class ToggleComponent {
  tableConfigService:TableConfigService = inject(TableConfigService)
  column = input<ITableColumn>()

  toggleVisibility(column: ITableColumn) {
    this.tableConfigService.toggleColumns(column)
  }
}
