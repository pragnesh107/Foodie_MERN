import React, {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { loginContext } from '../components/LoginStatusProvider';


export default function Login() {
    const { setLoginStatus } = useContext(loginContext);
    const [info, setInfo] = useState({email: '', password: ''});
    const navigate = useNavigate();
    const handlesubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/loginuser",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: info.email, password: info.password})
        });
        const json = await response.json();
        if(json.error){
            alert(json.error);
        }
        else{
            setLoginStatus(true);
            localStorage.setItem("authToken",json.authToken);
            localStorage.setItem("userEmail",info.email);
            // console.log(localStorage.getItem("authToken"));
            navigate('/');
        }   
    }
    const handleChange = (e) => {
        setInfo({...info,[e.target.name]:e.target.value});
    }

    return (  
        <div className='container w-50 mt-5'>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={info.email} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={info.password} onChange={handleChange} autoComplete='off'/>
                </div>
                <button type="submit" className="btn btn-success me-3">Submit</button>
                <Link to="/signup" className="btn btn-danger">I'm a new user</Link>
            </form>
        </div>
    )
}
  