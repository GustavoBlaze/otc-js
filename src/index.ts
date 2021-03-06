import dotenv from "dotenv";
import { Protocol } from "./net";

dotenv.config();

const host = process.env.HOST;
const port = Number(process.env.PORT) || 7171;

if (!host) throw new Error("No host defined");

const protocol = new Protocol();

protocol.connect(host, port);
