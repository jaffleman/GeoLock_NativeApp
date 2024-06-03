import {StyleSheet, Alert, TouchableWithoutFeedback, View, FlatList} from 'react-native';
import * as React from 'react';
import {Avatar, Button, Card, Text, Switch, TextInput, Chip, Divider} from 'react-native-paper';


export default function AccesCode(props) {
    const {isEditable, i, localMarker, acces, changeData} = props
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => {
        isSwitchOn? changeData(i,{...acces, identifier:acces.id==0?1:2})
        :changeData(i,{...acces, identifier:0});
        setIsSwitchOn(!isSwitchOn);}
        
    return <View key={i} style={{flexDirection: 'row',justifyContent: 'space-evenly',}}>
    <TextInput
      disabled={isSwitchOn}
      editable={isEditable}
      returnKeyType='next'
      onSubmitEditing={()=>codeRef.current.focus()}
      blurOnSubmit={false}
      style={{flex: 3, height:35}}
      label="Type"
      mode="outlined"
      placeholder="saisisser le type d'acces"
      value={isEditable?localMarker.accesList[i].type: acces.type}
      onChangeText={type =>{changeData(i,{...acces, type:type, identifier:acces.id==0?1:2})}}/>

    <TextInput
      disabled={isSwitchOn}
      editable={isEditable}
      returnKeyType='send'
      onSubmitEditing={()=>{}}
      autoCapitalize='characters'
      style={{flex: 1, height:35}}
      label="Code"
      mode="outlined"
      placeholder="#"
      value={isEditable?localMarker.accesList[i].code: acces.code}
      onChangeText={codeText => {changeData(i,{...acces, code:codeText, identifier:acces.id==0?1:2})}}/>
      {isEditable && <Switch color='red' value={isSwitchOn} onValueChange={onToggleSwitch} />}
    </View>
 }