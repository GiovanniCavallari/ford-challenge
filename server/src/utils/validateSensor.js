export const validateSensorName = (name) => {
  const validNames = [
    'fuel',
    'odometer',
    'oil',
    'brake',
    'temperature',
    'rfTirePressure',
    'lfTirePressure',
    'rrTirePressure',
    'rlTirePressure',
    'rfTireTemp',
    'lfTireTemp',
    'rrTireTemp',
    'rlTireTemp',
    'carChassis',
  ];

  if (validNames.includes(name)) {
    return true;
  }

  return false;
};
