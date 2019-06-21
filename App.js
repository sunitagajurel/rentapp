import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import  ListVehicle from './screens/ListVehicle';
import NewVehicle from './screens/NewVehicle';
import Information from './screens/Information';
import Login from './Users/Login';
import SignUp from './Users/SignUp';
import userProfile from './Users/userProfile';
import Profile from './Users/Profile';
import ChatRoom from './screens/ChatRoom'

import Loading from './Users/Loading';
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