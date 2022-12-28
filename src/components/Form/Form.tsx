import React, {useState} from 'react';
import {ContactApi} from "../../types";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {useAppSelector} from "../../app/hooks";
import {selectAddLoading, selectUpdateLoading} from "../../store/contactsAppSlice";

interface FormMutation {
  name: string;
  phone: string;
  email: string;
  image: string;
}

interface Props {
  onSubmit: (contact: ContactApi) => void;
  existingContact?: ContactApi | null;
  isLoading?: boolean;
}


const Form: React.FC<Props> = ({onSubmit,existingContact,isLoading= false}) => {
  const updatingLoading = useAppSelector(selectUpdateLoading);
  const addLoading = useAppSelector(selectAddLoading);

  const initialState = existingContact ? {...existingContact, phone: existingContact.phone.toString()} : {name: '', phone: '', email: '', image: ''};
  const [contact, setContact] = useState<FormMutation>(initialState);

  const onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setContact(prev => ({
      ...prev,
      [name]: value,
    }))
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: contact.name,
      phone: parseInt(contact.phone),
      email: contact.email,
      image: contact.image,
    })
  }

  return (
    <form onSubmit={onFormSubmit}>
      <input
        className="d-block mt-2"
        type="text"
        name="name"
        placeholder="Введите имя"
        value={contact.name}
        onChange={onTextFieldChange}
        required
      />
      <input
        className="d-block mt-2"
        type="tel"
        name="phone"
        placeholder="Тел в формате xxxxxxxxxxxx"
        pattern="[0-9]{12}"
        value={contact.phone}
        onChange={onTextFieldChange}
        required
      />
      <input
        className="d-block mt-2"
        type="email"
        name="email"
        placeholder="Введите почту"
        value={contact.email}
        onChange={onTextFieldChange}
      />
      <input
        className="d-block mt-2"
        type="url"
        name="image"
        placeholder="Загрузите фото"
        value={contact.image}
        onChange={onTextFieldChange}
      />
      <img src={contact.image} style={{width: "250px", height: "250px", marginTop: "5px"}} alt=""/>
      <button type="submit" disabled={isLoading} className="d-block btn btn-primary mt-2">
        {updatingLoading || addLoading ? <ButtonSpinner/> : ''}
        Save
      </button>
    </form>
  );
};

export default Form;