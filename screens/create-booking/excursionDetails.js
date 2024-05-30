import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import TextBold from "../TextBold";
import TextReg from "../TextReg";

const ExcursionDetails = ({ navigation, route }) => {
  const { excursion } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.detailsContainer}>
          <TextBold style={styles.title}>{excursion.name}</TextBold>
          {excursion.pictures && excursion.pictures.length > 0 && (
            <Image
              source={{ uri: excursion.pictures[0] }}
              style={styles.image}
            />
          )}
          <TextReg style={styles.description}>
            {excursion.shortDescription || excursion.description}
          </TextReg>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}></View>
    </View>
  );
};

export default ExcursionDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 25,
    marginTop: 20,
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    marginTop: 30,
  },
  detailTitle: {
    fontSize: 18,
    marginTop: 16,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
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
});
