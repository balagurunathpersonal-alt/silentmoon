export const APP_CONSTANTS = {
  appName: "silentMoon",
  slug: "silentMoon",
  version: "1.0.0",
  scheme: "appwrite-callback-69ead33e003129ed4fea",
  bundleId: {
    android: "com.balagurunath.srinivasan.silentMoon",
  },
  eas: {
    projectId: "a8458422-800f-4fa4-a044-b2250904c217",
  },
} as const;

export type AppConstants = typeof APP_CONSTANTS;

export const AppWrite_Constants = {
  endpoint: "https://fra.cloud.appwrite.io/v1",
  projectId: "69ead33e003129ed4fea",
  collectionId: "64b8c9e5a0f1c2e7b4d9",
} as const;

export type AppWrite_Constants = typeof AppWrite_Constants;
