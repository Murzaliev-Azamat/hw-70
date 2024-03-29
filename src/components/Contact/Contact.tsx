import React from 'react';
import ContactIMG from '../../assets/03a477c788b2172c896ced7187b3d2db.jpg';
import {selectContact} from "../../store/contactsAppSlice";
import {useAppDispatch} from "../../app/hooks";


interface Props {
  name: string;
  image?: string;
  id: string;
}

const Contact: React.FC<Props> = ({name,image,id}) => {
  const dispatch = useAppDispatch();

  return (
    <>
    <div onClick={() => dispatch(selectContact(id))} className="d-flex align-items-center p-2 border border-secondary mt-2 w-50">
      <img className="me-3" style={{width: "100px"}} src={image ? image : ContactIMG} alt=""/>
      <p className="m-0">{name}</p>
    </div>
    </>
  );
};

export default Contact;