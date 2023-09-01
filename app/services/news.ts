import Parser from 'rss-parser';
import fs from 'fs';
import { VnExpressRss } from '../utils/vnEpressRss';
import * as dotenv from 'dotenv';
dotenv.config();

type CustomFeed = { foo: string };
type CustomItem = { bar: number };

const parser: Parser<CustomFeed, CustomItem> = new Parser({
    customFields: {
        feed: ['foo'],
        item: ['bar']
    }
});

export default class Main_service {
    static async listItems(params: any, option: any = {}): Promise<any> {
        const url_rss: any = params.link || "https://vnexpress.net/rss/tin-moi-nhat.rss";
        const slug_rss: any = params.slug || "tin-moi-nhat";

        const fileName: string = url_rss.match(/\/([^/]+\.rss)$/)[1];
        const linkToFile: string = `app/__data/${fileName}.json`;

        const expiresIn_rss: number = Number(process.env.EXPIRESIN_RSS);

        const total: number | undefined = (params.req?.params?.total) ? params.req.params.total : undefined;

        if (params.req.cookies[slug_rss] && Date.now() <= params.req.cookies[slug_rss]) {
            console.log("Get Rss off");
            const data: Buffer = fs.readFileSync(linkToFile);
            return VnExpressRss.init(JSON.parse(data.toString()), total);
        } else {
            try {
                console.log("Get Rss onl");
                params.res.cookie(slug_rss, Date.now() + expiresIn_rss * 60 * 1000);
                const feed = await parser.parseURL(url_rss);
                feed.items.forEach((item: any, i: number) => {
                    item.id = slug_rss + '_' + (i + 1);
                });
                fs.writeFileSync(linkToFile, JSON.stringify(feed.items));
                return VnExpressRss.init(feed.items, total);
            } catch (error) {
                console.log(error);
                return false;
            }

        }
    }
}