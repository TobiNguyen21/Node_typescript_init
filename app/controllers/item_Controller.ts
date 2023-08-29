import { Request, Response, NextFunction } from "express";
import Main_service from "../services/item";
import ValidateReq from "../middleware/validateReq";

class Item_controller {
    public async get(req: Request, res: Response, next: NextFunction): Promise<any> {
        const data = await Main_service.listItems(req.query, { 'task': 'all' })
        if (!data || data.length === 0) return res.status(200).json({ success: true, count: 0, data: 'No data' });
        res.status(200).json({
            success: true,
            count: data.length,
            data: data
        })
    }
    public async getOne(req: Request, res: Response, next: NextFunction): Promise<any> {
        const data = await Main_service.listItems({ 'id': req.params.id }, { 'task': 'one' })
        if (!data) return res.status(200).json({ success: true, data: 'No data' });
        res.status(200).json({
            success: true,
            data: data
        })
    }
    public async post(req: Request, res: Response, next: NextFunction): Promise<any> {
        const item = req.body || {};
        const err = ValidateReq.init(req, res, next);

        if (!err) {
            const data = await Main_service.create(item);
            res.status(201).json({
                success: true,
                data: data
            })
        }
    }
    public async put(req: Request, res: Response, next: NextFunction): Promise<any> {
        const body = req.body || {};
        const err = ValidateReq.init(req, res, next);

        if (!err) {
            const data = await Main_service.editItem({ 'id': req.params.id, 'body': body }, { 'task': 'edit' })
            res.status(200).json({
                success: true,
                data: data
            })
        }
    }
    public async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
        const data = await Main_service.deleteItem({ 'id': req.params.id }, { 'task': 'one' })
        res.status(200).json({
            success: true,
            data: data
        })
    }
}

export default new Item_controller();

