# To-Do List Application [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

> **Note**: Instruction based on [Instruction Sheet](https://offices.notion.site/React-Native-POC-1cc17f74ce6e4e11a6d1d4c0f2566d59)

## Each screen UI

### For Android - Pixel 3A

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS - iPhone 15 Pro

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

## Async Storage

When the app starts/restarts, it should load the tasks from storage.

### Unit Test

Due to .gitignore for node modules, there are minor changes on a node file for **react-native-check-box**, please add in a **testID** for it to run the unit test for **Home.test.tsx**

1. static propTypes > **testID:PropTypes.string,**
2. render() > TouchableHighlight component > **testID={this.props.testID}**

#### The overall test coverage: 94.95%

```bash
yarn test-coverage-all
```
