import React from 'react'
import { View, Text, Image, Button } from 'react-native'
import ImagePicker from 'react-native-image-picker'

export default class Information extends React.Component {
  


  
  render() {
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>

        Details are yet to be Updated </Text> 
        <Button title="Connect to the Rantee" onPress ={()=>{ this.props.navigation.navigate('ChatRoom') }}/>
      </View>
    )
  }
}