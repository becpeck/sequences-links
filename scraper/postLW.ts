import type { CheerioAPI } from "cheerio";

const lwIdRegex = new RegExp("\/posts\/([A-Za-z0-9]*)\/?");
const sequenceIdRegex = new RegExp("\/s\/([A-Za-z0-9]*)\/?");

function getLesswrongId(lwUrl: string) {
    return lwUrl.match(lwIdRegex)![1];
}

function getSequenceId(lwUrl: string) {
    return lwUrl.match(sequenceIdRegex)![1];
}

export function processLWPost(lwUrl: URL, selector: CheerioAPI) {
    const sequenceSelector = selector("a", "div.PostsTopSequencesNav-title");
    const sequenceUrl = new URL(sequenceSelector.attr("href")!, lwUrl);

    const prevPostSelector = selector("a", "div.BottomNavigation-prevPost");
    const prevPostUrl = new URL(prevPostSelector.attr("href")!, lwUrl);
    const prevPostTitle = selector("div.BottomNavigationItem-postTitle", prevPostSelector).text();

    const nextPostSelector = selector("a", "div.BottomNavigation-nextPost");
    const nextPostUrl = new URL(nextPostSelector.attr("href")!, lwUrl);
    const nextPostTitle = selector("div.BottomNavigationItem-postTitle", nextPostSelector).text();

    return {
        canonicalUrl: selector("link[rel='canonical']").attr("href")!,
        id: getLesswrongId(lwUrl.href),
        title: selector("h1", "div.LWPostsPageHeader-title").text(),
        author: selector("span.PostsAuthors-authorName").text(),
        publishedDate: new Date(selector("time", "div.LWPostsPageHeader-date").attr("datetime")!),
        sequence: {
            id: getSequenceId(sequenceUrl.href),
            title: sequenceSelector.text(),
            url: sequenceUrl.href,
            prevPost: {
                title: prevPostTitle,
                url: prevPostUrl.href,
            },
            nextPost: {
                title: nextPostTitle,
                url: nextPostUrl.href,
            }
        }
    }
}
