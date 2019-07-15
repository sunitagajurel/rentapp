import React ,{Component}from 'react';
import getDirections from 'react-native-google-maps-directions'
import { StyleSheet, Text, View ,Button} from 'react-native'; 
export default class Maps extends Component {
constructor(props){
        super(props)
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
        latitude: -33.8600024,
        longitude: 18.697459
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
      ],
      waypoints: [
        {
          latitude: -33.8600025,
          longitude: 18.697452,
        },
        {
          latitude: -33.8600026,
          longitude: 18.697453,
        },
           {
          latitude: -33.8600036,
          longitude: 18.697493,
        },
           {
          latitude: -33.8600046,
          longitude: 18.69743,
        },
 
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