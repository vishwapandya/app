import React,{Component} from 'react';
import {Text,View,TouchableOpacity,FlatList,StyleSheet,Image} from 'react-native';
import {ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';
import SwipeableFlatlist from "../components/SwipeableFlatlist"


export default class PostScreen extends React.Component{

  constructor(){
    super()
    this.state={
      posts:[]
    }
    this.requestRef = null
  }

  getRequestedBookList=()=>{
    this.requestRef = db.collection('posts')
    .onSnapshot((snapshot)=>{
      var postlist = snapshot.docs.map(document=>document.data());
      this.setState({
        posts:postlist
      })
    })
    
  }

  componentDidMount(){
    this.getRequestedBookList()
   
  }

  componentWillUnmount(){
    this.requestRef()
  }

  keyExtractor = (item,index) => index.toString()

  renderItem=({item,i})=>{
    return(
      
      <ListItem
        key={i}
        title = {item.postName}
        titleStyle={{color:'black',fontWeight:'bold'}}
        rightElement={
          <Image
            style={{ height: 150, width: 150 }}
            source={{
              uri: item.image_link,
            }}
          />
        }
        bottomDivider
      />
    
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title='Post'/>
        <View style={{flex:1}}>
          {
            this.state.posts.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style ={{fonstSize:20}}>List Of All Posts</Text>
              </View>
            )
            :(
              <SwipeableFlatlist allNotifications={this.state.posts}/>
            )
          }
          
        </View>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center',
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
