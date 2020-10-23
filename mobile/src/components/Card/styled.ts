import styled from 'styled-components/native';

import theme from '../../assets/styles/theme';

export const Container = styled.TouchableOpacity`
  margin: 25px 0px 0px;
  padding: 12px 14px;

  border-radius: 8px;
  background: ${theme.colors.white};
  box-shadow: 10px 5px 5px #000;
`;

export const Header = styled.View`
  padding-bottom: 8px;
  margin-top: 12px;
`;

export const Title = styled.Text`
  font-family: ${theme.font.weight.bold};
  font-size: ${theme.font.size.medium}px;
  line-height: 18px;
`;

export const Body = styled.View`
  padding-bottom: 12px;
`;

export const BodyContent = styled.Text`
  font-family: ${theme.font.weight.normal};
  font-size: ${theme.font.size.normal}px;
  line-height: 14px;
`;

export const Footer = styled.View``;

export const FooterContent = styled.Text<{ align?: string }>`
  font-family: ${theme.font.weight.medium};
  font-size: ${theme.font.size.normal}px;
  text-align: ${props => props.align ?? 'left'};
  line-height: 14px;
`;

export const LabelsContainer = styled.View`
  flex-direction: row;
`;
