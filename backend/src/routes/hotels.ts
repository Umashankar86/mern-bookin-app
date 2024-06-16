import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import { HotelSearchResponse } from "../shared/types";

const router = express.Router();

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};
  console.log("Received query params:", queryParams); // Log received query params

  if (queryParams.destination) {
    const destinationRegex = new RegExp(queryParams.destination, "i");
    constructedQuery.$or = [
      { city: destinationRegex },
      { country: destinationRegex },
    ];
    console.log("Destination query added:", constructedQuery);
  }

  if (queryParams.adultCount) {
    const adultCount = parseInt(queryParams.adultCount, 10);
    if (!isNaN(adultCount)) {
      constructedQuery.adultCount = { $gte: adultCount };
    }
    console.log("Adult count query added:", constructedQuery);
  }

  if (queryParams.childCount) {
    const childCount = parseInt(queryParams.childCount, 10);
    if (!isNaN(childCount)) {
      constructedQuery.childCount = { $gte: childCount };
    }
    console.log("Child count query added:", constructedQuery);
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
    console.log("Facilities query added:", constructedQuery);
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
    console.log("Types query added:", constructedQuery);
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star, 10)).filter((star: number) => !isNaN(star))
      : [parseInt(queryParams.stars, 10)].filter((star: number) => !isNaN(star));

    if (starRatings.length > 0) {
      constructedQuery.starRating = { $in: starRatings };
    }
    console.log("Stars query added:", constructedQuery);
  }

  if (queryParams.maxPrice) {
    const maxPrice = parseInt(queryParams.maxPrice, 10);
    if (!isNaN(maxPrice)) {
      constructedQuery.pricePerNight = { $lte: maxPrice };
    }
    console.log("Max price query added:", constructedQuery);
  }

  console.log("Constructed Query:", JSON.stringify(constructedQuery, null, 2)); // Log the constructed query
  return constructedQuery;
};

router.get("/search", async (req: Request, res: Response) => {
  try {
    const pageSize = 7;
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1", 10);
    const skip = (pageNumber - 1) * pageSize;

    const query = constructSearchQuery(req.query);
    console.log("MongoDB Query:", JSON.stringify(query, null, 2)); // Log the query passed to MongoDB

    const hotels = await Hotel.find(query).skip(skip).limit(pageSize);
    const total = await Hotel.countDocuments(query);

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
