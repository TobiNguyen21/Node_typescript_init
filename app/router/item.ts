import * as express from 'express';
import { IServer } from '../interfaces/serverInterface';
import item_Controller from '../controllers/item_Controller';
import asyncHandle from '../middleware/async';

export default class ItemRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    public routes(): void {
        this.router.get('/', asyncHandle(item_Controller.get));
    }
}