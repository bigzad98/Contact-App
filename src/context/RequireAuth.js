import React from 'react'
import { Navigate } from 'react-router-dom'
import { ContactContext } from './contactContext.js'
import { useContext } from 'react'

export const RequireAuth = ({children}) => {
  const {valid}=useContext(ContactContext)
    
    if(!valid){
        return <Navigate to={"/login"}/>
    }

    
  return children
}
