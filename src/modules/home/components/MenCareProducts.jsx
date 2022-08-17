import { useState } from 'react';
import Link from 'next/link';

export default function MenCareProducts() {
    

    const [show, setShow] = useState(false)
    return (
        <>
            <section>
                <div className="container">
                    <div className="header text-center">
                        <h2 className="fs-3 best-head mb-4"><span className="best-span ">Men Care</span> Products</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-10 ps-0">
                            <div
                                onMouseOver={() => {
                                    setShow(true)
                                }}
                                onMouseLeave={() => {
                                    setShow(false)
                                }}
                                id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div className="card" >
                                            <img src="hair-products-2048x999.jpg" className="card-img-top w-100" alt="..." />
                                            <div className="card-body">

                                                <div className="card-title">
                                                    <span className='me-2 catigo'>Heir</span>
                                                    <span className='me-2 catigo'>Men</span>
                                                    <span className='catigo'>Skin</span>
                                                </div>
                                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                <p className='card-title-price'>250,00 EGP</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item ">
                                        <div className="card" >
                                            <img src="hair-products-2048x999.jpg" className="card-img-top w-100" alt="..." />
                                            <div className="card-body">

                                                <div className="card-title">
                                                    <span className='me-2 catigo'>Heir</span>
                                                    <span className='me-2 catigo'>Men</span>
                                                    <span className='catigo'>Skin</span>
                                                </div>
                                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                <p className='card-title-price'>250,00 EGP</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item ">
                                        <div className="card" >
                                            <img src="hair-products-2048x999.jpg" className="card-img-top w-100" alt="..." />
                                            <div className="card-body">

                                                <div className="card-title">
                                                    <span className='me-2 catigo'>Heir</span>
                                                    <span className='me-2 catigo'>Men</span>
                                                    <span className='catigo'>Skin</span>
                                                </div>
                                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                <p className='card-title-price'>250,00 EGP</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>

                                {/* On Hover */}
                                {
                                    show ? <>  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                        <span className="fa-solid fa-arrow-left-long text-black bg-light p-2 rounded-circle" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                            <span className="fa-solid fa-arrow-right-long text-black bg-light p-2 rounded-circle" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button></> : null
                                }

                            </div>
                        </div>
                        <div className="col-md-2 pe-0">
                            <div className="men-best-selling">
                                <div className="img-component overflow-hidden">
                                    <img src="man-small.webp" alt="" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
