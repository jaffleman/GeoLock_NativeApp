import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import * as React from 'react';
import {Avatar, Button, Card, Text, TextInput} from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="map-marker" />;
export default function AddMarkerModal({showModal, sendToBase, hideModalSwitcher}) {
  const [adresse, setAdresse] = React.useState('');
  const [accesType, setAccesType] = React.useState('');
  const [code, setCode] = React.useState('');
  const adresseRef = React.useRef(null)
  const accesTypeRef = React.useRef(null)
  const codeRef = React.useRef(null)
  React.useEffect(()=>{
    if(showModal) adresseRef.current.focus();
    else{
      setAdresse('');
      setAccesType('');
      setCode('');}
  },[showModal])
  
  return (
    <Card
      style={
        {
          //   top: 768,
          //backgroundColor: 'yellow',
          //   borderWidth: 3,
        }
      }>
      <Card.Title

        title="Ajouter un marker"
        subtitle="Positionner le marker et renseigner les infos:"
        left={LeftContent}
      />
      <Card.Content>
        <TextInput
          returnKeyType='next'
          onSubmitEditing={()=>accesTypeRef.current.focus()}
          blurOnSubmit={false}
          ref={adresseRef}
          style={{height:35}}
          value={adresse}
          label="Adresse"
          mode="outlined"
          placeholder="copier/coller l'adresse ici..."
          onChangeText={text =>setAdresse(text)}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TextInput
          returnKeyType='next'
          onSubmitEditing={()=>codeRef.current.focus()}
          blurOnSubmit={false}
            ref={accesTypeRef}
            style={{flex: 3, height:35}}
            value={accesType}
            label="Type"
            mode="outlined"
            placeholder="saisisser le type d'acces"
            onChangeText={type => setAccesType(type)}
          />
          <TextInput
          returnKeyType='send'
          onSubmitEditing={()=>sendToBase({accesType, code, adresse})}
            ref={codeRef}
            autoCapitalize='characters'
            value={code}
            style={{flex: 1, height:35}}
            label="Code"
            mode="outlined"
            placeholder="#"
            onChangeText={codeText => setCode(codeText)}
          />
        </View>
      </Card.Content>

    </Card>
  );
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
