import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore/lite";

import { signOut } from "firebase/auth";
import { auth, db, Colors } from "../config";
import { Button, View } from "../components";

export const AccountScreen = () => {
  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  const [beaches, setBeaches] = useState([]);
  const beachesCollectionRef = collection(db, "beaches");

  useEffect(() => {
    const getBeaches = async () => {
      const data = await getDocs(beachesCollectionRef);
      setBeaches(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getBeaches();
  }, []);

  return (
    <View
      isSafe
      style={{ flex: 1, backgroundColor: Colors.white, paddingHorizontal: 12 }}
    >
      <Button onPress={handleLogout} title="Logout" />
    </View>
  );
};
