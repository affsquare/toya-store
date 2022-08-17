import React from 'react'
import Link from 'next/link'
import Image from "next/image"

export default function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg text-dark pt-3">
                <div className="container p-0">
                    <div >
                        <Link href="/">
                            <a>
                                <Image
                                    src="/Logo.png"
                                    width={60}
                                    height={60}
                                    alt=""
                                    className="w-100"
                                    draggable="false"
                                />
                            </a>
                        </Link>
                    </div>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item main-nav px-3 fw-bold">
                                <Link className="nav-link" href="/">Home</Link>
                            </li>
                            <li className="nav-item main-nav px-3 fw-bold">
                                <Link className="nav-link" href="/aboutUs">About Us</Link>
                            </li>
                            <li className="nav-item main-nav px-3 fw-bold">
                                <Link className="nav-link" href="/contactUs">Contact Us</Link>
                            </li>
                            <li className="nav-item main-nav px-3 fw-bold">
                                <Link className="nav-link" href="/shop">Shop</Link>
                            </li>
                            <li className="nav-item main-nav px-3 fw-bold">
                                <Link className="nav-link" href="/categories">Categories</Link>
                            </li>
                            <li className="nav-item main-nav px-3 fw-bold">
                                <Link className="nav-link" href="/blogs">Blogs</Link>
                            </li>
                            <li className="nav-item main-nav px-3 fw-bold">
                                <Link className="nav-link" href="/askToya">Ask Toya</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}
