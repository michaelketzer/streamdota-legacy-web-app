import fetch from 'isomorphic-unfetch';
import { startAuthRoutine } from './authorization';

type Type = 'text' | 'json';

export function getDefaultHeader(): RequestInit['headers'] {
    const jwt = localStorage.getItem('jwt');
    return {
        'Content-Type': 'application/json',
        ...(jwt ? {'Authorization': `JWT ${jwt}`} : {})
    };
}

const methodMap = {
    GET: 'Requesting',
    PATCH: 'Patching',
    POST: 'Creating',
    DELETE: 'Deleting',
}
export async function query<T>(url: string, method: string, type: Type = 'json', init?: RequestInit): Promise<T> {
    const strMethod = methodMap[method];

    try {
        console.log('%c '+strMethod+' ressource' + '%c :: ' + url, 'color: #00A', 'color: #000');
        const start = new Date().valueOf();
        const response = await fetch(process.env.API_URL + url, {method, headers: getDefaultHeader(), ...init});
        const time = new Date().valueOf() - start;
        if(response.ok) {
            const data = type === 'json' ? await response.json() : await response.text();
            if(data) {
                console.log('%c Received ressource' + '%c :: %c' + response.status + '%c' + time + 'ms' + '%c :: ' + url, 'color: #0A0', 'color: #000', 'background-color:#0A0;color:#FFF;font-weight:bold;padding:2px 5px;border-radius:2px;', 'margin-left:5px;background-color:#555;color:#FFF;font-weight:bold;padding:2px 5px;border-radius:2px;', 'color: #000');
            } else {
                console.log('%c Finished request' + '%c :: %c' + response.status + '%c' + time + 'ms' + '%c :: ' + url, 'color: #0A0', 'color: #000', 'background-color:#0A0;color:#FFF;font-weight:bold;padding:2px 5px;border-radius:2px;', 'margin-left:5px;background-color:#555;color:#FFF;font-weight:bold;padding:2px 5px;border-radius:2px;', 'color: #000');
            }
            return data;
        } else if (response.status === 401) {
            console.log('%c Unauthorized' + '%c :: %c' + response.status + '%c' + time + 'ms'  + '%c :: ' + url, 'color: #A00', 'color: #000', 'background-color:#A00;color:#FFF;font-weight:bold;padding:2px 5px;border-radius:2px;', 'margin-left:5px;background-color:#555;color:#FFF;font-weight:bold;padding:2px 5px;border-radius:2px;', 'color: #000');
            startAuthRoutine();
        } else {
            console.log('%c Failed request' + '%c :: %c' + response.status + '%c' + time + 'ms'  + '%c :: ' + url, 'color: #A00', 'color: #000', 'background-color:#A00;color:#FFF;font-weight:bold;padding:2px 5px;border-radius:2px;', 'margin-left:5px;background-color:#555;color:#FFF;font-weight:bold;padding:2px 5px;border-radius:2px;', 'color: #000');
        }
    } catch(error) {
        console.log('%c Failed '+strMethod+' ressource' + '%c :: ' + url + ' - ', 'color: #A00', 'color: #000', error);
    }
}

export async function get<T>(url: string, type: Type = 'json', init?: RequestInit): Promise<T> {
    return query<T>(url, 'GET', type, init);
}

export async function patch<T>(url: string, data: object, type: Type = 'text', init?: RequestInit): Promise<T> {
    return query<T>(url, 'PATCH', type, {body: JSON.stringify(data), ...init});
}

export async function downloadGsiConfig(): Promise<void> {
    const response = await fetch(process.env.API_URL + '/dota-gsi/generateConfig', {headers: getDefaultHeader()});
    console.log(response.headers.entries(), response.headers.get('Content-Disposition'))
    const filename = response.headers.get('Content-Disposition').split('filename=')[1];
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();    
    a.remove();
}
