import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {Contact, ContactApi} from "../types";
import {addContact, deleteContact, fetchContacts, fetchOneContact, updateContact} from "./contactsAppThunks";


interface ContactsState {
  contacts: Contact[] | [];
  fetchAllLoading: boolean;
  fetchOneLoading: boolean;
  addLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
  selectedContactId: string | null;
  contact: ContactApi | null
}

const initialState: ContactsState = {
  contacts: [],
  fetchAllLoading: false,
  fetchOneLoading: false,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
  selectedContactId: null,
  contact: null,
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
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.fetchAllLoading = false;
      state.contacts = action.payload;
    });
    builder.addCase(fetchContacts.rejected, (state) => {
      state.fetchAllLoading = false;
    });
    builder.addCase(fetchOneContact.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneContact.fulfilled, (state, action) => {
      state.fetchOneLoading = false;
      state.contact = action.payload;
    });
    builder.addCase(fetchOneContact.rejected, (state) => {
      state.fetchOneLoading = false;
    });
    builder.addCase(updateContact.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(updateContact.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updateContact.rejected, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(deleteContact.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteContact.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteContact.rejected, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(addContact.pending, (state) => {
      state.addLoading = true;
    });
    builder.addCase(addContact.fulfilled, (state) => {
      state.addLoading = false;
    });
    builder.addCase(addContact.rejected, (state) => {
      state.addLoading = false;
    });
  }
});

export const contactsReducer = ContactsAppSlice.reducer;
export const {selectContact, unSelectContact} = ContactsAppSlice.actions;

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectOneContact = (state: RootState) => state.contacts.contact;
export const selectSelectedContact = (state: RootState) => state.contacts.contacts.filter(contact => contact.id === state.contacts.selectedContactId)[0];

export const selectFetchAllLoading = (state: RootState) => state.contacts.fetchAllLoading;
export const selectFetchOneLoading = (state: RootState) => state.contacts.fetchOneLoading;
export const selectAddLoading = (state: RootState) => state.contacts.addLoading;
export const selectUpdateLoading = (state: RootState) => state.contacts.updateLoading;
export const selectDeleteLoading = (state: RootState) => state.contacts.deleteLoading;
