import React from 'react';

import Label from '../Label';

import { Container, Header, Title, Body, BodyContent, Footer, FooterContent, LabelsContainer } from './styled';

interface Props {
  id: number;
  title: string;
  footer: string;
  footerAlign?: 'left' | 'right';
}

const Card: React.FC<Props> = ({ id, title, children, footer, footerAlign }) => {
  return (
    <Container>
      <LabelsContainer>
        <Label notification={true} opened={false}>Novo</Label>
        <Label notification={false} opened={true}>#{id}</Label>
      </LabelsContainer>

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
