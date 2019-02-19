/* eslint-disable import/no-unresolved */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Image,
} from 'react-native';

import { Picker } from 'react-native-slack-emoji';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    paddingTop: 70,
  },
  profileWrapper: {
    flex: 1,
  },
  image: {
    height: 40,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
    marginBottom: 5,
  },
  text: {
    fontSize: 15,
    color: '#888888',
    marginBottom: 10,
  },
});


export default class App extends Component {
  state = {
    emojiList: [],
  }

  onSelect = (emoji, emojiName, data) => {
    const { emojiList } = this.state;
    const newList = [...emojiList];
    const objIndex = newList.findIndex(e => e.name === emojiName);
    if (objIndex === -1) {
      newList.push({
        emoji, name: emojiName, data, index: 1,
      });
    } else {
      newList[objIndex].index += 1;
    }
    this.setState({ emojiList: newList });
  }

  updateEmoji = (emoji, name) => {
    const { emojiList } = this.state;
    const newList = [...emojiList];
    const objIndex = newList.findIndex(e => e.name === name);
    newList[objIndex].index += 1;
    this.setState({ emojiList: newList });
  }

  render() {
    const { emojiList } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 0.2 }}>
            <Image source={{ uri: 'https://pritishvaidya.com/static/243ca309ea5cb3e20eb3c45bad183714/8cd81/favicon.png' }} style={styles.image} />
          </View>
          <View style={{ flex: 0.8 }}>
            <Text style={styles.name}>Pritish Vaidya</Text>
            <Text style={styles.text}>
                We shall go on to the end. We shall fight in France,
                we shall fight on the seas and oceans, we shall fight with growing confidence
                and growing strength in the air, we shall defend our island, whatever
                the cost may be.
              {'\n'}
              {'\n'}

                We shall fight on the beaches, we shall fight
                on the landing grounds, we shall fight in the fields and in the streets,
                we shall fight in the hills; we shall never surrender
            </Text>
            <Picker
              emojiList={emojiList}
              updateEmoji={this.updateEmoji}
              onSelect={this.onSelect}
            />
          </View>
        </View>
      </View>
    );
  }
}
