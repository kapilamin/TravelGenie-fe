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
import { getExcursions } from "../../api/api";
import TextReg from "../TextReg";
import TextBold from "../TextBold";

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
    )
      .then((excursionData) => {
        setIsLoading(false);
        setExcursions(excursionData);
      })
      .catch(() => {
        setIsLoading(false);
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
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleExcursionSelect(item)}
        style={
          selectedExcursions.includes(item)
            ? styles.selectedFlightItem
            : styles.flightItem
        }
      >
        <View style={styles.flightInfoContainer}>
          <View style={styles.textContainer}>
            <TextBold style={styles.airlineText}>Excursion Name:</TextBold>
            <TextReg style={styles.airlineText}>{item.name}</TextReg>
          </View>
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate("excursionDetails", { excursion: item })
          }
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
      <TextBold style={styles.title}>Select Excursions</TextBold>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <>
          <FlatList
            data={excursions}
            renderItem={renderExcursionItem}
            keyExtractor={(item) => item.id.toString()}
          />
          {selectedExcursions.length > 0 && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
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
              >
                <TextReg style={styles.buttonText}>Confirm Excursions</TextReg>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default GenerateExcursions;

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
    marginLeft: 16,
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
