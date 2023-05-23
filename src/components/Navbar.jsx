import React from 'react'
import SearchContact from './Contact/SearchContact'
import {  BACKGROUND, PURPLE} from "../helpers/color.js"
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='navbar navbar-dark navbar-expand-sm shadow-lg ' style={{backgroundColor:BACKGROUND}}>
        <div className='container'>
          <div className='row w-100'>
            <div className='col'>
              <div className='navbar-brand '>
              <i className='fa fa-id-badge' style={{color:PURPLE}}/>
                <span> وب ابلیکیشن { " "}</span>
            
                <span style={{color : PURPLE}}>مخاطبین  </span>
                <Link to={"/login"} className="btn algin-left btn-danger pull-left ms-3">
                خروج
              
              </Link>

              </div>


            </div>
            
          </div>
        </div>
    </nav>
  )
}

export default Navbar