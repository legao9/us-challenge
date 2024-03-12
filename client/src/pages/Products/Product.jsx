// ProductCatalog.js
import React, {useEffect, useState} from "react";
import "./Product.css"; // Import the CSS file
// import CheckoutForm from "../../components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import productImg1 from "../../assets/Black-Rice_Peas.png";
import { useNavigate } from "react-router-dom";
import productImg2 from  "../../assets/PreparedMeals.jpg";
import productImg3 from "../../assets/QuinoaBeans.jpg";
import { Elements } from "@stripe/react-stripe-js";
import productImg4 from  "../../assets/ChorizaTaco.jpeg";
import { apiUrl } from "../../utils/Constants";

const Product = () => {
  const stripePromise = loadStripe("pk_test_O0tvaykjxmHJ8denijFUBbPy");
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const handleCheckout = async () => {
    try {
      const response = await fetch(apiUrl+'api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            { id: 1, quantity: 3 },
            { id: 2, quantity: 1 },
            // Add more items as needed
          ],
        }),
      });

      if (!response.ok) {
        const errorJson = await response.json();
        throw new Error(errorJson.error);
      }

      const { res } = await response.json();
      
      // setCheckoutUrl(url);

    // navigate(res)
    setClientSecret(res)
    } catch (error) {
      console.error(error);
    }
  };
  
    // useEffect(() => {
    //   // Create PaymentIntent as soon as the page loads
    //   fetch("http://localhost:5000/api/stripe/stripePayment", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => setClientSecret(data.clientSecret));
    // }, []);
  console.log(clientSecret)
  const products = [
    {
      id: 1,
      title: "Quinoa & Beans",
      description: "Very flavorful alternative to black beans and rice.",
      tags: ["Vegan", "Eat Well"],
      image: productImg1,
      price: 19.99,
    },
    
  ];
  const options = {
    // passing the client secret obtained from the server
   clientSecret: "pi_3OPsnPBsvaxDJwym272xm7J6_secret_Xx67nFPnuVEChbTy3NJOyRnCM",
    layout: "tabs"
  };


  return (
    // <Elements stripe={stripePromise} options={options}>
    <div className="product-catalog">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <img src={product.image} alt={product.title} />
          <div className="product-info">
            <h3 className="product-heading">{product.title}</h3>
            <p className="product-tags">
              {product.tags?.map((tag) => (
                <span>{tag} |</span>
              ))}
            </p>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
          
            <button onClick={handleCheckout}>Add to Cart</button>
            {clientSecret && <a href={clientSecret} target="__blank">Checkout</a>}
          </div>
        </div>
      ))}
    </div>
    // </Elements>
  );
};

export default Product;
