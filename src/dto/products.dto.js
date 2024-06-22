import argsUtil from "../utils/args/args.util.js";
import crypto from "crypto";

const persistence = argsUtil.persistence;

class ProductsDto {
  constructor(data) {
    persistence !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.title = data.title;
    this.photo = data.photo || "/assets/icons/imagepreview.png";
    this.category = data.category || "Action";
    this.price = data.price || 1;
    this.stock = data.images || 1;
    persistence !== "mongo" && (this.createdAt = new Date());
    persistence !== "mongo" && (this.updatedAt = new Date());
  }
}

export default ProductsDto;
