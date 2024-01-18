
export default async function useApi<Type>(route: string, method: string, body: string | undefined = undefined, contentType: string | null = null, token: string | null = null): Promise<Type | undefined> {
    try {
        const controller = new AbortController();
        const abortId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch(route, {
            method: method,
            headers: buildHeader(
                contentType,
                token
            ),
            signal: controller.signal,
            body: body
        });
    
        clearTimeout(abortId);

        if (response.ok) {
            return (response.json() as Promise<Type>);
        } else {
            throw Error('Error on useApi');
        }
    } catch (e) {
        console.log(e);
    }
}

function buildHeader(contentType: string | null, token: string | null) {
    const headers = new Headers()
    if (contentType) {
        headers.append('Content-Type', contentType);
    }
    if (token) {
        headers.append('Authorization', `Bearer ${token}`)
    }

    return headers;
}