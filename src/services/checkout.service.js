import { createPaymentRepository } from "../repositories/checkout.rep.js";

export const createPaymentService = async (data) => {
  try {
    const paymentRepository = createPaymentRepository(data);
    return paymentRepository;
  } catch (error) {
    throw error;
  }
};
