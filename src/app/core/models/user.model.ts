export interface IUserResponse {
    id: string,
    name?: '' | {
        first?: string,
        last?:string
    },
    picture: string,
    age: number,
    isActive: boolean | string,
    company?: string,
    balance?: string,
    email?: string,
    address: string,
    favoriteFruit: string,
    tags?: string[],
    [key: string]: any
}

export interface IUser {
    id: string,
    person: {
        name: string,
        picture: string,
    },
    age: number,
    isActive: boolean,
    company: string,
    balance: string,
    email: string,
    address: string,
    favoriteFruit: string,
    tags: string[],
    [key: string]: any
}

export enum UserResponse {
    id = 'string',
    name = 'string',
    picture = 'string',
    age = 'string',
    isActive = 'boolean',
    company = 'string',
    balance = 'number',
    email = 'string',
    address = 'string',
    favoriteFruit = 'string',
    tags = 'string',
}