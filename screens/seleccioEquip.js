/**
* Pantalla que permet seleccionar l'equip que es vol valorar
*/

import React, { useState } from 'react';
import { StyleSheet, 
  View, 
  Text, 
  Button, 
  TouchableOpacity, 
  Image
} from 'react-native';
import Firebase, { db } from '../src/config';

class seleccioEquip extends React.Component {

  //Es navega a la pantalla de valorar equip i s'envien les dades necessàries pel correcte funcionament de la següent pantalla.
  pressHandlerLocal = () => {
    this.props.navigation.navigate('ValorarEquip', {id: this.props.navigation.getParam('key'), text: this.props.navigation.getParam('imatgeloc'), equip: this.props.navigation.getParam('local'), equipContra: this.props.navigation.getParam('visitant'),
     hores: this.props.navigation.getParam('hours'), minuts: this.props.navigation.getParam('minutes')});
  }

  //Es navega a la pantalla de valorar equip i s'envien les dades necessàries pel correcte funcionament de la següent pantalla.
  pressHandlerVisitant = () => {
    this.props.navigation.navigate('ValorarEquip', {id: this.props.navigation.getParam('key'), text: this.props.navigation.getParam('imatgevis'), equip: this.props.navigation.getParam('visitant'), equipContra: this.props.navigation.getParam('local'),
     hores: this.props.navigation.getParam('hours'), minuts: this.props.navigation.getParam('minutes')});
  }
 render(){
  return (
      <View style={styles.container} >
        <TouchableOpacity style={styles.butons} activeOpacity={0.5} onPress={this.pressHandlerLocal}>
          <Text style={styles.text}> {this.props.navigation.getParam('local')} </Text>
          <Image
           style={styles.imatge}
           source={{uri: this.props.navigation.getParam('imatgeloc')}}
         />
        
       </TouchableOpacity>
        <TouchableOpacity style={styles.butons} activeOpacity={0.5} onPress={this.pressHandlerVisitant}>
          <Text style={styles.text}> {this.props.navigation.getParam('visitant')} </Text>
          <Image
           style={styles.imatge}
            source={{uri: this.props.navigation.getParam('imatgevis')}}
          />
        </TouchableOpacity>
        <Image style={styles.imatgeAnunci} source={require('../imatges/cotxeAnunci.jpg')}/>
     </View>
    
  );}
}

const styles = StyleSheet.create({
  imatge: {
    width: 155,
    height: 155
  },
  imatgeAnunci: {
    width: 360,
    height: 134,
    marginTop: 250
  },
  butons: {
    alignItems: 'center',
    flexDirection: 'column'
  },
  text: {
    fontFamily: 'lato-regular',
    color: '#47525E',
    textAlignVertical: "center"
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 50,
    paddingRight:50,
    paddingTop: 50,
    justifyContent: 'center',
  },
  containerGeneral: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default seleccioEquip;


