import React from 'react';

import { Container, Header, Title, Body, BodyContent, Footer, FooterContent } from './styled';

interface Props {
  title: string;
  footer: string;
  footerAlign?: 'left' | 'right';
}

const Card: React.FC<Props> = ({ title, children, footer, footerAlign }) => {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
      </Header>

      <Body>
        <BodyContent>{children}</BodyContent>
      </Body>

      <Footer>
        <FooterContent align={footerAlign}>{footer}</FooterContent>
      </Footer>
    </Container>
  );
};

export default Card;
