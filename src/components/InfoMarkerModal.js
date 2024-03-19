import {StyleSheet, Alert, TouchableWithoutFeedback, View} from 'react-native';
import * as React from 'react';
import {Avatar, Button, Card, Text, TextInput} from 'react-native-paper';


export default function InfoMarkerModal({setDataToFetch, setConstantes, constantes}) {
  const [adresse, setAdresse] = React.useState('')
  const LeftContent = props => <Avatar.Icon {...props} icon="map-marker" />;
  const RightContent = props =><TouchableWithoutFeedback {...props} onPress={()=>{setConstantes({...constantes, showMarkerAdresseEdit:true})}}><Avatar.Icon style={{marginRight:15}} size={30} icon="square-edit-outline"/></TouchableWithoutFeedback>
 
  const deleteMarker = () => {
    Alert.alert('Attention', 
    'Vous etes sur le point de supprimer définitivement ce marker. Êtes vous sur de vouloir continuer', 
    [{text: 'Non', onPress: () => console.log('Cancel Pressed'),style: 'cancel',},
     {text: 'Oui', onPress: () => {
      setConstantes({...constantes, spinner:true})
      setDataToFetch({
        route: 'delete',
        method: 'delete',
        data: {id:markerInfo.id},
        callback: e => {
          console.log('reponse du fetch : '+ JSON.stringify(e.isConnected));
          if (e.isConnected){ 
            console.log('setConstante after fetch reponse ok')
            setConstantes({
              ...constantes,
              showMarkerAdresseEdit:false,
              markerList:[...e.jData],
              positionAcces:true,
              spinner:false,
              isConnected:true})}},})}},]);};

  const updateMarker = () => {
    Alert.alert('Attention', 
    'Vous etes sur le point de modifier définitivement ce marker. Êtes vous sur de vouloir continuer', 
    [{text: 'Non', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
     {text: 'Oui', onPress: () => {
        setShowInfo(true)
        setDataToFetch({
          route: 'updateMarker',
          method: 'put',
          data: {
            adresse:adresse, 
            id:markerInfo.id, 
            latitude: constantes.coordonates.latitude,
            longitude : constantes.coordonates.longitude},
          callback: e => {
            console.log('reponse du fetch : '+ JSON.stringify(e));
            if (e.isConnected){ 
              setConstantes({
                ...constantes,
                showMarkerAdresseEdit:false,
                positionAcces:true,
                spinner:false,
                isConnected:true})}},})}},]);};
  const back = ()=>setConstantes({...constantes, showMarkerAdresseEdit:false});
  let markerInfo = {adresse: '', accesList: [],};
  constantes.markerList.map(marker=>{
    if(marker.id==constantes.focusedMarkerId) markerInfo = {...marker}})
  console.log('markerInfo: '+JSON.stringify(markerInfo))
  
  return (
    !constantes.showMarkerAdresseEdit?
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
          <TextInput autoComplete='postal-address-extended-postal-code' defaultValue={markerInfo.adresse} onChangeText={(e)=>setAdresse(e)}></TextInput>
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