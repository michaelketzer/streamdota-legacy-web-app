import fetch from 'isomorphic-unfetch';

type Type = 'text' | 'json';

export async function get<T>(url: string, type: Type = 'json'): Promise<T> {
    try {
        const response = await fetch(process.env.API_URL + url);
        return type === 'json' ? await response.json() : await response.text();;
    } catch(error) {
        console.log(error);
    }
}
