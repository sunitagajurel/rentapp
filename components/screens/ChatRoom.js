import React from 'react';

import {Alert, View, BackHandler, StyleSheet,Text, Vibration} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from './Input'

class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            text:'',

        }
       
    }
 sendMessage = () => {
        if(this.state.text){
            msg = this.state.text.trim();
            
            this.setState({text:""})
        }
    }
    
    render() {
        
        return(
            <View style = {styles.container}>
            <Text> Hello !! WELCOME TO CHAT SCREEN </Text>
                
              
                <View style = {styles.inputArea}>      
                    <Input
                        placeholder="Aa"
                        onChangeText={
                            text=>{
                                this.setState({text});
                                
                            }
                        }
                        style={styles.sendMsg}
                        value={this.state.text}
                        multiline={true}
                    />
                    <Icon.Button 
                        name="send" 
                        onPress={()=>this.sendMessage()}
                        backgroundColor='#87cefa'
                        size={24}
                        style={{padding:13,paddingTop:8,paddingLeft:8}}
                        borderRadius={400}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headbar:{
        top:0,
        height:50,
        backgroundColor:'#87CEFA',
        justifyContent:'center',
        
    },
    container:{
        flex:1, 
        marginBottom:10
       
    },
    sendMsg:{
        padding:6,
        paddingLeft:15,
        backgroundColor:'#ffffff',
        borderRadius:20,
        width:295,
        fontSize:15,
        marginLeft:20,
        marginRight:5,
    },
    headTitle:{
        alignSelf:'center',
        fontSize:20,
        color:'#2a2a2a',
    },
    inputArea:{
        justifyContent:'center',
        flexDirection:'row',
        backgroundColor:'#87CEFA',
        padding:10,
        paddingBottom:5,

    },
    typing:{
        flex:1,
        justifyContent:'center',
        marginBottom:10,
        paddingTop:5
    }
});

export default ChatRoom;