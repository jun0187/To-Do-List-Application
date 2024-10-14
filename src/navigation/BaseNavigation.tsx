import {useSelector} from 'react-redux';
import Loader from '../component/Loader';
import Navigation from './Navigation';
import {View} from 'react-native';

const BaseNavigation = () => {
  const isLoading = useSelector((state: any) => state.common.isLoader);
  return (
    <View style={{flex: 1}}>
      {isLoading && <Loader />}
      <Navigation />
    </View>
  );
};
export default BaseNavigation;
