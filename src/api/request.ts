import fetch from 'isomorphic-unfetch';

type Type = 'text' | 'json';

export function getDefaultHeader(): RequestInit['headers'] {
    const jwt = localStorage.getItem('jwt');
    return {
        'Content-Type': 'application/json',
        ...(jwt ? {'Authorization': `JWT ${jwt}`} : {})
    };
}

export async function get<T>(url: string, type: Type = 'json', init?: RequestInit): Promise<T> {
    try {
        console.log('%c Requesting ressource' + '%c :: ' + url, 'color: #00A', 'color: #000');
        const response = await fetch(process.env.API_URL + url, {headers: getDefaultHeader(), ...init});
        if(response.ok) {
            const data = type === 'json' ? await response.json() : await response.text();
            console.log('%c Received ressource' + '%c :: %c' + response.status + '%c :: ' + url, 'color: #0A0', 'color: #000', 'background-color:#0A0;color:#FFF;font-weight:bold;padding:2px 5px;border-radius:2px;', 'color: #000');
            return data;
        } else {
            console.log('%c Failed request' + '%c :: %c' + response.status + '%c :: ' + url, 'color: #A00', 'color: #000', 'background-color:#A00;color:#FFF;font-weight:bold;padding:2px 5px;border-radius:2px;', 'color: #000');
        }
    } catch(error) {
        console.log('%c Failed requesting ressource' + '%c :: ' + url + ' - ', 'color: #A00', 'color: #000', error);
    }
}
