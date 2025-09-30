import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDb from "./config/db.js";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cors(
  {
    origin: ["https://acharya-group.vercel.app","https://achariyagroup.in","http://localhost:3000","https://acharya-group-six.vercel.app"],
    credentials: true, 
  }
));
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", routes);
ConnectDb();
app.listen(PORT, () => {
  console.log(`🚀 App listening on port ${PORT}`);
});
