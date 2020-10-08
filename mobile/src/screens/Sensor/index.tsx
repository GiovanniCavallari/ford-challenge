import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { ISensor } from './interfaces/SensorInterface';
import { showAlert } from '../../common/showAlert';
import { firstCapitalLetter } from '../../common/helpers';

import Header from '../../components/Header';
import SensorValue from '../../components/SensorValue';

import theme from '../../assets/styles/theme';

import {
  Wrapper,
  Container,
  Heading,
  Info,
  ValueCircleContainer,
  ValueCircle,
  Name,
  Main,
  ConfigurationsContainer,
  Configurations,
  Divider,
  Title,
  AlertConfiguration,
  AlertText,
  Switch,
  Slider,
  SaveButton,
  SaveButtonText,
} from './styled';
import api from '../../services/api';

interface RouteParams {
  name: string;
  chassis: number;
}

const Sensor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [sensor, setSensor] = useState<ISensor>({
    name: '',
    value: 0,
    configurations: {
      id: 0,
      name: '',
      type: '',
      unit: '',
      value: '',
      message: '',
      active: true,
    },
  });

  const scrollViewRef = useRef<any>();

  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const getSensor = useCallback(() => {
    api.get(`/cars/${routeParams.chassis}/sensors/${routeParams.name}`).then((response) => {
      const {
        configurations: { active, value },
      } = response.data;
      setSensor(response.data);
      setIsEnabled(active);
      setSliderValue(Number(value));
    });
  }, []);

  useEffect(() => {
    getSensor();
  }, [getSensor]);

  const handleSwitch = () => setIsEnabled(!isEnabled);

  const handleSlider = (value: number) => {
    setSliderValue(Math.round(value));
  };

  const handleSubmit = async () => {
    const data = {
      active: isEnabled,
      value: sliderValue,
    };

    try {
      await api.patch(`/configurations/${sensor.configurations.id}`, data);
      showAlert('Configurações salvas', 'As configurações para a assistente virtual foram salvas com sucesso!');
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    } catch (e) {
      showAlert('Ops', 'Ocorreu um erro ao tentar salvar as configurações. Tente novamente...');
    }
  };

  return (
    <Wrapper>
      <Container>
        <Header title="Informações do sensor" />
        <Main ref={scrollViewRef}>
          <Heading />

          <Info>
            <ValueCircleContainer>
              <ValueCircle>
                <SensorValue value={sensor.value} unit={sensor.configurations.unit} />
              </ValueCircle>
            </ValueCircleContainer>

            <Name>{firstCapitalLetter(sensor.name)}</Name>
          </Info>

          <ConfigurationsContainer>
            <Configurations>
              <Title>Configurações</Title>

              <Divider marginTop={true} />

              <AlertConfiguration>
                <AlertText>Alerta</AlertText>
                <Switch
                  onValueChange={handleSwitch}
                  value={isEnabled}
                  thumbColor={isEnabled ? theme.colors.blue : theme.colors.lightgray}
                />
              </AlertConfiguration>

              <Divider marginTop={true} />

              {sensor.configurations.type === 'numeric' && (
                <>
                  <AlertConfiguration>
                    <AlertText>Alertar em:</AlertText>
                    <AlertText>
                      {sliderValue} {sensor.configurations.unit}
                    </AlertText>
                  </AlertConfiguration>

                  <Slider onValueChange={handleSlider} minimumValue={0} maximumValue={100} value={sliderValue} />

                  <Divider marginTop={false} />
                </>
              )}

              <SaveButton onPress={handleSubmit}>
                <SaveButtonText>Salvar configurações</SaveButtonText>
              </SaveButton>
            </Configurations>
          </ConfigurationsContainer>
        </Main>
      </Container>
    </Wrapper>
  );
};

export default Sensor;