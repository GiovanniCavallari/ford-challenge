import React from 'react';
import { AntDesign, Feather, FontAwesome5, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import theme from '../../assets/styles/theme';

interface Props {
  focused?: boolean;
}

interface ISensorsIcons {
  [key: string]: JSX.Element;
}

export const ArrowLeftIcon: React.FC = () => <Feather name="arrow-left-circle" size={32} color={theme.colors.white} />;

export const VehicleIcon: React.FC<Props> = ({ focused }) => (
  <MaterialIcons name="directions-car" size={32} color={focused ? theme.colors.primary : theme.colors.gray} />
);

export const ReviewsIcon: React.FC<Props> = ({ focused }) => (
  <MaterialCommunityIcons
    name="clipboard-text-outline"
    size={32}
    color={focused ? theme.colors.primary : theme.colors.gray}
  />
);

export const AlertsIcon: React.FC<Props> = ({ focused }) => (
  <MaterialCommunityIcons
    name="bell-alert-outline"
    size={32}
    color={focused ? theme.colors.primary : theme.colors.gray}
  />
);

export const SensorsIcons: ISensorsIcons = {
  oil: <Fontisto name="blood-drop" size={24} color="#fff" />,
  fuel: <FontAwesome5 name="gas-pump" size={24} color="#fff" />,
  tire: <MaterialCommunityIcons name="movie-roll" size={28} color="#fff" />,
  brake: <MaterialCommunityIcons name="car-brake-abs" size={28} color="#fff" />,
  odometer: <AntDesign name="dashboard" size={28} color="#fff" style={{ marginTop: -2 }} />,
  temperature: <FontAwesome5 name="temperature-low" size={24} color="#fff" />,
};
