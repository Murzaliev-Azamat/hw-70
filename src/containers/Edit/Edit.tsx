import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Form from "../../components/Form/Form";
import {fetchOneContact, updateContact} from "../../store/contactsAppThunks";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectFetchOneLoading, selectOneContact} from "../../store/contactsAppSlice";
import {ContactApi} from "../../types";
import Spinner from "../../components/Spinner/Spinner";

const Edit = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const contact = useAppSelector(selectOneContact);
  const fetchOneLoading = useAppSelector(selectFetchOneLoading);


  useEffect(() => {
    if (id) {
      dispatch(fetchOneContact(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (contact: ContactApi) => {
    if (id) {
      await dispatch(updateContact({id, contact}));
      navigate('/');
    }
  };

  return (
    <>
      <div>
        {contact && (
          <>
            <h4 className="mt-2 mb-2">Edit meal</h4>
            {fetchOneLoading ? <Spinner/> : <Form existingContact={contact} onSubmit={onSubmit}/>}
          </>)}
      </div>
    </>
  );
};

export default Edit;