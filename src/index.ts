import dotenv from "dotenv";
import process from "node:process";
import { ProtocolLogin } from "./net";
import { RSA } from "./utils/crypt";

import GameFeatureManager from "./client/GameFeatureManager";

dotenv.config();

const host = process.env.HOST;
const port = Number(process.env.PORT) || 7171;

function login() {
  const rsa = new RSA({
    n: process.env.RSA_N as string,
  });

  const featureManager = new GameFeatureManager();

  featureManager.setupFeaturesBasedOnClientVersion(1097);

  const onCharacterList: ProtocolLogin["_onCharacterList"] = (
    characters,
    account
  ) => {
    console.log({
      characters,
      account,
    });
  };

  const protocol = new ProtocolLogin({ featureManager, rsa, onCharacterList });

  protocol.login({
    // @ts-expect-error
    host,
    port,
    accountName: process.env.TEST_ACCOUNT_NAME as string,
    password: process.env.TEST_ACCOUNT_PASSWORD as string,
  });
}

login();
