import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getHotelsAndDeals } from "../../api/api";
import { cityToCode, codeToCity } from "../../utils/iataAirportCodes";

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
    const outboundAirportCode = cityToCode(outboundAirport);

    getHotelsAndDeals(outboundAirportCode, departDate, returnDate).then(
      (hotelData) => {
        setIsLoading(false);
        setHotels(hotelData);
      }
    );
  }, []);

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
  };

  const renderHotelItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleHotelSelect(item)}
      style={
        item.offers[0].id === selectedHotel?.offers[0].id
          ? styles.selectedFlightItem
          : styles.flightItem
      }
    >
      <Text style={styles.flightText}>Hotel name: {item.hotel.name}</Text>
      <Text style={styles.flightText}>
        Room Type: {item.offers[0].room.category}
      </Text>
      <Text style={styles.flightText}>
        Description: {item.offers[0].room.description.text}
      </Text>
      <Text style={styles.flightText}>
        Price: {item.offers[0].price.total}
        {item.offers[0].price.currency}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Hotel</Text>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <>
          <FlatList data={hotels} renderItem={renderHotelItem} />
          {selectedHotel && (
            <Button
              title={"Confirm Hotel"}
              onPress={() =>
                navigation.navigate("generate-excursions", {
                  selectedOutboundFlight,
                  selectedInboundFlight,
                  outboundAirport,
                  inboundAirport,
                  departDate,
                  returnDate,
                  budget,
                  selectedHotel,
                })
              }
            ></Button>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: "90%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  flightItem: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  flightText: {
    fontSize: 16,
  },
  selectedFlightItem: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#e0f7fa",
    borderRadius: 8,
  },
  selectedFlightText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GenerateHotels;
