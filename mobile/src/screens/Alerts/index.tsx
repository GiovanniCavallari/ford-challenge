import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IAlert } from './interfaces/AlertInterface';

import api from '../../services/api';
import { firstCapitalLetter } from '../../common/helpers';

import Card from '../../components/Card';
import Header from '../../components/Header';

import { Wrapper, Container, Content, Main } from './styled';

const Alerts: React.FC = () => {
  const [items, setItems] = useState<IAlert[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const getItems = useCallback(async () => {
    const response = await api.get('/cars/123456/alerts');
    setItems(response.data);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getItems();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getItems();
  }, [getItems]);

  const navigation = useNavigation();

  const handleAlertToDetails = (id: number, carChassis: number) => {
    navigation.navigate('DetalhesAlerta', {
      id,
      chassis: carChassis,
    });
  };

  return (
    <Wrapper>
      <Container>
        <Header title="Alertas" />

        <Content refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <Main>
            {items.map((item) => (
              <Card
                key={String(item.id)}
                id={item.id}
                title={firstCapitalLetter(item.title)}
                footer={item.date}
                footerAlign="right"
                labels={true}
                sensor={item.translation}
                notification={item.opened}
                onPress={() => handleAlertToDetails(item.id, item.carChassis)}
              >
                {item.description}
              </Card>
            ))}
          </Main>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Alerts;
