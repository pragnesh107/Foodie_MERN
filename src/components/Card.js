import React, { useEffect, useRef, useState,useContext } from 'react';
import { useCart,useDispatchCart} from './ContextReducer';
import { loginContext } from '../components/LoginStatusProvider';

export default function Card(props) {
  const { loginStatus } = useContext(loginContext);
  let dispatch = useDispatchCart();
  let data = useCart();
  const sizeOptions = props.options;
  const optionKeys = Object.keys(sizeOptions); 
  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  
  let price = qty * parseInt(sizeOptions[size]);
  useEffect( ()=>{
    setSize(priceRef.current.value);
  },[]);


  const handelAddCart = async ()=>{
    let food = [];
    for(const item of data){
      if(item.id === props.foodItems._id){
        food = item;
        break;
      }
    }
    if(food.length !== 0){
      if(food.size === size){
        await dispatch({type: "UPDATE", id: props.foodItems._id, price: price, qty: qty});
        return;
      }
      else if(food.size !== size){
        await dispatch({type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: price, qty: qty, size: size})
        return;
      }
    }
    await dispatch({type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: price, qty: qty, size: size})
    return;
  }

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src= {props.foodItems.img} className="card-img-top cards-img" alt="food" />
      <div className="card-body">
        <h5 className="card-title">{props.foodItems.name}</h5>
        <p className="card-text">{props.foodItems.description}</p>
        <select className='me-3 p-2 rounded' onChange={(e)=>{setQty(e.target.value)}}>
        {Array.from(Array(5), (e,i)=>{
          return (
            <option key={i+1} value={i+1}>{i+1}</option>
          )
        })}
        </select> 
        <select className='me-3 p-2 rounded' ref={priceRef} onChange={(e)=>{setSize(e.target.value)}}>
          {
            optionKeys.map( option =>{
              return <option key={option} value={option}> {option} </option>
            })
          }
        </select>
        <div className='d-inline fs-5'>₹{price}</div>
        {loginStatus ? <div className="btn btn-outline-success mt-3 w-100" onClick={handelAddCart}>Add To Cart</div>
        : ''}
      </div>
    </div>
  )
}
