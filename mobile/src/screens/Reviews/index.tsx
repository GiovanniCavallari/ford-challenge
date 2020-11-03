import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';

import api from '../../services/api';

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

const Reviews: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const getItems = useCallback(async () => {
    const response = await api.get('/cars/123456/reviews');
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

  return (
    <Wrapper>
      <Container>
        <Header title="Revisões" />

        <Content refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <Main>
            {items.map((item) => (
              <Card
                key={String(item.id)}
                title={item.type}
                footer={`Data da revisão: ${item.date}`}
                labels={false}
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

export default Reviews;
