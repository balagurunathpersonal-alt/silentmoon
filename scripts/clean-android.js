const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const pathsToRemove = [
  'android/.gradle',
  'android/.kotlin',
  'android/build',
  'android/app/build',
  'android/app/.cxx',
  'node_modules/expo-modules-core/android/build',
  'node_modules/expo-modules-core/android/.cxx',
  'node_modules/react-native-screens/android/build',
  'node_modules/react-native-screens/android/.cxx',
  'node_modules/react-native-gesture-handler/android/build',
  'node_modules/react-native-gesture-handler/android/.cxx',
];

for (const relativePath of pathsToRemove) {
  const absolutePath = path.join(rootDir, relativePath);
  fs.rmSync(absolutePath, { force: true, recursive: true });
  console.log(`Removed ${relativePath}`);
}
