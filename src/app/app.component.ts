import { Component } from '@angular/core';

import { TableWidgetComponent } from './features/user-table/widgets';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [TableWidgetComponent]
})
export class AppComponent {
}
