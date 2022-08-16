import Image from 'next/image'
import React from 'react'
import hair from '../../../../public/hair-products-2048x999.jpg'
import men from '../../../../public/men-products-2048x999.jpg'
import body from '../../../../public/body-products-02-2048x999.webp'
import skin from '../../../../public/skin-products-2-2048x999.jpg'
export default function index() {
    return (
        <>
            <section className="categories text-center  my-4">
                <div className="container">
                    <div className="header d-flex justify-content-center align-items-center mb-4">
                        <span className="header-line"></span>
                        <h2 className="text-uppercase header-categories px-3">Categories</h2>
                        <span className="header-line"></span>
                    </div>
                    <div className="row g-4">
                        {/* Hair Products*/}
                        <div className="col-md-6 ps-0">
                            <div className="hair categories-components overflow-hidden">
                                <div className="img ">
                                    <Image
                                        src={hair}
                                        alt="hair-products"
                                        className="w-100"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Men Products*/}
                        <div className="col-md-6 pe-0 ">
                            <div className="men categories-components overflow-hidden">
                                <div className="img ">
                                    <Image
                                        src={men}
                                        alt="men-products"
                                        className="w-100"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Body Products*/}
                        <div className="col-md-6 ps-0">
                            <div className="body categories-components overflow-hidden">
                                <div className="img ">
                                    <Image
                                        src={body}
                                        alt="body-products"
                                        className="w-100"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Skin Products*/}
                        <div className="col-md-6 pe-0">
                            <div className="skin categories-components overflow-hidden">
                                <div className="img ">
                                    <Image
                                        src={skin}
                                        alt="skin-products"
                                        className="w-100"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>

    )
}
