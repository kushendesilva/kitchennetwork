import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  Appbar,
} from "react-native-paper";
import { Colors, db, storage } from "../config";
import { View, Button } from "../components";
import { doc, updateDoc, deleteDoc } from "firebase/firestore/lite";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { RecipeCard } from "../config/AppStyles";
import AppRenderIf from "../config/AppRenderIf";

export const SelectImage = (props) => {
  const { navigation, route } = props;

  const recipeId = route.params?.recipeId;
  const title = route.params?.title;
  const category = route.params?.category;

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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
    const storageRef = ref(storage, "recipes/" + imageId);
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
          updateRecipe(downloadURL);
          navigation.navigate("SelectIngredients", { recipeId });
          blob.close();
        });
      }
    );
  };

  const updateRecipe = async (imageUrl) => {
    const recipeDoc = doc(db, "recipes", recipeId);
    const newFields = { photo_url: imageUrl };
    await updateDoc(recipeDoc, newFields);
  };

  return (
    <View isSafe>
      <Appbar>
        <Appbar.Action
          icon="arrow-left"
          onPress={async () => {
            const userDoc = doc(db, "recipes", recipeId);
            await deleteDoc(userDoc);
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Select Image" />
      </Appbar>
      {uploading != true && (
        <Title
          style={{
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 10,
            color: Colors.mediumGray,
          }}
        >
          Recipe Preview
        </Title>
      )}
      {uploading == true && (
        <Title
          style={{ fontWeight: "bold", textAlign: "center", marginTop: 10 }}
        >
          Image Uploading
        </Title>
      )}
      <Card style={[styles.container, { alignSelf: "center", marginLeft: 0 }]}>
        {AppRenderIf(
          image != null,
          <Card.Cover style={styles.photo} source={{ uri: image }} />
        )}
        {AppRenderIf(
          image == null,
          <Card.Cover
            style={styles.photo}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/kitchennetwork-cw.appspot.com/o/default.png?alt=media&token=77cfe569-4e3c-45e8-89f2-ce75584ee611",
            }}
          />
        )}
        <Card.Content>
          <Title style={styles.title}>{title}</Title>
          <Paragraph style={styles.category}>{category}</Paragraph>
        </Card.Content>
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
                  title="Upload"
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
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
});
