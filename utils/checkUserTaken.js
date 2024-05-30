import { Alert } from "react-native";

const showAlert = (setIsPostingUser) => {
  setTimeout(() => {
    Alert.alert("Username already taken", "Please select another", [
      { text: "OK"},
    ]);
    setIsPostingUser(false)
  }, 2000);
  
};

export default showAlert;
