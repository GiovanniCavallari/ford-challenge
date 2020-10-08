import React, { useCallback, useEffect, useState } from 'react';

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

  const getItems = useCallback(() => {
    api.get('/cars/123456/reviews').then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <Wrapper>
      <Container>
        <Header title="Revisões" />

        <Content>
          <Main>
            {items.map((item) => (
              <Card key={String(item.id)} title={item.type} footer={`Data da revisão: ${item.date}`}>
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
