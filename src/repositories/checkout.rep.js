import Stripe from "stripe";
import cartsManager from "../data/mongo/CartsManager.mongo.js";

import variablesEnviroment from "../utils/env/env.util.js";
import CheckoutProduct from "../dto/create/checkOutProduct.create.js";

const stripe = new Stripe(variablesEnviroment.STRIPE_SECRET_KEY);

export const createPaymentRepository = async (user_id) => {
  try {
    let productsOnCart = await cartsManager.read({ user_id });
    CheckoutProduct;
    productsOnCart = productsOnCart.map(
      (product) => new CheckoutProduct(product)
    );
    console.log(productsOnCart);
    const line_items = productsOnCart;
    const mode = "payment";
    const success_url = "http://localhost:8080/thanks.html";
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
