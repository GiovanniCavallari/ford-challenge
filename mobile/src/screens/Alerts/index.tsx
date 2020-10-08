import React, { useCallback, useEffect, useState } from 'react';

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

  const getItems = useCallback(() => {
    api.get('/cars/123456/alerts').then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <Wrapper>
      <Container>
        <Header title="Alertas" />

        <Content>
          <Main>
            {items.map((item) => (
              <Card key={String(item.id)} title={firstCapitalLetter(item.type)} footer={item.date} footerAlign="right">
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