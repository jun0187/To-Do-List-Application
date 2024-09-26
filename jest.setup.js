import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => {
  const turboModuleRegistry = jest.requireActual(
    'react-native/Libraries/TurboModule/TurboModuleRegistry',
  )
  return {
    ...turboModuleRegistry,
    getEnforcing: (name) => {
      if (name === 'RNCWebView') {
        return null
      }
      return turboModuleRegistry.getEnforcing(name)
    },
  }
})

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
      goBack: jest.fn(),
    }),
  };
});

jest.mock("@react-native-async-storage/async-storage", () =>
    require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);