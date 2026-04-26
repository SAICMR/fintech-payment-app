export class AuthenticateSuccessDto {
    constructor(authToken, expiresIn) {
        this.authToken = authToken;
        this.expiresIn = expiresIn;
    }
}
