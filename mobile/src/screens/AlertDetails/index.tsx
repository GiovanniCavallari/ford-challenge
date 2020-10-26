import React, { useCallback, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { IAlert } from '../Alerts/interfaces/AlertInterface';

import api from '../../services/api';

import Header from '../../components/Header';
import Label from '../../components/Label';

import {
  Wrapper,
  Container,
  Content,
  Main,
  LabelsContainer,
  Title,
  Divider,
  Detail,
  Subtitle,
  Description,
  SensorText,
  PossibleSolutions,
  ListItem,
  ListBullet,
  ListText,
} from './styled';

interface RouteParams {
  id: string;
  chassis: number;
}

const AlertDetails: React.FC = () => {
  const [alert, setAlert] = useState<IAlert>({
    id: 0,
    date: '',
    title: '',
    sensor: '',
    translation: '',
    description: '',
    carChassis: 0,
    solutions: [],
  });

  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const getAlert = useCallback(() => {
    api.get(`/cars/${routeParams.chassis}/alerts/${routeParams.id}`).then((response) => {
      setAlert(response.data);
    });
  }, []);

  useEffect(() => {
    getAlert();
  }, [getAlert]);

  return (
    <Wrapper>
      <Container>
        <Header title="Detalhes do alerta" />

        <Content>
          <Main>
            <LabelsContainer>
              <Label notification={true} opened={false}>
                Novo
              </Label>
              <Label notification={false} opened={true}>
                #{alert.id}
              </Label>
              <Label notification={false} opened={true}>
                {alert.translation}
              </Label>
            </LabelsContainer>

            <Title>{alert.title}</Title>
            <Divider marginTop={true} />

            <Detail>
              <Subtitle>Reportado em</Subtitle>
              <Description>{alert.date}</Description>
            </Detail>
            <Divider marginTop={true} />

            <Detail>
              <Subtitle>Descrição</Subtitle>
              <Description>{alert.description}</Description>
            </Detail>
            <Divider marginTop={true} />

            <Detail>
              <Subtitle>Possíveis soluções</Subtitle>
              <PossibleSolutions>
                {alert.solutions.map((item) => (
                  <ListItem key={item}>
                    <ListBullet />
                    <ListText>{item}</ListText>
                  </ListItem>
                ))}
              </PossibleSolutions>
            </Detail>
          </Main>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default AlertDetails;
