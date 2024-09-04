import checkoutRepository from "../repositories/checkout.rep.js";

export const createPaymentService = async (filter) => {
  try {
    const response = checkoutRepository(filter);
    return response;
  } catch (error) {
    throw error;
  }
};
