import React from 'react'
import {PURPLE , COMMENT} from "../../helpers/color.js"
import { useContext } from 'react'
import { ContactContext } from '../../context/contactContext.js'

function SearchContact() {
  const {contactQuery,contactSearch}=useContext(ContactContext);
  return (
    <div className='col'>
              <div className='input-group mx-2 w=75' dir='ltr'>
                <span className='input-group-text ' id='basic-addon1' style={{backgroundColor:PURPLE}}>
                  <i className="fa fa-search" style={{color:"black"}}/>
                </span>
                
                <input type="text"
                value={contactQuery.text}
                onChange={contactSearch}
                dir='rtl'
                style={{backgroundColor:COMMENT,borderColor:PURPLE
                }} 
                className="form-control border-primary"
                placeholder='جستجوی مخاطبین ' 
                aria-label='Search'
                aria-describedby='basic-addon1'/>
              </div>
            </div>
  )
}

export default SearchContact