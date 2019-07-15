import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TextInput,
  Platform,Button
} from 'react-native';
 
import ImagePicker from 'react-native-image-picker'
import Helpers from './Helper'
import  firebase from '../.././firebase'
import RNFetchBlob from 'react-native-fetch-blob'
 
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
 
const uploadImage = (uri, imageName, mine = 'image/jpg') => {
    return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS ==='ios' ? uri.replace('file://', '') : uri
        let uploadBlob = null
        const imageRef = firebase.storage().ref('image').child(imageName)
        fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, {type: `${mine};BASE64`})
            })
            .then((blob) =>{
                uploadBlob = blob
                return imageRef.put(blob, {contentType: mine })
            })
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
            })
            .then((url) => {
                resolve(url)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
 
export default class userProfile extends Component {
    constructor(props){
        super(props)
 
        this.state = {
            imagePath: '',
            imageHeight: '',
            imageWidth: '',
            name: '',
            contact_no: '',
            latitude:0,
            longitude:0,
            licence_no:'',
            uid: ''
        }
    }
    componentDidMount() {
    
    const { currentUser } = firebase.auth()
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error:null,
            currentUser

          
        });
    }
    ,err => this.setState({error:err.message
          
            
          
        }),

    

    );
  }
    



  


   async  componentWillMount (){
        try {
            let user = await firebase.auth().currentUser;
            this.setState({
                uid: user.uid
            })
        } catch (error) {
            console.log(error)
        }
    }
    openImagePicker(){
        const options = {
            title: 'Select Avatar',
            StorageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }
        ImagePicker.showImagePicker(options, (response) => {
            if(response.didCancel){
                console.log('User canceled image picker')
            }else if (response.error){
                console.log(`Error: ${response.error}`)
            }else if (response.customButton){
                console.log(`User tapped custon button ${response.customButton}`)
            }else{
                this.setState({
                    imagePath: response.uri,
                    imageHeight: response.height,
                    imageWidth: response.width
                })
            }
        })
    }
 
    saveForm(){
        if(this.state.uid){
            try {
                this.state.name ? Helpers.setUserName(this.state.uid, this.state.name) : null
                this.state.contact_no? Helpers.setUserContactNo(this.state.uid, this.state.contact_no): null
                this.state.longitude ? Helpers.setUserLongitude(this.state.uid, this.state.longitude): null
                this.state.latitude ? Helpers.setUserLatitude(this.state.uid, this.state.latitude): null
                this.state.licence_no? Helpers.setUserLicenceNo(this.state.uid, this.state.licence_no): null
                this.state.imagePath ?
                    uploadImage(this.state.imagePath, `${this.state.uid}.jpg`)
                    .then((responseData) => {
                        const obj = {
                                    name: this.state.name,
                                    longitude: this.state.longitude,
                                    latitude: this.state.latitude,
                                    uid:this.state.uid,
                                }
                        Helpers.setImageUrl(this.state.uid, responseData);
                        Helpers.setLocationMarker(this.state.uid,obj)
                    })
                    .done()
                : null

 
                this.props.navigation.navigate('Profile')
                
            } catch (error){
                console.log(error)
            }
        }
    }
    //{this.state.imagePath ? <Image style={{width: this.state.imageWidth, height: this.state.imageHeight}} source={{uri: this.state.imagePath}
    render(){
        return (
            <View style={styles.container}>
                {this.state.imagePath ? <Image style={{width: 100, height: 100}} source={{uri: this.state.imagePath}
                }/> : null }
                <TouchableHighlight
                onPress={this.openImagePicker.bind(this)}>
                        <Text>Upload Image</Text>
                </TouchableHighlight>
 
                <TextInput
                   
                    placeholder="Your name"
                    value={this.state.name}
                    onChangeText={(name)=> this.setState({name})} >
                </TextInput>
                <TextInput
                   
                    placeholder="contact_no"
                    value={this.state.contact_no}
                    onChangeText={(contact_no)=> this.setState({contact_no})} >
                </TextInput>
                <TextInput
                    
                    placeholder="location"
                    value={this.state.location}
                    onChangeText={(location)=> this.setState({location})} >
                </TextInput>

                 <TextInput
                    
                    placeholder="licence_no"
                    value={this.state.licence_no}
                    onChangeText={(licence_no)=> this.setState({licence_no})} >
                </TextInput>

                <TouchableHighlight
                    style={styles.buttonSave}
                    onPress={this.saveForm.bind(this)}
                >
                    <Text>Save</Text>
                </TouchableHighlight>

                <View style={styles.buttonContainer}>
                <Button title="logout"
                 onPress={() => firebase.auth().signOut()} /> 
              </View>


            </View>
        )
    }
}
 
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 140,
    marginHorizontal: 10
  },

  buttonSave: {
    height:30,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: 20,
    backgroundColor: 'green'
  },
   buttonContainer: {
        marginTop: 8,
    }
 
})