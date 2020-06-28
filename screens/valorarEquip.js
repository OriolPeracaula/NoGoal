/**
* Pantalla que permet valorar les ocasions del partit, a mesura que es van
* entrant valoracions, aquestes es pujen a la base de dades, i a partir d'aqui es poden
* explotar les dades, com per exemple, calculant la mitjana.
*/



import React, {useState} from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity,
  Button,
  ImageBackground
} from 'react-native';
import Firebase, { db } from '../src/config';
//import { Button } from 'react-native-paper';
const ref = Firebase.firestore().collection('valoracions');
const refResultats = Firebase.firestore().collection('resultats');

export default function ValorarEquip({ navigation }) {

//Funció que calcula el minut que la ocasió és introduïda i ho puja a la BD.
  async function addValorar(puntuacio) {
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    var horaPartit = navigation.getParam('hores');
    var minPartit = navigation.getParam('minuts');
    var minPartitSuma = horaPartit*60 + minPartit;
    var minSuma = hours*60 + min;

    minutPartitBD = minSuma - minPartitSuma;

    const user = Firebase.auth().currentUser;
    var minutOcasio = minutPartitBD + "'";
    
      if(user){
        ref.add({
          ocasio: puntuacio,
          uidUusari: user.uid,
          uidPartit: idPartit,
          nomEquip: nomEquip,
          hora: minutOcasio,
        });
        console.log('MINUT OCASIO: '+minutOcasio);
        console.log(user.uid);
        console.log(idPartit);
        console.log(nomEquip);
      }
  }

  //Funció que calcula l'acumulat de totes les ocasions de cada usuari per cada partit i equip.
  ocasionsAcumulat = () =>{
    var sumaAcumulat = 0;
    var mitjanaInd = 0;
    var midaOcasionsInd = 0;
    const user = Firebase.auth().currentUser; 
      if(user){
        const guardaUsuari = user.uid;
        ref.where('uidPartit', '==', idPartit).where('nomEquip', '==', nomEquip).where('uidUusari', '==', guardaUsuari).get()
        .then(querySnapshot => {
          midaOcasionsInd = querySnapshot.size;
          
          console.log('Total valoracions: ', querySnapshot.size);
          querySnapshot.forEach(documentSnapshot => {
            sumaAcumulat = sumaAcumulat + documentSnapshot.data().ocasio;
            console.log(sumaAcumulat);
            setSumaAux(sumaAcumulat);
          });
          mitjanaInd = sumaAcumulat / midaOcasionsInd;
          setOcasionsIndividualM(mitjanaInd);
        });
      }
    
    return sumaAcumulat;
  }
  
  const[valorar, setValor] = useState([
      {valor: 1, id: '1'},
      {valor: 2, id: '2'},
      {valor: 3, id: '3'},
      {valor: 4, id: '4'},
      {valor: 5, id: '5'},
  ]);
  const[valorat, setValorat] = useState([]);
  const[suma, setSumatori] = useState(0);
  const[sumaAux, setSumaAux] = useState(0);
  const[ocasionsGlobalM, setOcasionsGlobalM] = useState();
  const[ocasionsIndividualM, setOcasionsIndividualM] = useState();
  const ruta =  navigation.getParam('text');
  const idPartit =  navigation.getParam('id');
  const nomEquip =  navigation.getParam('equip');
  const nomEquipContra = navigation.getParam('equipContra');

  const pressHandler = (valor) => {
    setValorat((prevValorat) => {
        return[
            { valor: valor, key: Math.random().toString() },
            ...prevValorat
        ]
    });
    setSumatori(suma + valor);
    addValorar(valor);
    ocasionsAcumulat();
    var sumaTotsOcasions = 0;
    var mitjanaOcasions = 0;
    var midaOcasions= 0;
    ref.where('uidPartit', '==', idPartit).where('nomEquip', '==', nomEquip).get()
      .then(querySnapshot => {
        console.log('Total valoracions: ', querySnapshot.size);
        midaOcasions = querySnapshot.size;
        querySnapshot.forEach(documentSnapshot => {
          sumaTotsOcasions = sumaTotsOcasions + documentSnapshot.data().ocasio;    
        });
        console.log('Valoracions suma total: ', sumaTotsOcasions);
        mitjanaOcasions = sumaTotsOcasions / midaOcasions;
        console.log('Mitjana: ', mitjanaOcasions);
        setOcasionsGlobalM(mitjanaOcasions);
      });
  }

  const pressHandlerPartitFinalitzat = () => {
      if((ocasionsIndividualM - ocasionsGlobalM) > 1 || (ocasionsIndividualM - ocasionsGlobalM) < -1){
        console.log('Valoraciones no válidas');
        alert('Respuesta no válida');
      }else{
        alert('Resultado enviado');
        console.log('Se sube el resultado a la bd');
        const user = Firebase.auth().currentUser;
        if(user){
          refResultats.add({
            resultat: sumaAux,
            uidUusari: user.uid,
            uidPartit: idPartit,
            nomEquip: nomEquip,
          });
      }
      }
      console.log(ocasionsGlobalM);
      console.log(ocasionsIndividualM);
  }

  const pressHandlerGrafiques = () => {
    navigation.navigate('Grafiques', {id: idPartit, equipContra: nomEquipContra, equip: nomEquip, mG: ocasionsGlobalM, mI: ocasionsIndividualM});
  }
  console.log(new Date().getHours()*60 + new Date().getMinutes());
  console.log(navigation.getParam('hores')*60 + navigation.getParam('minuts'))
  if((new Date().getHours()*60 + new Date().getMinutes()) < (navigation.getParam('hores')*60 + navigation.getParam('minuts'))){
    return(
    <View style={styles.containerAvis}>
      <Text 
        style={styles.textInfo}>EL PARTIDO NO HA EMPEZADO, UNA VEZ INICIADO SE PODRAN INTORDUCIR LAS VALORACIONES
      </Text>
      <Image style={styles.imatgeAvis} source={require('../imatges/avis.png')}/>
    </View>);
    
  }else{
  return (
    <View style = {styles.container}>
        <View>
            <Image style={styles.imatge} source={{uri: ruta}} />
        </View>

        <Text style={styles.text}>ÚLTIMAS OPORTUNIDADES:</Text>
        <FlatList
        horizontal={true}
        data={valorat} 
        renderItem={({ item }) => ( 
          <Text style={styles.text}>{item.valor} </Text>
        )}
        />
        
        {/*<Text style={styles.text}>Suma total: {suma}</Text>*/}
        <Text style={styles.text}>Acumulado: {sumaAux}</Text>

        <FlatList 
            numColumns={2}
            keyExtractor={(item) => item.id}
            data={valorar}
            renderItem={({item}) => (
              <View >
                <TouchableOpacity style={styles.item} onPress={() => pressHandler(item.valor)}>
                    {/*<Text style={styles.textItem}>{item.valor}</Text>*/}
                    <ImageBackground style={{alignSelf: 'center'}} source={require('../imatges/deporte.png')} style={{width: '100%', height: '100%'}}>
                      <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                         <Text style={styles.textItem}>{item.valor}</Text>
                      </View>
                    </ImageBackground>
                    
                </TouchableOpacity>  
              </View>
            )}
        />
        
        <View style={{ flex: 2,flexDirection: "row" ,marginLeft:20}}>
          <Button style = {styles.buto} title='FINAL PARTIDO' onPress={pressHandlerPartitFinalitzat}/>
          <Text style={styles.separador}>|</Text>
          <Button title='GRÁFICAS EQUIPOS' onPress={pressHandlerGrafiques}/>
        </View>
        <Image style={styles.imatgeAnunci} source={require('../imatges/banner.jpg')}/>
    </View>
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 24,
    padding: 0,
    width: 110,
    height: 110,
    borderRadius: 120/2,
    backgroundColor: '#77D353',
    alignSelf: 'center'
  },
  textItem: {
    color: 'white',
    fontSize: 35,
    textAlign: 'center',
    fontFamily: 'lato-regular',
  },
  imatge: {
    width: 90,
    height: 90
  },
  sumaTotal: {
    paddingBottom: 100,
  },
  buto: {
    paddingEnd: 20
  },
  text: {
    color: '#9c9796',
    fontFamily: 'Lato-Black',
    padding: 5
  },
  separador: {
    color: '#9c9796',
    fontFamily: 'lato-regular',
    fontSize: 30
  },
  textInfo: {
    color: '#9c9796',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'lato-regular',
 },
 imatgeAvis: {
  width: 200,
  height: 110,
  padding: 40
},
containerAvis: {
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: 20
},
imatgeAnunci: {
  width: 600,
  height: 134,
},
});