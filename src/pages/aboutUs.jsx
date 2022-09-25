import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function AboutUs() {
  return (
    <>
      <div className="container mt-4 mb-5">
        <div className="row  g-5">

          {/*Our Brand  */}

          <div className="col-md-6 flex items-center">
            <div className="brand-info w-11/12 w-md-75">
              <Link href="/">
                <a className=" inline-block mt-5 mb-4 text-gray-700 h6 back-to-chart">
                  <span className="icon-arrow-left fw-bold"></span> <span className="ms-2">Get back to home page</span>
                </a>
              </Link>
              <h2 className="h1 toya-color mb-4">Our Brand</h2>
              <p className="">An Egyptian-made and owned brand. It was officially founded by Consultant dermatologists in 2018; however, the development of the products started earlier. Toya was born from a belief that the Pharaohs were beauty-obsessed, they sourced ingredients from nature to meet their skincare needs, and now people want to return to their roots and only use natural products, especially on their skin. That&apos;s why we&apos;re committed to delivering premium organic skincare formulas that were created 7000 years ago to preserve your youth.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="brand-image">
              <img src="WhatsApp-Image-2022-01-31-at-15.10.21-1024x1024.webp" alt="toya-brand" className="w-11/12" />
            </div>
          </div>

          {/*Our Approach  */}

          <div className="col-md-6 order-1 order-md-0">
            <div className=" approach-image">
              <img src="WhatsApp-Image-2022-01-31-at-15.10.20-1024x1024.webp" alt="toya-brand" className="w-11/12" />
            </div>
          </div>
          <div className="col-md-6 flex items-center order-0 order-md-1">
            <div className=" approach-info w-11/12 w-md-75">
              <h2 className="h1 toya-color mb-4">Our Approach</h2>
              <p className="">An Egyptian-made and owned brand. It was officially founded by Consultant dermatologists in 2018; however, the development of the products started earlier. Toya was born from a belief that the Pharaohs were beauty-obsessed, they sourced ingredients from nature to meet their skincare needs, and now people want to return to their roots and only use natural products, especially on their skin. That&apos;s why we&apos;re committed to delivering premium organic skincare formulas that were created 7000 years ago to preserve your youth.</p>
            </div>
          </div>

        </div>
      </div>


    </>
  )
}
