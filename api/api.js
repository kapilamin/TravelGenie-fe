import amadeusClient from "./amadeusClient";

const getExcursions = async (latitude, longitude, radius = 1) => {
  try {
    const response = await amadeusClient.get("/v1/shopping/activities", {
      params: {
        latitude,
        longitude,
        radius,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching hotels:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getFlights = async (
  originLocationCode,
  destinationLocationCode,
  departureDate,
  adults = 1,
  max = 3
) => {
  try {
    const response = await amadeusClient.get("/v2/shopping/flight-offers", {
      params: {
        originLocationCode,
        destinationLocationCode,
        departureDate,
        adults,
        max,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching hotels:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getHotelsByCity = async (cityCode) => {
  try {
    const response = await amadeusClient.get(
      "/v1/reference-data/locations/hotels/by-city",
      {
        params: {
          cityCode,
          radius: 1,
          radiusUnit: "KM",
        },
      }
    );

    return response.data.data; // List of hotels with their IDs
  } catch (error) {
    console.error(
      "Error fetching hotels:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getHotelOffers = async (hotelIds, checkInDate, checkOutDate) => {
  try {
    const response = await amadeusClient.get("/v3/shopping/hotel-offers", {
      params: {
        hotelIds: hotelIds.join(","),
        checkInDate,
        checkOutDate,
      },
    });

    return response.data.data; // Detailed hotel offers
  } catch (error) {
    console.log(error.response.data.errors);
    throw error;
  }
};

const getHotelsAndDeals = async (cityCode, checkInDate, checkOutDate) => {
  try {
    // Step 1: Get hotels in the specified city
    const hotels = await getHotelsByCity(cityCode);
    const hotelIds = hotels.map((hotel) => hotel.hotelId);

    // Step 2: Get offers for these hotels

    const hotelDeals = await getHotelOffers(
      hotelIds,
      checkInDate,
      checkOutDate
    );

    return hotelDeals;
  } catch (error) {
    throw error;
  }
};

export {
  getExcursions,
  getFlights,
  getHotelOffers,
  getHotelsByCity,
  getHotelsAndDeals,
};
