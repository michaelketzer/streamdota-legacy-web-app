import { useState, useEffect } from "react";


export function useAbortFetch<T>(fetcher: (controller: AbortController, ...props: any) => Promise<T>, ...props: any): [T | null, () => Promise<void>] {
    const abortController = new AbortController();
    const [resource, setResource] = useState<T | null>(null);

    const load = async () => {
        const res = await fetcher(abortController, ...props)
        if(res) {
            setResource(res);
        }
    };

    useEffect(() => {
        load();
        return () => abortController.abort;
    }, [])


    return [resource, load];
}