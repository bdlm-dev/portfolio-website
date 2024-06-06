import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
    const requestURL = new URL(request.url);
    const limit = requestURL.searchParams.get("limit");
    const isDev = requestURL.searchParams.get("isDev") == "true";

    if (isDev) {
        // simulated delay
        // await new Promise(r => setTimeout(r, 300))

        return new Response(JSON.stringify([
            {
                location: "London, England",
                employer: "Brunel University London",
                end: "",
                id: "edu-0",
                start: "2023-09",
                title: "Computer Science BSc",
                type: ""
            },
            {
                location: "London, England",
                employer: "Brunel Talent Marketplace",
                end: "2024-03",
                id: "btm-0",
                start: "2023-10",
                title: "Full Stack Developer",
                type: "contract"
            },
            {
                location: "London, England",
                employer: "Brunel Talent Marketplace",
                end: "2024-06",
                id: "btm-1",
                start: "2024-04",
                title: "Software Developer",
                type: "contract"
            }
        ]));

    } else {
        const response = await fetch(
            `${import.meta.env.AWS_API_ROOT}/positions?limit=${limit}`,
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