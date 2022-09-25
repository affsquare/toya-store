import React from 'react'
import Link from 'next/link'
import Image from "next/image"
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { MEDUSA_BACKEND_URL } from "../../../lib/config"
import { useRouter } from 'next/router';

export default function Navbar() {

    const router = useRouter();

    const httpClient = axios.create({
        baseURL: MEDUSA_BACKEND_URL
    })

    const [collections, setCollections] = useState([])

    useEffect(() => {
        httpClient.get("/store/collections").then(({ data }) => {
            setCollections(data?.collections)
        })
    })

    const [qb, setQb] = useState({
        filter: {},
        order: {},
        search: ""
    })

    const query = useMemo(() => {

        let queries = [];

        if (qb.filter) {
            queries = queries.concat(
                Object.keys((qb.filter)).map((k) => `filter[${k}]=${qb.filter?.[k]}`)
            )
        }

        if (qb.order) {
            let map_ = Object.keys((qb.order)).map((k) => `order[${k}]=${qb.order?.[k]}`)
            queries = queries.concat(map_)
        }

        if (qb.search) {
            const deepSearch = queries.findIndex((k) => k.includes("search"));

            if (deepSearch !== -1) {
                queries[deepSearch] = `search=${qb?.search}`;
            }

            else {
                queries.push(`search=${qb?.search}`);
            }
        }

        return queries.join("&");
    }, [qb])

    return (
        <>
            <nav className="navbar navbar-expand-lg text-dark ">
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
                            <li className={router.pathname == "/" ? "activeLink px-3 fw-bold" : "nav-item main-nav px-3 fw-bold"}>
                                <Link className="nav-link" href="/">Home</Link>
                            </li>
                            <li className={router.pathname == "/aboutUs" ? "activeLink px-3 fw-bold" : "nav-item main-nav px-3 fw-bold"} >
                                <Link className="nav-link" href="/aboutUs">About Us</Link>
                            </li>
                            <li className={router.pathname == "/contactUs" ? "activeLink px-3 fw-bold" : "nav-item main-nav px-3 fw-bold"}>
                                <Link className="nav-link" href="/contactUs">Contact Us</Link>
                            </li>
                            <li className={router.pathname == "/shop" ? "activeLink px-3 fw-bold" : "nav-item main-nav px-3 fw-bold"}>
                                <Link className="nav-link" href="/shop">Shop</Link>
                            </li>
                            <li class="dropdown">
                                <a class="nav-item main-nav px-3 fw-bold dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </a>

                                <ul className="dropdown-menu">
                                    {collections?.map((c, i) => (
                                        <>
                                            <li key={i} className="dropdown-item">
                                                <Link href={`/collections/${c.id}`}>
                                                    <div className="text-small-regular text-xs text-gray-500 fw-bold">
                                                        <div>{c?.title}</div>
                                                    </div>
                                                </Link>

                                            </li>
                                        </>
                                    ))}
                                    
                                </ul>

                            </li>
                            <li className={router.pathname == "/blogs" ? "activeLink px-3 fw-bold" : "nav-item main-nav px-3 fw-bold"}>
                                <Link className="nav-link" href="/blogs">Blogs</Link>
                            </li>
                            <li className={router.pathname == "/askToya" ? "activeLink px-3 fw-bold" : "nav-item main-nav px-3 fw-bold"}>
                                <Link className="nav-link" href="/askToya">Ask Toya</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}
