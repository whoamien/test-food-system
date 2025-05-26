import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import routes from "./routes"; // Import the routes

AppDataSource.initialize()
    .then(async () => {
        // Create express app
        const app = express();
        app.use(bodyParser.json());

        // Register routes
        app.use("/api", routes); // Prefix all routes with "/api"

        // Start express server
        app.listen(3000, () => {
            console.log("Express server has started on port 3000. Open http://localhost:3000/api to see results");
        });
    })
    .catch((error) => console.log(error));