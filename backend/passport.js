import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from './models/index.js';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
    proxy: true // Important for cloud deployments (Render, Heroku, etc.) to handle HTTPS correctly
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
        // Check if user exists
        let user = await User.findOne({ where: { googleId: profile.id } });
        
        if (!user) {
            // Check if user exists with same email (to link accounts)
            user = await User.findOne({ where: { email: profile.emails[0].value } });
            
            if (user) {
                user.googleId = profile.id;
                user.avatar = profile.photos[0].value;
                await user.save();
            } else {
                // Create new user
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                    avatar: profile.photos[0].value,
                    credits: 60, // Bonus for new users
                    password: null // No password for OAuth users
                });
            }
        }
        return cb(null, user);
    } catch (err) {
        return cb(err, null);
    }
  }
));

// Serialize/Deserialize is not strictly needed for JWT stateless auth in the callback
// But Passport might complain without it if session support is enabled somewhere (though we use session: false)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    done(null, user);
});
