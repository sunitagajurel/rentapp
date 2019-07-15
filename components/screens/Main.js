import React, { Component } from 'react'
import {
    Text,
    View,
    Platform,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Image,
    Dimensions
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import  firebase from '../.././firebase'
let ref = firebase.database().ref('Vehicle');
import SearchedVehicle from './SearchedVehicle'
 
export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
    pickupdate:"2019-05-15",
    dropoffdate:"2019-05-10",
    type:'',
    rate:'',
    location:'',
    info:[],
    data:false
  }
  }
  Search(){
    ref.on('value', (snap) => {
    console.log(snap.numChildren());
    
    console.log('hello')
    const info = [];
     snap.forEach((child) => {
  const { type,brand,pickupdate,dropoffdate,rate,image,uid} =child.val();
  if( pickupdate ==this.state.pickupdate||rate ==this.state.rate){
      info.push({
        key:child.key,
        type,
        brand,
        pickupdate,
        dropoffdate,
        rate,
        image,
        uid,
      });
    }
    })
   
    
    this.setState({
      info,
      data:true
      
   });
   { this.props.navigation.navigate('Search',{id:this.state.info})}
  })
 }



  render(){
    return (
      <View style ={{flex:1}}>
      <Image 
    source={require('./mainscreen.png')}  
    style={{width: 500, height: 200}}
   />
   <View style = {{backgroundColor:'#BC8F8F',height:1000}}>
      

 <View style={{ flexDirection: 'row'}}>


      <DatePicker

        style={{width: 200,marginTop:10}}
         date={this.state.pickupdate}
        mode="date"
        placeholder="pickup date"
        format="YYYY-MM-DD"
        minDate="2019-05-01"
        maxDate="2019-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left:0,
            top: 4,
            marginLeft:0
          },
          dateInput: {
            marginLeft:36,
            marginTop:10
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(pickupdate) => {this.setState({pickupdate:pickupdate})}}
      />

      <DatePicker

        style={{width: 200,marginTop:10}}
         date={this.state.dropoffdate}
        mode="date"
        placeholder="dropoff date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left:0,
            top: 4,
            marginLeft:0
          },
          dateInput: {
            marginLeft:36,
            marginTop:10
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(dropoffdate) => {this.setState({dropoffdate:dropoffdate})}}
      />
      </View>


       <View style={styles.containerInput}>
                        <TextInput 
                            style={styles.input}
                            value={this.state.type}
                            placeholder="type of vehicle"
                            placeholderTextColor="white"
                            onChangeText={(type) => this.setState({type})}
                        />
                    </View>
      <View style={styles.containerInput}>
                        <TextInput 
                            style={styles.input}
                            value={this.state.rate}
                            placeholder="preffered rent"
                            placeholderTextColor="white"
                            onChangeText={(rate) => this.setState({rate})}
                        />
                    </View>
                    <View style={styles.containerInput}>
                        <TextInput 
                            style={styles.input}
                            value={this.state.location}
                            placeholder="location"
                            placeholderTextColor="white"
                            onChangeText={(location) => this.setState({location})}
                        />
                    </View>

         <View >
               <TouchableHighlight
                 onPress={this.Search.bind(this)}
                  style={[styles.button, {marginBottom: 10}]}
                    >
                  <Text style={styles.saveButtonText}>Search</Text>
                    </TouchableHighlight>
                
              </View>
          </View>



      </View>
      


  
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F618D'
    },
    content: {
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 10,
        justifyContent: 'space-between'
    },
    label: {
        flex: 1,
        fontSize: 18
    },
    input: {
        flex: 2,
        fontSize: 14,
        height: 40
    },
    inputTextArea: {
        height: 200,
        flex: 1,
        fontSize: 14
    },
    containerInput: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#cecece',
        alignItems: 'center',
        padding: 5,
        marginBottom: 10,
        marginTop :0,
    },
    containerImage: {
        flexDirection: 'row'
    },
    button: {
        borderWidth: 0.5,
        borderColor: 'red',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 3,
        backgroundColor:'blue',
        width:70,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white'
    }
})