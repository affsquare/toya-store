import { ProductProvider } from "@lib/context/product-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import { Product } from "@medusajs/medusa"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import React, { useRef } from "react"
import ImageGallery from "../components/image-gallary"
import MobileActions from "../components/mobile-actions"
// import ProductPreview from '@modules/products/components/product-preview';
import { Image as MedusaImage } from "@medusajs/medusa"
import Image from "next/image"

type ProductTemplateProps = {
  product: Product
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  const info = useRef<HTMLDivElement>(null)

  const inView = useIntersection(info, "0px")
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  return (
    <ProductProvider product={product}>
      <div className="container ">
        <div className="row justify-between">

          {/* ProductInfo */}
          <div className="col-md-5">
            <div
              className="mb-3 "
              ref={info}
            >
              <ProductInfo product={product} />
              <ProductTabs product={product} />
            </div>
          </div>

          {/* Image  */}
          {/* <ImageGallery images={product.images} /> */}
          <div className="col-md-5">
            <div className="">
              <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {product?.images.map((image, index) => {
                    return (
                      <div
                        ref={(image) => imageRefs.current.push(image)}
                        key={image.id}
                        className=" aspect-[29/29] w-100 carousel-item active"
                        id={image.id}
                      >
                        <Image
                          src={image.url}
                          layout="fill"
                          objectFit="cover"
                          priority={index <= 2 ? true : false}
                          className=" "
                          alt={`Product image ${index + 1}`}
                        />
                      </div>
                    )
                  })}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon " aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                  <span className="carousel-control-next-icon " aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="content-container my-16 px-6 small:px-8 small:my-32">
        {/* <RelatedProducts product={product} /> */}
      </div>
      <MobileActions product={product} show={!inView} />

    </ProductProvider>
  )
}

export default ProductTemplate
