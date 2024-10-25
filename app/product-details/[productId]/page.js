"use client";
import ProductApis from "../../_utils/ProductApis";
import React, { useEffect, useState } from "react";
import ProductBanner from "./_components/ProductBanner";
import ProductInfo from "./_components/ProductInfo";
import ProductList from "../../_components/ProductList";
import { usePathname } from "next/navigation";
import BreadCrumb from "../../_components/BreadCrumb";

function ProductDetails({ params }) {
  const[path2,setPath2]=useState(0); // Initialized to 0
  const path = usePathname();
  const [productDetails, setProductDetails] = useState({});
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProductById_();
  }, [params?.id]);

  const getProductById_ = () => {
    console.log(`Fetching product with ID: ${params.id}`);
    console.log(params) // Log productId
    ProductApis.getProductById(params.productId)
      .then((res) => {
        console.log("Product item: ", res.data.data);
        setPath2(res.data.data.id); // Reassign path2 with the actual ID
        console.log("Updated path2:", path2); // Log path2 to verify it is now 39
        setProductDetails(res.data.data);
        getProductListByCategory(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error); // Log errors if they occur
      });
  };

  const getProductListByCategory = (product) => {
    ProductApis.getProductsByCategory(product?.category).then((res) => {
      console.log(res?.data?.data);
      setProductList(res?.data?.data);
    });
  };

  return (
    <div className="px-10 py-8 md:px-28">
      <BreadCrumb path2={path2} path={path} />
      <div className="grid justify-around grid-cols-1 gap-5 mt-10 sm:gap-0 sm:grid-cols-2">
        <ProductBanner product={productDetails} />
        <ProductInfo product={productDetails} />
      </div>
      <div>
        <h2 className="mt-24 mb-4 text-xl">Similar Products</h2>
        <ProductList productList={productList} />
      </div>
    </div>
  );
}

export default ProductDetails;
