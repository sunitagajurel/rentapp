import React from 'react'
import { StyleSheet, Text, TextInput, View, Button,TouchableHighlight } from 'react-native'
import firebase from '.././firebase'

export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
  state = { email: '', password: '', errorMessage: null }

  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Profile'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

render() {
    return (
      <View style={styles.container}>
      <View style={styles.content}>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <View style={styles.containerInput}>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.input}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        </View> 

        <View style={styles.containerInput}>
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.input}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        </View> 
        <View >
               <TouchableHighlight
                 onPress={this.handleLogin}
                  style={[styles.button, {marginBottom: 10}]}
                    >
                  <Text style={styles.saveButtonText}>Login</Text>
                    </TouchableHighlight>
                
              </View>

           
        
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
 container:{
        flex: 1,
        backgroundColor: '#1F618D'
    },
     content: {
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 10,
    },
 input: {
        flex: 2,
        fontSize: 14,
        height: 40
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
     button: {
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 3
    },
     saveButtonText: {
        color: 'black'
    }
})