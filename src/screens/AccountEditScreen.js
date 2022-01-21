import React, { useState } from "react";
import { View, TextInput, Button as MyButton } from "../components";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import AppRenderIf from "../config/AppRenderIf";
import { sendPasswordResetEmail } from "firebase/auth";
import { Colors, auth } from "../config";
import { db } from "../config";
import { setDoc, doc } from "firebase/firestore/lite";

function AccountEditScreen(props) {
  const { navigation } = props;
  const { user } = props.route.params;

  const [visibility, setVisibility] = useState(true);

  const [name, setName] = useState(user.name);
  const updateUser = async () => {
    const testCollectionRef = doc(db, "users", user.id);
    await setDoc(testCollectionRef, {
      name: name,
      id: user.id,
      email: user.email,
    });
  };

  const resetPassword = () => {
    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        console.log("Success: Password Reset Email sent.");
        navigation.goBack();
      })
      .catch((error) => setErrorState(error.message));
  };

  return (
    <View isSafe>
      <View style={styles.containers}>
        <TextInput
          label="Email"
          left="email-outline"
          placeholder="Enter your email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          disabled={true}
          value={user.email}
        />
        <TextInput
          autoCapitalize="words"
          label="Name"
          left="account-outline"
          placeholder="Enter your name"
          disabled={visibility}
          value={name}
          onChangeText={(nextValue) => setName(nextValue)}
        />
        <MyButton
          disabled={visibility}
          onPress={resetPassword}
          title="Reset Password"
        />
        {AppRenderIf(
          visibility,
          <Button
            mode="contained"
            icon="pencil"
            style={{
              alignSelf: "center",
              marginTop: "2%",
              padding: "2%",
              backgroundColor: Colors.yellow,
            }}
            onPress={() => {
              setVisibility(!visibility);
            }}
          >
            Edit
          </Button>
        )}
        {AppRenderIf(
          !visibility,
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: "2%",
            }}
          >
            <Button
              mode="contained"
              icon="pencil"
              style={{
                padding: "2%",
                backgroundColor: Colors.red,
              }}
              onPress={() => {
                setVisibility(!visibility);
              }}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              icon="pencil"
              style={{
                padding: "2%",
                backgroundColor: Colors.green,
              }}
              onPress={() => {
                setVisibility(!visibility);
                updateUser();
                navigation.goBack();
              }}
            >
              Update
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}

export default AccountEditScreen;

const styles = StyleSheet.create({
  containers: {
    padding: 10,
  },
  ContainerButton: {
    flexDirection: "row",
    justifyContent: "center",
  },
  containerHeading: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: Colors.white,
    padding: "5%",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 15,
  },
  containerTop: {
    alignItems: "center",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "center",
  },
  HeadingFont: {
    fontWeight: "bold",
  },
});
