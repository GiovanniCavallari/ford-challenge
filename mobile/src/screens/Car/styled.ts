import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';

import theme from '../../assets/styles/theme';

const statusBarHeight = Platform.OS === 'android' ? Constants.statusBarHeight : 0;

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background: ${theme.colors.secondary};
`;

export const Container = styled.ScrollView``;

export const Header = styled.View``;

export const CarInfo = styled.View`
  height: 200px;
  align-items: center;
  padding: ${statusBarHeight + 25}px 25px 25px;
  background: ${theme.colors.primary};
`;

export const CarTitle = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.font.weight.bold};
  font-size: ${theme.font.size.regular}px;
  line-height: 16px;
`;

export const CarSubtitle = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.font.weight.bold};
  font-size: ${theme.font.size.large}px;
  text-transform: uppercase;
  line-height: 22px;
  padding-top: 6px;
`;

export const CarImage = styled.View`
  align-items: center;
  top: -80px;
  height: 80px;
`;

export const Image = styled.Image`
  width: 280px;
  height: 125px;
`;

export const Heading = styled.View`
  padding: 0px 25px;
`;

export const WelcomeUser = styled.Text`
  color: ${theme.colors.light};
  font-family: ${theme.font.weight.bold};
  font-size: ${theme.font.size.regular}px;
`;

export const InfoTitle = styled.Text`
  color: ${theme.colors.darkblue};
  font-family: ${theme.font.weight.bold};
  font-size: ${theme.font.size.largest}px;
`;

export const Main = styled.View`
  padding: 25px 25px 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;
