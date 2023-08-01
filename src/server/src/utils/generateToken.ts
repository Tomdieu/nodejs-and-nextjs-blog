import jwt from "jsonwebtoken";

import config from "config";

const SECRETE = config.get<string>("SECRETE_KEY");

export default function generateToken(username: string) {
  const token = jwt.sign({ username }, SECRETE);
  return token;
}
