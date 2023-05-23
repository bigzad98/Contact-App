import React from 'react'

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CURRENTLINE } from '../../helpers/color';

const Register = () => { 

    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [password, passwordchange] = useState("");
    const [email, emailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [address, addresschange] = useState("");
    const [gender, genderchange] = useState("male"); 

    const navigate=useNavigate();
    const IsValidate = () => {
        let isproceed = true;
        let errormessage = '   لطفا پر کنید فیلد های';
        if (id === null || id === '') {
            isproceed = false;
            errormessage += ' نام کاربر  ';
        }
        if (name === null || name === '') {
            isproceed = false;
            errormessage += '     اسم ';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += '  رمز عبور ';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' ایمیل';
        }

        if(!isproceed){
            toast.warning(errormessage)
        }else{
            if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

            }else{
                isproceed = false;
                toast.warning('ایمیل شما نامعتبر است')
            }
        }
        return isproceed;
    }
    const handlesubmit=(e)=>{
        e.preventDefault();
        let regobj={id,name,password,email,phone,address,gender}
        if(IsValidate()){
        // console.log(regobj)
        fetch("http://localhost:9000/user", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('موفقانه راجستر شدید')
                navigate('/login')
            }).catch((err) => {
                toast.error('ناموفق' + err.message);
            });}
        }
    

    return (
        <div className='mx-auto'>
            <div className="offset-lg-3 col-lg-6 mx-auto">
                <form style={{ backgroundColor: CURRENTLINE }} className="card my-4" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header text-center">
                            <h1>ثبت حساب کاربر</h1>
                        </div>
                        <div className="card-body">

                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>نام کاربری<span className="errmsg">*</span></label>
                                        <input value={id} onChange={e=>idchange(e.target.value)} className="text-white form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>رمز عبور<span className="errmsg">*</span></label>
                                        <input value={password} onChange={e=>passwordchange(e.target.value)} type="password" className="form-control text-white"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>اسم کاربر<span className="errmsg">*</span></label>
                                        <input value={name} onChange={e=>namechange(e.target.value)} className="form-control text-white"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>ایمیل آدرس<span className="errmsg">*</span></label>
                                        <input value={email} onChange={e=>emailchange(e.target.value)} className="form-control text-white"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>شماره موبایل<span className="errmsg"></span></label>
                                        <input value={phone} onChange={e=>phonechange(e.target.value)} className="form-control text-white"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>جنسیت</label>
                                        <br></br>
                                        <input checked={gender==='male'} onChange={e=>genderchange(e.target.value)} type="radio" name="gender" className="app-check"></input>
                                        <label>مذکر</label>
                                        <input checked={gender==='female'} onChange={e=>genderchange(e.target.value)} type="radio" name="gender" className="app-check"></input>
                                        <label>مونث</label>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>آدرس</label>
                                        <textarea value={address} onChange={e=>addresschange(e.target.value)} className="form-control text-white"></textarea>
                                    </div>
                                </div>
                                

                            </div>

                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">راجستر</button> |
                            <Link to={'/login'} className="btn btn-danger">برگشت</Link>
                        </div>
                    </div>
                </form>
            </div>


        </div>
    );
}

export default Register