import React, { useState } from 'react';
import { useDispatchCart } from './ContextReducer';
export default function Modal({ onClose, data }) {
  let dispatch = useDispatchCart();
  let cartData = data;
  const [alert, setAlert] = useState(false);
  let totalPrice = cartData.reduce((total, item) => total + item.price, 0)
  const handelCheckOut = async () => {
    let userEmail = localStorage.getItem('userEmail');
    let response = await fetch("http://localhost:8000/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderData: data,
        email: userEmail,
        date: new Date().toDateString()
      })
    });
    if (response.status === 200) {
      dispatch({ type: 'DROP' });
      setAlert(true);
    }
    else {
      console.log("Error...!!!");
    }
  }

  return (
    <div className="modal fade show mt-4" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content bg-light">
          <div className="modal-header">
            <p className="modal-title fs-4" id="exampleModalLabel"> My Cart </p>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {
              alert && <div className="alert alert-success fade show d-flex align-items-center" data-bs-theme="light" role="alert">
                <div><i className="bi bi-balloon-heart"></i> Checked out</div>
              </div>
            }
            {
            data.length === 0
            ? <p className='text-center fs-5 text-danger'>Nothing here!</p>
            : <table className="table table-striped table-light">
              <thead>
                <tr>
                  <th scope="col">Sr No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Size</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((item, index) => {
                  return (
                    <tr key={index + 1}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.qty}</td>
                      <td>{item.size}</td>
                      <td>{item.price}</td>
                      <td><i className="bi bi-trash" onClick={async () => { await dispatch({ type: "REMOVE", index: index }) }}></i></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            }
          </div>
          <div className="modal-footer border-0">
            {data.length !== 0 && <p className='me-auto fs-5'>Total Price : {totalPrice}</p>}
            {data.length !== 0 && <button type="button" className="btn btn-success" onClick={handelCheckOut}> Check-Out </button>}
            <button type="button" className="btn btn-danger" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
