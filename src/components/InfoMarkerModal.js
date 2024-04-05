import {StyleSheet, Alert, TouchableWithoutFeedback, View, FlatList} from 'react-native';
import * as React from 'react';
import {Avatar, Button, Card, Text, TextInput, Chip} from 'react-native-paper';
import { CoordonatesContext } from '../context/coordonatesContext';
import { ConstantesContext } from '../context/constantesContext';
import geolock from '../functions/geolock';


export default function InfoMarkerModal() { 
  const {coods} = React.useContext(CoordonatesContext)
  const {constantes, setConstantes} = React.useContext(ConstantesContext)
  const adresseRef = React.useRef(null)
  const [localMarker, setLocalMarker] = React.useState({...constantes.selectedMarker});
  React.useEffect(()=>{
    setLocalMarker({...constantes.selectedMarker})
  },[constantes.selectedMarker])

  const LeftContent = props => <Avatar.Icon {...props} icon="map-marker" />;
  // const RightContent = props =><TouchableWithoutFeedback {...props} onPress={()=>{setConstantes({...constantes, showMarkerAdresseEdit:true})}}><Avatar.Icon style={{marginRight:15}} size={30} icon="square-edit-outline"/></TouchableWithoutFeedback>
  // const EditIcone = props =><TouchableWithoutFeedback {...props} onPress={()=>{}}><Avatar.Icon style={{marginRight:15}} size={20} icon="circle-edit-outline"/></TouchableWithoutFeedback>
  
  
  const changeData = (index, data)=>{
    const accesList2 = localMarker.accesList.map((acces, i)=>{
      return index != i ? {...acces}:{...data}});
    setLocalMarker({...localMarker, accesList:[...accesList2]})}

  const deleteMarker = () => {
    const {id} = {...localMarker}
    Alert.alert('Attention', 
    'Vous etes sur le point de supprimer définitivement ce marker. Êtes vous sur de vouloir continuer', 
    [{text: 'Non', onPress: () => console.log('Cancel Pressed'),style: 'cancel',},
     {text: 'Oui', onPress: () => {
      setLocalMarker({id:0, adresse:'', accesList:[]})
      setConstantes({
        ...constantes,
        spinner:true,
        selectedMarker:{id:0, adresse:'', accesList:[]}});
      setDataToFetch({
        route: 'delete',
        method: 'delete',
        data: {id:id},
        callback: () => {
          console.log('setConstante after fetch reponse ok')
          setConstantes({
            ...constantes,
            spinner:false,
            isConnected:true,
            selectedMarker: {id:0, adresse:'', accesList:[]}})
          geolock.getMarkers();},})}},]);};

  const updateMarker = () => {
    const item = {...localMarker}
    Alert.alert('Attention', 
    'Vous etes sur le point de modifier définitivement ce marker. Êtes vous sur de vouloir continuer', 
    [{text: 'Non', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
     {text: 'Oui', onPress: () => {
        setConstantes({
          ...constantes,
          spinner:true,
          selectedMarker:{id:0, adresse:'', accesList:[]}});
        setDataToFetch({
          route: 'updateMarker',
          method: 'put',
          data: {
            adresse:item.adresse, 
            id:item.id, 
            latitude: coods.latitude,
            longitude : coods.longitude
          },
          callback: () => {
            setConstantes({
              ...constantes,
              spinner:false,
              isConnected:true})
              setTimeout(() => {
                getMarker(coods)
              }, 1000)},})}},]);};
  
  // const back = ()=>setConstantes({...constantes, showMarkerAdresseEdit:false});
  const add = ()=>setLocalMarker({...localMarker, accesList:[...localMarker.accesList, {type:'', code:''}]})
  // const UneditableAccesRender = ({id, type, code, mk})=><View key={id} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
  // <Chip style={{flex:2}}>{type + ' => '}</Chip><Chip textStyle={{textAlign:'center'}} style={{flex:1, }}>{code}</Chip></View>

  // let markerInfo = {adresse: '', accesList: [],};
  // constantes.markerList.map(marker=>{if(marker.id==constantes.selectedMarker.id && accesList.length==0) {
  //   markerInfo = {...marker}
  //   setAccesList([...marker.accesList])}})
  const showInfoMarker = constantes.selectedMarker.id == 0 ? false : true;
  console.log('constante dans le infoMarkerModal ligne 80: '+ JSON.stringify(constantes.selectedMarker))
  return 
    // !constantes.showMarkerAdresseEdit?
    //   <Card>
    //     <Card.Title
    //       title="Infos et Acces"
    //       subtitle={constantes.selectedMarker.adresse}
    //       left={LeftContent} right={RightContent}/>
        
    //     <Card.Content style={{height:120}}>
    //       <FlatList
    //       data={constantes.selectedMarker.accesList}
    //       renderItem={({item}) => <UneditableAccesRender id={item.id} type={item.type} code={item.code} mk={item.mk}/>}
    //       keyExtractor={item => item.id}
    //       initialNumToRender={1}/></Card.Content></Card>:
    <View  style={{position:'absolute', display:showInfoMarker?'flex':'none', top:0, left:0, right:0, zIndex:100}}>
      <Card>
        <Card.Title
          title="Information du Marker"
          subtitle={'Editon des données du marker selectionné.'}
          left={LeftContent}/>
        <Card.Content>
          <TextInput
            returnKeyType='next'
            onSubmitEditing={()=>accesTypeRef.current.focus()}
            blurOnSubmit={false}
            ref={adresseRef}
            style={{height:35}}
            label="Adresse"
            mode="outlined"
            placeholder="copier/coller l'adresse ici..."
            onChangeText={(e)=>{setLocalMarker({...localMarker, adresse:e})}}
            value={localMarker.adresse}/>
          
            {localMarker.accesList.map((acces, i) =>{
              return <View key={i} style={{flexDirection: 'row',justifyContent: 'space-evenly',}}>

                <TextInput
                  returnKeyType='next'
                  onSubmitEditing={()=>codeRef.current.focus()}
                  blurOnSubmit={false}
                  style={{flex: 3, height:35}}
                  label="Type"
                  mode="outlined"
                  placeholder="saisisser le type d'acces"
                  defaultValue={acces.type}
                  onChangeText={type =>{changeData(i,{...acces, type:type})}}/>

                <TextInput
                  returnKeyType='send'
                  onSubmitEditing={()=>{}}
                  autoCapitalize='characters'
                  style={{flex: 1, height:35}}
                  label="Code"
                  mode="outlined"
                  placeholder="#"
                  defaultValue={acces.code}
                  onChangeText={codeText => {changeData(i,{...acces, code:codeText})}}/></View>})}
          <View style={{display:'flex', flexDirection:'row', flex:1}}>
            <Button style={{flex:1}} mode='outlined' color='green' onPress={add}><Text>Ajout acces</Text></Button>
            <Button style={{flex:1}} mode='outlined' color='red' onPress={deleteMarker}><Text>supprimer</Text></Button>
            <Button style={{flex:1}} mode='outlined' color='blue' onPress={updateMarker}><Text>Valider</Text></Button>
          </View>
          </Card.Content></Card></View>
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