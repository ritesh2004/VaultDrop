import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import ApiError, { errorHandler } from "./utils/ApiError.ts";

const app: Express = express();

// Middleware
app.use(cors());
app.options("*", cors()); // Enable pre-flight requests for all routes

app.use(helmet()); // Security middleware

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static("public")); // Serve static files from the "public" directory

// Routes
import routes from "./routes/index.ts";

app.use("/api/v1", routes); // Use the routes defined in the routes directory

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(404, "Not Found")); // Handle 404 errors
})

// Error handling middleware
app.use(errorHandler); // Custom error handling middleware

export default app; // Export the Express app instance