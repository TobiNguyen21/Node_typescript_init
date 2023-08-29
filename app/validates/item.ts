import { check } from 'express-validator';
import { notify } from '../configs/notify';
import util from 'util';

const options: any = {
    name: { min: 3, max: 80 },
    content: { min: 10, max: 500 },
}

const msgErr: any = {
    name: util.format(notify.ERROR_NAME, options.name.min, options.name.max),
    content: util.format(notify.ERROR_CONTENT, options.content.min, options.content.max)
}

export const validator: any = [
    check('name').escape().matches(/^[\p{L}0-9 ]+$/u).isLength({ min: options.name.min, max: options.name.max }).withMessage(msgErr.name),
    check('content').isLength({ min: options.content.min, max: options.content.max }).withMessage(msgErr.content)
]