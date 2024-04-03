import React, { useEffect, useState } from 'react';

export default function MyOrders() {
    const [myOrdersData, setMyOrdersData] = useState([]);

    const fetchMyOrders = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/myOrderData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });

            const data = await response.json();
            setMyOrdersData(data.myOrderData.orderData || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrders();
    }, []);

    return (
        <div className='container mt-4'>
            <div className="row">
                {myOrdersData.map((item) => (
                    item.map((itemData, index) => {
                        return (
                            <div key={index} className='mt-4'>
                                {itemData.Order_date ? (
                                    <div>
                                        {itemData.Order_date}
                                        <hr />
                                    </div>
                                ) : (
                                    <div className="card" style={{ width: "18rem" }}>
                                        <div className="card-body">
                                            <h5 className="card-title">{itemData.name}</h5>
                                            <p className="card-text">{itemData.qty}</p>
                                            <p className="card-text">{itemData.size}</p>
                                            <div className='d-inline fs-5'>₹{itemData.price}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })
                ))}
            </div>
        </div>
    );
}
