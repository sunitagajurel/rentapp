import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import  firebase from '../.././firebase'

class AddVehicle extends Component {
  static navigationOptions = {
    title: 'Add Vehicle',
  };
  constructor() {
    super();
    this.ref = firebase.database().ref('Vehicle');
    this.state = {
      types: '',
      brand: '',
      rate: '',
      date:'',
      photo:'',
      isLoading: false,
    };
  }
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  saveVehicle() {
    this.setState({
      isLoading: true,
    });
    this.ref.push({
      types: this.state.types,
      brand: this.state.brand,
      rate: this.state.rate,
      date: this.state.date,
      photo: this.state.photo,

    }).then((docRef) => {
      this.setState({
        types: '',
        brand: '',
        rate: '',
        date:'',
        photo:'',
        isLoading: false,
      });
      this.props.navigation.goBack();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'Types'}
              value={this.state.types}
              onChangeText={(text) => this.updateTextInput(text, 'types')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Description'}
              value={this.state.brand}
              onChangeText={(text) => this.updateTextInput(text, 'brand')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'rate'}
              value={this.state.rate}
              onChangeText={(text) => this.updateTextInput(text, 'rate')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'date'}
              value={this.state.date}
              onChangeText={(text) => this.updateTextInput(text, 'date')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'url of photo'}
              value={this.state.photo}
              onChangeText={(text) => this.updateTextInput(text, 'photo')}
          />
        </View>

        <View style={styles.button}>
          <Button
            large
            leftIcon={{name: 'save'}}
            title='Add'
            onPress={() => this.saveVehicle()} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AddVehicle;