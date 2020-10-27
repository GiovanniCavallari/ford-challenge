import styled from 'styled-components/native';

import theme from '../../assets/styles/theme';

export const Container = styled.View<{ notification: boolean; }>`
  background-color: ${(props) =>
    props.notification ? theme.colors.yellow : theme.colors.lightestgray};
  border-radius: 5px;
  padding: 3px 8px;
  margin-right: 8px;

  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text<{ notification: boolean; }>`
  font-family: ${theme.font.weight.bold};
  font-size: ${theme.font.size.normal}px;
  color: ${(props) => (props.notification ? theme.colors.white : theme.colors.labelText)};
`;
