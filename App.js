import React from 'react';
import { Alert } from 'react-native';
import * as Location from "expo-location";
import Loading from './Loading';

export default class extends React.Component {
  state = {
    isLoading: true
  }

  getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Location access', 'Permission to access location was denied');
      return;
    }
    
    try {
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
      this.setState( { isLoading: false });
      // TODO Send request to weather API
      Alert.alert('Location', `Lat: ${latitude} Lon: ${longitude}`)
    } catch (error) {
      Alert.alert('Location undefined', JSON.stringify(error));
    }
    
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading } = this.state;
    return (
      isLoading ? <Loading /> : null
    );
  }
};
