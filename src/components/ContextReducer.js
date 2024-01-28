import React, { useReducer, createContext, useContext } from 'react';

const CartContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price}]
        
        case "UPDATE":
            let arr = [...state];
            arr.map((item,index)=>{
                if(item.id === action.id){
                    console.log(item.qty, parseInt(action.qty), item.price, parseInt(action.price))
                    arr[index] =  {...item, qty: parseInt(action.qty) + parseInt(item.qty) , price: parseInt(action.price) + parseInt(item.price)};
                }
                return arr;
            });
            return arr;

        case "REMOVE":
            let newArr = [...state];
            newArr.splice(action.index, 1);
            return  newArr;
        
        case "DROP":
            let empArr = [];
            return empArr;
            
        default:
            console.log("error in reducer");
    }
}

export const CartProvider = ({ children }) => {
    const [cartState, dispatch] = useReducer(reducer, []);
    const cartContextValue = {
        state: cartState,
        dispatch: dispatch
    };

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    return context.state;
}

export const useDispatchCart = () => {
    const context = useContext(CartContext);
    return context.dispatch;
}