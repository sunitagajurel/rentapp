import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import  ListVehicle from './screens/ListVehicle';
import AddVehicle from './screens/AddVehicle';
import Login from './Users/Login';
import SignUp from './Users/SignUp';
import Profile from './Users/userProfile';
import Loading from './Users/Loading';

const RootStack = createStackNavigator(
  {
    List:ListVehicle,
    AddVehicle: AddVehicle,
    Login: Login,
    SignUp:SignUp,
    
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
    
  },
  {
    /* Other configuration remains unchanged */
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