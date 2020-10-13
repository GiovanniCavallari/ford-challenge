import React from 'react';
import { Text } from 'react-native';

import SensorValue from '../../components/SensorValue';

import { Container, ContainerValue, ContainerMessage, Message } from './styled';

interface Props {
  value: number | boolean;
  unit: string;
  message: string;
  type: string;
  configValue: string;
  direction: string;
}

const ValueCircle: React.FC<Props> = ({ value, unit, message, type, configValue, direction }) => {
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

  return (
    <Container>
      <ContainerValue>
        <SensorValue value={value} unit={unit} />
      </ContainerValue>
      {type === 'numeric' && validateConfigValue() && (
        <ContainerMessage>
          <Message>{message}</Message>
        </ContainerMessage>
      )}
    </Container>
  );
};

export default ValueCircle;
