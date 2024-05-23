import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getExcursions } from "../../api/api";

const GenerateExcursions = ({ navigation, route }) => {
  const [excursions, setExcursions] = useState([]);
  const [selectedExcursions, setSelectedExcursions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    selectedOutboundFlight,
    selectedInboundFlight,
    outboundAirport,
    inboundAirport,
    departDate,
    returnDate,
    budget,
    selectedHotel,
  } = route.params;

  useEffect(() => {
    console.log(
      selectedHotel.hotel.latitude,
      selectedHotel.hotel.longitude,
      10
    );
    setIsLoading(true);
    getExcursions(
      selectedHotel.hotel.latitude,
      selectedHotel.hotel.longitude,
      10
    ).then((excursionData) => {
      setIsLoading(false);
      setExcursions(excursionData);
    });
  }, []);

  const handleExcursionSelect = (newExcursion) => {
    if (selectedExcursions.includes(newExcursion)) {
      const updatedExcursions = selectedExcursions.filter((excursion) => {
        return excursion.id !== newExcursion.id;
      });
      setSelectedExcursions(updatedExcursions);
    } else {
      setSelectedExcursions([...selectedExcursions, newExcursion]);
    }
  };

  const renderExcursionItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleExcursionSelect(item)}
      style={
        selectedExcursions.includes(item)
          ? styles.selectedFlightItem
          : styles.flightItem
      }
    >
      <View style={styles.flightCard}>
        <Text style={styles.flightText}>Excursion Name: {item.name}</Text>

        <Image source={{ uri: item.pictures[0] }} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Excursions</Text>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <>
          <FlatList data={excursions} renderItem={renderExcursionItem} />
          {selectedExcursions && (
            <Button
              title={"Confirm Excursions"}
              onPress={() =>
                navigation.navigate("confirm-booking", {
                  selectedOutboundFlight,
                  selectedInboundFlight,
                  outboundAirport,
                  inboundAirport,
                  departDate,
                  returnDate,
                  budget,
                  selectedExcursions,
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
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
  },
  flightText: {
    fontSize: 16,
  },
  flightCard: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  icon: {
    width: 40,
    height: 40,
  },
});

export default GenerateExcursions;
