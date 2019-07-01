import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import  ListVehicle from './components/screens/ListVehicle';
import NewVehicle from './components/screens/NewVehicle';
import Information from './components/screens/Information';
import Login from './components/Users/Login';
import SignUp from './components/Users/SignUp';
import userProfile from './components/Users/userProfile';
import Profile from './components/Users/Profile';
import ChatRoom from './components/screens/ChatRoom'

import Loading from './components/Users/Loading';
import fetchLocation from './maps/location'

const RootStack = createStackNavigator(
  {
    List:ListVehicle,
    AddVehicle: NewVehicle,
    Login: Login,
    SignUp:SignUp,
    Info:Information,
    ChatRoom:ChatRoom,
    
  },
  {
    initialRouteName: 'List',
    
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
    Profile:authStack,
    maps:fetchLocation,
    
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
    backgroundColor: '#566573',
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