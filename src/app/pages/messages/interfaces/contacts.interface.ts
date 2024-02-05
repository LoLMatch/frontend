export interface Contact {
    id: string,
    username: string
}

export interface User extends Contact {
    group: string[],
}

export interface ContactsListFromApi {
    contacts: Contact[],
    user: User,
}