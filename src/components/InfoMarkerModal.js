import {StyleSheet, Alert, TouchableWithoutFeedback, View} from 'react-native';
import * as React from 'react';
import {Avatar, Button, Card, Text, TextInput} from 'react-native-paper';


export default function InfoMarkerModal({markerInfo}) {
  console.log('infoMarkerModal marker: '+JSON.stringify(markerInfo))
  const [showInfo, setShowInfo] = React.useState(true)
  const [adresse, setAdresse] = React.useState('')
  const LeftContent = props => <Avatar.Icon {...props} icon="map-marker" />;
  const RightContent = props =><TouchableWithoutFeedback {...props} onPress={()=>{setShowInfo(false)}}><Avatar.Icon size={30} icon="camera"/></TouchableWithoutFeedback>
  const deleteMarker = () => {
    Alert.alert('Attention', 'Vous etes sur le point de supprimer définitivement ce marker. Êtes vous sur de vouloir continuer', [{
      text: 'Non',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',},{
        text: 'Oui', onPress: () => console.log('OK Pressed')},]);};

  const updateMarker = () => {};
  const back = ()=>setShowInfo(true);
  return (
    showInfo?
      <Card>
        <Card.Title
          title="Infos et Acces"
          subtitle={markerInfo.adresse}
          left={LeftContent} right={RightContent}/>
        <Card.Content>
          {markerInfo.accesList.map((acces, i) => 
              <Text key={acces.mk * 10 + i}>
              {acces.type + ' => ' + acces.code}
              </Text>)}</Card.Content></Card>:
      <Card>
        <Card.Title
          title="Modification du Marker"
          subtitle="Modifier adresse et position sur la map..."
          left={LeftContent}/>
        <Card.Content>
          <TextInput autoComplete='postal-address-extended-postal-code' defaultValue={markerInfo.adresse} onChange={(e)=>setAdresse(e)}></TextInput>
          <View style={{display:'flex', flexDirection:'row', flex:1}}>
            <Button style={{flex:1}} mode='outlined' color='green' onPress={back}>retour</Button>
            <Button style={{flex:1}} mode='outlined' color='red' onPress={deleteMarker}>supprimer</Button>
            <Button style={{flex:1}} mode='outlined' color='blue' onPress={updateMarker}>Valider</Button>
          </View>
          </Card.Content></Card>);
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