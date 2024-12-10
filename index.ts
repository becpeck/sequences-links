import axios from "axios";
import * as cheerio from "cheerio";
import { processLWPost } from "./scraper/postLW";
import { prisma } from "./db";
import headers from "./scraper/headers";

const url = new URL("https://www.lesswrong.com/posts/XqmjdBKa4ZaXJtNmf/raising-the-sanity-waterline");
const url2 = new URL("/posts/SGR4GxFK7KmW7ckCB/something-to-protect", url.origin);
console.log(url.href)
console.log(url2.href)
// console.log(url.pathname);
// console.log(url.hostname)

async function scrapeLWPost(url: `https://www.lesswrong.com/posts/${string}`) {
    const response = await axios.get(url, {
        headers,
    });
    const selector = cheerio.load(response.data);
    return {
        sequence: {
            title: selector("div.PostsTopSequencesNav-title").text(),
            url: `https://www.lesswrong.com` + selector("div.PostsTopSequencesNav-title a").attr("href"),
            prevPost: {
                title: selector("div.PostsTopSequencesNav-root > a:first-child").attr("title"),
                url: `https://www.lesswrong.com` + selector("div.PostsTopSequencesNav-root > a:first-child").attr("href"),
            },
            nextPost: {
                title: selector("div.PostsTopSequencesNav-root > a:last-child").attr("title"),
                url: `https://www.lesswrong.com` + selector("div.PostsTopSequencesNav-root > a:last-child").attr("href"),
            }
        },
        title: selector("div.LWPostsPageHeader-title h1").text(),
        author: selector("span.PostsAuthors-authorName").text(),
        date: new Date(selector("div.LWPostsPageHeader-date time").attr("datetime")!),
        links: selector("a:not(#more)", "div#postContent").slice(0, 10).map((i, el) => {{
            return {
                title: selector(el).text(),
                url: selector(el).attr("href"),
            }
        }}).get(),
    }
}

const response = await fetch("http://www.overcomingbias.com/2008/02/second-law.html", {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json'
    }
});

console.log("Final URL:", response.url);  // This should show the final URL after redirects
console.log("Status:", response.status);
const selector = cheerio.load(await response.text());
const data = processLWPost(new URL(response.url), selector);
console.log(data);

try {
    await prisma.post.create({
    data: {
        id: data.id,
        title: data.title,
        author: data.author,
        publishedDate: data.publishedDate,
        sequence: {
            connectOrCreate: {
                where: {
                    id: data.sequence.id,
                },
                create: {
                    id: data.sequence.id,
                    title: data.sequence.title,
                    url: data.sequence.url,
                }
            }
        }
    },
    include: {
        sequence: true,
    }
})
console.log("Post created successfully");
} catch (error) {
    console.error(error);
}