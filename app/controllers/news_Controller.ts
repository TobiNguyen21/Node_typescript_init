import { Request, Response, NextFunction } from "express";
import Main_service from "../services/news";
import ValidateReq from "../middleware/validateReq";

class News_controller {
    public async get(req: Request, res: Response, next: NextFunction): Promise<any> {
        let data = await Main_service.listItems({ req, res });

        if (!data || data.length === 0) return res.status(200).json({ success: true, count: 0, data: 'No data' });
        res.status(200).json({
            success: true,
            count: data.length,
            data: data
        })
    }
}

export default new News_controller();

