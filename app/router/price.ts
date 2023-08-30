import * as express from 'express';
import price_Controller from '../controllers/price_Controller';
import asyncHandle from '../middleware/async';

export default class PriceRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    public routes(): void {
        this.router.get('/getGold', asyncHandle(price_Controller.getGold));
        this.router.get('/getCoin', asyncHandle(price_Controller.getCoin));
    }
}