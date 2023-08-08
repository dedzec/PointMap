import React from 'react';
import { View } from 'react-native';
import Mapbox from '@rnmapbox/maps';

Mapbox.setWellKnownTileServer('Mapbox');
Mapbox.setAccessToken(
  'sk.eyJ1IjoiZGVkemVjIiwiYSI6ImNsbDJyN3lpbDBma2MzZW85bW1qMHk0ZHoifQ.bHBw_NPGMovyz-orLwe5wA',
);

function App() {
  return (
    <View style={{ flex: 1, height: '100%', width: '100%' }}>
      <Mapbox.MapView
        styleURL={Mapbox.StyleURL.Street}
        zoomLevel={20}
        centerCoordinate={[-46.6822926, -23.5869514]}
        style={{ flex: 1 }}>
        <Mapbox.Camera
          zoomLevel={20}
          centerCoordinate={[-46.6822926, -23.5869514]}
          animationMode={'flyTo'}
          animationDuration={0}
        />
      </Mapbox.MapView>
    </View>
  );
}

export default App;
