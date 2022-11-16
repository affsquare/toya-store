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
import Navbar from "./../../components/Navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
        className={clsx("sticky top-0 inset-x-0 z-50 group", {
          "   fixed top-8": isHome,
          "top-0": !isHome || isScrolled,
        })}
      >
        <div className="container">
          <header
            className={clsx(
              "relative h-full  mx-auto transition-colors bg-transparent border-b border-transparent duration-200 ",
              {
                "!bg-white ": !isHome || isScrolled,
              }
            )}
          >
            <nav
              className={clsx(
                "text-gray-900 flex items-center justify-between container h-full  text-small-regular transition-colors duration-200 px-0",
                {
                  "text-white group-hover:text-gray-900 ":
                    isHome && !isScrolled,
                }
              )}
            >
              <div className="container">
                <div className="flex items-center w-100 justify-between">
                  <div className="col-9 ">
                    <div className="text center">
                      <Navbar />
                    </div>
                  </div>
                  <div className="col-3 ">
                    <div className="flex  items-center justify-end">
                      <div className=" items-center   me-1">
                        <CartDropdown />
                      </div>

                      <div className=" hamburger text-dark ms-4 me-2 pe-1">
                        <FontAwesomeIcon
                          icon={["fas", "bars"]}
                          size="lg"
                          onClick={toggle}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="flex-1 basis-0 h-full flex items-center ms-4 text-gray-500"> */}

              {/* <div className="hidden small:block h-full">
                                    <DropdownMenu />
                                </div> */}
              {/* </div> */}
            </nav>
            <MobileMenu />
          </header>
        </div>
      </div>
    </>
  )
}

export default Nav
