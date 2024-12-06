import axios from "axios";
import * as cheerio from "cheerio";

async function scrapeLWPost(url: `https://www.lesswrong.com/posts/${string}`) {
    const response = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'application/json'
        }
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
        // content: selector("div#postContent").html(),
        links: selector("div#postContent a:not(#more)").slice(0, 10).map((i, el) => ({
            title: el.childNodes[0],
            url: el.attribs.href
        })).get(),
    }
}

// const data = await scrapeLWPost("https://www.lesswrong.com/posts/XqmjdBKa4ZaXJtNmf/raising-the-sanity-waterline");
// console.log(data);
const res = await axios.get("http://www.overcomingbias.com/2008/02/second-law.html", {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json'
    }
});

const response = await fetch("http://www.overcomingbias.com/2008/02/second-law.html", {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json'
    }
});

console.log("Final URL:", response.url);  // This should show the final URL after redirects
console.log("Status:", response.status);