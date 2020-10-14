import React from 'react';

import { NumberValue, BooleanValue, Unit } from './styled';

interface Props {
  value: number | boolean;
  unit: string | null;
}

const SensorValue: React.FC<Props> = ({ value, unit }) => {
  const numberComponent = (number: number) => (
    <>
      <NumberValue value={number} time={80} />
      <Unit>{unit}</Unit>
    </>
  );

  const booleanComponent = (boolean: boolean) => (
    <>
      <BooleanValue error={!boolean}>{boolean ? 'Ok' : 'Revisar'}</BooleanValue>
    </>
  );

  return <>{typeof value === 'number' ? numberComponent(value) : booleanComponent(value)}</>;
};

export default SensorValue;
