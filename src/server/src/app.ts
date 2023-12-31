import express from "express";
import config from "config";
import useragent from "express-useragent";
import cors from "cors";
import setupDocs from "./utils/swagger-docs";
import routes from "./api/routes";
import path from 'path';

const PORT = config.get<number>("PORT");
const HOST = config.get<string>("HOST");
const BASE_DIR = config.get<string>("BASE_DIR")

const app = express();

// Adding cors

app.use(cors());

// Serving static

app.use('/media',express.static(path.join(BASE_DIR,'media')))

// Adding the useragent middleware
app.use(useragent.express());

app.use(express.json());

app.use((req,res,next)=>{
  const url = req.url
  const method = req.method
  const date = new Date()
  const ipAddress = req.ip;
  const time = `${date.getHours()}:${date.getMinutes() }:${date.getSeconds()}:${date.getMilliseconds()}`

  console.log(`[${date.toDateString()} ${time}] : METHOD: ${method} - URL: ${url} - IP: ${ipAddress}`)
  next()
})

app.get("/", (req, res) => {
  res.send("<h1>Welcome to my blog backend</h1>");
});

app.use('/api',routes)

app.listen(PORT, HOST, async () => {
  try {
    setupDocs(app)
    console.log(`app running at http://${HOST}:${PORT}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
