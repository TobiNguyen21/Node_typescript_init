import { Request, Response, NextFunction } from "express";
import Main_service from "../services/news";
import ValidateReq from "../middleware/validateReq";

class News_controller {
    public async get(req: Request, res: Response, next: NextFunction): Promise<any> {
        let data: any;
        const expiresIn_getRss: number = 5;
        if (req.cookies.getRss && req.cookies.getRss >= Date.now()) {
            data = await Main_service.listItems(req.query, { 'task': 'off' });
        } else {
            res.cookie('getRss', Date.now() + expiresIn_getRss * 60 * 1000);
            data = await Main_service.listItems(req.query, { 'task': 'onl' });
        }

        if (!data || data.length === 0) return res.status(200).json({ success: true, count: 0, data: 'No data' });
        res.status(200).json({
            success: true,
            count: data.length,
            data: data
        })
    }
}

export default new News_controller();

