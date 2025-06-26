import passport from "passport"
import { Strategy as FacebookStrategy } from "passport-facebook"
import userModels from "../models/user.models.js"

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails", "photos"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists with this Facebook ID
        let user = await userModels.findOne({ facebookId: profile.id })

        if (user) {
          return done(null, user)
        }

        // Check if user exists with the same email
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null
        if (email) {
          user = await userModels.findOne({ email })
          if (user) {
            // Link Facebook account to existing user
            user.facebookId = profile.id
            user.profilePicture = profile.photos && profile.photos[0] ? profile.photos[0].value : null
            user.authProvider = 'facebook'
            await user.save()
            return done(null, user)
          }
        }

        // Create new user
        const newUser = new userModels({
          username: profile.displayName || `facebook_${profile.id}`,
          email: email || `${profile.id}@facebook.com`,
          facebookId: profile.id,
          profilePicture: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
          authProvider: 'facebook',
        })

        await newUser.save()
        return done(null, newUser)
      } catch (error) {
        console.error("Facebook authentication error:", error)
        return done(error, null)
      }
    }
  )
)

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id)
})

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModels.findById(id)
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})

export default passport
