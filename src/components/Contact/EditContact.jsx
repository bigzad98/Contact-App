import {useContext , useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/color";
import {
  getContact,
  updateContact,
} from "../../services/contactServices";
import Spinner from "../Spinner";
import { ContactContext } from "../../context/contactContext";

function Editcontact() {
  const { contactId } = useParams();
  const navigate = useNavigate();
  
  const [contact, setContact] = useState({});

  const {groups,loading,setloading,contacts,setContacts,setFilteredContacts} = useContext(ContactContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const { data: contactData } = await getContact(contactId);
        setloading(false)
        setContact(contactData);
      } catch (err) {
        console.log(err);
        setloading(false);
      }
    };
    fetchData();
  }, []);
  const setContactInfo = (event) => {
    setContact({
      ...contact,
       [event.target.name]: event.target.value,
      });
    };
    
  

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      setloading(true);
      const { data ,status } = await updateContact(contact, contactId);
      
      if (status===200) {
        setloading(false);

        const allContacts=[...contacts];

        const contactIndex= allContacts.findIndex((c)=> c.id===parseInt(contactId));
        allContacts[contactIndex]= {...data};

        setContacts(allContacts);
        setFilteredContacts(allContacts);

        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      setloading(false);
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    {" "}
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto 
            align-items-center"
              >
                <div className="col-md-8">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        type="text"
                        name="fullname"
                        className="form-control"
                        value={contact.fullname}
                        onChange={setContactInfo}
                        required
                        placeholder="نام و نام خانوادگی"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        name="photo"
                        className="form-control"
                        value={contact.photo}
                        onChange={setContactInfo}
                        required
                        placeholder="آدرس تصویر"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="number"
                        name="mobile"
                        className="form-control"
                        value={contact.mobile}
                        onChange={setContactInfo}
                        required
                        placeholder="شماره موبایل"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={contact.email}
                        onChange={setContactInfo}
                        required
                        placeholder="آدرس ایمیل"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        name="job"
                        className="form-control"
                        value={contact.job}
                        onChange={setContactInfo}
                        required
                        placeholder="شغل"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        name="group"
                        value={contact.group}
                        onChange={setContactInfo}
                        required
                        className="form-control"
                      >
                        <option value="">انتخاب گروه</option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option value={group.id} key={group.id}>
                              {group.name}
                            </option>
                          ))}
                        
                      </select>
                    </div>
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: PURPLE }}
                        value="ویرایش مخاطب"
                      />
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{ backgroundColor: COMMENT }}
                      >
                        {" "}
                        انصراف
                      </Link>
                    </div>
                  </form>
                </div>

                <div className="col-md-4">
                  <img
                    className="img-fluid rounded"
                    src={contact.photo}
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>
            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                alt="man"
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Editcontact;
