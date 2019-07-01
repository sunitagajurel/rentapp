import React ,{Component}from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';
import MapView  ,{Marker }from "react-native-maps";

 export default class fetchLocation extends Component {
  constructor(props){
  super(props);
  this.state ={ 
    latitude:0,
    longitude:0,
    error:null
  }
}
    
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error:null
          
        });
    }
    ,err => this.setState({error:error.message
          
            
          
        }),
    {enableHighAccuracy:true,timeout:20000,maximimAge:2000}

    );
  }
    


  render(){
  return (
    <View style={styles.mapContainer}>
      <MapView
        region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0421
        }}
        
       styles ={{styles.map}}
      >
        <Marker coordinate ={this.state} />
      </MapView>
    </View>
  );
}
}

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: 200,
    marginTop: 20
  },
  map: {
    width: "100%",
    height: "100%"
  }
});

