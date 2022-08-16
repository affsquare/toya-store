import FooterCTA from "@modules/layout/components/footer-cta"
// import FooterNav from "@modules/layout/components/footer-nav"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import FooterNav from './FooterNav';

const Footer = () => {
  return (
    <footer className="footer ">
      {/* <FooterCTA /> */}
      {/* <FooterNav />
      <MedusaCTA /> */}
      <div className="container text-center d-flex flex-column align-items-center">
        <div className="footer-logo d-flex justify-content-center">
          <img src="Logo.png" alt="toya-logo " className="w-75" />
        </div>
        <FooterNav/>
      </div>

    </footer>
  )
}

export default Footer
