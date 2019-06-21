import React from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';
import UsersMap from './UserMap'

const fetchLocation =() => {
	state ={ 
		userLocation : null 
	};
	getLocation =() => {
		navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0622,
            longitudeDelta: 0.0421
          }
        });
    }
		,err => console.log(err));
		}
		


	
	return (
		<View style={styles.container}>
			<Button title ="Get Location" onPress={() => this.getLocation()} /> 
		<UsersMap
          userLocation={this.state.getLocation}
          
        />
         </View>
		);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default fetchLocation;