const passport = require('passport')
const FacebookTokenStrategy = require('passport-facebook-token')

// FACEBOOK STRATEGY
const FacebookTokenStrategyCallback = (
  accessToken,
  refreshToken,
  profile,
  done,
) =>
  done(null, {
    accessToken,
    refreshToken,
    profile,
  })

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      profileFields: ['id', 'displayName', 'email'],
    },
    FacebookTokenStrategyCallback,
  ),
)

// promisified authenticate functions
const authenticateFacebook = (req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(
      'facebook-token',
      { session: false },
      (err, data, info) => {
        if (err) reject(err)
        resolve({ data, info })
      },
    )(req, res)
  })

module.exports = { authenticateFacebook }
