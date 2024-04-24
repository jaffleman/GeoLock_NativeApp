import React, { useContext } from "react";
import { View, TouchableWithoutFeedback } from 'react-native';
import { ConstantesContext } from "../context/constantesContext";
import AddMarkerModal from "./AddMarkerModal";
import InfoMarkerModal from "./InfoMarkerModal";
import CustomMapView from "./CustomMapView";

export default CustomView = ()=>{
  const {constantes} = useContext(ConstantesContext)
  console.log('**************CustomView')

  const showInfoMarker = constantes.selectedMarker.id == 0 ? false : true;
  console.log('CustomView:marker is selected ? : '+ showInfoMarker)

  return <TouchableWithoutFeedback>
      <View style={{flex: 1, flexDirection: 'column'}}>
        {showInfoMarker && <View  style={{position:'relative', display:'flex', top:0, left:0, right:0, zIndex:100}}>
          <InfoMarkerModal/></View>}
        <CustomMapView/>
        {constantes.showModal && <View style={{position:'relative', display: 'flex', bottom:0, left:0, right:0, zIndex:100}}>
          <AddMarkerModal/></View>}</View></TouchableWithoutFeedback>
}
