module.exports = {
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    db: {
        uris: 'mongodb://localhost/่pos',
        options: {},
        debug: false
    },
    path: {
        models: '',
        routes: ''
    }
}