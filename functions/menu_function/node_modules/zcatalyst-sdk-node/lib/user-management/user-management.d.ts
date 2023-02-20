import { CatalystApp } from '../catalyst-app';
import { AuthorizedHttpClient } from '../utils/api-request';
import { ICatalystUser, ICatalystSignupConfig, ICatalystSignupUserConfig, Component } from '../utils/pojo/common';
declare type ICatalystNewUser = ICatalystSignupConfig & {
    user_details: ICatalystUser;
};
export declare class UserManagement implements Component {
    requester: AuthorizedHttpClient;
    constructor(app: CatalystApp);
    getComponentName(): string;
    getCurrentUser(): Promise<ICatalystUser>;
    getAllUsers(): Promise<Array<ICatalystUser>>;
    getUserDetails(id: string | number): Promise<ICatalystUser>;
    deleteUser(id: string | number): Promise<boolean>;
    registerUser(signupConfig: ICatalystSignupConfig & {
        zaid: string | number;
    }, userDetails: Omit<ICatalystSignupUserConfig, 'zaaid'>): Promise<ICatalystNewUser>;
    addUserToOrg(signupConfig: ICatalystSignupConfig, userDetails: ICatalystSignupUserConfig): Promise<ICatalystNewUser>;
    resetPassword(signupConfig: Omit<ICatalystSignupConfig, 'zaid'>, userDetails: Omit<ICatalystSignupUserConfig, 'zaaid'>): Promise<string>;
}
export {};
