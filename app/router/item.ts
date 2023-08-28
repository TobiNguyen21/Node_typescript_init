import * as express from 'express';
import { IServer } from '../interfaces/serverInterface';
import item_Controller from '../controllers/item_Controller';

export default class ItemRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    public routes(): void {
        this.router.get('/', item_Controller.get)
    }
}