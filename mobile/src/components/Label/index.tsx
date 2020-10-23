import React from 'react';

import { Container, Text } from './styled';

interface Props {
  opened: boolean;
  notification: boolean;
}

const Label: React.FC<Props> = ({ children, opened, notification }) => {
  return (
    <Container notification={notification} opened={opened}>
      <Text notification={notification} opened={opened}>
        {children}
      </Text>
    </Container>
  );
};

export default Label;
