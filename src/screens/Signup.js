import React, {useState} from 'react'
import { Link } from 'react-router-dom';

export default function Signup() {
    const [info, setInfo] = useState({name: '', email: '', password: '', location: ''});
    
    const handlesubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/createuser",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: info.name, email: info.email, password: info.password, location: info.location})
        });
        const json = await response.json();
        console.log(json);

        if(!json.success){
            alert("Invalid Info");
        }
        else{
            alert("Success");
        }
    }
    const handleChange = (e) => {
        setInfo({...info,[e.target.name]:e.target.value});
    }

    return (
        <div className='container w-50 mt-5'>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' value={info.name} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={info.email} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={info.password} onChange={handleChange} autoComplete='off'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputLocation" className="form-label">Location</label>
                    <input type="text" className="form-control" name='location' value={info.location} onChange={handleChange} autoComplete='off'/>
                </div>
                <button type="submit" className="btn btn-success me-3">Submit</button>
                <Link to="/login"  className="btn btn-danger">Login</Link>
            </form>
        </div>
    )
}
