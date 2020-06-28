import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Navigator from './routes/homeStack';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)

const getFonts = () => Font.loadAsync({
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
  'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
  'Lato-BlackItalic': require('./assets/fonts/Lato-BlackItalic.ttf'),
  'Lato-Black': require('./assets/fonts/Lato-Black.ttf'),
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
      
    );
  } else {
    return (
      <AppLoading 
        startAsync={getFonts} 
        onFinish={() => setFontsLoaded(true)} 
      />
    )
  }

}
