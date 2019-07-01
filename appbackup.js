import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  
  ActivityIndicator,
  FlatList,
  Image,
  Dimensions,TouchableOpacity
  
} from 'react-native';
let ref = firebase.database().ref('Vehicle');

import { List, ListItem, Button, Icon,SearchBar } from 'react-native-elements';
import firebase from '../.././firebase';

const { width, height } = Dimensions.get('window');

 export default class ListVehicle extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'VehicleList',
      headerRight: (
        <Button
          buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
          icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
          onPress={() => { navigation.push('AddVehicle') }}
        />
      ),
    };
  };

  constructor(props){
    super(props)
  this.state = {
   
    vehicles:[],
    text:''
  };
}


  componentDidMount() {
   ref.on('value', (snap) => {
    console.log(snap.val());
    console.log('hello')
    const vehicles = [];
     snap.forEach((child) => {
      const { type,brand,date,rate,image,uid} =child.val();
      vehicles.push({
        key:child.key,
        type,
        brand,
        date,
        rate,
        image,
        uid,
      });
    })
    
    this.setState({
      vehicles
      
   });
  })
 }





searchFilterFunction = text => {
  
    const newData = this.state.vehicles.filter(data => {
      const itemData = `${data.type.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      vehicles: newData,

    });
  };

  
  render() {
    
    
    return (
      <View> 
      <SearchBar
        placeholder="Type Here..."
        onChangeText={text =>this.searchFilterFunction(text)}
        
 />

      <View> 
      
      <FlatList
          data={this.state.vehicles}
         
          renderItem={({ item }) =>
      <View style={styles.imageContainer}>
     <TouchableOpacity activeOpacity = { .5 } onPress ={()=>{ this.props.navigation.navigate('Info') }} >
      <Image style={styles.image} resizeMode="cover" source={{ uri:item.image}} />
        </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.type}</Text>
        <View style={styles.likesContainer}>
          <Text style={styles.likes}></Text>
        </View>
      </View>
    </View>
  }



        />

      </View> 

       </View>
    );
  }
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    width,
    height: 300,
    padding: 25,
    backgroundColor: '#fefefe',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: 300,
    // height: 300,
    marginBottom: 5,
  },
  textContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
  },
  title: {
    flex: 4,
  },
  likesContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    width,
    height: Platform.OS === 'ios' ? 70 : 50,
    backgroundColor: '#fefefe',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
  },
});