import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useCart } from './ContextReducer';

export default function Navbar(props) {
    let data = useCart();

    const [cartView, setCartView] = useState(false);

    const handleCloseCart = () => {
        setCartView(false);
    };

    const navigate = useNavigate();

    const handelMyCart = () => {
        setCartView(true);
    }

    const handleLogout = () => {
        props.setLoginStatus(false);
        localStorage.removeItem('authToken');
        navigate('/');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark " data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Foodie</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-light" aria-current="page" to="/">Home</Link>
                        </li>
                        {props.loginStatus
                            ? <li>
                                <Link className="nav-link text-light" aria-current="page" to="/myOrders">My Orders</Link>
                            </li>
                            : ""
                        }
                    </ul>
                    {props.loginStatus
                       ? <div className='d-flex'>
                            <div className="btn btn-outline-success mx-2 text-light" onClick={handelMyCart}>My Cart <span className="badge rounded-pill text-bg-danger">{data.length}</span> </div>
                            {cartView ? <Modal onClose={handleCloseCart} data={data} /> : ""}

                            <div className="btn btn-outline-danger mx-2 text-light " onClick={handleLogout}>Logout</div>
                        </div>
                        : <div className='d-flex'>
                            <Link className="btn btn-outline-success mx-2 text-light" to="/login">Login</Link>
                            <Link className="btn btn-outline-success mx-2 text-light" to="/signup">Signup</Link>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}
