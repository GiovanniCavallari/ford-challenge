import React from 'react';

import { Container, IconContainer, Info, Value, Unit, Name } from './styled';

interface Props {
  name: string;
  unit?: string;
  value: number | boolean;
  icon: JSX.Element;
  message?: string;
  onPress: () => void;
}

const SensorInfo: React.FC<Props> = ({ name, unit, value, icon, message, onPress }) => {
  const numberComponent = () => (
    <>
      <Value>{value}</Value>
      <Unit>{unit}</Unit>
    </>
  );

  const booleanComponent = () => (
    <>
      <Value error={!value}>{value ? 'Ok' : 'Revisar'}</Value>
    </>
  );

  return (
    <Container onPress={onPress}>
      <IconContainer>{icon}</IconContainer>
      <Info>{typeof value === 'number' ? numberComponent() : booleanComponent()}</Info>
      <Name numberOfLines={1}>{name}</Name>
    </Container>
  );
};

export default SensorInfo;
