import React from 'react'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from '../../context/Auth.js';
import { ContactContext } from '../../context/contactContext.js';
import { useContext } from 'react';
function Login() {
  const [username, usernameupdate] = useState('');
  const [password, passwordupdate] = useState('');
  const navigatee=useNavigate()
  
  const {setValid}=useContext(ContactContext);
  const auth=useAuth()

  const handlelogin=()=>{
    auth.login(username)
    navigatee("/")
  }

  const usenavigate=useNavigate();

  useEffect(()=>{
sessionStorage.clear();
  },[]);

  const ProceedLogin = (e) => {
      e.preventDefault();
      if (validate()) {
          ///implentation
          // console.log('proceed');
          fetch("http://localhost:9000/user/" + username).then((res) => {
              return res.json();
          }).then((resp) => {
              //console.log(resp)
              if (Object.keys(resp).length === 0) {
                  toast.error('Please Enter valid username');
              } else {
                  if (resp.password === password) {
                      toast.success('وارد شدید');
                        setValid(true)
                      sessionStorage.setItem('username',username);
                      sessionStorage.setItem('userrole',resp.role);
                      usenavigate('/contacts')
                  }else{
                      toast.error('لطفا نام کاربری و رمز عبور را چک کنید');
                  }
              }
          }).catch((err) => {
              toast.error('Login Failed due to :' + err.message);
          });
      }
  }

  const ProceedLoginusingAPI = (e) => {
      e.preventDefault();
      if (validate()) {
          ///implentation
          // console.log('proceed');
          let inputobj={"username": username,
          "password": password};
          fetch("https://localhost:44308/User/Authenticate",{
              method:'POST',
              headers:{'content-type':'application/json'},
              body:JSON.stringify(inputobj)
          }).then((res) => {
              return res.json();
          }).then((resp) => {
              console.log(resp)
              if (Object.keys(resp).length === 0) {
                  toast.error('Login failed, invalid credentials');
              }else{
                   toast.success('Success');
                   sessionStorage.setItem('username',username);
                   sessionStorage.setItem('jwttoken',resp.jwtToken);
                   
                 usenavigate('/')
              }
              // if (Object.keys(resp).length === 0) {
              //     toast.error('Please Enter valid username');
              // } else {
              //     if (resp.password === password) {
              //         toast.success('Success');
              //         sessionStorage.setItem('username',username);
              //         usenavigate('/')
              //     }else{
              //         toast.error('Please Enter valid credentials');
              //     }
              // }
          }).catch((err) => {
              toast.error('Login Failed due to :' + err.message);
          });
      }
  }
  const validate = () => {
      let result = true;
      if (username === '' || username === null) {
          result = false;
          toast.warning('لطفا نام کاربری تان را وارد کنید');
      }
      else if (password === '' || password === null) {
          result = false;
          toast.warning('لطفا رمز عبور تان را وارد کنید');
      }
      return result;
  }
  return (
      <div className="row mx-auto">
          <div className="offset-lg-3 col-lg-6 mx-auto" style={{ marginTop: '100px' }}>
              <form onSubmit={ProceedLogin} className="container">
                  <div className="card">
                      <div className="card-header">
                          <h2>ورود کاربر</h2>
                      </div>
                      <div className="card-body">
                          <div className="form-group">
                              <label>نام کاربری<span className="errmsg">*</span></label>
                              <input value={username} onChange={e => usernameupdate(e.target.value)} className="form-control text-white"></input>
                          </div>
                          <div className="form-group">
                              <label>رمز عبور<span className="errmsg">*</span></label>
                              <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="text-white form-control"></input>
                          </div>
                      </div>
                      <div className="card-footer mx-auto">
                          <button type="submit"className="btn btn-primary">ورود</button> |
                          <Link className="btn btn-success" to={'/register'}>ثبت حساب کاربر</Link>
                      </div>
                  </div>
              </form>
          </div>
      </div>
  );
}

export default Login