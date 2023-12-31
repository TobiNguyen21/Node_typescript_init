import { Request, Response, NextFunction } from "express";
import Main_service from "../services/price";
import ValidateReq from "../middleware/validateReq";

class News_controller {
    public async getGold(req: Request, res: Response, next: NextFunction): Promise<any> {
        const data = await Main_service.getGold();
        if (!data || data.length === 0) return res.status(200).json({ success: true, count: 0, data: 'No data' });
        res.status(200).json({
            success: true,
            count: data.length,
            data: data
        })
    }
    public async getCoin(req: Request, res: Response, next: NextFunction): Promise<any> {
        const data = await Main_service.getCoin();
        if (!data || data.length === 0) return res.status(200).json({ success: true, count: 0, data: 'No data' });
        res.status(200).json({
            success: true,
            count: data.length,
            data: data
        })
    }
}

export default new News_controller();

