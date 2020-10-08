import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Car from './screens/Car';
import Reviews from './screens/Reviews';
import Alerts from './screens/Alerts';
import Sensor from './screens/Sensor';

import { VehicleIcon, ReviewsIcon, AlertsIcon } from './assets/styles/icons';
import theme from './assets/styles/theme';

const CarStack = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

const Routes: React.FC = () => {
  function CarStackScreen() {
    return (
      <CarStack.Navigator>
        <CarStack.Screen name="Automóvel" component={Car} options={{ headerShown: false }} />
        <CarStack.Screen name="Sensor" component={Sensor} options={{ headerShown: false }} />
      </CarStack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <TabNavigation.Navigator
        tabBarOptions={{
          style: {
            height: 58,
            borderTopWidth: 2,
            backgroundColor: theme.colors.white,
          },
          tabStyle: {
            alignItems: 'center',
            justifyContent: 'center',
          },
          iconStyle: {
            flex: 0,
            width: 32,
            height: 32,
          },
          labelStyle: {
            fontFamily: theme.font.weight.bold,
            fontSize: theme.font.size.small,
            marginTop: 0,
          },
          inactiveTintColor: theme.colors.gray,
          activeTintColor: theme.colors.primary,
        }}
      >
        <TabNavigation.Screen
          name="Automóvel"
          component={CarStackScreen}
          options={{
            tabBarIcon: ({ focused }) => <VehicleIcon focused={focused} />,
          }}
        />

        <TabNavigation.Screen
          name="Revisões"
          component={Reviews}
          options={{
            tabBarIcon: ({ focused }) => <ReviewsIcon focused={focused} />,
          }}
        />

        <TabNavigation.Screen
          name="Alertas"
          component={Alerts}
          options={{
            tabBarIcon: ({ focused }) => <AlertsIcon focused={focused} />,
          }}
        />
      </TabNavigation.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
