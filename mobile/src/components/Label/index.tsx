import React from 'react';

import { Container, Text } from './styled';

interface Props {
  notification: boolean;
}

const Label: React.FC<Props> = ({ children, notification }) => {
  return (
    <Container notification={notification}>
      <Text notification={notification}>
        {children}
      </Text>
    </Container>
  );
};

export default Label;
