/**
 * Pantalla que comprova si la sessió és iniciada o no,
 * si és iniciada et redirigeix a la pantalla home, sinó
 * a la pantalla d'iniciar sessió.
*/

import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import Firebase from '../src/config';
export default class Loading extends React.Component {
  componentDidMount() {
   //Es comprova si hi ha una sessió activa amb "user"
   Firebase.auth().onAuthStateChanged(user => {
    if(user){
      console.log(user.email);
    }else{
      console.log('Sessio no iniciada');
    }
    this.props.navigation.navigate(user ? 'Home' : 'LogIn');
  })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})