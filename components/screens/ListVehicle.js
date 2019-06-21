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
import firebase from '.././firebase';

const { width, height } = Dimensions.get('window');
 class Search extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}




export default class App extends Component {
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
  constructor() {
    super();
    this.ref = firebase.database().ref('Vehicle');
    this.unsubscribe = null;
    this.state = {
      vehicles: [],
      loading: true,
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
      vehicles,
      loading: false,
   });
  })
 }

  
  render() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    }

    return (
     
      <View >
      <Search/>

        <FlatList
          data={this.state.vehicles}
          {...console.log(this.state.vehicles)}
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