import * as express from 'express';
import item_Controller from '../controllers/category_Controller';
import asyncHandle from '../middleware/async';
import { validator } from '../validates/category';

export default class ItemRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    public routes(): void {
        this.router.get('/', asyncHandle(item_Controller.get));
        this.router.get('/:id', asyncHandle(item_Controller.getOne));
        this.router.get('/:id/article(/:total)?', asyncHandle(item_Controller.getArticleInCategory));
        this.router.post('/add', validator, asyncHandle(item_Controller.post));
        this.router.put('/edit/:id', validator, asyncHandle(item_Controller.put));
        this.router.delete('/delete/:id', asyncHandle(item_Controller.delete));
    }
}