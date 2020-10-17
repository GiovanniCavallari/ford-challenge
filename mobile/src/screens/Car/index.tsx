import React, { useCallback, useState, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SensorsIcons } from '../../assets/styles/icons';
import { ISensor } from '../Sensor/interfaces/SensorInterface';

import api from '../../services/api';
import registerForPushNotificationsAsync from '../../services/registerForPushNotifications';

import SensorInfo from '../../components/SensorInfo';

import carImage from '../../assets/images/ranger.png';

import {
  Wrapper,
  Container,
  Header,
  CarInfo,
  CarTitle,
  CarSubtitle,
  CarImage,
  Image,
  Heading,
  WelcomeUser,
  InfoTitle,
  Main,
} from './styled';

interface ICar {
  chassis: number;
  name: string;
  model: string;
  licensePlate: string;
  sensors: ISensor[];
}

const Car: React.FC = () => {
  const [car, setCar] = useState<ICar>({
    chassis: 0,
    name: '',
    model: '',
    licensePlate: '',
    sensors: [],
  });

  const getCar = useCallback(() => {
    api.get('/cars/123456').then((response) => {
      setCar(response.data);
    });
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getCar();
    }, []),
  );

  const navigation = useNavigation();

  const handleCarToSensor = (name: string) => {
    navigation.navigate('Sensor', {
      name,
      chassis: car.chassis,
    });
  };

  return (
    <Wrapper>
      <Container>
        <Header>
          <CarInfo>
            <CarTitle>Meu Ford {car.name}</CarTitle>
            <CarSubtitle>Ford {car.model}</CarSubtitle>
          </CarInfo>

          <Heading>
            <CarImage>
              <Image source={carImage} />
            </CarImage>

            <WelcomeUser>Bem vindo John Doe</WelcomeUser>
            <InfoTitle>Informações do carro</InfoTitle>
          </Heading>
        </Header>

        <Main>
          {car.sensors.map((sensor: ISensor) => (
            <SensorInfo
              key={sensor.name}
              name={sensor.translation}
              value={sensor.value}
              unit={sensor.configurations.unit}
              icon={sensor.name.includes('Tire') ? SensorsIcons['tire'] : SensorsIcons[sensor.name]}
              onPress={() => handleCarToSensor(sensor.name)}
              direction={sensor.configurations.direction}
              configValue={sensor.configurations.value}
            />
          ))}
        </Main>
      </Container>
    </Wrapper>
  );
};

export default Car;
