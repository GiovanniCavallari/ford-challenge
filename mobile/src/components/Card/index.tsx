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
  labels: boolean;
  sensor?: string;
  footerAlign?: 'left' | 'right';
  notification?: boolean;
  onPress?: () => void;
}

const Card: React.FC<Props> = ({ id, title, children, footer, labels, sensor, footerAlign, notification, onPress }) => {
  const component = () => (
    <>
      {labels && (
        <LabelsContainer>
          {!notification && <Label notification={true}>Novo</Label>}
          <Label notification={false}>#{id}</Label>
          <Label notification={false}>{sensor}</Label>
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
