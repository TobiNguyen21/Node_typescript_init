
export class VnExpressRss {
    static async init(data: any[], total: any): Promise<any> {
        let result: any[] = [];

        data.forEach((element: any, i: number) => {
            if (!total || i < total) {
                let news: any = {};

                let content = element.content;
                let imageRegex = /<img.*?src\s*=\s*["'](.*?)["']/i;
                let contentRegex = /<\/br>([\s\S]*)/i;

                let myImage = content.match(imageRegex);
                let myContent = content.match(contentRegex);

                news.title = element.title;
                news.link = element.link;
                news.pubDate = element.pubDate;
                news.content = myContent ? myContent[1].trim() : '';
                news.image = myImage ? myImage[1] : '';

                result.push(news);
            }

        });

        return result;
    }
}
