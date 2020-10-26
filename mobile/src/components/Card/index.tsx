import React from 'react';

import Label from '../Label';

import {
  TouchableContainer,
  NonTouchableContainer,
  Header,
  Title,
  Body,
  BodyContent,
  Footer,
  FooterContent,
  LabelsContainer,
} from './styled';

interface Props {
  id?: number;
  title: string;
  footer: string;
  footerAlign?: 'left' | 'right';
  labels: boolean;
  sensor: string;
  onPress?: () => void;
}

const Card: React.FC<Props> = ({ id, title, children, footer, footerAlign, labels, sensor, onPress }) => {
  const component = () => (
    <>
      {labels && (
        <LabelsContainer>
          <Label notification={true} opened={false}>
            Novo
          </Label>
          <Label notification={false} opened={true}>
            #{id}
          </Label>
          <Label notification={false} opened={true}>
            {sensor}
          </Label>
        </LabelsContainer>
      )}

      <Header>
        <Title>{title}</Title>
      </Header>

      <Body>
        <BodyContent>{children}</BodyContent>
      </Body>

      <Footer>
        <FooterContent align={footerAlign}>{footer}</FooterContent>
      </Footer>
    </>
  );

  return onPress ? (
    <TouchableContainer onPress={onPress}>{component()}</TouchableContainer>
  ) : (
    <NonTouchableContainer>{component()}</NonTouchableContainer>
  );
};

export default Card;
