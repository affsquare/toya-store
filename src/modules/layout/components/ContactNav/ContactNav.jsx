import Style from "./ContactNav.module.css"

import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import Link from "next/link"

export default function
  ContactNav() {


  return (
    <>
      <header className={`${Style.header}`}>
        <div className="container  mt-2">
          <div className="row justify-content-between align-items-center">
            {/* contact */}
            <div className="col-lg-3">
              <div className={`${Style.contact} contact d-flex `}>
                <div className={` contact-questions`}>
                  <span><i className="fa-solid fa-headphones-simple"></i></span>
                  <span className="ms-2">Got Questions?</span>
                </div>
                <div className="contact-number">
                  <span className="ms-3">+201101899338</span>
                </div>
              </div>
            </div>

            {/*Login & social Icons */}
            <div className="col-lg-3">
              <div className="Login-social d-flex justify-content-end align-items-center">
                {/* Login */}
                <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
                  <div className="hidden small:flex items-center gap-x-6 h-full">
                    {process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
                    <Link href="/account">
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
                  <span className={`${Style.icon} px-4`}><i className="fa-brands fa-facebook-f"></i></span>
                  <span className={`${Style.icon}`}><i className="fa-brands fa-instagram"></i></span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>
    </>

  )
}
