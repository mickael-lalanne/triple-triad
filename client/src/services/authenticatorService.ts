import { Auth } from '@aws-amplify/auth';

export class AuthenticatorService {
    static USER_ID: string;

    /**
     * A deck consists of one 1 star, one 2 stars, one 3 stars, one 4 stars and one 5 stars card
     * @returns {Card[]} a random deck}
     */
    static async init(): Promise<void> {
        try {
            const userInfos = await Auth.currentUserInfo();
            AuthenticatorService.USER_ID = userInfos.attributes.sub;
        }
        catch (e) {
            console.warn('User not authenticated, cannot store the user id in Authenticator Service.');
        }
    }
}
