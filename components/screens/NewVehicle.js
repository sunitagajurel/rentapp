import React, {Component} from 'react'
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
import ImagePicker from 'react-native-image-picker'
import Helpers from '../Users/Helper'
import  firebase from '../.././firebase'
import Icon from 'react-native-vector-icons/FontAwesome'
import RNFetchBlob from 'react-native-fetch-blob'

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export default class NewVehicle extends Component {
    constructor(props){
        super(props)
        this.state = {
            uid: '',
            type: '',
            brand: '',
            rate: '',
            location:'',
            pickupdate:"2019-05-01",
            dropoffdate:"2019-05-01",
            imagePath: '',
            imageHeight: '',
            imageWidth: ''
        }
    }
    
    componentWillMount() {
        try {
            let user = firebase.auth().currentUser
            this.setState({
                uid: user.uid
            })
        } catch(error){
            console.log(error)
        }
    }
    
    uploadImage = (uri, imageName, mime = 'image/jpg') => {
        return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
            let uploadBlob = null
            const imageRef = firebase.storage().ref(`${this.state.uid}/images`).child(imageName)
            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, {type: `${mime};BASE64`})
                })
                .then((blob) => {
                    uploadBlob = blob
                    return imageRef.put(blob, {contentType: mime})
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
    
    openImagepicker(){
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }
        ImagePicker.showImagePicker(options, (response) => {
            if(response.didCancel){
                console.log('User cancelled image picker')
            } else if (response.error){
                console.log('Error'+ response.error)
            } else if(response.customButton){
                console.log('User tapped custon button'+response.customButton)
            } else {
                this.setState({
                    imagePath: response.uri,
                    imageHeight: response.height,
                    imageWidth: response.width
                })
            }
        })
    }
    saveData(){
        if(this.state.uid){
            if(this.state.type &&
                this.state.brand&&
                this.state.pickupdate &&
                this.state.dropoffdate&&
                this.state.rate &&
                this.state.imagePath
                ) {
                    try {
                        this.uploadImage(this.state.imagePath, `${Date.now()}.jpg`)
                            .then((responseData) => {
                                const obj = {
                                    type: this.state.type,
                                    brand: this.state.brand,
                                    pickupdate: this.state.pickupdate,
                                    dropoffdate:this.state.dropoffdate,
                                    rate: this.state.rate,
                                    image: responseData
                                }
                                Helpers.createNewVehicle(this.state.uid, obj);
                                //  const objs = {
                                //     type: this.state.type,
                                //     brand: this.state.brand,
                                //     date: this.state.date,
                                //     rate: this.state.rate,
                                //     image: responseData,
                                //     uid:this.state.uid,
                                // }
                                obj.uid =this.state.uid

                                Helpers.createNewAllVehicle(this.state.uid,obj);

                            })
                            .done()
                          this.props.navigation.navigate('List')
                    } catch(error){
                        console.log(error)
                    }
                }
        }
    }
    render(){
        return (
            <View style={styles.container}>
               
                <View style={styles.content}>
                    <View>
                        <View style={styles.containerImage}>
                            {this.state.imagePath ? <Image 
                                style={{width: 100, height: 100, flex: 1, marginRight: 10}}
                                source={{uri: this.state.imagePath}}
                            /> : null }
                        <TouchableHighlight
                            style={[styles.button, {flex: 2, justifyContent: 'center', alignItems: 'center'}]}
                            onPress={this.openImagepicker.bind(this)}
                        >
                            <Icon name="camera" size={18} color="white" />
                        </TouchableHighlight>
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
                    <View style={{ flexDirection: 'row'}}>

      <DatePicker

        style={{width: 200,marginTop:10}}
        date={this.state.pickupdate}
        mode="date"
        placeholder="pickup date"
        format="YYYY-MM-DD"
        minDate="2019-05-01"
        maxDate="2019-10-01"
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
        minDate="2019-07-01"
        maxDate="2019-10-01"
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
                            value={this.state.brand}
                            placeholder="brand of the vehicle"
                            placeholderTextColor="white"
                            onChangeText={(brand) => this.setState({brand})}
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
                    <View style={styles.containerInput}>
                        <TextInput 
                            style={styles.input}
                            value={this.state.rate}
                            placeholder="rate"
                            placeholderTextColor="white"
                            onChangeText={(rate) => this.setState({rate})}
                        />
                    </View>
                </View>
                <View>
                    <TouchableHighlight
                        onPress={this.saveData.bind(this)}
                        style={[styles.button, {marginBottom: 10}]}
                    >
                        <Text style={styles.saveButtonText}>SAVE</Text>
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
        marginTop :10,
    },
    containerImage: {
        flexDirection: 'row'
    },
    button: {
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 3
    },
    saveButtonText: {
        color: 'white'
    }
})