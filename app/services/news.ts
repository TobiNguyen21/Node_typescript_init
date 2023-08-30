import Parser from 'rss-parser';
import fs from 'fs';
import { VnExpressRss } from '../utils/vnEpressRss';

type CustomFeed = { foo: string };
type CustomItem = { bar: number };

const parser: Parser<CustomFeed, CustomItem> = new Parser({
    customFields: {
        feed: ['foo'],
        item: ['bar']
    }
});

export default class Main_service {
    static async listItems(params: any, option: any): Promise<any> {
        const url_rss: any = "https://vnexpress.net/rss/the-thao.rss";
        const fileName: string = url_rss.match(/\/([^/]+\.rss)$/)[1];
        const linkToFile: string = `app/__data/${fileName}.json`;

        if (option.task == 'onl') {
            console.log("Get Rss onl");
            const feed = await parser.parseURL(url_rss);
            fs.writeFileSync(linkToFile, JSON.stringify(feed.items));
            return VnExpressRss.init(feed.items);
        }
        if (option.task == 'off') {
            console.log("Get Rss off");
            const data: Buffer = fs.readFileSync(linkToFile);
            return VnExpressRss.init(JSON.parse(data.toString()));
        }

    }
}