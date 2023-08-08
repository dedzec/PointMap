/* eslint-disable no-alert */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Button,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Mapbox from '@rnmapbox/maps';

Mapbox.setWellKnownTileServer('Mapbox');
Mapbox.setAccessToken('<YOUR_ACCESSTOKEN>');

function App() {
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [watchID, setWatchID] = useState(0);

  useEffect(() => {
    callLocation();

    return () => clearLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callLocation = () => {
    if (Platform.OS === 'ios') {
      getLocation();
    } else {
      const requestLocationPermission = async () => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permissão de Acesso à Localização',
            message: 'Este aplicativo precisa acessar sua localização.',
            buttonNeutral: 'Pergunte-me depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          alert('Permissão de Localização negada');
        }
      };
      requestLocationPermission();
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLatitude = JSON.stringify(position.coords.latitude);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    const watchID = Geolocation.watchPosition((position) => {
      const currentLatitude = JSON.stringify(position.coords.latitude);
      const currentLongitude = JSON.stringify(position.coords.longitude);
      setCurrentLatitude(currentLatitude);
      setCurrentLongitude(currentLongitude);
    });
    setWatchID(watchID);
  };

  const clearLocation = () => {
    Geolocation.clearWatch(watchID);
  };

  const renderAnnotations = () => {
    return (
      <Mapbox.PointAnnotation
        id="dedzec"
        coordinate={[currentLongitude, currentLatitude]}>
        <View style={styles.annotationContainer}>
          <View style={styles.annotationFill} />
        </View>
        <Mapbox.Callout title="Dedzec Job" />
      </Mapbox.PointAnnotation>
    );
  };

  return watchID !== 0 ? (
    <View style={{ flex: 1, height: '100%', width: '100%' }}>
      <Mapbox.MapView
        styleURL={Mapbox.StyleURL.Street}
        zoomLevel={15}
        centerCoordinate={[currentLongitude, currentLatitude]}
        style={{ flex: 1 }}>
        {renderAnnotations()}
        {/* <Mapbox.Camera
          zoomLevel={15}
          centerCoordinate={[currentLongitude, currentLatitude]}
          animationMode={'flyTo'}
          animationDuration={0}
        /> */}
      </Mapbox.MapView>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.boldText}>Você está Aqui</Text>
      <Text style={styles.text}>Longitude: {currentLongitude}</Text>
      <Text style={styles.text}>Latitude: {currentLatitude}</Text>
      <View style={styles.button}>
        <Button title="Obter Localização" onPress={callLocation} />
      </View>
      <View style={styles.button}>
        <Button title="Cancelar Monitoração" onPress={clearLocation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    padding: 16,
    backgroundColor: 'white',
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#43BA46',
    transform: [{ scale: 0.8 }],
  },
  boldText: {
    fontSize: 30,
    color: 'red',
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
});

export default App;
