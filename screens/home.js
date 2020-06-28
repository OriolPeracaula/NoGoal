/**
* Pantalla prinicpal de l'app, on es mostren els partits del dia
* que es troben a la base de dades.
*/

import React, {useState} from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image,
  Button,
  StatusBar,
} from 'react-native';
import { globalStyles } from '../styles/global';
import Firebase from '../src/config';
import { connect } from 'react-redux'
//import { db } from '../src/config';

const ref = Firebase.firestore().collection('partits');
const storageref = Firebase.storage().ref('equipd/villareal.png');

class Home extends React.Component {

  constructor () {
    super()
    this.state = {
      matchs: []
    }
 }

 //Es consulta a la base de dades els partits del dia i es guarden per poder-los mostrar
 componentDidMount(){
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var datemontada = date + '/' + month + '/' + year;
  var dateFinal = new Date();
  var dayFinal;
  var monthFinal;
  var yearFinal;
  var dateFinal;
  this.unsubscribe = ref.orderBy("dataFinal", "asc").onSnapshot((querySnapShot) => {
    const partits = [];
    querySnapShot.forEach((doc) => {
      dayFinal = doc.data().dataFinal.toDate().getDate();
      monthFinal = doc.data().dataFinal.toDate().getMonth() + 1;
      yearFinal = doc.data().dataFinal.toDate().getFullYear();
      dateFinal = dayFinal + '/' + monthFinal + '/' + yearFinal;
      console.log(dateFinal);

      if(dateFinal == datemontada){
        partits.push({
          local: doc.data().local,
          visitant: doc.data().visitant,
          imatgeloc: doc.data().imatgelocal,
          imatgevis: doc.data().imatgevis,
          data: ((doc.data().dataFinal.toDate().getDate()) + '/' + (doc.data().dataFinal.toDate().getMonth() + 1) + '/' + (doc.data().dataFinal.toDate().getFullYear())),
          key: doc.data().key,
          hora: (('0' + doc.data().dataFinal.toDate().getHours()).slice(-2) + ':' + ('0' + doc.data().dataFinal.toDate().getMinutes()).slice(-2)),
          hours: doc.data().dataFinal.toDate().getHours(),
          minutes: doc.data().dataFinal.toDate().getMinutes()
        })
      }
    })
    this.setState({
      matchs: partits
    });
  })
 }

  handleSignout = () => {
		Firebase.auth().signOut();
		this.props.navigation.navigate('Login');
	}

  pressHandlerProva = () => {
    this.props.navigation.navigate('ProvaBD');
  }
  pressHandlerVeureProva = () => {
    this.props.navigation.navigate('Helpers');
  }
  pressHandlerLoading = () => {
    this.props.navigation.navigate('LogIn');
  }

  getDate = () => {
    var date = new Date().getDate();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var datemontada = date + '/' + hours + '/' + min;
    console.log(datemontada);
    return datemontada;
  }

 render(){
  return (
    <View style={styles.container}>
      <Text style={styles.selecPartit}>
      _____________________________________________
      </Text>
      {/*<Text style={globalStyles.titleText}>Home Screen</Text>
      <Button title='Selecciones partit' onPress={pressHandler} />*/}
      <FlatList
        data={this.state.matchs}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.allItem} onPress={() => {
            //addTodo(item.local, item.visitant);
            //this.provareadBD();
            const dataActual = '23/23/35';
            console.log(item.data);
            this.props.navigation.navigate('SeleccioEquip', item);
          }}>
            <View style={{ flex: 2,flexDirection: "row" , alignItems: "center", justifyContent: "space-between"}}>
              <Image style={styles.imatge} source={{uri: item.imatgeloc}}/> 
              <View style={{ flex: 2,flexDirection: "column" , alignItems: "center", justifyContent: "space-between"}}>                 
                <Text style={styles.horaPartit}>
                  {item.hora} 
                </Text>
                <Text style={styles.horaPartit}>
                  {item.data}
                </Text>
              </View>
              <Image style={styles.imatge} source={{uri: item.imatgevis}}/>
            </View>
            <Text style={styles.selecPartit}>
              _____________________________________________
            </Text>
          </TouchableOpacity>
      )} />
      <TouchableOpacity onPress={this.handleSignout}>
        <Image style={styles.logoutPhoto} source={require('../imatges/logOut.png')}/>
      </TouchableOpacity>
    </View>
  );}
}

const styles = StyleSheet.create({
  imatge: {
    width:40,
    height: 40
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:'center',
    paddingTop: 20,
    alignItems: 'center',
    marginBottom: 24,
    
  },
  text: {
    fontSize: 18,
    fontFamily: 'lato-regular',
    color: '#47525E',
  },
  selecPartit: {
    color: '#d9d9d9',
    fontFamily: 'Lato-Black',
  },
  horaPartit: {
    color: 'black',
    fontFamily: 'Lato-Black',
  },
  allItem: {
    alignContent: 'center',
    padding: 5
  },
  logoutPhoto: {
    width:30,
    height: 30
  }
});

export default Home;


