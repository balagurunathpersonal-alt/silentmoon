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
│   ├── oauth.tsx                   # OAuth redirect handling
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
- Xcode and CocoaPods for iOS development on macOS

## Getting Started

Install dependencies:

```bash
npm install
```

Start Metro:

```bash
npm start
```

Run on Android:

```bash
npm run android
```

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

## Appwrite Configuration

Appwrite settings are defined in `constants/app-constants.ts`.

Current values include:

- Endpoint: `https://fra.cloud.appwrite.io/v1`
- Project ID: `69ead33e003129ed4fea`
- Android package: `com.balagurunath.srinivasan.silentMoon`
- Deep link scheme: `appwrite-callback-69ead33e003129ed4fea`

If you connect the app to a different Appwrite project, update these constants and make sure the OAuth callback/deep link settings match your Appwrite console configuration.

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
