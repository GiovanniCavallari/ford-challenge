import React from 'react';
import { useRoute } from '@react-navigation/native';

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
  const route = useRoute();
  const routeParams = route.params as RouteParams;

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
                #{routeParams.id}
              </Label>
            </LabelsContainer>

            <Title>Pressão do pneu dianteiro direito</Title>
            <Divider marginTop={true} />

            <Detail>
              <Subtitle>Criado em</Subtitle>
              <Description>31/08/2020 - 10:00</Description>
            </Detail>
            <Divider marginTop={true} />

            <Detail>
              <Subtitle>Descrição</Subtitle>
              <Description>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque molestie metus, id tincidunt
                urna aliquam in.
              </Description>
            </Detail>
            <Divider marginTop={true} />

            <Detail>
              <Subtitle>Possíveis soluções</Subtitle>
              <PossibleSolutions>
                <ListItem>
                  <ListBullet />
                  <ListText>Lorem ipsum dolor sit amet amet, consectetur adipiscing</ListText>
                </ListItem>

                <ListItem>
                  <ListBullet />
                  <ListText>Lorem ipsum dolor sit amet amet, consectetur adipiscing</ListText>
                </ListItem>

                <ListItem>
                  <ListBullet />
                  <ListText>Lorem ipsum dolor sit amet amet, consectetur adipiscing</ListText>
                </ListItem>

                <ListItem>
                  <ListBullet />
                  <ListText>Lorem ipsum dolor sit amet amet, consectetur adipiscing</ListText>
                </ListItem>

                <ListItem>
                  <ListBullet />
                  <ListText>Lorem ipsum dolor sit amet amet, consectetur adipiscing</ListText>
                </ListItem>

                <ListItem>
                  <ListBullet />
                  <ListText>Lorem ipsum dolor sit amet amet, consectetur adipiscing</ListText>
                </ListItem>
              </PossibleSolutions>
            </Detail>
          </Main>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default AlertDetails;
