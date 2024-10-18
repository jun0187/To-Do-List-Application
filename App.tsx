import React from 'react';
import BaseNavigation from './src/navigation/BaseNavigation';
import {Provider} from 'react-redux';
import {store} from './src/store';

const App = () => {
  if (__DEV__) {
    require('./ReactotronConfig');
  }
  return (
    <Provider store={store}>
      <BaseNavigation />
    </Provider>
  );
};
export default App;
