const path = require("path");
const { getDefaultConfig: getExpoDefaultConfig } = require("expo/metro-config");
const {
  getDefaultConfig: getReactNativeDefaultConfig,
  mergeConfig,
} = require("@react-native/metro-config");

const reactNativeConfig = getReactNativeDefaultConfig(__dirname);
const config = getExpoDefaultConfig(__dirname);
const appwriteSdkPath = path.join(
  __dirname,
  "node_modules/react-native-appwrite/dist/cjs/sdk.js",
);

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...config.resolver.sourceExts, "svg"],
  resolveRequest: (context, moduleName, platform) => {
    if (moduleName === "react-native-appwrite") {
      return {
        type: "sourceFile",
        filePath: appwriteSdkPath,
      };
    }

    if (moduleName.startsWith("@/")) {
      const aliasPath = moduleName.replace("@/", "");
      return {
        type: "sourceFile",
        filePath: path.resolve(__dirname, aliasPath),
      };
    }

    return context.resolveRequest(context, moduleName, platform);
  },
};

// ensure metro watches the project root
config.watchFolders = [path.resolve(__dirname)];

module.exports = mergeConfig(reactNativeConfig, config);
