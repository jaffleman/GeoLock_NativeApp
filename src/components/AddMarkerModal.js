import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import * as React from 'react';
import {Avatar, Button, Card, Text, TextInput} from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="map-marker" />;
export default function AddMarkerModal({sendToBase, hideModalSwitcher}) {
  let   adresse='',  accesType='', code='';
  const inition = () => {adresse = '';
    accesType = '';
    code = '';}
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
          value={adresse}
          label="Adresse"
          mode="outlined"
          placeholder="copier/coller l'adresse ici..."
          onChangeText={text =>adresse = text}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TextInput
            style={{flex: 3}}
            value={accesType}
            label="Type"
            mode="outlined"
            placeholder="saisisser le type d'acces"
            onChangeText={type => accesType=type}
          />
          <TextInput
            value={code}
            style={{flex: 1}}
            label="Code"
            mode="outlined"
            placeholder="#"
            onChangeText={codeText => code = codeText}
          />
        </View>
      </Card.Content>

      <Card.Actions>
        <Button  onPress={()=>{inition();hideModalSwitcher();}}>Cancel </Button>
        <Button onPress={()=>{sendToBase({accesType, code, adresse}); inition()}}>Ok</Button>
      </Card.Actions>
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
