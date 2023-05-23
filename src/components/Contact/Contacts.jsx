import React from "react";
import {CURRENTLINE, ORANGE, PINK} from "../../helpers/color";
import "../../assets/img/cha.jpg";
import Contact from "./Contact";
import Spinner from "../Spinner"
import { Link } from "react-router-dom";
import { ContactContext } from "../../context/contactContext";
import { useContext } from "react";
import SearchContact from "./SearchContact";

function Contacts() {
  const {filteredContacts,loading,deleteContact} = useContext(ContactContext);
  return (
    
    <>
      <section className="container ">
    
        <div className="grid">
          <div className="col">
            <p className="h3 text-center d-flex">
              <Link to={"/contacts/add"} className="btn mx-2" style={{ backgroundColor: PINK }}>
                ثبت مخاطب جدید
                <i className="fa fa-plus-circle mx-2" />
              </Link>
              <SearchContact />
            </p>
          </div>
        </div>
      </section>
      {
        loading ? <Spinner/> :(

      <section className="container">
        <div className="row">
          {/* Contact Start component*/}
          {
            filteredContacts.length > 0 ? filteredContacts.map (c => (
              <Contact key={c.id} contact={c}
              deleteContact={()=>deleteContact(c.id,c.fullname)}/>
            )) :
            (
              <div className="text-center py-5" style={{backgroundColor: CURRENTLINE}}>
                <p className="h3 " style={{color:ORANGE}}> ...مخاطب یافت نشد</p> 
                <img src={require("../../assets/no-found.gif")} alt=" Not found"  className="w-25"/></div>
            )
          }
          
        </div>
      </section>
        )
      }
    </>
  );
}

export default Contacts;
