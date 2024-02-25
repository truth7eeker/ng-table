import { Injectable, inject, signal } from '@angular/core';

import { columnData } from '../../data';
import { ITableColumn } from '../../models';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class TableConfigService {
  spinnerService: SpinnerService = inject(SpinnerService)

  columns = signal<ITableColumn[]>(columnData)
  entriesPerPage = signal<number>(10)
  firstEntryIndex = signal<number>(0)
  pagesNum = signal<number>(6)
  pages = signal<number[]>([1])
  currPage = signal<number>(1)
  selectedPage = signal<number>(1)

  setSortingOrder(column: ITableColumn) {
    const orderChanged = this.columns().map((c: ITableColumn) => {
      if (c.property === column.property) {
        return { ...c, sortDesc: !c.sortDesc }
      } else {
        return c;
      }

    });
    this.columns.set(orderChanged)
  }

  findSortedColumn(column: ITableColumn) {
    return this.columns().find((c: ITableColumn) => c.property === column.property)
  }

  setPagination(users: number, entriesNum: string | number) {
    this.entriesPerPage.set(Number(entriesNum))

    let pages = []
    let pagesNum = Math.ceil(users / this.entriesPerPage())
    this.pagesNum.set(pagesNum)

    for (let i = 1; i <= this.pagesNum(); i++) {
      pages.push(i)
    }

    this.pages.set(pages)
  }

  setFirstEntryIndex(page: number) {
    this.firstEntryIndex.set(this.entriesPerPage() * (page - 1))
  }

  toggleColumns(column: ITableColumn) {
    const toggled = this.columns().map((c: ITableColumn) => {
      if (column.displayName === c.displayName) {
        return { ...c, show: !c.show };
      } else {
        return c;
      }
    });
    this.columns.set(toggled)
  }

  setPage(page: number) {
    this.selectedPage.set(page);
    this.setFirstEntryIndex(page);
  }

  prev() {
    if (this.currPage() <= 1) {
      return
    }
    this.currPage.update(prev => prev - 1)
  }

  next() {
    if (this.currPage() === this.pages().at(-3)) {
      return;
    }
    this.currPage.update(prev => prev + 1)
  }

}
