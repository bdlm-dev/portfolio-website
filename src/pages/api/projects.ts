import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
    const requestURL = new URL(request.url);
    const limit = requestURL.searchParams.get("limit");
    const isDev = requestURL.searchParams.get("isDev") == "true";

    await new Promise(r => setTimeout(r, 100))

    if (isDev) {
        // simulated delay
        // await new Promise(r => setTimeout(r, 300))

        // unsplash random image: https://source.unsplash.com/random/?[target]

        return new Response(JSON.stringify([
            {
                "tech": [
                    "astro",
                    "aws apigateway",
                    "aws dynamodb",
                    "aws lambda",
                    "aws s3",
                    "css",
                    "html",
                    "javascript",
                    "netlify",
                    "solidjs",
                    "tailwind",
                    "typescript"
                ],
                "url": [
                    "main:https://itisapril.dev/",
                    "https://github.com/bdlm-dev/portfolio-website"
                ],
                "created": 2024,
                "priority": 100,
                "image_url": "",
                "description": "Personal portfolio website, built with Astro, hosted with Netlify, using AWS S3, DynamoDB, Lambda",
                "id": "personal-website",
                "title": "Personal Website"
            }
        ]));

    } else {
        const response = await fetch(
            `${import.meta.env.AWS_API_ROOT}/projects?limit=${limit}`,
            {
                headers: {
                    "x-api-key": import.meta.env.AWS_API_KEY
                }
            }
        );
        if (!response.ok) {
            return new Response(JSON.stringify({ok: false}));
        }
        const data = await response.json();
        return new Response(JSON.stringify(data));
    }
};