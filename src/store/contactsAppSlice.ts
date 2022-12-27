import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {Contact} from "../types";
import {fetchContacts} from "./contactsAppThunks";


interface ContactsState {
  contacts: Contact[] | [];
  fetchLoading: boolean;
  selectedContactId: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  fetchLoading: false,
  selectedContactId: null,
}

export const ContactsAppSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    selectContact: (state, action: PayloadAction<string>) => {
      state.selectedContactId = action.payload;
    },
    unSelectContact: (state) => {
      state.selectedContactId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.contacts = action.payload;
    });
    builder.addCase(fetchContacts.rejected, (state) => {
      state.fetchLoading = false;
    });
    // builder.addCase(fetchOneContact.pending, (state) => {
    //   state.fetchLoading = true;
    // });
    // builder.addCase(fetchOneContact.fulfilled, (state, action) => {
    //   state.fetchLoading = false;
    //   state.selectedContact = action.payload;
    // });
    // builder.addCase(fetchOneContact.rejected, (state) => {
    //   state.fetchLoading = false;
    // });
  }
});

export const contactsReducer = ContactsAppSlice.reducer;
export const {selectContact, unSelectContact} = ContactsAppSlice.actions;

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectSelectedContact = (state: RootState) => state.contacts.contacts.filter(contact => contact.id === state.contacts.selectedContactId)[0];
