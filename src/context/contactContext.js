import { createContext } from "react";

export const ContactContext= createContext({
    valid:false,
    setValid:()=>{},
    loading: false,
    setloading : () => {},
    contact: {},
    setContacts:()=>{},
    contacts:[],
    filteredContacts:[],
    setFilteredContacts:()=>{},
    contactQuery:{},
    groups:[],
    onContactChange:()=>{},
    deleteContact:() => {},
    updateContact :()=> {},
    createContact : () => {},
    contactSearch : () => {},


})