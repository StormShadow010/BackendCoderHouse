import { model, Schema } from "mongoose";
import mongossePaginate from "mongoose-paginate-v2"

let collection = "products";

const schema = new Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    photo: {
        type: String,
        default: "/assets/icons/imagepreview.png",
    },
    category: {
        type: String,
        default: "Action",
    },
    price: {
        type: Number,
        default: 1,
    },
    stock: {
        type: Number,
        default: 1,
    }
}, {
    timestamps: true
});

schema.plugin(mongossePaginate)

export const Product = model(collection, schema);
