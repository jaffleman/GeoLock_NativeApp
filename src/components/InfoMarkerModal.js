import {StyleSheet, Alert, TouchableWithoutFeedback, View, FlatList} from 'react-native';
import * as React from 'react';
import {Avatar, Button, Card, Text, TextInput, Chip} from 'react-native-paper';


export default function InfoMarkerModal({setDataToFetch, setConstantes, constantes, getMarker}) {
  // const {id, adresse, accesList} = constantes.selectedMarker;
  const adresseRef = React.useRef(null)
  const [localMarker, setLocalMaerker] = React.useState({...constantes.selectedMarker});
  React.useEffect(()=>{
    setLocalMaerker({...constantes.selectedMarker})
  },[constantes.selectedMarker])


  const LeftContent = props => <Avatar.Icon {...props} icon="map-marker" />;
  // const RightContent = props =><TouchableWithoutFeedback {...props} onPress={()=>{setConstantes({...constantes, showMarkerAdresseEdit:true})}}><Avatar.Icon style={{marginRight:15}} size={30} icon="square-edit-outline"/></TouchableWithoutFeedback>
  // const EditIcone = props =><TouchableWithoutFeedback {...props} onPress={()=>{}}><Avatar.Icon style={{marginRight:15}} size={20} icon="circle-edit-outline"/></TouchableWithoutFeedback>
  
  
  const changeData = (index, data)=>{
    const accesList2 = localMarker.accesList.map((acces, i)=>{
      return index != i ? {...acces}:{...data}});
    setLocalMaerker({...localMarker, accesList:[...accesList2]})}

  const deleteMarker = () => {
    const {id} = {...localMarker}
    Alert.alert('Attention', 
    'Vous etes sur le point de supprimer définitivement ce marker. Êtes vous sur de vouloir continuer', 
    [{text: 'Non', onPress: () => console.log('Cancel Pressed'),style: 'cancel',},
     {text: 'Oui', onPress: () => {
      setLocalMaerker({id:0, adresse:'', accesList:[]})
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
          getMarker(constantes.coordonates);},})}},]);};

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
            latitude: constantes.coordonates.latitude,
            longitude : constantes.coordonates.longitude
          },
          callback: () => {
            setConstantes({
              ...constantes,
              spinner:false,
              isConnected:true})
              setTimeout(() => {
                getMarker(constantes.coordonates)
              }, 1000)},})}},]);};
  
  // const back = ()=>setConstantes({...constantes, showMarkerAdresseEdit:false});
  const add = ()=>setLocalMaerker({...localMarker, accesList:[...localMarker.accesList, {type:'', code:''}]})
  // const UneditableAccesRender = ({id, type, code, mk})=><View key={id} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
  // <Chip style={{flex:2}}>{type + ' => '}</Chip><Chip textStyle={{textAlign:'center'}} style={{flex:1, }}>{code}</Chip></View>

  // let markerInfo = {adresse: '', accesList: [],};
  // constantes.markerList.map(marker=>{if(marker.id==constantes.selectedMarker.id && accesList.length==0) {
  //   markerInfo = {...marker}
  //   setAccesList([...marker.accesList])}})
  
  console.log('constante dans le infoMarkerModal ligne 80: '+ JSON.stringify(constantes.selectedMarker))
  return (
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
            onChangeText={(e)=>{setLocalMaerker({...localMarker, adresse:e})}}
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
            <Button style={{flex:1}} mode='outlined' color='green' onPress={add}>Ajout acces</Button>
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