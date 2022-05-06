import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
  constructor() {
    super({
      clientID: process.env.APP_ID,
      clientSecret: process.env.APP_SECRET,
      callbackURL: "https://c2c7-121-135-254-216.ngrok.io/auth/facebook/redirect",
      scope: ["email", "user_posts"],
      profileFields: ["email", "name"],
    });
  }
  
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails,
      firstName: name.givenName,
      lastName: name.familyName,
    };
    const payload = {
      user,
      facebook_access_token : accessToken,
    };
    return done(null, payload);
  }
}
