import store, { authActions } from "../_store/store";

const request = (method: string) => {
    return (url: string, body: any) => {
        const requestOptions: RequestInit  = {
            method,
            headers: authHeader(url)
        };
        if(body) {
            requestOptions.headers = {
                ...requestOptions.headers,
                'Content-Type': 'application/json'
            };
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// helper function
function authHeader(url: string): HeadersInit  {
    // return auth header with jwt if user is logged in and request it to the api url
    const token = authToken();
    const isLoggedIn = !!token;
    // const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL as string);
    const isApiUrl = url.startsWith("http://localhost:5088");
    if(isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}

function authToken(): string | undefined {
    return store.getState().auth.user?.token;
}

// Khi bạn gọi một hàm then trên một Promise:
// Nếu bạn trả về một giá trị trong then, giá trị đó sẽ được wrap trong một Promise đã resolved.
// Nếu bạn trả về một Promise trong then, Promise này sẽ được "xích" vào chuỗi Promise,
// và trạng thái của nó sẽ quyết định trạng thái của Promise cha.
function handleResponse(response: Response): Promise<any> {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if(!response.ok) {
            if([401, 403].includes(response.status) && authToken()) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                const logout = () => store.dispatch(authActions.logout());
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    })
}

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};