import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import theme from '../../assets/styles/theme';

const { width } = Dimensions.get('window');

export const Container = styled.TouchableOpacity`
  width: ${(width / 2) - 35}px;
  height: 155px;
  padding: 16px;
  margin-bottom: 25px;
  border-radius: 16px;
  background: ${theme.colors.white};

  align-items: baseline;
  justify-content: flex-end;
`;

export const IconContainer = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: ${theme.colors.mediumblue};

  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
`;

export const Info = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

export const Value = styled.Text<{ error?: boolean }>`
  color: ${props => props.error ? theme.colors.error : theme.colors.black};
  font-family: ${theme.font.weight.bold};
  font-size: ${theme.font.size.huge}px;
  line-height: 37px;
`;

export const Unit = styled.Text`
  color: ${theme.colors.black};
  font-family: ${theme.font.weight.bold};
  font-size: ${theme.font.size.large}px;
  line-height: 32px;
  margin-left: 2px;
`;

export const Name = styled.Text`
  color: ${theme.colors.darkgray};
  font-family: ${theme.font.weight.bold};
  font-size: ${theme.font.size.regular}px;
  line-height: 16px;
`;
