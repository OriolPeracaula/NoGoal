/**
* Pantalla on es mostren les gràfiques globals de com evoluciona el partit dels dos equips,
* mostrant les ocasions introduides durant el partitper tots els usuaris.
*/

import React, {useState} from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import { LineChart} from "react-native-chart-kit";
import Firebase from '../src/config';
const ref = Firebase.firestore().collection('valoracions');

class grafiquesGlobals extends React.Component{
  
    _isMounted = false;

    constructor () {
        super()
        this.state = {
          nivells: [],
          dades: [],
          isLoading: true,
          nivellsContra: [],
          dadesContra: [],
          isLoadingContra: true,
          
        }
    }

    //Es filtren les dades que es volen mostrar a les gràfiques fent la consulta a la BD,
    //en aquest cas es filtra per equip, idPartit.
    componentDidMount(){
        this._isMounted = true;
        
        ref.where('nomEquip', '==', this.props.navigation.getParam('equip')).where('uidPartit', '==', this.props.navigation.getParam('idPartit')).orderBy("hora", "asc").onSnapshot((querySnapShot) => {
            const level = [];
            const dad = [];
            querySnapShot.forEach((doc) => {
              dad.push(doc.data().ocasio);
              level.push(doc.data().hora);
            })
            if(this._isMounted){
                this.setState({
                isLoading: false,
                nivells: level,
                dades: dad,
            });
            }
            //console.log(isLoading);
            console.log(this.state.nivells);
            console.log(this.state.dades);
          });
          console.log('HOLA');
          console.log(this.props.navigation.getParam('equip'));
          console.log(this.props.navigation.getParam('equipContra'));

          ref.where('nomEquip', '==', this.props.navigation.getParam('equipContra')).where('uidPartit', '==', this.props.navigation.getParam('idPartit')).orderBy("hora", "asc").onSnapshot((querySnapShot) => {
            const levelContra = [];
            const dadContra = [];
            querySnapShot.forEach((doc) => {
              dadContra.push(doc.data().ocasio);
              levelContra.push(doc.data().hora);
            })
            if(this._isMounted){
                this.setState({
                isLoadingContra: false,
                nivellsContra: levelContra,
                dadesContra: dadContra,
            });
            }
          });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render(){
    if(this.state.isLoading || this.state.isLoadingContra){
        return(
            <View style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
            </View>
            )
    }
    
    if((this.state.dades == 0) || this.state.dadesContra == 0){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>
                Todavía no hay valoraciones de ninguno de los dos equipos, se muestran las gráficas una vez se obtengan los datos.
                </Text>
                <Image style={styles.Photo} source={require('../imatges/grafico.png')}/>
            </View>
        )
    }else{
    return(
        <View style={styles.container}>
            <Text style={styles.textGrafiques}>
                GRÁFICA GLOBAL {this.props.navigation.getParam('equip')}
            </Text>
            <LineChart
            data={{
                labels: this.state.nivells, 
                datasets: [
                    { 
                        data: this.state.dades
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
            <Text style={styles.textGrafiques}>
                GRÁFICA GLOBAL {this.props.navigation.getParam('equipContra')}
            </Text>
            <LineChart
            data={{
                labels: this.state.nivellsContra, 
                datasets: [
                    { 
                        data: this.state.dadesContra
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

export default grafiquesGlobals;