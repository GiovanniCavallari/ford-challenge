import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import theme from '../../assets/styles/theme';

const { width } = Dimensions.get('window');

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background: ${theme.colors.primary};
`;

export const Container = styled.View`
  flex: 1;
`;

export const Main = styled.ScrollView``;

export const Heading = styled.View`
  height: 100px;
  background: ${theme.colors.primary};
`;

export const Info = styled.View`
  align-items: center;
  justify-content: center;
  background: ${theme.colors.white};
  padding-bottom: 40px;
`;

export const ValueCircleContainer = styled.View`
  height: 180px;
  align-items: center;
  justify-content: center;
`;

export const ValueCircle = styled.View`
  width: 250px;
  height: 250px;
  background: ${theme.colors.white};
  border: 5px solid ${theme.colors.primary};
  border-radius: 125px;

  top: -50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Name = styled.Text`
  color: ${theme.colors.black};
  font-size: ${theme.font.size.largest}px;
  font-family: ${theme.font.weight.bold};
  line-height: 26px;
`;

export const ConfigurationsContainer = styled.View`
  background: ${theme.colors.white};
`;

export const Configurations = styled.View`
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  background: ${theme.colors.secondary};
  padding: 25px;
`;

export const Divider = styled.View<{ marginTop: boolean }>`
  margin: 24px 0px;
  margin-top: ${(props) => (props.marginTop ? 24 : 0)}px;
  border-bottom-color: ${theme.colors.mediumgray};
  border-bottom-width: 1px;
`;

export const Title = styled.Text`
  color: ${theme.colors.primary};
  font-size: ${theme.font.size.largest}px;
  font-family: ${theme.font.weight.bold};
  line-height: 26px;
`;

export const AlertConfiguration = styled.View`
  background: ${theme.colors.secondary};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const AlertText = styled.Text`
  color: ${theme.colors.black};
  font-size: ${theme.font.size.large}px;
  font-family: ${theme.font.weight.bold};
  line-height: 21px;
`;

export const Switch = styled.Switch.attrs({
  trackColor: { false: theme.colors.gray, true: theme.colors.lightblue },
  ios_backgroundColor: theme.colors.gray,
})`
  margin-right: 2px;
  transform: scale(1.2);
`;

export const Slider = styled.Slider.attrs({
  minimumTrackTintColor: theme.colors.blue,
  maximumTrackTintColor: theme.colors.gray,
  thumbTintColor: theme.colors.blue,
})`
  height: 60px;
  width: ${width - 20}px;
  margin-left: -15px;
`;

export const SaveButton = styled.TouchableOpacity`
  background: ${theme.colors.primary};
  justify-content: center;
  align-items: center;
  padding: 15px 0px;
  border-radius: 5px;
`;

export const SaveButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.font.size.buttonText}px;
  font-family: ${theme.font.weight.bold};
  line-height: 19px;
`;
