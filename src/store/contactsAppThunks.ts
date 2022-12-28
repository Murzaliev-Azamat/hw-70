import {createAsyncThunk} from "@reduxjs/toolkit";
import {Contact, ContactApi, ContactsApiList} from "../types";
import axiosApi from "../axiosApi";

export const fetchContacts = createAsyncThunk<Contact[]>(
  'contacts/fetchAll',
  async () => {
    const contactsResponse = await axiosApi.get<ContactsApiList | null>('/contacts.json');
    const contacts = contactsResponse.data;
    if (contacts === null) {
      return [];
    } else {
      return Object.keys(contacts).map(key => {
        const contact = contacts[key];
        return {
          ...contact,
          id: key
        }
      });
    }
  },
)


export const addContact = createAsyncThunk<void, ContactApi>(
  'contacts/addOneContact',
  async ({name,phone,email,image}) => {
    await axiosApi.post<ContactApi>('/contacts.json', {name: name, phone: phone, email: email, image: image});
  }
);

export const fetchOneContact = createAsyncThunk<Contact, string>(
  'contacts/fetchOne',
  async (id) => {
    const contactResponse = await axiosApi.get<ContactApi | null>('contacts/' + id + '.json');
    const contact = contactResponse.data;

    if (contact === null) {
      throw new Error('Not found!')
    }

    return (
        {
          id: id,
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
          image: contact.image,
        }
      )
  },
)

interface UpdateContactParams {
  id: string;
  contact: ContactApi;
}

export const updateContact = createAsyncThunk<void, UpdateContactParams>(
  'contacts/update',
  async (params) => {
    await axiosApi.put("/contacts/" + params.id + '.json', params.contact);
    // const mealResponse = await axiosApi.get<Meal>('/meals/' + id + '.json');
  }
);

export const deleteContact = createAsyncThunk<void, string>(
  'todo/deleteTask',
  async (id) => {
    await axiosApi.delete('/contacts/' + id + '.json');
  }
);
