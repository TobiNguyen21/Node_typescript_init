import mongoose from "mongoose";
import { col_name } from "../configs/col_name";

interface MainDocument extends mongoose.Document {
    name: String,
    content: String
}

const schema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const MainModel = mongoose.model<MainDocument>(col_name.col_items, schema);

export default MainModel;