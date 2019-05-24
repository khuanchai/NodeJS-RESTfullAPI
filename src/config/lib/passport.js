const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../config');
const Users = require('mongoose').model('Users');

exports.jwtStrategy = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtPrivateKey
  };

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log('----- JwtStrategy ------');
      Users.findById(jwt_payload.id).then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      }).catch(err => {
        console.log(err)
      });
    })
  );

}