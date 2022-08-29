import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
export default function Blogs() {

    return (
        <>
            <section className="blogs my-5">
                <div className="container">
                    <div className="header text-center mb-4">
                        <h2 className=" blog-head mb-1"> Blogs</h2>
                        <span className="fw-bold mt-3 mb-4 d-block">Learn More</span>
                    </div>
                    {/* <Carousel
                        additionalTransfrom={0}
                        arrows
                        autoPlaySpeed={3000}
                        centerMode={false}
                        className=""
                        containerClass="container-with-dots"
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        infinite
                        itemClass=""
                        keyBoardControl
                        minimumTouchDrag={80}
                        pauseOnHover
                        renderArrowsWhenDisabled={false}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={{
                            desktop: {
                                breakpoint: {
                                    max: 3000,
                                    min: 1024
                                },
                                items: 4,
                                partialVisibilityGutter: 40
                            },
                            mobile: {
                                breakpoint: {
                                    max: 464,
                                    min: 0
                                },
                                items: 1,
                                partialVisibilityGutter: 30
                            },
                            tablet: {
                                breakpoint: {
                                    max: 1024,
                                    min: 464
                                },
                                items: 2,
                                partialVisibilityGutter: 30
                            }
                        }}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={false}
                        shouldResetAutoplay
                        showDots={false}
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                    >
                        <div className="card border-0">
                            <img src="natural.jpg" className="card-img-top w-100" alt="..." />
                            <div className="card-body blog-card-body blog-box-body px-4">
                                <p className="card-text">6 Natural Ingredients to avoid in homemade skincare masks</p>
                                <span>February 3, 2022</span>
                            </div>
                            <p className="px-4 card-p">Most girls search for DIYs to discover more homemade skincare masks made with natural (available) in...</p>

                        </div>

                        <div className="card border-0">
                            <img src="natural.jpg" className="card-img-top w-100" alt="..." />
                            <div className="card-body blog-card-body blog-box-body px-4">
                                <p className="card-text">6 Natural Ingredients to avoid in homemade skincare masks</p>
                                <span>February 3, 2022</span>
                            </div>
                            <p className="px-4 card-p">Most girls search for DIYs to discover more homemade skincare masks made with natural (available) in...</p>

                        </div>

                        <div className="card border-0">
                            <img src="natural.jpg" className="card-img-top w-100" alt="..." />
                            <div className="card-body blog-card-body blog-box-body px-4">
                                <p className="card-text">6 Natural Ingredients to avoid in homemade skincare masks</p>
                                <span>February 3, 2022</span>
                            </div>
                            <p className="px-4 card-p">Most girls search for DIYs to discover more homemade skincare masks made with natural (available) in...</p>

                        </div>
                        <div className="card border-0">
                            <img src="natural.jpg" className="card-img-top w-100" alt="..." />
                            <div className="card-body blog-card-body blog-box-body px-4">
                                <p className="card-text">6 Natural Ingredients to avoid in homemade skincare masks</p>
                                <span>February 3, 2022</span>
                            </div>
                            <p className="px-4 card-p">Most girls search for DIYs to discover more homemade skincare masks made with natural (available) in...</p>

                        </div>
                        <div className="card border-0">
                            <img src="natural.jpg" className="card-img-top w-100" alt="..." />
                            <div className="card-body blog-card-body blog-box-body px-4">
                                <p className="card-text">6 Natural Ingredients to avoid in homemade skincare masks</p>
                                <span>February 3, 2022</span>
                            </div>
                            <p className="px-4 card-p">Most girls search for DIYs to discover more homemade skincare masks made with natural (available) in...</p>

                        </div>
                    </Carousel> */}
                    <div className="row">
                        <div className="col-md-3">
                            <div className="blog-box pb-3">
                                <div className="card border-0">
                                    <img src="natural.jpg" className="card-img-top w-100" alt="..." />
                                    <div className="card-body blog-card-body blog-box-body px-4">
                                        <p className="card-text">6 Natural Ingredients to avoid in homemade skincare masks</p>
                                        <span>February 3, 2022</span>
                                    </div>
                                    <p className="px-4 card-p">Most girls search for DIYs to discover more homemade skincare masks made with natural (available) in...</p>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="blog-box pb-3">
                                <div className="card border-0">
                                    <img src="natural.jpg" className="card-img-top w-100" alt="..." />
                                    <div className="card-body blog-card-body blog-box-body px-4">
                                        <p className="card-text">6 Natural Ingredients to avoid in homemade skincare masks</p>
                                        <span>February 3, 2022</span>
                                    </div>
                                    <p className="px-4 card-p">Most girls search for DIYs to discover more homemade skincare masks made with natural (available) in...</p>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="blog-box pb-3">
                                <div className="card border-0">
                                    <img src="natural.jpg" className="card-img-top w-100" alt="..." />
                                    <div className="card-body blog-card-body blog-box-body px-4">
                                        <p className="card-text">6 Natural Ingredients to avoid in homemade skincare masks</p>
                                        <span>February 3, 2022</span>
                                    </div>
                                    <p className="px-4 card-p">Most girls search for DIYs to discover more homemade skincare masks made with natural (available) in...</p>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="blog-box pb-3">
                                <div className="card border-0">
                                    <img src="natural.jpg" className="card-img-top w-100" alt="..." />
                                    <div className="card-body blog-card-body blog-box-body px-4">
                                        <p className="card-text">6 Natural Ingredients to avoid in homemade skincare masks</p>
                                        <span>February 3, 2022</span>
                                    </div>
                                    <p className="px-4 card-p">Most girls search for DIYs to discover more homemade skincare masks made with natural (available) in...</p>

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>
        </>
    )
}
