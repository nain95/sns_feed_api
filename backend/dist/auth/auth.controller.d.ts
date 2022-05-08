import { Request, Response } from "express";
import AuthService from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(authcredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    facebookLogin(req: Request, res: Response): Promise<any>;
    facebookLoginRedirect(req: Request): Promise<any>;
    saveAccessToken(req: Request, authCredentialsDto: AuthCredentialsDto): Promise<any>;
}
