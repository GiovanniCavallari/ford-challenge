import styled from 'styled-components/native';

import theme from '../../assets/styles/theme';

const Divider = styled.View<{ marginTop: boolean }>`
  margin: 24px 0px;
  margin-top: ${(props) => (props.marginTop ? 24 : 0)}px;
  border-bottom-color: ${theme.colors.mediumgray};
  border-bottom-width: 1px;
`;

export default Divider;
