import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function ContactUs() {
    return (
        <>
            <div className="container">
                <Link href="/">
                    <a className=" inline-block mt-5  text-gray-700 h6 back-to-chart">
                        <span className="icon-arrow-left fw-bold"></span> <span className="ms-2">Get back to home page</span>
                    </a>
                </Link>
                <h2 className="text-center text-uppercase h1 toya-color my-5 ">Contact Us</h2>
                <div className="contact-content mb-5">
                    <div className="row mt-4">
                        <div className="col-md-6">
                            <div className="contact-info mb-5">
                                {/* <h3 className="h2 mb-4">We would love to hear from you!</h3>
                                <p className="">At Toya Naturals Corporation, we proudly stand behind our quality products and our quality controls. If you are not satisfied with the condition of the product you purchased from us or from one of our authorized sellers in Egypt or KSA, please contact us to request a replacement product, if available, or compensation for the total value of the product. Complete the contact form for the fastest response. We aim to respond within 1 working day. For any skincare or hair care concerns, please use our free tool #AskToya to get tips directly from certified dermatologists.</p> */}
                                <iframe className="w-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13806.923719881304!2d31.383530011057246!3d30.10189147362744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458166a85d5c62b%3A0x92f695655d5df1c!2z2LTZitix2KfYqtmI2YbYjCDYtNmK2LHYp9iq2YjZhiDYp9mE2YXYt9in2LHYjCDZgtiz2YUg2KfZhNmG2LLZh9ip2Iwg2YXYrdin2YHYuNipINin2YTZgtin2YfYsdip4oCs!5e0!3m2!1sar!2seg!4v1663508004249!5m2!1sar!2seg" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                                </iframe>
                                <p className=" my-4"><span className="toya-color me-2"><span className="icon-rotate-cw"></span>  </span><span className="fw-bold">Working hours :</span>  We aim to respond within 24hrs.</p>
                                <p className=" mb-4">
                                    <span className="toya-color me-2 fs-5">
                                        <span className="icon-mobile-svgrepo-com "></span>
                                    </span>
                                    <span className="fw-bold">Phone :</span>
                                    +201101899338
                                </p>
                                <p className=""><span className="toya-color me-2"><span className="icon-mail"></span> </span > <span className="fw-bold">Mail  :</span>  support@toyanaturals.com</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="p-4 p-lg-5  contact-form ">
                                {/* <h3 className="toya-color h4">Drop Us</h3> */}
                                <h4 className="mt-3 mb-4  h6 toya-color">We will get back to you shortly.</h4>
                                <input className="form-control mb-5 py-2" type="text" placeholder="Your Name" />
                                <input className="form-control mb-5 py-2" type="email" placeholder="Your Email" />
                                <input className="form-control mb-5 py-2" type="number" placeholder="Number" />
                                <textarea className="form-control mb-5 " name="message" placeholder="Message" id="" cols="30" rows="3"></textarea>
                                <button className="toya-bg text-white text-lg w-100 py-2 rounded-3"> Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
