export const config = {
    runtime: 'edge',
};

import { generateReply } from '../src/lib/llm.js';

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const body = await req.json();
        const { messages } = body;

        if (!messages || !Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: 'Invalid payload: messages array required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const reply = await generateReply({ messages });

        return new Response(JSON.stringify({ reply }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error('Vercel Function Error:', error);
        return new Response(JSON.stringify({ 
            error: 'Internal Server Error', 
            details: error.message || String(error) 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
