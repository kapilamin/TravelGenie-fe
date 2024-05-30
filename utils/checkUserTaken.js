import { Alert } from "react-native";

const showAlert = (setUsername, setIsPostingUser) => {
  setTimeout(() => {
    Alert.alert("Username already taken", "Please select another", [
      { text: "OK" },
    ]);
    setUsername("");
    setIsPostingUser(false);
  }, 2000);
};

export default showAlert;
