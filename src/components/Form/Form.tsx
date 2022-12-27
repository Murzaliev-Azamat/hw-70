import React, {useState} from 'react';
import {Contact} from "../../types";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface FormMutation {
  name: string;
  phone: string;
  email: string;
  image: string;
}

interface Props {
  onSubmit: (contact: FormMutation) => void;
  existingContact?: Contact | null;
  isLoading?: boolean;
}


const Form: React.FC<Props> = ({onSubmit,existingContact,isLoading= false}) => {
  // const initialState = existingContact ? {...existingContact, calories: existingContact.calories.toString()} : {timeMeal: '', food: '', calories: '', date: todayDate};
  const [contact, setContact] = useState<FormMutation>({name: '', phone: '', email: '', image: ''});

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
      phone: contact.phone,
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
        placeholder="Введите телефон"
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
      <img src={contact.image} style={{width: "500px", height: "500px"}} alt="czcxz"/>
      <button type="submit" disabled={isLoading} className="d-block btn btn-primary mt-2">
        {isLoading && <ButtonSpinner/>}
        Save
      </button>
    </form>
  );
};

export default Form;