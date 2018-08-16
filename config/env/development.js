module.exports = {
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    db: {
        uris: 'mongodb://10.138.47.133:27017,10.138.47.134:27017,10.138.47.135:27017/dt-test?replicaSet=rs_ct',
        options: { useNewUrlParser: true},
        debug: true
    },
    path:{
        models:'',
        routes:''
    }
}