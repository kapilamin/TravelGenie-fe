import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import TextReg from "../TextReg";
import TextBold from "../TextBold";

const documentTypes = [
  "Boarding Pass",
  "Hotel Reservation",
  "Passport",
  "Visa",
  "Excursion Ticket",
];

const BookingInfo = () => {
  const [selectedType, setSelectedType] = useState(documentTypes[0]);
  const [documents, setDocuments] = useState([]);
  const navigation = useNavigation();

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      setDocuments((prevDocs) => [
        ...prevDocs,
        { type: selectedType, ...result },
      ]);
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  const renderDocumentItem = ({ item }) => (
    <View style={styles.documentItem}>
      <TextBold style={styles.documentType}>{item.type}</TextBold>
      <TouchableOpacity
        onPress={() => navigation.navigate("DocumentViewer", { uri: item.uri })}
      >
        <TextReg style={styles.openButton}>Open</TextReg>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={documents}
        renderItem={renderDocumentItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.documentList}
      />

      <Picker
        selectedValue={selectedType}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedType(itemValue)}
      >
        {documentTypes.map((type) => (
          <Picker.Item key={type} label={type} value={type} />
        ))}
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handleDocumentPick}>
        <TextReg style={styles.buttonText}>Pick Document</TextReg>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    marginBottom: 30,
  },
  documentList: {
    height: "55%",
    marginTop: 60,
  },
  documentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderWidth: 1,
    borderColor: "gainsboro",
  },
  documentType: {
    fontSize: 16,
  },
  openButton: {
    color: "#007AFF",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    padding: 20,
    width: "80%",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default BookingInfo;
