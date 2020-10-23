import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import { firstCapitalLetter } from '../../common/helpers';

import Card from '../../components/Card';
import Header from '../../components/Header';

import { Wrapper, Container, Content, Main } from './styled';

interface Item {
  id: number;
  date: string;
  type: string;
  description: string;
  carChassis: number;
}

const Alerts: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
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
                title={firstCapitalLetter(item.type)}
                footer={item.date}
                footerAlign="right"
                labels={true}
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
