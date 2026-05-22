import {useEffect} from "react";

function ProductPage() {
    useEffect(() => {
      if(!product?._id) return;
      
      let items = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

      // Remove duplicate
      items = items.filter((item) => item.productId !== product._id);
      // Add to the beginning
      items.unshift({ productId: product._id });
     
      // Limit to 20 items 
      if (items.length > 20) {
        items = items.slice(0, 20);
      }
      localStorage.setItem("recentlyViewed", JSON.stringify(items));  
    }, [product]);

    return (
        <div>
            /* Product details here */
            <H2>Product?.name</H2>
            <p>Product?.price</p>
        </div>
    );
}
export default ProductPage;

