import React from 'react'
import { View, Text, Image, Button } from 'react-native'
import ImagePicker from 'react-native-image-picker'



import firebase from '../.././firebase';

export default class Information extends React.Component {

	constructor(props){
    super(props)
  this.state = {
   
    clients:[],
    text:''
  };
}
  
componentDidMount() {
	const { navigation } = this.props;
    const uid = navigation.getParam('id', 'NO-ID');
    console.log(uid)

	let ref = firebase.database().ref('user/'+uid+'/details');
   ref.on('value', (snap) => {
    

      this.setState({ 
   
    clients:snap.val()

   });
    })
    
   

 }

  
  render() {
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor: '#FFA07A'}}>
        <Text> 
        	posted by : {this.state.clients.name}
        	
         </Text> 
         <Text> 
        	
        	contact_no:{this.state.clients.licence_no}
        	
         </Text> 
         <Text> 
        	
        	
        	location :{this.state.clients.location}
         </Text> 
        <Button title="Connect to the Rantee" onPress ={()=>{ this.props.navigation.navigate('ChatRoom') }}/>
      </View>
    )
  }
}