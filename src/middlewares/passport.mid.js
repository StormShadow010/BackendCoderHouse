import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { verifyPassword } from "../utils/hashPassword/hashPassword.js";
import { createToken } from "../utils/token/token.util.js";
import variablesEnviroment from "../utils/env/env.util.js";
import authRepository from "../repositories/auth.rep.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const checkUSer = await authRepository.readByEmailRepository(email);
        if (checkUSer) {
          const error = new Error("Invalid credentials!");
          error.statusCode = 400;
          return done(error);
        }
        const newUser = await authRepository.createRepository(req.body);
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
        const user = await authRepository.readByEmailRepository(email);
        if (!user) {
          const error = new Error("Bad auth from login!");
          error.statusCode = 401;
          return done(error);
        }
        const verify = verifyPassword(password, user.password);
        if (!verify) {
          const error = new Error("Invalid credentials!");
          error.statusCode = 401;
          return done(error);
        }
        // Protect user password!!
        delete user.password;
        const token = createToken(user);
        req.token = token;
        return done(null, user);
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
