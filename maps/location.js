import React ,{Component}from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';
import MapView  ,{Marker }from "react-native-maps";

 export default class FetchLocation extends Component {
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
    ,err => this.setState({error:err.message
          
            
          
        }),

    

    );
  }
    


  render(){
  return (
    <View style={styles.mapContainer}>
      <MapView
        region={{
          latitude:this.props.data.latitude,
          longitude:this.props.data.longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0421
        }}
        
        
       style ={styles.map}
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
    height: "100%",
    marginTop: 20
  },
  map: {
    width: "100%",
    height: "100%"
  }
});

