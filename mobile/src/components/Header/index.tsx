import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { ArrowLeftIcon } from '../../assets/styles/icons';

import { Container, ReturnButton, Title } from './styled';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  const navigation = useNavigation();

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <ReturnButton onPress={handleNavigateBack}>
        <ArrowLeftIcon />
      </ReturnButton>
      <Title>{title}</Title>
    </Container>
  );
};

export default Header;
