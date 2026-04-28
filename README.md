# Silent Moon

Silent Moon is a React Native meditation app for guided mindfulness, sleep, music, daily recommendations, and reminder scheduling. It uses React Navigation for the app flow, Appwrite for authentication and data access, and local push notifications for meditation reminders.

## Features

- Email/password and OAuth authentication with Appwrite
- Protected app navigation after sign-in
- Welcome, topic selection, reminder setup, and main tab flows
- Bottom tabs for Home, Sleep, Meditate, Music, and Profile
- Meditation course detail screens with narrator/session options
- Recommended content for home, sleep, meditate, and music sections
- Local scheduled reminders with weekday selection
- Light/dark theme support through the app theme provider
- Secure storage and Appwrite service helpers

## Tech Stack

- React Native `0.81`
- React `19`
- Expo modules
- TypeScript
- React Navigation
- React Native Appwrite
- React Native Paper
- React Native Push Notification
- React Native SVG

## Project Structure

```text
.
├── App.tsx                         # Root providers and navigation container
├── app/
│   ├── components/                 # Shared UI components
│   └── screens/                    # App screens
├── assets/                         # Images and SVG assets
├── constants/                      # App and Appwrite constants
├── di/                             # Dependency provider
├── navigation/                     # Navigation helpers
├── services/                       # Auth, Appwrite, notifications, storage
├── themes/                         # Theme context and theme values
├── types/                          # Shared TypeScript types
├── viewmodels/                     # Screen state and interaction logic
└── android/                        # Native Android project
```

## Prerequisites

Install the following before running the app:

- Node.js
- npm
- Android Studio with an Android emulator or a connected Android device
- JDK 17, or Android Studio's bundled JDK if it is compatible with Gradle
- Xcode and CocoaPods for iOS development on macOS

Use an LTS Node.js release for Metro and React Native. This project supports Node.js 20, 22, or 24. Do not use Node.js 25. The repo includes `.nvmrc` for Node version managers.

For Android builds, keep machine-specific paths out of committed project files:

- Use JDK 17 for the most reliable Android builds. This repo includes `.java-version` for version managers.
- Set `JAVA_HOME` locally if Gradle cannot find Java or if your machine defaults to a newer unsupported Java version.
- Let Android Studio create `android/local.properties`, or create it yourself with your local SDK path.

Check your Java version:

```bash
java -version
```

Windows `JAVA_HOME` example:

```bat
setx JAVA_HOME "C:\Program Files\Java\jdk-17"
```

macOS `JAVA_HOME` example:

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

Example `android/local.properties` values:

```properties
# macOS
sdk.dir=/Users/<user>/Library/Android/sdk

# Windows
sdk.dir=C:\\Users\\<user>\\AppData\\Local\\Android\\Sdk
```

## Getting Started

Install dependencies:

```bash
npm install
```

If you previously installed dependencies with an older project version, remove the old install first:

```bash
rm -rf node_modules
npm ci
```

Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
npm ci
```

Start Metro:

```bash
npm start
```

Run on Android:

```bash
npm run android
```

On Windows, if Android native builds fail with `Filename longer than 260 characters`, keep the project in a short path such as `C:\src\silentmoon` and clean generated native build output:

```powershell
Remove-Item -Recurse -Force android\app\.cxx, android\.gradle, android\build, android\app\build -ErrorAction SilentlyContinue
npm run android
```

If `:app:validateSigningDebug` fails, clean the same generated folders and run again. Debug signing uses each machine's local Android debug keystore when `android/app/debug.keystore` is not present.

Run on iOS:

```bash
npm run ios
```

## Available Scripts

```bash
npm start
```

Starts the React Native Metro bundler.

```bash
npm run android
```

Builds and launches the app on Android.

```bash
npm run ios
```

Builds and launches the app on iOS.

```bash
npm run start:metro
```

Starts Metro explicitly.


## Navigation Flow

The app starts at the landing/sign-in flow for signed-out users and redirects authenticated users into the protected experience. Main protected screens include:

- Welcome
- Topics
- Reminder
- MainTabs
- CourseDetail

The main tab navigator contains:

- Home
- Sleep
- Meditate
- Music
- Profile

## Notifications

Reminder notifications are configured in `services/notification-service.ts` and scheduled from `viewmodels/reminder.viewmodel.ts`.

On Android 13 and above, the app requests `POST_NOTIFICATIONS` permission before scheduling reminders. Android reminders use the `silent-moon` notification channel.

## Development Notes

- SVG files are imported with `react-native-svg-transformer`.
- App state and business logic are organized into viewmodels.
- Authentication state is provided by `services/auth-context.tsx`.
- The root providers are composed in `App.tsx`.

## License

This project is private and currently does not specify a license.
