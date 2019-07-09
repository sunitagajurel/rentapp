import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';  
import  ListVehicle from './components/screens/ListVehicle';
import NewVehicle from './components/screens/NewVehicle';
import Information from './components/screens/Information';
import Main from './components/screens/Main';
import Login from './components/Users/Login';
import SignUp from './components/Users/SignUp';
import userProfile from './components/Users/userProfile';
import Profile from './components/Users/Profile';
import ChatRoom from './components/screens/ChatRoom'

import Loading from './components/Users/Loading';
import FetchLocation from './maps/location'

const RootStack = createStackNavigator(
  {
    List:ListVehicle,
    AddVehicle: NewVehicle,
    Login: Login,
    SignUp:SignUp,
    Info:Information,
    ChatRoom:ChatRoom,
    Main:Main
    
  },
  {
    initialRouteName: 'Main',
    
    },

);


const authStack =createStackNavigator(
{
   Loading :Loading ,
   SignUp:SignUp,
   Login: Login,

   userProfile:userProfile,
   Profile:Profile,

 },
 {
  initialRouteName: 'Loading',
 }

  );





export default createAppContainer(createBottomTabNavigator(
  {   
    
    MilijuliYatayat:RootStack ,
     Profile: {  
        screen:authStack,  
        navigationOptions:{  
          
          tabBarIcon:({tintColor})=>(  
              <Icon name="ios-person" color={tintColor} size={25}/>  
          )  
        }  
        
    },  
    maps:FetchLocation,
    
  },
  {
  tabBarOptions: {
  labelStyle: {
    fontSize: 18,
  },
  tabStyle: {
    width: 100,
  },
  style: {
    backgroundColor: '#581845',
  },
}
  }
));

    
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});