import { createPaymentService } from "../services/checkout.service.js";

export const createPayment = async (req, res, next) => {
  try {
    const { uid } = req.query;
    const response = await createPaymentService({ user_id: uid });
    return res.response201(response);
  } catch (error) {
    return next(error);
  }
};
