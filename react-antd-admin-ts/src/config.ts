const config = {
    url: {
        API_BASE_URL: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/': 'http://127.0.0.1:8000/'
    }
}

export default config;