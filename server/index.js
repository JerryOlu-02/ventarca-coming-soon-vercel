import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hi");
});

app.post("/api/submit", (req, res, next) => {
  // POST data to Brevo
  axios
    .post(
      "https://api.brevo.com/v3/contacts",
      {
        email: req.body.email_address,
        listIds: [2],
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
          accept: "application/json",
        },
      }
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      // Check if error came from the external API
      if (error.response) {
        return res.status(error.response.status).json({
          success: false,
          error: error.response.data.message || "External API Error",
        });
      }

      next(error);
    });
});

app.use((err, req, res, next) => {
  console.error("Backend Error:", err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    error:
      err?.response?.data?.message || err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 8000;

app.listen(8000, () => console.log(`Server is running on ${PORT}`));

export default app;
