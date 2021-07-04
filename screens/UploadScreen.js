import React,{Component} from 'react';
import {Text,View,TextInput,KeyboardAvoidingView,StyleSheet,TouchableOpacity,Alert} from 'react-native';
import firebase from 'firebase';
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class UploadScreen extends React.Component{

  constructor(){
    super()
    this.state={
      userId: firebase.auth().currentUser.email,
      image: "#",
      name: "",
      docId: "",
      postName:''
    }
  }


  addRequest = async () => {
    var userId = this.state.userId;
   var postName = this.state.postName;
   var image = this.state.image
    db.collection("posts").add({
      user_id: userId,
      postName: postName,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      image_link: image,
      likes:'',
      dislikes:''
    });

    this.setState({
      postName: "",
      image: "#",
    });

    return Alert.alert("Post Added Successfully");
  };


  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.userId);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: "#" });
      });
  };

  getUserProfile() {
    db.collection("users")
      .where("email_id", "==", this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            name: doc.data().first_name + " " + doc.data().last_name,
            docId: doc.id,
            image: doc.data().image,
          });
        });
      });
  }

  componentDidMount() {
   
  }

  render(){
    return(
      <View style = {{flex:1}}>
        <MyHeader title = 'Upload'/>
        <View style={{marginTop:-800}}>
          <TextInput
            style={styles.formTextInput}
            placeholder={'Enter Post Name'}
            onChangeText={(text)=>{
              this.setState({
                postName:text
              })
            }}
            value={this.state.postName}
          />
          </View>
         <View
          style={{
            flex: 0.3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            source={{
              uri: this.state.image,
            }}
            size={"xlarge"}
            onPress={() => this.selectPicture()}
            showEditButton
          />
          </View>
          <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.addRequest();
                }}
              >
                <Text
                  style={styles.requestbuttontxt}
                >
                  Add Post
                </Text>
              </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20,
    marginLeft:50,
    marginBottom:20
    },
    requestbuttontxt:{
      fontSize: 20,
      fontWeight: "bold",
      color: "#fff",
    },
  }
)







