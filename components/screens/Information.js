import React from 'react'
import { View, Text, Image, Button ,TouchableOpacity} from 'react-native'
import FetchLocation from '../../maps/location' 
import ImagePicker from 'react-native-image-picker'
import call from 'react-native-phone-call'



import firebase from '../.././firebase';

export default class Information extends React.Component {

	constructor(props){
    super(props)
  this.state = {
   
    users:[],
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
   
    users:snap.val()

   });
    })
    
   

 }

 makeCall =(number)=> {
 	const args ={
 		number:number,
 		prompt:false
 	}
 	call(args).catch(console.error)
 }

  
  render() {
    
    return (
    	<View>

   
       

        <Text> 
        	posted by : {this.state.users.name}
        	
</Text> 
       
       
        <FetchLocation data ={this.state.users} /> 


        
         <Button title ='call' style ={{marginTop:'10',width:'30',alignItem:'centre'}}
         onPress ={()=> this.makeCall (this.state.users.licence_no)}
         /> 
         
         
      </View>
    )
  }
}