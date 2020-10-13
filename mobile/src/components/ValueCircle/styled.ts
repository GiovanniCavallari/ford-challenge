import styled from 'styled-components/native';

import theme from '../../assets/styles/theme';

export const Container = styled.View`
  width: 250px;
  height: 250px;
  background: ${theme.colors.white};
  border: 5px solid ${theme.colors.primary};
  border-radius: 125px;

  top: -50px;
  align-items: center;
  justify-content: center;
`;

export const ContainerValue = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ContainerMessage = styled.View``;

export const Message = styled.Text`
  color: ${theme.colors.error};
  font-size: ${theme.font.size.sensorMessage}px;
  font-family: ${theme.font.weight.bold};
`;
