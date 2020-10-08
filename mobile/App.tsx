import React from 'react';
import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';

import Routes from './src/routes';

import theme from './src/assets/styles/theme';

export default function App() {
  let [fontsLoaded] = useFonts({
    roboto400: Roboto_400Regular,
    roboto500: Roboto_500Medium,
    roboto700: Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <Routes />
      <StatusBar backgroundColor={theme.colors.primary} style="light" />
    </>
  );
}
