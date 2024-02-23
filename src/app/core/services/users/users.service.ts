import { Injectable, signal, inject } from '@angular/core';

import { data } from '../../data'
import { UserResponse, IUserResponse, ITableColumn } from 'src/app/core/models';
import { TableConfigService } from '../table-config/table-config.service';
import { customSort } from './utils';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  tableConfigService: TableConfigService = inject(TableConfigService)
  spinnerService:SpinnerService = inject(SpinnerService)

  users = signal<IUserResponse[]>([])
  displayedUsers = signal<IUserResponse[]>(this.users())

  constructor() {
    this.modify()
  }

  modify() {
    const newUsers = data.map((user: IUserResponse) => {
      Object.keys(UserResponse).forEach(key => {
        if (!user[key]) {
          const type = UserResponse[key as keyof typeof UserResponse]

          type === 'boolean' ? user[key] = false :
            type === 'number' ? user[key] = '0' :
              user[key] = ''
        }
        if (key === 'balance') {
          user[key] = user[key]?.replace('$', '').replace(',', '')
        }
      })


      if (user['isActive']) {
        user['isActive'] = 'online'
      } else {
        user['isActive'] = 'offline'
      }

      return {
        ...user,
        person: {
          name: user.name ? `${user.name?.first} ${user.name?.last}` : '',
          picture: user.picture
        }
      }
    })

    this.users.set(newUsers)
    this.slice(0, this.tableConfigService.entriesPerPage())
  }

  filter(search: string) {
    // refresh
     this.displayedUsers.set(this.users())

    if (!search) {
      this.displayedUsers.set(this.users())
      return
    }

    const toStringed = this.displayedUsers().map(u => ({
      ...u,
      tags: u.tags?.join(''),
      age: u['age'].toString(),
      name: u['person'].name,
      person: '',
      picture: ''
    }))

    const filtered = toStringed.filter(u => Object.values(u).some(val => val.toLowerCase().includes(search.toLowerCase())))

    const result = this.displayedUsers().filter(u => filtered.find(fu => fu.id === u.id))

    this.displayedUsers.set(result)
  }

  sort(column: ITableColumn) {
    const currentColumn = this.tableConfigService.findSortedColumn(column);
    const { property, sortDesc } = currentColumn!

    let sorted = customSort(this.displayedUsers(), property, sortDesc)
    this.displayedUsers.set(sorted)
  }

  slice(start: number, entriesPerPage: number) {
    let end;

    if (start + entriesPerPage > this.users().length) {
      end = start + (this.users().length - start)
    } else {
      end = start + entriesPerPage
    }

    const sliced = this.users().slice(start, end)
    this.displayedUsers.set(sliced)
  }

}
