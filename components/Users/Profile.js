import React from 'react'
import { StyleSheet, Platform, Image, Text, View ,Button,Dimensions} from 'react-native'
import  firebase from '../.././firebase'

const { width, height } = Dimensions.get('window');




export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'Your Profile',
  };
  state = { currentUser: null,
    userDetail:[],
   
   }



  componentDidMount() {
    
    const { currentUser } = firebase.auth()
    let ref = firebase.database().ref('user/'+currentUser.uid+'/details')

    ref.on('value', (snap) => {
    console.log(snap.val())
       const userDetail = [];
       

    this.setState({ 
   
    userDetail:snap.val(),
    currentUser,
    uid:currentUser.uid

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
          Hi {currentUser && currentUser.email}!
        </Text>
        <Text style ={{ }}>
          Hi {this.state.userDetail.name}!
        </Text>

         <View style={styles.container}>
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
 
  }
})