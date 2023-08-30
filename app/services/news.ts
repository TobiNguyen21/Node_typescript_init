import Parser from 'rss-parser';

type CustomFeed = { foo: string };
type CustomItem = { bar: number };

const parser: Parser<CustomFeed, CustomItem> = new Parser({
    customFields: {
        feed: ['foo'],
        //            ^ will error because `baz` is not a key of CustomFeed
        item: ['bar']
    }
});

export default class Main_service {
    static async listItems(params: any, option: any): Promise<any> {
        if (option.task == 'all') {
            const feed = await parser.parseURL('https://vnexpress.net/rss/the-thao.rss');
            return feed.items;
        }

    }
}