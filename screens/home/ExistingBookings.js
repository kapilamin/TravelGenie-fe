import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { BookingContext } from "../../context/BookingContext";
import LottieView from "lottie-react-native";
import { fetchBookings } from "../../api/api";

const ExistingBookings = () => {
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
    <View style={styles.bookingCard}>
      <Text style={styles.bookingText}>
        {item.selectedOutboundFlight} to {item.selectedInboundFlight}
      </Text>
      <Text style={styles.bookingText}>
        Depart: {item.departDate.split("T")[0]}
      </Text>
      <Text style={styles.bookingText}>
        Return: {item.returnDate.split("T")[0]}
      </Text>
      <Text style={styles.bookingText}>Hotel: {item.selectedHotel}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Existing Bookings</Text>
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
    marginTop: 50,
  },
  bookingCard: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "90%",
  },
  bookingText: {
    fontSize: 16,
    marginBottom: 5,
  },
  lottieView: {
    position: "absolute",
    width: 600,
    height: 1400,
  },
});

export default ExistingBookings;
