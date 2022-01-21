import React, { useState, useEffect } from "react";
import { StyleSheet, Image, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Title, ActivityIndicator } from "react-native-paper";
import { Colors, db, storage } from "../config";
import { View, Button, TextInput } from "../components";
import { doc, setDoc } from "firebase/firestore/lite";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AppRenderIf from "../config/AppRenderIf";

export default function NewCategory(props) {
  const { navigation } = props;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permission to make this work");
        }
      }
    })();
  }, []);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const id = Date.now().toString();

  const [name, setName] = useState("");

  const createDoc = async (url) => {
    const testCollectionRef = doc(db, "categories", id);
    await setDoc(testCollectionRef, {
      id,
      name,
      photo_url: url,
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    const imageId = Date.now().toString();
    const storageRef = ref(storage, "categories/" + imageId);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            setUploading(true);
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploaded(true);
          createDoc(downloadURL);
          navigation.goBack();
          blob.close();
        });
      }
    );
  };

  return (
    <View isSafe>
      <TextInput
        autoCapitalize="words"
        left="layers"
        label="Category Name"
        onChangeText={(text) => setName(text)}
      />
      {uploading != true && (
        <Title
          style={{
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 10,
            color: Colors.mediumGray,
          }}
        >
          Image Preview
        </Title>
      )}
      {uploading == true && (
        <Title
          style={{ fontWeight: "bold", textAlign: "center", marginTop: 10 }}
        >
          Image Uploading
        </Title>
      )}

      {AppRenderIf(
        image != null,
        <Image style={styles.categoriesPhoto} source={{ uri: image }} />
      )}
      {AppRenderIf(
        image == null,
        <Image
          style={styles.categoriesPhoto}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/kitchennetwork-cw.appspot.com/o/default.png?alt=media&token=77cfe569-4e3c-45e8-89f2-ce75584ee611",
          }}
        />
      )}

      <View>
        {uploading == true && (
          <>
            <ActivityIndicator
              style={{ marginTop: 10 }}
              size={40}
              animating={uploading}
              color={Colors.primary}
            />
          </>
        )}

        {uploaded == false && (
          <>
            {image == null && (
              <Button
                style={{
                  width: 182,
                  alignSelf: "center",
                  elevation: 10,
                  borderRadius: 25,
                }}
                icon="image"
                mode="contained"
                onPress={pickImage}
                title="Choose a Picture"
              />
            )}
            {uploading == false && image && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Button
                  style={{
                    width: 182,
                    alignSelf: "center",
                    elevation: 10,
                    borderRadius: 25,
                    backgroundColor: Colors.blue,
                  }}
                  icon="image"
                  mode="contained"
                  onPress={() => {
                    setImage(null);
                  }}
                  title="Change Picture"
                />

                <Button
                  style={{
                    width: 182,
                    alignSelf: "center",
                    elevation: 10,
                    borderRadius: 25,
                    backgroundColor: Colors.green,
                  }}
                  icon="cloud-upload"
                  title="Create"
                  onPress={uploadImage}
                />
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoriesItemContainer: {
    flex: 1,
    marginHorizontal: "5%",
    marginVertical: "2%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: Colors.primary,
    elevation: 5,
  },
  categoriesPhoto: {
    width: 350,
    height: 175,
    alignSelf: "center",
  },
  categoriesName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.white,
    margin: "3%",
  },
  categoriesInfo: {
    marginBottom: 8,
  },
});
