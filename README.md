# To-Do List Application 
[**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

> **Note**: Instruction based on [Instruction Sheet](https://offices.notion.site/React-Native-POC-1cc17f74ce6e4e11a6d1d4c0f2566d59)

## Demo screen (iOS - iPhone 15 Pro)

#### Home Page
<img src="https://github.com/user-attachments/assets/233d2f67-d931-44c8-bb98-ea7daf8fe686" width="200" height="450"/>
<img src="https://github.com/user-attachments/assets/dd5984a4-34e2-4e1f-b430-d74e81de7144" width="200" height="450"/>
<img src="https://github.com/user-attachments/assets/195a3b53-1446-4624-abfb-5e7d299a8b5f" width="200" height="450"/>

#### Add Task Page
<img src="https://github.com/user-attachments/assets/98f12d02-2a22-4041-a7a9-04c9c6f9b4b2" width="200" height="450"/>
<img src="https://github.com/user-attachments/assets/e5633206-685e-48d4-a67e-3a42f3dd7134" width="200" height="450"/>

#### Edit Task Page
<img src="https://github.com/user-attachments/assets/a6804b6a-eefe-4c41-b6bf-0275c76074e0" width="200" height="450"/>

### Basic Command to start

```bash
# to build
yarn install

# using IOS
cd ios && pod install && cd ..
yarn ios

# OR using Android
yarn android
```

### Async Storage

When the app starts/restarts, it should load the tasks from storage. 
Using /saga to perform CRUD.

### Unit Test

Due to .gitignore for node modules, there are minor changes on a node file for **react-native-check-box**, please add in a **testID** for it to run the unit test for **Home.test.tsx**

1. static propTypes > **testID:PropTypes.string,**
2. render() > TouchableHighlight component > **testID={this.props.testID}**

#### The overall test coverage: 94.95%

```bash
yarn test-coverage-all
```
<img width="1434" alt="Overall-test-coverage" src="https://github.com/user-attachments/assets/6ec9090d-6c61-455f-a4d4-5bb5a5b6f2cd">
