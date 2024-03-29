import dotenv from "dotenv";
import process from "node:process";
import { ProtocolLogin } from "./net";
import { RSA } from "./utils/crypt";

import GameFeatureManager from "./client/GameFeatureManager";
import ThingTypeManager from "./client/ThingTypeManager";

dotenv.config();

const CLIENT_VERSION = Number(process.env.CLIENT_VERSION) || 1097;
const featureManager = new GameFeatureManager();
featureManager.setupFeaturesBasedOnClientVersion(CLIENT_VERSION);

const thingTypeManager = new ThingTypeManager(featureManager, CLIENT_VERSION);

function loadDat() {
  const loadedDatSuccessfully = thingTypeManager.loadDat(
    `./data/${CLIENT_VERSION}/Tibia.dat`
  );

  return loadedDatSuccessfully;
}

function login() {
  const host = process.env.HOST;
  const port = Number(process.env.PORT) || 7171;

  const rsa = new RSA({
    n: process.env.RSA_N as string,
  });

  const protocol = new ProtocolLogin({
    featureManager,
    rsa,
    onCharacterList: (character, account) => {
      console.log({ character, account });
    },
    contentRevision: 18960, // thingTypeManager.getContentRevision(),
    datSignature: 18960, // thingTypeManager.getDatSignature(),
    clientVersion: CLIENT_VERSION,
  });

  protocol.login({
    // @ts-expect-error
    host,
    port,
    accountName: process.env.TEST_ACCOUNT_NAME ?? "",
    password: process.env.TEST_ACCOUNT_PASSWORD ?? "",
  });
}

function main() {
  // const loadedDat = loadDat();
  // if (!loadedDat) {
  //   console.log("Failed to load .dat file");
  //   return;
  // }
  login();
}

main();
