import React from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectSelectedContact, unSelectContact} from "../../store/contactsAppSlice";


const Modal = () => {
  const dispatch = useAppDispatch();
  const selectedContact = useAppSelector(selectSelectedContact);

  return (
    <>
      <div className="modal-backdrop opacity-25" style={{display: selectedContact ? 'block' : 'none'}}/>
      <div
        title="Order"
        className="modal show"
        style={{display: selectedContact ? 'block' : 'none'}}
        onClick={() => dispatch(unSelectContact())}
      >
        <div className="modal-dialog" onClick={e => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5"></h1>
              <button type="button" className="btn-close" onClick={() => dispatch(unSelectContact())}></button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center">
                <img style={{width: "100px", height: "100px", marginRight: "30px"}} src={selectedContact ? selectedContact.image : ''} alt=""/>
                <div>
                  <h2>{selectedContact ? selectedContact.name : ''}</h2>
                  <p><a href="">{selectedContact ? selectedContact.phone : ''}</a></p>
                  <p><a href="">{selectedContact ? selectedContact.email : ''}</a></p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary me-2" onClick={() => dispatch(unSelectContact())}>Edit</button>
              <button className="btn btn-danger" onClick={() => dispatch(unSelectContact())}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;