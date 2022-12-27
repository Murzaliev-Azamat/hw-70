import React from 'react';
import './App.css';
import ContactsApp from "./containers/ContactsApp/ContactsApp";
import {NavLink, Route, Routes} from "react-router-dom";
import Add from "./containers/Add/Add";
import Edit from "./containers/Edit/Edit";

function App() {
  return (
    <div className="App">
      <div className="d-flex align-items-center justify-content-between border-bottom border-secondary pb-2 pt-2">
        <h2>Contacts</h2>
        <NavLink to={"/add-contact"} className="btn btn-primary">Add new contact</NavLink>
      </div>
      <Routes>
        <Route path="/" element={(
          <ContactsApp/>
        )}/>
        <Route path="/add-contact" element={(
          <Add/>
        )}/>
        <Route path="/edit-contact/:id" element={(
          <Edit/>
        )}/>
      </Routes>
    </div>
  );
}

export default App;
