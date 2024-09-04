import { createPaymentService } from "../services/checkout.service.js";

export const createPayment = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await createPaymentService(uid);
    return res.response201(response);
  } catch (error) {
    return next(error);
  }
};
