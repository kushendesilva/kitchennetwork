import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Card, Title, ActivityIndicator, Appbar } from "react-native-paper";
import { Colors, db, storage } from "../config";
import { View, Button, TextInput } from "../components";
import { doc, updateDoc, setDoc } from "firebase/firestore/lite";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AppRenderIf from "../config/AppRenderIf";
import { db } from "../config";

export const SelectCategoryImage = (props) => {
  const { navigation, route } = props;

  const recipeId = route.params?.recipeId;

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const { navigation } = props;

  const id = Date.now().toString();

  const [name, setName] = useState("");

  const createDoc = async (url) => {
    const testCollectionRef = doc(db, "categories", id);
    await setDoc(testCollectionRef, {
      id,
      name,
      photo_url: url,
    });
    navigation.navigate("SelectImage", { recipeId, title, category });
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
      <Appbar>
        <Appbar.Action
          icon="arrow-left"
          onPress={async () => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="New Category" />
      </Appbar>
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
          Category Preview
        </Title>
      )}
      {uploading == true && (
        <Title
          style={{ fontWeight: "bold", textAlign: "center", marginTop: 10 }}
        >
          Image Uploading
        </Title>
      )}
      <Card style={{ elevation: 0 }}>
        <View style={styles.categoriesItemContainer}>
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

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
                color: Colors.white,
                margin: "3%",
              }}
            >
              {name}
            </Text>
          </View>
        </View>
      </Card>

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
};

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
    width: "100%",
    height: 155,
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
