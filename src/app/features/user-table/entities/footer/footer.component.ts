import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerService, TableConfigService, UsersService } from 'src/app/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { SpinnerComponent } from 'src/app/shared';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, SpinnerComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  tableConfigService: TableConfigService = inject(TableConfigService)
  usersService: UsersService = inject(UsersService)
  spinnerService: SpinnerService = inject(SpinnerService)

  someShown = computed(() => {
    return this.tableConfigService.columns().some(c => c.show)
  })

  someFound = computed(() => {
    return this.usersService.displayedUsers().length > 0
  })

  displayedPages = computed(() => {
    const pages = this.tableConfigService.pages() || [1]

    if (pages.length <= 3) {
      return pages.slice(0, pages.length)
    }
    else {
      return pages.slice(this.currPage() - 1, this.currPage() + 2)
    }

  })

  currPage = signal<number>(1)
  selectedPage = signal<number>(1)

  faRight = faChevronRight
  faLeft = faChevronLeft

  ngOnInit(): void {
    this.tableConfigService.setPagination(this.usersService.users().length, 10)
  }

  keyUp(entriesNum: string) {
    if (!entriesNum || entriesNum === '0') {
      return
    }

    this.tableConfigService.setPagination(this.usersService.users().length, entriesNum)

    this.usersService.slice(this.tableConfigService.firstEntryIndex(),
      this.tableConfigService.entriesPerPage())

    this.currPage.set(1)
    this.selectedPage.set(1)
  }

 selectPage(page: number) {
    this.selectedPage.set(page);
  
    this.tableConfigService.setFirstEntryIndex(page);
  
    this.usersService.slice(
      this.tableConfigService.firstEntryIndex(),
      this.tableConfigService.entriesPerPage()
    );
  }

  prev() {
    if (this.currPage() <= 1) {
      return
    }
    this.currPage.update(prev => prev - 1)
  }

  next() {
    if (this.currPage() === this.tableConfigService.pages().at(-3)) {
      return;
    }
    this.currPage.update(prev => prev + 1)
  }

}
