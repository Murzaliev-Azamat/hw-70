import React, {useEffect} from 'react';
import Contact from "../../components/Contact/Contact";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteContact, fetchContacts} from "../../store/contactsAppThunks";
import {selectContacts, selectFetchAllLoading} from "../../store/contactsAppSlice";
import Modal from "../../components/Modal/Modal";
import Spinner from "../../components/Spinner/Spinner";

const ContactsApp = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const fetchAllLoading = useAppSelector(selectFetchAllLoading);

  useEffect(() => {
      dispatch(fetchContacts());
  }, [dispatch]);

  const removeContact = async (id: string) => {
    await dispatch(deleteContact(id));
    await dispatch(fetchContacts());
  }

  let info = null;

  if (fetchAllLoading) {
    info = <Spinner/>
  } else {
    info = (
      <>
        {contacts.map((contact) => (
          <Contact key={contact.id} name={contact.name} image={contact.image} id={contact.id}/>
        ))}
      </>
    )
  }

  return (

    <div>
      {info}
      <Modal onDelete={removeContact}/>
    </div>
  );
};

export default ContactsApp;