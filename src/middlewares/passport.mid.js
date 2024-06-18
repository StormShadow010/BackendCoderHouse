import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import {
  createHash,
  verifyPassword,
} from "../utils/hashPassword/hashPassword.js";
import { createToken } from "../utils/token/token.util.js";
import variablesEnviroment from "../utils/env/env.util.js";
import usersRepository from "../repositories/users.rep.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        // Check if the email already exists
        const user = await usersRepository.readByEmailRepository(email);
        if (user) {
          const error = new Error("Bad auth from register!");
          error.statusCode = 401;
          return done(error);
        }

        // Create the user
        const hashPassword = createHash(password); // Hash the password
        req.body.password = hashPassword; // Reassign the hashed password
        const newUser = await usersRepository.createRepository(req.body);
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await usersRepository.readByEmailRepository(email);
        if (!user) {
          const error = new Error("Bad auth from login!");
          error.statusCode = 401;
          return done(error);
        }
        const verify = verifyPassword(password, user.password);
        if (verify) {
          const data = {
            email,
            role: user.role,
            photo: user.photo,
            _id: user._id,
            online: true,
          };
          const token = createToken(data);
          data.token = token;
          return done(null, data);
        }
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        return done(error);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: variablesEnviroment.SECRET_JWT,
    },
    (data, done) => {
      try {
        if (data) {
          return done(null, data);
        } else {
          const error = new Error("Forbidden from jwt!");
          error.statusCode = 403;
          return done(error);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
