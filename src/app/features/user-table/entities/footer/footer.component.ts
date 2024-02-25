import { Component, inject, OnInit, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerService, TableConfigService, UsersService } from 'src/app/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { SpinnerComponent } from 'src/app/shared';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, SpinnerComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit, OnDestroy {
  tableConfigService: TableConfigService = inject(TableConfigService)
  usersService: UsersService = inject(UsersService)
  spinnerService: SpinnerService = inject(SpinnerService)

  allUsers = this.usersService.users().length
  entries = this.tableConfigService.entriesPerPage()

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
      return pages.slice(this.tableConfigService.currPage() - 1, 
      this.tableConfigService.currPage() + 2)
    }
  })

  entriesVal = new Subject<string>()

  faRight = faChevronRight
  faLeft = faChevronLeft

  ngOnInit() {
    this.init(this.allUsers, this.entries)
    
    this.entriesVal.pipe(debounceTime(1000)).subscribe((val) => {
      this.init(this.allUsers, Number(val))
      this.usersService.getData()
    })
  }

  ngOnDestroy() {
    this.entriesVal.unsubscribe()
  }

  init(length: number, entriesPerPage: number) {
    this.tableConfigService.setPagination(length, entriesPerPage)
  }

  keyUp(entriesNum: string) {
    if (!entriesNum || entriesNum === '0') {
      return
    }

    this.entriesVal.next(entriesNum)

  }

  selectPage(page: number) {
    this.tableConfigService.setPage(page)
    this.usersService.getData()
  }

  prev() {
    this.tableConfigService.prev()
  }

  next() {
    this.tableConfigService.next()
  }
}
