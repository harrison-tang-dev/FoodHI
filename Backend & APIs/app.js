import express from "express";
import cors from "cors"; // Assuming you have defined your authentication endpoints in this file
import dotenv from "dotenv";
import helmet from "helmet";
import session from "express-session";
import MongoDBStorePackage from "connect-mongodb-session";
import cookieParser from "cookie-parser";
import { ErrorHandler } from "./app/middleware/errorhandler.js";
import { connect } from "./app/db/conn.js";
import { router as authRoutes } from "./app/routes/authRoutes.js";
import { router as dashRoutes } from "./app/routes/dashRoutes.js";
import path from "node:path";
import { fileURLToPath } from "url";
import process from "node:process";
import { Image } from "./app/models/users/Imagesdir.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticuploads = path.join(__dirname, "./app", "uploads");
dotenv.config();

const app = express();

connect(process.env.DB_URL);

const MongoDBStore = MongoDBStorePackage(session);

// Configure MongoDB session store
export const store = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: "userSessions",
  autoRemove: "interval",
  autoRemoveInterval: 30, // In minutes. Default
});

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://safegate.virtualdemo.tech",
        "https://safeplate-backend.webdemozone.com",
        "http://207.148.68.65",
      ];
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: "GET, PUT, POST, DELETE, PATCH,OPTIONS",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);
app.use(express.json({ limit: "25mb" })); // JSON body parser with a limit
app.use(
  express.urlencoded({
    limit: "25mb",
    extended: true,
  })
); // URL-encoded body parser with a limit

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 15, // expires in 15 day
    // maxAge: 3 * 60 * 1000, //5 minutes
    httpOnly: false,
    sameSite: "None",
    secure: process.env.NODE_ENV === "production", // use secure cookies in production
  }, // 1 day
  store: store,
  resave: false,
  saveUninitialized: false,
});

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // trust first proxy
}

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.use((req, res, next) => {
  if (!req.session) {
    req.session = sessionMiddleware;
  }
  next();
});

app.get("/", (req, res) => {
  res.status(200).json("server live 🚀🚀 ");
  // console.log('session',req);
});

//config routes for user routes
app.use("/api/v1", authRoutes);
app.use("/api/dash", dashRoutes);

app.use("/static", express.static(staticuploads));

app.get("/api/images/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Check for application/octet-stream and possibly set a more specific Content-Type
    if (image.contentType === "application/octet-stream") {
      // Optional: You could set a default content type here based on your needs
      // For example, if you know the image is a PNG, you could set it like this:
      res.set("Content-Type", "image/png");
    } else {
      res.set("Content-Type", image.contentType);
    }

    res.send(image.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use("*", (req, res) => {
  res.status(404).json({ message: "The resource you are looking not exist" });
});

app.use(ErrorHandler);

app.disable("etag");

const PORT = process.env.PORT || 9900; // Default port or from environment variable
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// process.on('unhandledRejection', (reason, promise) => {
//   console.error('Unhandled Rejection at:', promise);

//   if (reason instanceof Error) {
//     console.error('Reason:', reason.message);
//     console.error('Stack Trace:', reason.stack);
//   } else {
//     console.error('Reason:', reason);
//   }
// });
