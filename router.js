// import slugify from "slugify";
// import { v4 as uuidv4 } from "uuid";
// import { Record, String, Number, Boolean } from "runtypes";

// import { authenticateUser } from "./auth.js";

import DynamoDb from "cyclic-dynamodb";
import { Router } from "express";

// Initialize Express router
export const router = Router();

// Initialize AWS DynamoDB
const db = DynamoDb(process.env.CYCLIC_DB);
const bikesCollection = db.collection("bikes");

// ------------------------------------
// GET ROUTES
// ------------------------------------

// Get all bikes
router.get("/all", async (req, res) => {
    const { results: bikesMetadata } = await bikesCollection.list();
  
    const bikes = await Promise.all(
      bikesMetadata.map(async ({ key }) => (await bikesCollection.get(key)).props)
    );
  
    res.send(bikes);
});
