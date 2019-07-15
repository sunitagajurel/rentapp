import React from 'react'
import { StyleSheet, Platform, Image, Text, View ,Button,Dimensions,FlatList,TouchableOpacity} from 'react-native'
import  firebase from '../.././firebase'

const { width, height } = Dimensions.get('window');




export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'Your Profile',
  };
  state = { currentUser: null,
    userDetail:[],
    vehicles:[],
   
   }



  componentDidMount() {
    
    const { currentUser } = firebase.auth()
    let ref = firebase.database().ref('user/'+currentUser.uid+'/details')
    let vref = firebase.database().ref('user/'+currentUser.uid+'/vehicles')

    ref.on('value', (snap) => {
    console.log(snap.val())
       const userDetail = [];
       

    this.setState({ 
   
    userDetail:snap.val(),
    currentUser,
    uid:currentUser.uid

   });

})
    vref.on('value', (snap) => {
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

 

  render() {
    const { currentUser } = this.state

    return (
      <View style={styles.container}>

      <View >
      <Image  style={{ width: 200, height: 200, borderRadius: 200 / 2 }}resizeMode="cover" source={{ uri: this.state.userDetail.url}} />
      
    </View>
        <Text style ={{ }}>
          Hi {currentUser && currentUser.email && this.state.uid}!
        </Text>
        <Text style ={{ }}>
          Hi {this.state.userDetail.name}!
        </Text>

         <View style={styles.container,{flexDirection: 'row'}}>
              <View style={styles.buttonContainer}>
                <Button title="Edit your details here"
                onPress={() => this.props.navigation.navigate('userProfile')}
                 
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button title="logout"
                 onPress={() => firebase.auth().signOut()} /> 
              </View>
            </View>

          <Text style ={{marginTop:40}}> Your Posts </Text> 
          <FlatList
          data={this.state.vehicles}
         
          renderItem={({ item }) =>
      <View style ={{ flexDirection: 'row',padding:20,height:300,borderWidth:2}}>
      
     <TouchableOpacity activeOpacity = { .5 } onPress ={()=>{ this.props.navigation.navigate('Info',{id:item.uid})}}>
      <Image style={styles.vimage} resizeMode="cover" source={{ uri:item.image}} />
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


      
    )
  }
}

const styles = StyleSheet.create({
 container:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFA07A',
    },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },
  buttonContainer: {
        marginTop: 8,
    }
    ,
    imageContainer: {
    width:width/4,
    height:height/4,
    padding:10,
    backgroundColor: '#fefefe',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: 300,
   
    marginBottom: 5,
    borderRadius:500,
 
  },
  vimage: {
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
})