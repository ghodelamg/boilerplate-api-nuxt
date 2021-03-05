export default function ({ $axios, redirect, error: nuxtError, store }) {
    $axios.onRequest(config => {
        if (config.url == '/api/v1/login' || config.url.includes('forgot-passsword') || config.url.includes('reset-password') || config.url.includes('register')) {
            return config;
        }
        if (config.method == 'get' && (config.url.includes('countries') || config.url.includes('states') || config.url.includes('cities') || config.url.includes('hobbies'))) {
            const authorizationtoken = store.state.user.currentUserData.authorization;
            // get authorization token from login response data
            if (authorizationtoken) {
                config.headers.common.Authorization = `Bearer ${authorizationtoken}`;
            }
            return config;
        }
        // Check authorization token
        const authorizationtoken = store.state.user.currentUserData.authorization;
        // get authorization token from login response data
        if (!authorizationtoken) {
            if (config.params && config.params.noAuth) {
                return config;
            }
            window.location.href = '/';
        } else {
            config.headers.common.Authorization = `Bearer ${authorizationtoken}`;
            return config;
        }
    })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
        nuxtError({
            statusCode: error.response.status,
            message: error.message,
        });
        return Promise.resolve(false);
    })
}