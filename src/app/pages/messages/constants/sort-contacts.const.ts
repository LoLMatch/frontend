import { ContactListItem } from "@pages/messages/interfaces/contacts.interface";

export const sortContacts = (contacts: ContactListItem[]) => {
    const sortedContacts = contacts
      .slice()
      .sort((a, b) => {
        const dateA = new Date(a?.createdAt).getTime();
        const dateB = new Date(b?.createdAt).getTime();
        return dateB - dateA;
      });
    return sortedContacts;
  }