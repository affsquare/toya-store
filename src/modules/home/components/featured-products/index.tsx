import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import UnderlineLink from "@modules/common/components/underline-link"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import Categories from './../Categories';
import BestSeller from './../BestSeller';
import MenCareProducts from './../MenCareProducts';
import InfluencersReviews from './../InfluencersReviews';
import Blogs from './../Blogs';
const FeaturedProducts = () => {
    const { data } = useFeaturedProductsQuery()

    return (
        <div className="swiper-wrapper pt-10 mt-5">
            <div className="container  ">
                <div className="swiper-slider-bg ">
                    <img src="toya20-coupon-banner.jpg" alt="" className="w-100" />
                </div>
                
                {/* Categories Component */}
                <Categories />

                {/* <div className="flex flex-col items-center text-center mb-16">
                    <span className="text-base-regular text-gray-600 mb-6">
                        Latest product
                    </span>
                    <p className="text-2xl-regular text-gray-900 max-w-lg mb-4">
                        Our newest styles are here to help you look your best.
                    </p>
                    <UnderlineLink href="/store">Explore products</UnderlineLink>
                    </div>
                        <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-4 gap-y-8">
                    {data
                    ? data.map((product) => (
                        <li key={product.id}>
                            <ProductPreview {...product} />
                        </li>
                    ))
                    : Array.from(Array(4).keys()).map((i) => (
                        <li key={i}>
                            <SkeletonProductPreview />
                        </li>
                    ))}
                </ul> */}

                {/* Best Seller Component */}
                <BestSeller />

                {/* Enjoy-Time-Saving */}
                <section className="enjoy-time-saving my-5">
                    <div className="img-component overflow-hidden">
                        <img src="MAN-BANNER-2048x711.webp" alt="" />
                    </div>
                </section>

                {/* Mens Care Products Component */}
                <MenCareProducts/>

                {/* Sale Up */}
                <section className="sale-up my-5">
                    <div className="img-component overflow-hidden">
                        <img src="toya20-slider-eng.webp" alt="" />
                    </div>
                </section>

                {/* Influencers Reviews */}
                <InfluencersReviews/>

                {/* Blogs Components */}
                <Blogs/>
            </div>
        </div>
    )
}

export default FeaturedProducts
