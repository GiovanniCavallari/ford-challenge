import styled from 'styled-components/native';

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
  padding: 0px 25px 25px;
`;
