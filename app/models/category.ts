import mongoose from "mongoose";
import { col_name } from "../configs/col_name";

interface MainDocument extends mongoose.Document {
    name: String,
    slug: String,
    link: String
}

const schema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

const MainModel = mongoose.model<MainDocument>(col_name.col_category, schema);

export default MainModel;