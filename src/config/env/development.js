module.exports = {
  port: process.env.PORT || 5000,
  host: process.env.HOST || 'localhost',
  db: {
    uris: 'mongodb://10.138.47.133:27017/dt-test?replicaSet=rs_ct',
    options: { useNewUrlParser: true },
    debug: true
  },
  path: {
    models: '',
    routes: ''
  },
  prefix: '/api/v1',
  jwtPrivateKey: 'khuan',
  tdd: true
}