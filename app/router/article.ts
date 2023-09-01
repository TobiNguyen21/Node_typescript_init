import * as express from 'express';
import article_Controller from '../controllers/article_Controller';
import asyncHandle from '../middleware/async';
import { validator } from '../validates/category';

export default class ArticleRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    public routes(): void {
        this.router.get('/:id', asyncHandle(article_Controller.get));
    }
}