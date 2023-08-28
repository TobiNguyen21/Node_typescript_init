import MainModel from "../models/item";

export default class Main_service {
    static async listItems(params: any, option: any): Promise<any> {
        const queryFind = { ...params };

        let find: any, select: any, sort: any;
        // Create fields remove
        let removeFields = ['select', 'sort', 'page', 'limit'];

        // Remove fields 
        removeFields.forEach(param => delete queryFind[param]);

        // Create query string
        let queryStr = JSON.stringify(queryFind);

        // replace 
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, find => `$${find}`);

        //parse
        find = JSON.parse(queryStr);

        // select fields
        if (params.select) {
            select = params.select.split(',').join(' ');
        }

        // sort fields
        if (params.sort) {
            sort = params.sort.split(',').join(' ');
        }

        //pagination
        const page = parseInt(params.page) || 1;
        const limit = parseInt(params.limit) || 6;
        const skip = (page - 1) * limit;

        if (option.task == 'all') {
            return MainModel
                .find(find)
                .select(select)
                .sort(sort)
                .skip(skip).limit(limit)
        }
        if (option.task == 'one') {
            return MainModel
                .findById(params.id)
                .select({})
        }
    }
}