export default function InfluencersReviews() {
    return (
        <>
            <section className="influencers py-4">
                <div className="container ">
                    <div className="row g-5 ">
                        <div className="col-md-6">
                            <div className="influencers-reviews pt-3 d-flex align-items-center flex-column">
                                <h3 className="h2 fw-bolder text-center mb-5 ">Here's what influencers are saying about Toyanaturals!</h3>
                                <div className="px-3">
                                    <iframe className="w-100" height="215" src="https://www.youtube.com/embed/D_xvcD1vNgk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 px-5 pt-4">
                            <div className="signup-discount py-3 ">
                                <h3 className="h3 fw-bolder  mb-5 text-center">Sign up now & get Extra 10% discount coupon!</h3>
                                <p className="text-center">Everything you need from Toyanaturals. All in your inbox!<br />
                                    Sign up for dermatologist-approved skincare and haircare tips along<br />
                                    with our latest product & offers news.</p>
                                <div className="subscribe d-flex justify-content-between mt-4 px-0 px-md-4">
                                    <input className="" type="email" name="email" placeholder="Your email address" />
                                    <button className="btn rounded-0">Subscribe </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
