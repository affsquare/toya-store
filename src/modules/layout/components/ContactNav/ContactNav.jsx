import Style from "./ContactNav.module.css"

import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import dynamic from "next/dynamic"


export default function
  ContactNav() {


  return (
    <>
      <header className={`${Style.header} contHead`}>
        <div className="container  mt-2">
          <div className="row justify-content-between align-items-center">
            {/* contact */}
            <div className="col-5">
              <div className={`${Style.contact} contact d-flex justify-start`}>
                <div className="contact-questions d-flex align-items-center">
                  {/* <i className="fa-solid fa-headphones-simple"></i> */}
                  <span className="icon-headphone-svgrepo-com"></span>
                  <span className="ms-2">Got Questions?</span>
                </div>
                <div className="contact-number">
                  <span className="ms-3">+201101899338</span>
                </div>
              </div>
            </div>

            {/* Login & social Icons */}

            <div className="col-3">
              <div className="Login-social d-flex justify-content-end align-items-center">
                {/* Login */}
                <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
                  <div className="hidden small:flex items-center gap-x-6 h-full">
                    {process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
                    <Link href="/account/login">
                      <a>
                        <div className={`${Style.Login} Login px-3 d-flex justify-content-end align-items-center`}>
                          <span className={`${Style.icon}`}><i className="fa-regular fa-user"></i></span>
                          <span className="ms-2">Login</span>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
                {/* Social Icons */}
                <div className="social">
                  <span className="icon-facebook-svgrepo-com"></span>
                  <span className="ms-3 icon-instagram"></span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>
    </>

  )
}
