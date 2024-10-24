import React, {ReactNode} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ViewStyle,
  Text,
  useColorScheme,
} from 'react-native';
import Colors from '../assets/Colors';
import {toggleDrawer} from '../services/Navigation.service';
import IconButton from './IconButton';
import Icons from '../assets/Icons';

interface StackContainerProps {
  children: ReactNode;
  style?: ViewStyle;
  title?: string;
  isToggleButton?: boolean;
}
const StackContainer = (props: StackContainerProps) => {
  const {children, style, title, isToggleButton = false} = props;
  const backgroundStyle = () => {
    return {
      backgroundColor:
        useColorScheme() === 'dark' ? Colors.dark : Colors.backgroundLight,
      flex: 1,
    };
  };
  return (
    <SafeAreaView style={backgroundStyle()}>
      <View style={[styles.container, style]}>
        <View style={styles.innerContainer}>
          {isToggleButton && (
            <IconButton
              iconName={Icons.MENU}
              onPress={toggleDrawer}
              iconSize={30}
              testId={'toggle-drawer-button'}
              style={{
                justifyContent: 'flex-start',
                flex: 1,
              }}
            />
          )}
          <View
            style={{
              flex: 5,
              alignItems: isToggleButton ? 'flex-start' : 'center',
            }}>
            {title && <Text style={styles.titleText}>{title}</Text>}
          </View>
        </View>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    width: '90%',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    paddingBottom: '3%',
  },
});

export default StackContainer;
