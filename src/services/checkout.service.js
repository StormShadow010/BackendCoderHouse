import { createPaymentRepository } from "../repositories/checkout.rep.js";

export const createPaymentService = async (filter) => {
  try {
    const response = createPaymentRepository(filter);
    return response;
  } catch (error) {
    throw error;
  }
};
