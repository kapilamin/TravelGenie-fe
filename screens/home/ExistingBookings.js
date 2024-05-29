import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { BookingContext } from "../../context/BookingContext";
import LottieView from "lottie-react-native";
import { fetchBookings } from "../../api/api";
import TextBold from "../TextBold";
import TextReg from "../TextReg";

const ExistingBookings = ({ navigation, route }) => {
  const { bookings } = useContext(BookingContext);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  const [fetchedBookings, setFetchedBookings] = useState([]);
  useEffect(() => {
    fetchBookings().then((res) => {
      setFetchedBookings(res);
    });

    setIsLoadingBookings(false);
  }, [bookings]);

  useEffect(() => {
    setIsLoadingBookings(true);
    if (bookings && bookings.length > 0) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [bookings]);

  const renderBooking = ({ item }) => (
    <Pressable
      onPress={() => {
        navigation.navigate("BookingInfo", { item });
      }}
    >
      <View style={styles.bookingCard}>
        <View style={styles.bookingContainer}>
          <TextBold style={styles.bookingText}>
            {item.selectedOutboundFlight} to {item.selectedInboundFlight}
          </TextBold>
          <TextReg style={styles.bookingText}>
            Depart: {item.departDate.split("T")[0]}
          </TextReg>
          <TextReg style={styles.bookingText}>
            Return: {item.returnDate.split("T")[0]}
          </TextReg>
          <TextReg style={styles.bookingText}>
            Hotel: {item.selectedHotel}
          </TextReg>
        </View>
        <View style={styles.image}>
          <Image
            source={require("../../assets/boarding-pass-icon.png")}
            style={styles.boardingPassIcon}
          />
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <TextBold style={styles.header}>Existing Bookings</TextBold>
      <FlatList
        data={fetchedBookings}
        renderItem={renderBooking}
        keyExtractor={(item, index) => index.toString()}
      />
      {showConfetti && (
        <LottieView
          source={require("../../assets/confetti.json")}
          autoPlay
          loop
          style={styles.lottieView}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 70,
  },
  bookingCard: {
    padding: 20,
    marginVertical: 10,
    marginRight: 60,
    borderRadius: 20,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#f9f9f9",
  },
  bookingText: {
    fontSize: 16,
    marginBottom: 5,
  },
  lottieView: {
    position: "absolute",
    width: 800,
    height: 1400,
  },
  boardingPassIcon: {
    width: 50,
    height: 50,
  },
  image: {
    alignSelf: "center",

  },
  bookingContainer: {
    marginTop: 15,
    width: "75%",
  },
});

export default ExistingBookings;
