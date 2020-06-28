/**
* Pantalla on es mostra la gràfica individual de com evoluciona el partit,
* mostrant les ocasions introduides durant el partit, i també mostra com
* es van acumulant auqestes ocasions introduides.
*/

import React, {useState} from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ActivityIndicator,
  Dimensions,
  Image,
  Button
} from 'react-native';
import { LineChart} from "react-native-chart-kit";
import Firebase from '../src/config';
const ref = Firebase.firestore().collection('valoracions');

class grafiques extends React.Component{

    _isMounted = false;

    constructor () {
        super()
        this.state = {
          nivells: [],
          dades: [],
          isLoading: true,
          nivellsInd: [],
          dadesInd: [],
          acumulat: [],
          isLoadingInd: true,
        }
    }

    //Es filtren les dades que es volen mostrar a les gràfiques fent la consulta a la BD,
    //en aquest cas es filtra per equip, idPartit i id usuari.
    componentDidMount(){
        this._isMounted = true;

          const user = Firebase.auth().currentUser;
          if(user){
            ref.where('nomEquip', '==', this.props.navigation.getParam('equip')).where('uidPartit', '==', this.props.navigation.getParam('id')).where('uidUusari', '==', user.uid).orderBy("hora", "asc").onSnapshot((querySnapShot) => {
                const levelInd = [];
                const dadInd = [];
                var acum = 0;
                const acumu = [];
                querySnapShot.forEach((doc) => {
                  dadInd.push(doc.data().ocasio);
                  acum = acum + doc.data().ocasio;
                  acumu.push(acum);
                  levelInd.push(doc.data().hora);
                })
                if(this._isMounted){
                    this.setState({
                    isLoadingInd: false,
                    nivellsInd: levelInd,
                    dadesInd: dadInd,
                    acumulat: acumu,
                });
                }
              });
          }
        
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    pressHandlerGrafiquesGlobals = () => {
        this.props.navigation.navigate('GrafiquesGlobals', {idPartit: this.props.navigation.getParam('id'), equip: this.props.navigation.getParam('equip'), equipContra: this.props.navigation.getParam('equipContra')});
      }

    render(){
    if(this.state.isLoadingInd){
        return(
            <View style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
            </View>
            )
    }

    if(this.state.dadesInd == 0){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>
                Aún no se ha introducido ninguna valoración, se muestran las gráficas una vez se valora.
                </Text>
                <Image style={styles.Photo} source={require('../imatges/grafico.png')}/>
            </View>
        )
    }else{
    return(
        <View style={styles.container}>
            <Text style={styles.textGrafiques}>
                GRÁFICA OCASIONES
            </Text>

            <LineChart
            data={{
                labels: this.state.nivellsInd, 
                datasets: [
                    { 
                        data: this.state.dadesInd
                    }
                ],
            }}
            width={Dimensions.get("window").width}
            height={220}
            chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                //decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(147, 147, 152, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(147, 147, 152, ${opacity})`,
                decimalPlaces: 0,
            style: {
                borderRadius: 16
            },
            propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
            }
            }}
            bezier
            style={{ 
                marginVertical: 8, 
                borderRadius: 16, 
            }}
            />

            <Text style={styles.textGrafiques}>
                GRÁFICA OCASIONES ACUMULADAS
            </Text>
            <LineChart
            data={{
                labels: this.state.nivellsInd, 
                datasets: [
                    { 
                        data: this.state.acumulat
                    }
                ],
            }}
            width={Dimensions.get("window").width}
            height={220}
            chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(147, 147, 152, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(147, 147, 152, ${opacity})`,
            style: {
                borderRadius: 16
            },
            propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
            }
            }}
            bezier
            style={{ 
                marginVertical: 8, 
                borderRadius: 16, 
            }}
            />
            <Button title='GRÀFIQUES GLOBALS' onPress={this.pressHandlerGrafiquesGlobals}/>
        </View>
    )}
  }

}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    Photo: {
        width:60,
        height: 60
    },
    text: {
       color: '#9c9796',
       fontSize: 18,
       textAlign: 'center',
       fontFamily: 'lato-regular',
    },
    textGrafiques: {
        color: '#9c9796',
        fontFamily: 'Lato-Black',
        paddingBottom: 20,
        paddingVertical: 50
      },
})

export default grafiques;