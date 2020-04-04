import { useState, useEffect } from "react";


export function useAbortFetch<T>(fetcher: (controller: AbortController, ...props: any) => Promise<T>, ...props: any): T | null {
    const abortController = new AbortController();
    const [resource, setResource] = useState<T | null>(null);

    useEffect(() => {
        const load = async () => {
            const res = await fetcher(abortController, ...props)
            if(res) {
                setResource(res);
            }
        };

        load();
        return () => abortController.abort;
    }, [])


    return resource;
}