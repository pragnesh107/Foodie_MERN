import React, { useState, useEffect } from 'react'
import Card from '../components/Card'

export default function Main(props) {
    const [search, setSearch] = useState('');
    const [foodItem, setFoodItems] = useState([]);
    const [foodCategory, setFoodCategory] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:8000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            }
        });
        response = await response.json();
        setFoodItems(response[0]);
        setFoodCategory(response[1]);
    }

    useEffect(() => {
        loadData();
    }, []);



    return (
        <div>
            {/* Carousel */}
            <div>
                <div id="carouselExampleAutoplaying" className="carousel slide bg-dark" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-caption d-none d-md-block" style={{ zIndex: '10' }}>
                            <div className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/500×500/?burger" className="d-block w-100 car-img " alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/500×500/?sandwich" className="d-block w-100 car-img" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/500×500/?pizza" className="d-block w-100 car-img" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div className='mx-4 container mx-auto'>
                {
                    foodCategory.length !== 0
                        ? foodCategory.map((category) => {
                            return (
                                <div key={category.CategoryName} className='pt-4'>
                                    <div className='fs-4 fw-bold'>{category.CategoryName}</div>
                                    <hr />
                                    <div className='d-flex flex-wrap gap-5 justify-content-lg-start justify-content-center '>
                                        {foodItem.length !== 0
                                            ? foodItem.filter((item) => category.CategoryName === item.CategoryName && item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                                                .map(filterItem => {
                                                    return (
                                                        <Card key={filterItem._id} foodItems={filterItem} options={filterItem.options[0]} loginStatus={props.loginStatus} setLoginStatus={props.setLoginStatus}/>
                                                    )
                                                })
                                            : ""
                                        }
                                    </div>
                                </div>
                            )
                        })
                        : ""
                }
            </div>
        </div>
    )
}
