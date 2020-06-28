/**
*Aqui es gestiona la navegació de l'aplicació indicant les pantalles
*que es poden mostrar durant l'execució de l'aplicació.
*/

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Home from '../screens/home';
import SeleccioEquip from '../screens/seleccioEquip';
import ValorarEquip from '../screens/valorarEquip';
import ProvaBD from '../screens/provaBD';
import Helpers from '../screens/helpers';
import Loading from '../screens/loading';
import SignUp from '../screens/signUp';
import LogIn from '../screens/logIn';
import Main from '../screens/main';
import Grafiques from '../screens/grafiques';
import GrafiquesGlobals from '../screens/grafiquesGlobals';

const screens = {
  Loading: {
    screen: Loading,
  },
  LogIn: {
    screen: LogIn,
    navigationOptions: {
      headerTitle: 'INICIAR SESIÓN',
      headerLeft: () => null
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'PARTIDOS DEL DÍA',
      headerLeft: () => null
    },
  },
  SeleccioEquip: {
    screen: SeleccioEquip,
    navigationOptions: {
      headerTitle: 'SELECCIONAR EQUIPO',
      headerBackTitle: 'Atrás'
    },
  },
  ValorarEquip: {
    screen: ValorarEquip,
    navigationOptions: {
      headerTitle: 'VALORAR OCASIONES',
      headerBackTitle: 'Atrás'
    },
  },
  ProvaBD: {
    screen: ProvaBD,
  },
  Helpers: {
    screen: Helpers,
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      headerTitle: 'REGISTRARSE',
      headerBackTitle: 'Atrás'
    },
  },
  Grafiques: {
    screen: Grafiques,
    navigationOptions: {
      headerTitle: 'GRÁFICAS',
      headerBackTitle: 'Atrás'
    },
  },
  GrafiquesGlobals: {
    screen: GrafiquesGlobals,
    navigationOptions: {
      headerTitle: 'GRÁFICAS GLOBALES',
      headerBackTitle: 'Atrás'
    },
  },
  Main: {
    screen: Main,
  }
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);

