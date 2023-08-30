import * as express from 'express';
import news_Controller from '../controllers/news_Controller';
import asyncHandle from '../middleware/async';
import { validator } from '../validates/item';

export default class NewsRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    public routes(): void {
        this.router.get('/', asyncHandle(news_Controller.get));
    }
}