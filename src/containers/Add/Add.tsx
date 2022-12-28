import React from 'react';
import {useNavigate} from "react-router-dom";
import Form from "../../components/Form/Form";
import {useAppDispatch} from "../../app/hooks";
import {addContact} from "../../store/contactsAppThunks";
import {ContactApi} from "../../types";


const Add = () => {
  const navigate = useNavigate();
  const dispatch= useAppDispatch();

  const add = async (contact: ContactApi) => {
    await dispatch(addContact(contact));
    navigate('/');
  };

  return (
    <div>
      <h4 className="mt-2 mb-2">Add new meal</h4>
      <Form onSubmit={add}/>
    </div>
  );
};

export default Add;