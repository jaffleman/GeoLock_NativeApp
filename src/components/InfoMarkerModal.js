import {StyleSheet, Alert, TouchableWithoutFeedback, View, FlatList} from 'react-native';
import * as React from 'react';
import {Avatar, Button, Card, Text, TextInput, Chip} from 'react-native-paper';


export default function InfoMarkerModal({setDataToFetch, setConstantes, constantes, getMarker}) {
  const adresseRef = React.useRef(null)
  const [adresse, setAdresse] = React.useState();
  const [accesList, setAccesList] = React.useState([]);

  const LeftContent = props => <Avatar.Icon {...props} icon="map-marker" />;
  const RightContent = props =><TouchableWithoutFeedback {...props} onPress={()=>{setConstantes({...constantes, showMarkerAdresseEdit:true})}}><Avatar.Icon style={{marginRight:15}} size={30} icon="square-edit-outline"/></TouchableWithoutFeedback>
  // const EditIcone = props =><TouchableWithoutFeedback {...props} onPress={()=>{}}><Avatar.Icon style={{marginRight:15}} size={20} icon="circle-edit-outline"/></TouchableWithoutFeedback>
  
  
  const changeData = (index, data) => {
    let accesList2 = [];
    accesList2 = accesList.map((acces, i)=>{
      return index != i ? {...acces}:{...data}});
    setAccesList([...accesList2])}

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
        callback: () => {
          console.log('setConstante after fetch reponse ok')
          setConstantes({
            ...constantes,
            showModal:false,
            showMarkerAdresseEdit:false,
            positionAcces:true,
            spinner:false,
            isConnected:true})
          setTimeout(() => {
            getMarker(constantes.coordonates)
          }, 1000);},})}},]);};

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
            longitude : constantes.coordonates.longitude
          },
          callback: () => {
            setConstantes({
              ...constantes,
              showModal:false,
              showMarkerAdresseEdit:false,
              positionAcces:true,
              spinner:false,
              isConnected:true})
              setTimeout(() => {
                getMarker(constantes.coordonates)
              }, 1000)},})}},]);};
  
  const back = ()=>setConstantes({...constantes, showMarkerAdresseEdit:false});
  const add = ()=>setAccesList([...accesList, {type:'', code:''}])
  const UneditableAccesRender = ({id, type, code, mk})=><View key={id} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
  <Chip style={{flex:2}}>{type + ' => '}</Chip><Chip textStyle={{textAlign:'center'}} style={{flex:1, }}>{code}</Chip></View>

  let markerInfo = {adresse: '', accesList: [],};
  constantes.markerList.map(marker=>{if(marker.id==constantes.seletedMarker.id && accesList.length==0) {
    markerInfo = {...marker}
    setAccesList([...marker.accesList])}})
  
  console.log('markerInfo: '+JSON.stringify(markerInfo))
  console.log('constante dans le infoMarkerModal ligne 80: '+ JSON.stringify(constantes.seletedMarker))
  return (
    !constantes.showMarkerAdresseEdit?
      <Card>
        <Card.Title
          title="Infos et Acces"
          subtitle={constantes.seletedMarker.adresse}
          left={LeftContent} right={RightContent}/>
        
        <Card.Content style={{height:120}}>
          <FlatList
          data={constantes.seletedMarker.accesList}
          renderItem={({item}) => <UneditableAccesRender id={item.id} type={item.type} code={item.code} mk={item.mk}/>}
          keyExtractor={item => item.id}
          initialNumToRender={1}/></Card.Content></Card>:
      <Card>
        <Card.Title
          title="Modification du Marker"
          subtitle="Modifier adresse et position sur la map..."
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
            onChangeText={(e)=>setAdresse(e)}
            defaultValue={constantes.seletedMarker.adresse}/>
          
            {constantes.seletedMarker.accesList.map((acces, i) =>{
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