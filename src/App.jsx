import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { RequireAuth } from "./context/RequireAuth.js";
import { Route, Routes, Navigate, useNavigate,BrowserRouter} from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import {
  Navbar,
  Contacts,
  ViewContact,
  EditContact,
  AddContact,
  SearchContact, 
} from "./components";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getAllGroups,
} from "./services/contactServices";
import { confirmAlert } from "react-confirm-alert";
import {
  COMMENT,
  CURRENTLINE,
  FOREGROUND,
  PURPLE,
  YELLOW,
} from "./helpers/color";
import { ContactContext } from "./context/contactContext";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register"

function App() {
  const [valid,setValid]=useState(false);
  const [loading, setloading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts,setFilteredContacts]= useState([]);
  const [groups, setGroups] = useState([]);
  const [contact, setContact] = useState({});
  const [contactQuery,setContactQuery]=useState({text : ""});
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);

        setloading(false);
      } catch (err) {
        console.log(err.message);
        setloading(false);
      }
    };
    fetchData();
  }, []);



  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      setloading((preloading)=>!preloading)
      const { status,data } = await createContact(contact);

      if (status === 201) {
        const allcontacts=[...contacts,data];
        setContacts(allcontacts);
        setFilteredContacts(allcontacts);
        setContact({});
        setloading((preloading)=>!preloading)
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const onContactChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
             میخواهید مخاطب {contactFullname} را پاک کنید؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              style={{backgroundColor:PURPLE}}
              className="btn mx-2"
            >
              مطمین هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    const allContacts=[...contacts];
    try {
      const remaincontacts=contacts.filter((c)=>c.id!==contactId);
      setContacts(remaincontacts);
      setFilteredContacts(remaincontacts);
      const {status}= await deleteContact(contactId);

      if (status!==200) {
        setContacts(allContacts);
        setFilteredContacts(allContacts);
      }
    } catch (err) {
      console.log(err.message);
      setContacts(allContacts);
      setFilteredContacts(allContacts);
      
    }
  };

  const contactSearch= (event) =>{
    setContactQuery({...contactQuery,text : event.target.value});
    const allContacts = contacts.filter((contact)=> {
      return contact.fullname
      .toLowerCase()
      .includes(event.target.value.toLowerCase());
      
    });
    setFilteredContacts(allContacts);
  };


  return (
    <ContactContext.Provider value={{
      loading,
      valid,
      setValid,
      setloading,
      contact,
      setContacts,
      contacts,
      filteredContacts,
      setFilteredContacts,
      contactQuery,
      groups,
      onContactChange,
      deleteContact:confirmDelete,
      createContact:createContactForm,
      contactSearch,
 
    }}>
    <AuthProvider>
      <Navbar/>
      <div className="App">
      <ToastContainer theme='colored'
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={true}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>
          {/* <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/register" element={<Register/>}></Route>

              <Route path="/contacts"element={<RequireAuth><Contacts/></RequireAuth>}></Route>
              <Route path="/contacts/add" element={<RequireAuth><AddContact/></RequireAuth>}/>
              <Route path="/contacts/:contactId" element={<RequireAuth><ViewContact /></RequireAuth>} />
              <Route path="/contacts/edit/:contactId" element={<RequireAuth> <EditContact/></RequireAuth>}/>
              <Route path="*" element={ <Navigate to="/login" />}/>

          </Routes> */}
          <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/register" element={<Register/>}></Route>

              <Route path="/contacts"element={<Contacts/>}></Route>
              <Route path="/contacts/add" element={<AddContact/>}/>
              <Route path="/contacts/:contactId" element={<ViewContact />} />
              <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>

          </Routes>
      </div>
    </AuthProvider>
    </ContactContext.Provider>
  );
}

export default App;
