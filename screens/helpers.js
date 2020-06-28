import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import ItemComponent from '../components/ItemComponent';
import Firebase from '../src/config';
import { globalStyles } from '../styles/global';

let itemsRef = Firebase.database().ref('/items');

export default class helpers extends Component{

  state = {
    items: []
  };

  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
    });
  }

  render() {
    return (
      <View style={globalStyles.container}>
        {this.state.items.length > 0 ? (
          <ItemComponent items={this.state.items} />
        ) : (
          <Text>No items</Text>
        )}
      </View>
    );
  }
}