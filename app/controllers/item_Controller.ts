import { Request, Response, NextFunction } from "express";
import Main_service from "../services/item";

class Item_controller {
    public async get(req: Request, res: Response, next: NextFunction): Promise<any> {
        const data = await Main_service.listItems(req.query, { 'task': 'all' })
        //if (!data || data.length === 0) return res.status(200).json({ success: true, count: 0, data: 'No data' });
        res.status(200).json({
            success: true,
            count: data.length,
            data: data
        })
    }
}

export default new Item_controller();

