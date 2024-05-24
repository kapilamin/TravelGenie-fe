import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getHotelsAndDeals } from "../../api/api";
import { cityToCode, codeToCity } from "../../utils/iataAirportCodes";
import TextReg from "../TextReg";
import TextBold from "../TextBold";

const GenerateHotels = ({ navigation, route }) => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    selectedOutboundFlight,
    selectedInboundFlight,
    outboundAirport,
    inboundAirport,
    departDate,
    returnDate,
    budget,
  } = route.params;

  useEffect(() => {
    setIsLoading(true);
    const inboundAirportCode = cityToCode(inboundAirport);

    getHotelsAndDeals(inboundAirportCode, departDate, returnDate)
      .then((hotelData) => {
        setIsLoading(false);
        setHotels(hotelData);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
  };

  const renderHotelItem = ({ item }) => (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleHotelSelect(item)}
        style={
          item.offers[0].id === selectedHotel?.offers[0].id
            ? styles.selectedFlightItem
            : styles.flightItem
        }
      >
        <View style={styles.flightInfoContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/hotel.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.airlineText}>{item.hotel.name}</Text>
            <Text style={styles.departureText}>
              Room Type:{" "}
              {item.offers[0].room.typeEstimated.category
                .replace(/_/g, " ")
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Text>
          </View>
        </View>
        <Text style={styles.priceText}>
          {item.offers[0].price.total.split(".")[0]}
          {item.offers[0].price.currency}
        </Text>
        <Pressable
          onPress={() => navigation.navigate("hotelDetails", { hotel: item })}
        >
          <Image
            source={require("../../assets/info.png")}
            style={styles.arrowImage}
          />
        </Pressable>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.flightContainer}>
      <TextBold style={styles.title}>Select Hotel</TextBold>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <>
          <FlatList
            data={hotels}
            renderItem={renderHotelItem}
            keyExtractor={(item) => item.offers[0].id.toString()}
          />
          {selectedHotel && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate("generate-excursions", {
                    selectedOutboundFlight,
                    selectedInboundFlight,
                    outboundAirport,
                    inboundAirport,
                    departDate,
                    returnDate,
                    budget,
                    selectedHotel
                    
                  })
                }
              >
                <TextReg style={styles.buttonText}>Confirm Hotel</TextReg>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default GenerateHotels;

const styles = StyleSheet.create({
  flightContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  flightInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  imageContainer: {
    marginRight: 16,
  },
  image: {
    width: 40,
    height: 40,
  },
  textContainer: {
    flex: 1,
  },
  airlineText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  departureText: {
    fontSize: 14,
    color: "#888",
  },
  flightItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  selectedFlightItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#e0f7fa",
    borderRadius: 8,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
    marginRight: 16,
  },
  arrowImage: {
    width: 20,
    height: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    padding: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
