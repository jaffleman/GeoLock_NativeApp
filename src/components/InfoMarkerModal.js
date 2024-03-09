import {StyleSheet} from 'react-native';
import * as React from 'react';
import {Avatar, Card, Text} from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="map-marker" />;
export default function InfoMarkerModal({markerInfo}) {
  console.log('infoMarkerModal marker: '+JSON.stringify(markerInfo))
  return (
    <Card>
      <Card.Title
        title="Infos et Acces"
        subtitle={markerInfo.adresse}
        left={LeftContent}/>
      <Card.Content>
        {markerInfo.accesList.map((acces, i) => 
            <Text key={acces.mk * 10 + i}>
            {acces.type + ' => ' + acces.code}
            </Text>)}</Card.Content></Card>);
}

// ##################### Styles:
const styles2 = StyleSheet.create({
  map2: {
    //position: 'absolute',
    borderColor: '#6200ee',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#a9a9',
  },
});