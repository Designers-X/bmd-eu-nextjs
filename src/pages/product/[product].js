import React, { useState,useEffect } from "react";
import styles from './styles.module.css'
import MarkqueCarousel from "@/utilities/MarkqueCarousel";
import TrustBadge from "@/utilities/TrustBadges";
import { NewsLetter } from "@/utilities/NewsLetter";
import PatnerData from "../../../json/parters.json"
import TrustBadgeData from '../../../json/trustBages.json'
import ProductsData from '../../../json/products.json'
import ProductCard from "@/utilities/ProductCard";
import BenefitCards from "@/utilities/BenefitCards";
import Tabs from "@/utilities/Tabs";
import Client from 'shopify-buy';
import PageHead from "@/utilities/Head";
import Loader2 from "@/utilities/Loader/index2";
import ProductReviews from "@/utilities/ProductReviews";
import FourStepProcess from "@/utilities/FourStepProcess";

const Product = ({version}) => {
    const [load, setLoad] = useState(true)
    const [product, setProduct] = useState();
    const [shopifyP, setSProduct] = useState();
    let client = undefined
    if(version == 'EU'){
        client = Client.buildClient({
            domain: 'bruno-md-europe.myshopify.com',
            storefrontAccessToken: 'a51b71098dff9f7cfd68456c464991bb'
        });
    }
    if(version == 'ENG'){
        client = Client.buildClient({
            domain: 'brunomd.myshopify.com',
            storefrontAccessToken: '4233f2f4417f089c3d28dbd476de595c'
        });
    }
    // const products = getAllProducts();
    const {title, details, newsletter,fourStepProcess, theme, images, declaimer, EXTERNALID, STOREFRONTID, SLUG, benefits,priceBox,price, seo } = product || {}
    useEffect( () => {
        let url = window.location.href;
        let splitUrl = url.split('/product/');
        if (splitUrl.length == 2) {
            let product = ProductsData[splitUrl[1]];
            if (product?.EXTERNALID) {
                const productId = `gid://shopify/Product/${product.EXTERNALID}`;
                client.product.fetch(productId).then((product) => {
                    if (product) {
                        setSProduct(product)
                        setLoad(false)
                    }
                });
                setProduct(product);
            } else {
                window.location.href = '/';
            }
        } else {
            window.location.href = '/';
        }
    }, [load,shopifyP, product])

    if(load) return( <Loader2 />)
    return (
        <section style={{ margin: '2rem auto' }}>
            <PageHead content={seo}/>
            {true && <ProductCard data={{ images, declaimer, priceDescription: { EXTERNALID, STOREFRONTID, SLUG, price,theme ,priceBox } }} base={{client,shopifyP}}/>}
            {benefits && <BenefitCards data={benefits} productColorTheme={theme}/>}
            <Tabs data={details} productColorTheme={theme}/>
            {fourStepProcess?.content &&<FourStepProcess processCards={fourStepProcess.content} theme={theme} header={fourStepProcess.title} buttonTittle={fourStepProcess.buttonTittle} stepAlignment={fourStepProcess.stepAlignment}/>}
            <TrustBadge contents={TrustBadgeData[version]} productColorTheme={theme}/>
            <MarkqueCarousel image={PatnerData} />
            <NewsLetter content={newsletter} />
            <ProductReviews variantId={EXTERNALID} />
        </section>
    )
}
export default Product