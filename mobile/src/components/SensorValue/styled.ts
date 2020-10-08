import styled, { css } from 'styled-components/native';
import AnimatedNumber from 'react-native-animated-number';

import theme from '../../assets/styles/theme';

const valueCSS = css`
  font-size: ${theme.font.size.sensorValue}px;
  font-family: ${theme.font.weight.bold};
  line-height: 66px;
`;

export const NumberValue = styled(AnimatedNumber)`
  ${valueCSS}
  color: ${theme.colors.black};
`;

export const BooleanValue = styled.Text<{ error: boolean }>`
  ${valueCSS}
  color: ${props => props.error ? theme.colors.error : theme.colors.black};
`;

export const Unit = styled.Text`
  color: ${theme.colors.black};
  font-size: ${theme.font.size.sensorUnit}px;
  font-family: ${theme.font.weight.bold};
  line-height: 28px;
  padding-top: 16px;
  padding-left: 5px;
`;
