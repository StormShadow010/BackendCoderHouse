import { createPaymentService } from "../services/checkout.service.js";

export const createPayment = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const response = await createPaymentService(user_id);
    return res.response201(response);
  } catch (error) {
    return next(error);
  }
};
