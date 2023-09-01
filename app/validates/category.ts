import { check } from 'express-validator';
import { notify } from '../configs/notify';
import util from 'util';

const options: any = {
    name: { min: 3, max: 80 },
    slug: { min: 3, max: 80 },
    link: { min: 10, max: 80 }
}

const msgErr: any = {
    name: util.format(notify.ERROR_NAME, options.name.min, options.name.max),
    slug: util.format(notify.ERROR_SLUG, options.slug.min, options.slug.max),
    link: util.format(notify.ERROR_SLUG, options.link.min, options.link.max)
}

export const validator: any = [
    check('name').escape().matches(/^[\p{L}0-9 ]+$/u).isLength({ min: options.name.min, max: options.name.max }).withMessage(msgErr.name),
    check('slug').isLength({ min: options.slug.min, max: options.slug.max }).withMessage(msgErr.slug),
    check('link').isLength({ min: options.slug.min, max: options.slug.max }).withMessage(msgErr.link)
]