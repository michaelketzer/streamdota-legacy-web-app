import { useState, useEffect } from "react";

const abortController = new AbortController();

export function useAbortFetch<T>(fetcher: (controller: AbortController, ...props: any) => Promise<T>, ...props: any): T | null {
    const [resource, setResource] = useState<T | null>(null);

    useEffect(() => {
        const load = async () => setResource(await fetcher(abortController, ...props));

        load();
        return () => abortController.abort;
    }, [])


    return resource;
}