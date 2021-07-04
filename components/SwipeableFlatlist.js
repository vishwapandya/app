import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View
} from "react-native";
import { ListItem, Icon } from "react-native-elements";

import { SwipeListView } from "react-native-swipe-list-view";
import firebase from "firebase";

import db from "../config";

export default class SwipeableFlatlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
        likeCount:'',
        dislikeCount:"",
        allNotifications: this.props.allNotifications
    };
  }

  updateLikeCount = notification => {
    db.collection("posts")
    .doc(notification.doc_id)
    .update({
      likes: firebase.firestore.FieldValue.increment(1)
    });
  };

  updateDislikeCount = notification => {
    db.collection("posts")
    .doc(notification.doc_id)
    .update({
      dislikes: 1
    });
  };

  onSwipeValueChangeOfLikes = swipeData => {
    var allNotifications = this.state.allNotifications;
    const { key, value } = swipeData;
    if (value < -Dimensions.get("window").width) {
      const newData = [...allNotifications];
      this.updateLikeCount(allNotifications[key]);
      newData.splice(key, 1);
      this.setState({ allNotifications: newData });
    }
  };

  onSwipeValueChangeOfDislikes = swipeData => {
    var allNotifications = this.state.allNotifications;
    const { key, value } = swipeData;
    if (value > -Dimensions.get("window").width) {
      const newData = [...allNotifications];
      this.updateDislikeCount(allNotifications[key]);
      newData.splice(key, 1);
      this.setState({ allNotifications: newData });
    }
  };

  renderItem = data => (
    <Animated.View>
      <ListItem
        rightElement={<Image
            style={{ height: 150, width: 150 }}
            source={{
              uri: data.item.image_link,
            }}
          />}
        title={data.item.postName}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        bottomDivider
      />
    </Animated.View>
  );

  renderHiddenItemForLikes = () => (
    <View style={styles.rowBack}>
      <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Text style={styles.backTextWhite}>Like :)</Text>
      </View>
    </View>
  );

  renderHiddenItemForDislikes = () => (
    <View style={styles.rowBack}>
      <View style={[styles.backLeftBtn, styles.backLeftBtnLeft]}>
        <Text style={styles.backTextWhite}>Dislike :(</Text>
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <SwipeListView
          disableRightSwipe
          data={this.state.allNotifications}
          renderItem={this.renderItem}
          renderHiddenItem={this.renderHiddenItemForLikes}
          rightOpenValue={-Dimensions.get("window").width}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onSwipeValueChange={this.onSwipeValueChangeOfLikes}
          keyExtractor={(item, index) => index.toString()}
        />
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  backTextWhite: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    alignSelf: "flex-start"
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#29b6f6",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 100
  },
  backRightBtnRight: {
    backgroundColor: "#29b6f6",
    right: 0
  },
  backLeftBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 100
  },
  backLeftBtnLeft: {
    backgroundColor: "#29b6f6",
    left: 0
  }
});
