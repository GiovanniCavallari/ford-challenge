import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';

import theme from '../../assets/styles/theme';

const statusBarHeight = Platform.OS === 'android' ? Constants.statusBarHeight : 0;

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  padding: 25px;
  padding-top: ${20 + statusBarHeight}px;
  background: ${theme.colors.primary};
`;

export const ReturnButton = styled.TouchableOpacity`
  padding-right: 15px;
`;

export const Title = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.font.size.large}px;
  font-family: ${theme.font.weight.bold};
  line-height: 26px;
`;
