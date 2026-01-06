# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project now includes an _Oshikwanyama_ learning section under `app/oshikwanyama` with lessons, proverbs and a sample greetings page. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

---

## Development (local) 🔧

- Install dependencies:

  ```bash
  npm install
  ```

- TypeScript type-check:

  ```bash
  npx tsc --noEmit
  ```

- Lint:

  ```bash
  npm run lint
  ```

- Start the dev server / Metro bundler:

  ```bash
  npm start
  # or
  npx expo start
  ```

- Open on simulator or device:

  - iOS simulator (macOS/Xcode): `npm run ios`
  - Android emulator: `npm run android`
  - Web: `npm run web`

- Native dev clients and development builds (EAS):

  - Install the EAS CLI: `npm install -g eas-cli`
  - Log in: `eas login`
  - Create a development build (install on device/emulator):

    ```bash
    eas build --profile development --platform ios
    eas build --profile development --platform android
    ```

  See https://docs.expo.dev/development/introduction/ for details.

## Testing ✅

- Run the full test suite (Jest + React Native Testing Library):

  ```bash
  npm test
  ```

- Run a single test file:

  ```bash
  npm test -- -i __tests__/your.test.tsx
  ```

- Run tests in watch mode:

  ```bash
  npm test -- --watch
  ```

- If you want to type-check only:

  ```bash
  npx tsc --noEmit
  ```

## Deployment 🚀

- Over-the-air updates (Expo Publish):

  ```bash
  expo login
  expo publish
  ```

- Production App Store / Play Store builds (EAS):

  - Configure credentials and `eas.json` as needed
  - Build production artifacts:

    ```bash
    eas build --platform ios --profile production
    eas build --platform android --profile production
    ```

  - Submit builds to stores:

    ```bash
    eas submit -p ios --latest
    eas submit -p android --latest
    ```

  See https://docs.expo.dev/eas for all setup details (Apple / Google credentials, provisioning, and store submission).

## Notes & resources 💡

- The Oshikwanyama learning pages live under `app/oshikwanyama`.
- Reset starter project: `npm run reset-project`.
- CI tip: run `npm ci && npm test && npx tsc --noEmit` in CI to verify install, tests, and types.
