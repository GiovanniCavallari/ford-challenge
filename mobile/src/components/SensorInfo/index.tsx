import React from 'react';

import { Container, IconContainer, Info, Value, Unit, Name } from './styled';

interface Props {
  name: string;
  unit?: string;
  value: number | boolean;
  icon: JSX.Element;
  onPress: () => void;
  configValue: string;
  direction: string;
}

const SensorInfo: React.FC<Props> = ({ name, unit, value, icon, onPress, configValue, direction }) => {
  const validateConfigValue = () => {
    const parsedConfigValue = Number(configValue);

    if (value >= parsedConfigValue && direction === 'increasing') {
      return true;
    }

    if (value <= parsedConfigValue && direction === 'decreasing') {
      return true;
    }

    return false;
  };

  const numberComponent = () => {
    const error = validateConfigValue();

    return (
      <>
        <IconContainer error={error}>{icon}</IconContainer>
        <Info>
          <Value error={error}>{value}</Value>
          <Unit error={error}>{unit}</Unit>
        </Info>
      </>
    );
  };

  const booleanComponent = () => (
    <>
      <IconContainer error={!value}>{icon}</IconContainer>
      <Info>
        <Value error={!value}>{value ? 'Ok' : 'Revisar'}</Value>
      </Info>
    </>
  );

  return (
    <Container onPress={onPress}>
      {typeof value === 'number' ? numberComponent() : booleanComponent()}
      <Name numberOfLines={1}>{name}</Name>
    </Container>
  );
};

export default SensorInfo;
