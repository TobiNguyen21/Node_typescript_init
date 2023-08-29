import async from "../middleware/async";
import MainModel from "../models/item";

export default class Main_service {
    static async listItems(params: any, option: any): Promise<any> {
        // Find
        let queryFind = { ...params };
        ['select', 'sort', 'page', 'limit'].forEach(param => delete queryFind[param]);
        let queryStr = JSON.stringify(queryFind);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, find => `$${find}`);
        const find: any = JSON.parse(queryStr);
        // .Find

        // Select
        const select: any = (params.select) ? params.select.split(',').join(' ') : '';
        // .Select

        // Sort
        const sort: any = (params.sort) ? params.sort.split(',').join(' ') : '';
        // .Sort

        // Pagination
        const page: number = parseInt(params.page) || 1;
        const limit: number = parseInt(params.limit) || 6;
        const skip: number = (page - 1) * limit;
        // .Pagination

        if (option.task == 'all') {
            return await MainModel
                .find(find)
                .select(select)
                .sort(sort).skip(skip).limit(limit);
        }
        if (option.task == 'one') {
            return await MainModel
                .findById(params.id)
                .select({})
        }
    }
    static async create(item: any): Promise<any> {
        return await new MainModel(item).save();
    }
    static async editItem(params: any, option: any): Promise<any> {
        if (option.task == 'edit') {
            return await MainModel
                .updateOne({ _id: params.id }, params.body);
        }
    }
    static async deleteItem(params: any, option: any): Promise<any> {
        if (option.task == 'one') {
            return await MainModel
                .deleteOne({ _id: params.id })
        }
    }
}