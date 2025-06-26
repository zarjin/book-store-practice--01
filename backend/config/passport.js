import passport from "passport"
import { Strategy as FacebookStrategy } from "passport-facebook"
import { Strategy as InstagramStrategy } from "passport-instagram"
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
            if (user.authProvider === 'local') {
              user.authProvider = 'facebook'
            }
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

// Instagram Strategy
passport.use(
  new InstagramStrategy(
    {
      clientID: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      callbackURL: "/api/auth/instagram/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists with this Instagram ID
        let user = await userModels.findOne({ instagramId: profile.id })

        if (user) {
          return done(null, user)
        }

        // Check if user exists with the same username (Instagram doesn't provide email)
        const username = profile.username || profile.displayName
        if (username) {
          user = await userModels.findOne({ username })
          if (user) {
            // Link Instagram account to existing user
            user.instagramId = profile.id
            user.profilePicture = profile.photos && profile.photos[0] ? profile.photos[0].value : null
            if (user.authProvider === 'local') {
              user.authProvider = 'instagram'
            }
            await user.save()
            return done(null, user)
          }
        }

        // Create new user
        const newUser = new userModels({
          username: username || `instagram_${profile.id}`,
          email: `${profile.id}@instagram.com`, // Instagram doesn't provide email
          instagramId: profile.id,
          profilePicture: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
          authProvider: 'instagram',
        })

        await newUser.save()
        return done(null, newUser)
      } catch (error) {
        console.error("Instagram authentication error:", error)
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
