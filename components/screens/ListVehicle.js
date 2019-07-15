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
      const { type,brand,pickupdate,dropoffdate,rate,image,uid} =child.val();
      vehicles.push({
        key:child.key,
        type,
        brand,
        pickupdate,
        dropoffdate,
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
      data: newData,

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
          data={this.state.data}
         
          renderItem={({ item }) =>
      <View style ={{ flexDirection: 'row',padding:20,height:300,borderWidth:2}}>
      
     <TouchableOpacity activeOpacity = { .5 } onPress ={()=>{ this.props.navigation.navigate('Info',{id:item.uid})}}>
      <Image style={styles.image} resizeMode="cover" source={{ uri:item.image}} />
        </TouchableOpacity>
        
      <View style={styles.textContainer}>
        <Text >Company:{item.brand}</Text>




        <Text >PickupDate:{item.pickupdate}</Text>
        <Text >DropoffDate:{item.dropoffdate}</Text>
        <Text >Rate:{item.rate}</Text>

        
          
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
    height: 200,
    padding: 25,
    backgroundColor: '#fefefe',
    alignItems: 'center',
     justifyContent: 'flex-start',
    borderWidth: 0.5,
  },
  image: {
    flex: 1,
    width:200,
    padding:0,
    marginBottom: 5,
  },
  textContainer: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
  },
  title: {
    flex: 4,
  },
  likes: {
    
    
    marginBottom:5
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
