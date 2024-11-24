"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_web_signature_2020_1 = require("@gaia-x/json-web-signature-2020");
const jose_1 = require("jose");
const dotenv = __importStar(require("dotenv"));
const promises_1 = require("node:fs/promises");
async function main() {
    var _a, _b, _c, _d;
    dotenv.config();
    const credentialWrapper = JSON.parse((await (0, promises_1.readFile)(process.argv[2])).toString());
    const privateKeyPem = (_a = process.env.PRIVATE_KEY) !== null && _a !== void 0 ? _a : "";
    const verificationMethod = (_b = process.env.VER_METHOD) !== null && _b !== void 0 ? _b : "";
    const keyType = (_c = process.env.KEY_TYPE) !== null && _c !== void 0 ? _c : 'RS256';
    const signer = new json_web_signature_2020_1.JsonWebSignature2020Signer({
        privateKey: await (0, jose_1.importPKCS8)(privateKeyPem, keyType),
        privateKeyAlg: keyType,
        verificationMethod
    });
    const doc = await signer.sign((_d = credentialWrapper.credential) !== null && _d !== void 0 ? _d : credentialWrapper);
    console.log(JSON.stringify(doc));
}
main().then(() => console.log("done")).catch((err) => console.error(err));
//# sourceMappingURL=signCredential.js.map