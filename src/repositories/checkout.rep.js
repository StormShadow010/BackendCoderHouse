import Stripe from "stripe";
import cartsManager from "../data/mongo/CartsManager.mongo.js";

import variablesEnviroment from "../utils/env/env.util.js";
import CheckoutProduct from "../dto/create/checkOutProduct.create.js";

const stripe = new Stripe(variablesEnviroment.STRIPE_SECRET_KEY);

const checkoutRepository = async (filter) => {
  try {
    let productsOnCart = await cartsManager.read(filter);
    productsOnCart = productsOnCart.map((each) => new CheckoutProduct(each));
    console.log(productsOnCart);
    const line_items = productsOnCart;
    const mode = "payment";
    const success_url =
      "https://coder-house-backend-project-frontend-cvwi.vercel.app/carts/thanks";
    const intent = await stripe.checkout.sessions.create({
      line_items,
      mode,
      success_url,
    });
    return intent;
  } catch (error) {
    throw error;
  }
};

export default checkoutRepository;
