import styled from 'styled-components/native';
import HrDivider from '../../components/Divider';

import theme from '../../assets/styles/theme';

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background: ${theme.colors.secondary};
`;

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.ScrollView``;

export const Main = styled.View`
  padding: 25px;
`;

export const LabelsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  color: ${theme.colors.primary};
  font-family: ${theme.font.weight.bold};
  font-size: ${theme.font.size.largest}px;
`;

export const Divider = styled(HrDivider)``;

export const Detail = styled.View`
  flex: 1;
  margin-top: -3px;
`;

export const Subtitle = styled.Text`
  color: ${theme.colors.subtitle};
  font-family: ${theme.font.weight.bold};
  font-size: ${theme.font.size.regular}px;
`;

export const Description = styled.Text`
  margin-top: 5px;
  color: ${theme.colors.black};
  font-family: ${theme.font.weight.medium};
  font-size: ${theme.font.size.semiregular}px;
`;

export const PossibleSolutions = styled.View`
  flex: 1;
  padding: 5px 10px 0px;
`;

export const ListItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const ListBullet = styled.View`
  width: 5px;
  height: 5px;
  border-radius: 5px;
  margin-right: 8px;
  background: ${theme.colors.black};
`;

export const ListText = styled.Text`
  color: ${theme.colors.black};
  font-family: ${theme.font.weight.medium};
  font-size: ${theme.font.size.semiregular}px;
`;
