import React,{Component} from 'react';
import {Header,Icon} from 'react-native-elements';
import {View, Text, Stylesheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const MyHeader = props =>{
  return(
    <SafeAreaProvider>
    <Header
      centerComponent={{text:props.title,style:{color: '#90a5a9',fontSize:20,fontWeight:'bold'}}}
      backgroundColor='#eaf8fe'
    />
    </SafeAreaProvider>
  )
}

export default MyHeader;