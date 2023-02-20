'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagement = void 0;
const validator_1 = require("../utils/validator");
const api_request_1 = require("../utils/api-request");
const constants_1 = __importDefault(require("../utils/constants"));
const error_1 = require("../utils/error");
const { CREDENTIAL_USER, REQ_METHOD, COMPONENT } = constants_1.default;
class UserManagement {
    constructor(app) {
        (0, validator_1.isValidApp)(app, true);
        this.requester = new api_request_1.AuthorizedHttpClient(app, this);
    }
    getComponentName() {
        return COMPONENT.user_management;
    }
    getCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = {
                method: REQ_METHOD.get,
                path: `/project-user/current`,
                catalyst: true,
                track: true,
                user: CREDENTIAL_USER.user
            };
            const resp = yield this.requester.send(request);
            return resp.data.data;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = {
                method: REQ_METHOD.get,
                path: `/project-user`,
                catalyst: true,
                track: true,
                user: CREDENTIAL_USER.admin
            };
            const resp = yield this.requester.send(request);
            return resp.data.data;
        });
    }
    getUserDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, validator_1.wrapValidatorsWithPromise)(() => {
                (0, validator_1.isNonEmptyStringOrNumber)(id, 'user_id', true);
            }, error_1.CatalystUserManagementError);
            const request = {
                method: REQ_METHOD.get,
                path: `/project-user/${id}`,
                catalyst: true,
                track: true,
                user: CREDENTIAL_USER.admin
            };
            const resp = yield this.requester.send(request);
            return resp.data.data;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, validator_1.wrapValidatorsWithPromise)(() => {
                (0, validator_1.isNonEmptyStringOrNumber)(id, 'user_id', true);
            }, error_1.CatalystUserManagementError);
            const request = {
                method: REQ_METHOD.delete,
                path: `/project-user/${id}`,
                catalyst: true,
                track: true,
                user: CREDENTIAL_USER.admin
            };
            const resp = yield this.requester.send(request);
            const json = resp.data;
            return json.data ? true : false;
        });
    }
    registerUser(signupConfig, userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, validator_1.wrapValidatorsWithPromise)(() => {
                (0, validator_1.isNonEmptyObject)(signupConfig, 'signupConfig', true);
                (0, validator_1.ObjectHasProperties)(signupConfig, ['platform_type', 'zaid'], 'signupConfig', true);
                (0, validator_1.isNonEmptyObject)(userDetails, 'userDetails', true);
                (0, validator_1.ObjectHasProperties)(userDetails, ['last_name', 'email_id'], 'userDetails', true);
            }, error_1.CatalystUserManagementError);
            signupConfig.user_details = userDetails;
            const request = {
                method: REQ_METHOD.post,
                path: `/project-user/signup`,
                data: signupConfig,
                type: "json" /* JSON */,
                catalyst: true,
                track: true,
                user: CREDENTIAL_USER.user
            };
            const resp = yield this.requester.send(request);
            return resp.data.data;
        });
    }
    addUserToOrg(signupConfig, userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, validator_1.wrapValidatorsWithPromise)(() => {
                (0, validator_1.isNonEmptyObject)(signupConfig, 'signupConfig', true);
                (0, validator_1.ObjectHasProperties)(signupConfig, ['platform_type'], 'signupConfig', true);
                (0, validator_1.isNonEmptyObject)(userDetails, 'userDetails', true);
                (0, validator_1.ObjectHasProperties)(userDetails, ['last_name', 'email_id', 'zaaid'], 'userDetails', true);
            }, error_1.CatalystUserManagementError);
            signupConfig.user_details = userDetails;
            const request = {
                method: REQ_METHOD.post,
                path: `/project-user`,
                data: signupConfig,
                type: "json" /* JSON */,
                catalyst: true,
                track: true,
                user: CREDENTIAL_USER.admin
            };
            const resp = yield this.requester.send(request);
            return resp.data.data;
        });
    }
    resetPassword(signupConfig, userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, validator_1.wrapValidatorsWithPromise)(() => {
                (0, validator_1.isNonEmptyObject)(signupConfig, 'signupConfig', true);
                (0, validator_1.ObjectHasProperties)(signupConfig, ['platform_type', 'zaid'], 'signupConfig', true);
                (0, validator_1.isNonEmptyObject)(userDetails, 'userDetails', true);
                (0, validator_1.ObjectHasProperties)(userDetails, ['email_id'], 'userDetails', true);
            }, error_1.CatalystUserManagementError);
            signupConfig.user_details = userDetails;
            const request = {
                method: REQ_METHOD.post,
                path: `/project-user/forgotpassword`,
                data: signupConfig,
                type: "json" /* JSON */,
                catalyst: true,
                track: true,
                user: CREDENTIAL_USER.user
            };
            const resp = yield this.requester.send(request);
            return resp.data.data;
        });
    }
}
exports.UserManagement = UserManagement;
