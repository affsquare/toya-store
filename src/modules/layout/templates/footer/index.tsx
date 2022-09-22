import FooterCTA from "@modules/layout/components/footer-cta"
// import FooterNav from "@modules/layout/components/footer-nav"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import FooterNav from './FooterNav';

const Footer = () => {
    return (
        <footer className="footer">
            {/* <FooterCTA /> */}
            {/* <FooterNav />
      <MedusaCTA /> */}

            <div className="container text-center d-flex flex-column align-items-center justify-content-center">
                <div className="footer-line "></div>
                {/* Logo Img */}
                <div className="footer-logo d-flex justify-content-center pt-5">
                    <img src="Logo.png" alt="toya-logo " className="w-75" />
                </div>

                {/* Download App from Play Store */}
                <div className="download-app d-flex my-4 ">
                    <button className="btn btn-small play-store d-flex align-items-center me-3 px-3 ">
                        <img src="Group.png" alt="download from Play Store " />
                        <div className="download ms-3">
                            <p className="now">Download Now</p>
                            <p className="store">Play Store</p>
                        </div>
                    </button>
                    <button className="btn btn-small play-store d-flex align-items-center  px-3 ">
                        <img src="Vector.png" alt="download from Play Store " />
                        <div className="download ms-3">
                            <p className="now">Download Now</p>
                            <p className="store">Play Store</p>
                        </div>
                    </button>
                </div>

                {/* Footer NAv Component */}
                <FooterNav />

                {/* Footer Contact NAv */}
                <div className="contact-Nav w-100 py-5">
                    {/* Contact info */}
                    <div className="footer-contact d-flex justify-content-between ">
                        <div className="contact d-flex items-center">
                            <div className="contact-questions flex items-center">
                                <span className="icon-headphone-svgrepo-com"></span>
                                <span className="ms-2">Got Questions?</span>
                            </div>
                            <div className="contact-number">
                                <span className="ms-3">+201101899338</span>
                            </div>
                        </div>
                        {/* Social Icons */}
                        <div className="social">
                            <span className="pe-3"><span className="icon-facebook-svgrepo-com"></span></span>
                            <span className="icon-instagram"></span>
                        </div>
                        {/* Copy right */}
                        <div className="copy-right d-flex align-items-center">
                            <span className="icon-copyright-svgrepo-com-2 me-2"></span>
                            <p>2022 Toya Naturals</p>
                        </div>
                    </div>
                </div>

            </div>

        </footer>
    )
}

export default Footer
