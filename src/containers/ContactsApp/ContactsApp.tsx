import React, {useEffect} from 'react';
import Contact from "../../components/Contact/Contact";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchContacts} from "../../store/contactsAppThunks";
import {selectContacts} from "../../store/contactsAppSlice";
import Modal from "../../components/Modal/Modal";

const ContactsApp = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);

  useEffect(() => {
      dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      {contacts.map((contact) => (
        <Contact key={contact.id} name={contact.name} image={contact.image} id={contact.id}/>
      ))}
      <Modal/>
    </div>
  );
};

export default ContactsApp;