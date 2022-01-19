import "dotenv/config";

export default {
  expo: {
    name: "Kitchen Network",
    slug: "kitchennetwork",
    owner: "kushenthimira",
    platforms: ["android"],
    version: "0.2.0-beta",
    orientation: "portrait",
    icon: "./assets/logo.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#ff3d71",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "npc.cipher.kitchennetwork",
    },
    android: {
      package: "npc.cipher.kitchennetwork",
      adaptiveIcon: {
        foregroundImage: "./assets/logo.png",
        backgroundColor: "#ffffff",
      },
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
  },
};
