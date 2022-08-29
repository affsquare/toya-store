import { useState } from 'react';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
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
                        <div className="col-md-10 ps-0 carasol-slider">
                            <Carousel
                                additionalTransfrom={0}
                                arrows
                                autoPlaySpeed={3000}
                                centerMode={false}
                                className=""
                                containerClass="container-with-dots"
                                dotListClass=""
                                draggable
                                focusOnSelect={false}
                                infinite
                                itemClass=""
                                keyBoardControl
                                minimumTouchDrag={80}
                                pauseOnHover
                                renderArrowsWhenDisabled={false}
                                renderButtonGroupOutside={false}
                                renderDotsOutside={false}
                                responsive={{
                                    desktop: {
                                        breakpoint: {
                                            max: 3000,
                                            min: 1024
                                        },
                                        items: 4,
                                        partialVisibilityGutter: 40
                                    },
                                    mobile: {
                                        breakpoint: {
                                            max: 464,
                                            min: 0
                                        },
                                        items: 1,
                                        partialVisibilityGutter: 30
                                    },
                                    tablet: {
                                        breakpoint: {
                                            max: 1024,
                                            min: 464
                                        },
                                        items: 2,
                                        partialVisibilityGutter: 30
                                    }
                                }}
                                rewind={false}
                                rewindWithAnimation={false}
                                rtl={false}
                                shouldResetAutoplay
                                showDots={false}
                                sliderClass=""
                                slidesToSlide={1}
                                swipeable
                            >
                                <div className="card" >
                                    <img src="men-products-2048x999.jpg " className="card-img-top w-100" alt="..." />
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

                                <div className="card" >
                                    <img src="men-products-2048x999.jpg " className="card-img-top w-100" alt="..." />
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

                                <div className="card" >
                                    <img src="men-products-2048x999.jpg " className="card-img-top w-100" alt="..." />
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
                                <div className="card" >
                                    <img src="men-products-2048x999.jpg " className="card-img-top w-100" alt="..." />
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
                                <div className="card" >
                                    <img src="men-products-2048x999.jpg " className="card-img-top w-100" alt="..." />
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
                            </Carousel>
                            
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
