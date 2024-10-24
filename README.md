# To-Do List Application 
[**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

> **React Native and Redux (reducer, saga) Mobile Application**: Instruction based on [Instruction Sheet](https://offices.notion.site/React-Native-POC-1cc17f74ce6e4e11a6d1d4c0f2566d59)

## Demo screen (iOS - iPhone 15 Pro)
### Authentication
> **Note**:
> - Encrypted phone storage: react-native-keychain 
> - Biometric: react-native-touch-id, @el173/react-native-passcode-auth
<img src="https://github.com/user-attachments/assets/d4272710-1f6d-4b61-beeb-c2456aad315f" width="200" height="450"/>
<img src="https://github.com/user-attachments/assets/ac5a37c3-8c12-4498-824b-dcd1429116bc" width="200" height="450"/>
<video src="https://github.com/user-attachments/assets/e52a2ae4-b2ad-4a38-be19-5b7ed50cd84e"></video>

### Task/ To-Do List
> **Note**:
> - Phone storage: @react-native-async-storage/async-storage
> - DropDown filter: react-native-element-dropdown
<img src="https://github.com/user-attachments/assets/efc11a83-f06c-4522-b518-55f553bd4a57" width="200" height="450"/>
<img src="https://github.com/user-attachments/assets/5c778758-1344-4b0f-a634-0649aeb6834d" width="200" height="450"/>
<img src="https://github.com/user-attachments/assets/ce5be728-8681-423e-b999-1a0d55a2b75b" width="200" height="450"/>

### Employee
> **Note**:
> - Connected with external API: axios
> - Pagination: Refresh will extract only page 1 data, onEndReached of the listing will show up a loader while appending the next page data to the list.
<img src="https://github.com/user-attachments/assets/7287fd1f-21a6-4802-9544-564daec877f7" width="200" height="450"/>
<img src="https://github.com/user-attachments/assets/fc642412-e7a2-4fef-ada8-b6482f5f017d" width="200" height="450"/>
<img src="https://github.com/user-attachments/assets/3be1c7f6-a18a-4373-97b5-0324fbe9eb61" width="200" height="450"/>
<img src="https://github.com/user-attachments/assets/558d398d-c389-4b5e-8c99-c6534d7c088d" width="200" height="450"/>

### Other
> **Navigation**:
> - Stack Navigation: @react-navigation/stack
> - Drawer Navigation: @react-navigation/drawer
<img src="https://github.com/user-attachments/assets/2bb6b7ba-7857-4ba7-844b-12f991da9955" width="200" height="450"/>

> **Customize Component**
> - useTokenCounter: using setInterval to check if the jwt token (access and refresh token) is expired
>   -- jwt token: jwt-decode
>   -- interval checking: 3 minutes
>   -- access token expired: will prompt a alert to ask to continue (by calling refreshtoken endpoint) or logout (clear keychain storage)
>   -- refresh token expired: will logout (clear keychain storage) directly
>   -- the behaviour also apply similar when any endpoint hit 403 (access token expired) and 401 (refresh token expired)
> - The loader: background is semi-transparent
> - etc.
<img src="https://github.com/user-attachments/assets/83de6c6f-1bf9-4114-a1ab-f7d2ee25cb9b" width="300" height="150"/>
<img src="https://github.com/user-attachments/assets/096cf420-1baf-4940-9a7e-7d72b9109ee5" width="200" height="450"/>

### Basic Command to start

```bash
# to build
yarn install

# using IOS
yarn pod-install
yarn ios

# OR using Android
yarn android
```

### Async Storage



### Unit Test

Due to .gitignore for node modules, there are minor changes on a node file for **react-native-check-box**, please add in a **testID** for it to run the unit test for **Home.test.tsx**

1. static propTypes > **testID:PropTypes.string,**
2. render() > TouchableHighlight component > **testID={this.props.testID}**

#### The overall test coverage: 94.95% (To be updated soon)

```bash
yarn test-coverage-all
```
<img width="1434" alt="Overall-test-coverage" src="https://github.com/user-attachments/assets/6ec9090d-6c61-455f-a4d4-5bb5a5b6f2cd">
