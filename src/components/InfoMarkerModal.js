import {StyleSheet, Alert, TouchableWithoutFeedback, View, FlatList} from 'react-native';
import * as React from 'react';
import {Avatar, Button, Card, Text, TextInput, Chip, Divider} from 'react-native-paper';
import { ConstantesContext } from '../context/constantesContext';
import geolock from '../functions/geolock';


export default function InfoMarkerModal() { 
  console.log('**************InfoMarkerModal')
  const {constantes, updateAcces, updateMarker, createAcces, deleteAcces, deleteMarker} = React.useContext(ConstantesContext)
  const adresseRef = React.useRef(null)
  const [isEditable, setIsEditable] = React.useState(false)
  const [localMarker, setLocalMarker] = React.useState({...constantes.selectedMarker, accesList:[...constantes.selectedMarker.accesList]});
  React.useEffect(()=>{
    console.log('InfoMarkerModal:useEffect')
    setLocalMarker({...constantes.selectedMarker})
    setIsEditable(false)
    // return ()=>{setLocalMarker({id:0, adresse:'', accesList:[]})}
  },[constantes.selectedMarker])

  const LeftContent = props => <Avatar.Icon {...props} icon="map-marker"/>;
  const RightContent = props =><TouchableWithoutFeedback onPress={()=>setIsEditable(true)}><Avatar.Icon {...props} icon="map-marker"/></TouchableWithoutFeedback> ;
  const changeData = (index, data)=>{
    const accesList2 = localMarker.accesList.map((acces, i)=>{
      return index != i ? {...acces}:{...data}});
    setLocalMarker({...localMarker, accesList:[...accesList2]})}

  const handleDeleteButton = () => {
    Alert.alert('Attention', 
    'Vous etes sur le point de supprimer définitivement ce marker. Êtes vous sur de vouloir continuer', 
    [{text: 'Non', onPress: () => console.log('Cancel Pressed'),style: 'cancel',},
     {text: 'Oui', onPress: () => {setLocalMarker({id:0, adresse:'', accesList:[]}); deleteMarker() }},]);};

  const handleUpdateButton = () => {
    const {newMarker, newAcces, updatedAcces, deletedAcces} = geolock.objectComparator(constantes.selectedMarker, localMarker)
    
       Alert.alert('Attention', 
    'Vous etes sur le point de modifier définitivement ce marker. Êtes vous sur de vouloir continuer', 
    [{text: 'Non', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
     {text: 'Oui', onPress: () => {
      updateMarker(newMarker, ()=> {})
      createAcces(newAcces, ()=>{})
      updateAcces(updatedAcces, ()=>{} )
      deleteAcces(deletedAcces)
    }},]);};



  const add = ()=>setLocalMarker({...localMarker, accesList:[...localMarker.accesList, {id:0, type:'', code:'', mk:localMarker.id}]})

  return(
    <Card>
      <Card.Title
        title="Information du Marker"
        subtitle={'Editon des données du marker selectionné.'}
        left={LeftContent} right={!isEditable && RightContent}/>
      <Card.Content>
      <TextInput
        editable={ isEditable}
        returnKeyType='next'
        onSubmitEditing={()=>accesTypeRef.current.focus()}
        blurOnSubmit={false}
        ref={adresseRef}
        style={{height:35}}
        label="Adresse"
        mode="outlined"
        placeholder="copier/coller l'adresse ici..."
        onChangeText={(e)=>{setLocalMarker({...localMarker, adresse:e})}}
        value={isEditable?localMarker.adresse: constantes.selectedMarker.adresse}/>
          
      <Divider/>
        
          {[...isEditable?localMarker.accesList: constantes.selectedMarker.accesList].map((acces, i) =>{
            console.log('InfoMarkerModal: acces de accesList: ' +JSON.stringify(acces))
            return <View key={i} style={{flexDirection: 'row',justifyContent: 'space-evenly',}}>

              <TextInput
                editable={isEditable}
                returnKeyType='next'
                onSubmitEditing={()=>codeRef.current.focus()}
                blurOnSubmit={false}
                style={{flex: 3, height:35}}
                label="Type"
                mode="outlined"
                placeholder="saisisser le type d'acces"
                value={isEditable?localMarker.accesList[i].type: acces.type}
                onChangeText={type =>{changeData(i,{...acces, type:type})}}/>

              <TextInput
                editable={isEditable}
                returnKeyType='send'
                onSubmitEditing={()=>{}}
                autoCapitalize='characters'
                style={{flex: 1, height:35}}
                label="Code"
                mode="outlined"
                placeholder="#"
                value={isEditable?localMarker.accesList[i].code: acces.code}
                onChangeText={codeText => {changeData(i,{...acces, code:codeText})}}/>
              </View>})}
              <Divider/>
        {isEditable && <View style={{display:'flex', flexDirection:'row', marginTop:10}}>
          <Button style={{flex:1}} mode='outlined' color='green' onPress={add}>Ajout acces</Button>
          <Button style={{flex:1}} mode='outlined' color='red' onPress={handleDeleteButton}>supprimer</Button>
          <Button style={{flex:1}} mode='outlined' color='blue' onPress={handleUpdateButton}>Valider</Button>
        </View>}
        </Card.Content></Card>)
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