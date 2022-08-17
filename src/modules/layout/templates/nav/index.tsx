import { useMobileMenu } from "@lib/context/mobile-menu-context"
import Hamburger from "@modules/common/components/hamburger"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import DropdownMenu from "@modules/layout/components/dropdown-menu"
import MobileMenu from "@modules/mobile-menu/templates"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ContactNav from "../../components/ContactNav/ContactNav"
import Image from "next/image"
import Navbar from './../../components/Navbar';

const Nav = () => {
    const { pathname } = useRouter()
    const [isHome, setIsHome] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    //useEffect that detects if window is scrolled > 5px on the Y axis
    useEffect(() => {
        if (isHome) {
            const detectScrollY = () => {
                if (window.scrollY > 5) {
                    setIsScrolled(true)
                } else {
                    setIsScrolled(false)
                }
            }

            window.addEventListener("scroll", detectScrollY)

            return () => {
                window.removeEventListener("scroll", detectScrollY)
            }
        }
    }, [isHome])

    useEffect(() => {
        pathname === "/" ? setIsHome(true) : setIsHome(false)
    }, [pathname])

    const { toggle } = useMobileMenu()

    return (
        <>
            <ContactNav />
            <div
                className={clsx("sticky top-10 inset-x-0 z-50 group mb-2", {
                    "!fixed": isHome,
                    "top-0": !isHome || isScrolled,
                })}
            >
                <div className="container">

                    <header

                        className={clsx(
                            "relative h-16  mx-auto transition-colors py-4 bg-transparent border-b border-transparent duration-200 ",
                            {
                                "!bg-white ": !isHome || isScrolled,
                            }
                        )}
                    >
                        <nav
                            className={clsx(
                                "text-gray-900 flex items-center justify-between content-container h-full text-small-regular transition-colors duration-200 px-0",
                                {
                                    "text-white group-hover:text-gray-900 ": isHome && !isScrolled,
                                }
                            )}
                        >
                            <div className="row w-100">
                                <div className="col-md-8 pe-0">
                                    <div className="text center">
                                        <Navbar />
                                    </div>
                                </div>
                                <div className="col-md-4 px-0">
                                    <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end pt-2">
                                        <CartDropdown />
                                    </div>
                                </div>

                            </div>

                        </nav>
                        <MobileMenu />
                    </header>
                </div>
            </div>
        </>

    )
}

export default Nav
