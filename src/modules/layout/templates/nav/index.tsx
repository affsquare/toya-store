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
    <ContactNav/>
    <div
      className={clsx("sticky top-7 inset-x-0 z-50 group", {
        "!fixed": isHome,
        "top-0" : !isHome || isScrolled,
      })}
    >
      <header
        className={clsx(
          "relative h-16 px-8 mx-auto transition-colors pt-3 bg-transparent border-b border-transparent duration-200 ",
          {
            "!bg-white !border-gray-200": !isHome || isScrolled,
          }
        )}
      >
        <nav
          className={clsx(
            "text-gray-900 flex items-center justify-between w-full h-full text-small-regular transition-colors duration-200",
            {
              "text-white group-hover:text-gray-900": isHome && !isScrolled,
            }
          )}
        >
          {/* Logo Image */}
          <div className="flex items-center h-full">
            <Link href="/">
              <a>
              <Image
                  src="/Logo.png"
                  width={50}
                  height={50}
                  alt=""
                  className="w-100"
                  draggable="false"
                />
              </a>
            </Link>
          </div>
          
          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <CartDropdown />
          </div>
        </nav>
        <MobileMenu />
      </header>
    </div>
    </>
    
  )
}

export default Nav
