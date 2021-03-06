import React ,{Component}from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';
import MapView  ,{Marker }from "react-native-maps";
import getDirections from 'react-native-google-maps-directions'

 export default class FetchLocation extends Component {
  constructor(props){
  super(props);
  
        this.state = {
            sourcelongitude:0,
            sourcelatitude:0,
            destinationlongitude:0,
            destinationlatitude:0
        }
    }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
         
         console.log(position);
         this.setState({
           sourcelatitude: position.coords.latitude,
           sourcelongitude: position.coords.longitude,
           
           error: null,
         });
       },
       (error) => this.setState({ error: error.message }),
       
     );
   }





  handleGetDirections = () => {
    const data = {
       source: {
        latitude:this.state.sourcelatitude,
        longitude:this.state.sourcelongitude
      },
      destination: {
        latitude:this.props.data.latitude ,
        longitude: this.props.data.longitude
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode
        }
      ]
    }
 
    getDirections(data)
  }
 
  render() {
    return (
      <View>
        <Button onPress={this.handleGetDirections} title="Get Directions" />
      </View>
    );
  }
}