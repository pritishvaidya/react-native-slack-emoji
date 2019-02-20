# react-native-slack-emoji [![Build Status](https://travis-ci.com/pritishvaidya/react-native-slack-emoji.svg?branch=master)](https://travis-ci.com/pritishvaidya/react-native-slack-emoji) [![CodeFactor](https://www.codefactor.io/repository/github/pritishvaidya/react-native-slack-emoji/badge)](https://www.codefactor.io/repository/github/pritishvaidya/react-native-slack-emoji) [![Maintainability](https://api.codeclimate.com/v1/badges/4b0fce605acaf1141431/maintainability)](https://codeclimate.com/github/pritishvaidya/react-native-slack-emoji/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/4b0fce605acaf1141431/test_coverage)](https://codeclimate.com/github/pritishvaidya/react-native-slack-emoji/test_coverage) [![npm version](https://badge.fury.io/js/react-native-slack-emoji.svg)](https://badge.fury.io/js/react-native-slack-emoji) [![npm downloads](https://img.shields.io/npm/dt/react-native-slack-emoji.svg)](https://npm-stat.com/charts.html?package=react-native-slack-emoji&from=2018-02-17&to=2018-12-28) <a href="https://github.com/pritishvaidya/react-native-slack-emoji/blob/master/README.md"><img src="https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20esm-green.svg" alt="module formats: umd, cjs, esm"></a>
> An implementation of Slack like Emoji components in React Native

## Show Cases
IOS            |  Android
:-------------------------:|:-------------------------:
![IOS](https://media.giphy.com/media/1n6exPh4zE2ylApACF/giphy.gif)  |  ![Android](https://media.giphy.com/media/YlkQZBNANgBaPxyodO/giphy.gif)

## Getting Started

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Properties](#properties)
- [Defaults](#defaults)
- [Contribution](#contribution)
- [Questions](#questions)

### Installation

```bash
$ npm i react-native-slack-emoji --save
```

### Basic Usage
#### Picker
```
import React, { Component } from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image,
} from 'react-native';

import { Picker, PickerModal } from 'react-native-slack-emoji';

export default class App extends Component {
  state = {
    emojiList: [],
  }

  onSelect = (emoji, emojiName, data) => {}

  updateEmoji = (emoji, name) => {}

  render() {
    const { emojiList } = this.state;
    return (
      <View style={styles.container}>
        <Picker
          emojiList={emojiList}
          updateEmoji={this.updateEmoji}
          onSelect={this.onSelect}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    paddingTop: 70,
  },
});
```

### Properties
#### Picker Props
| Prop  | Default  | Type | Description |
| :------------ |---------------:| :---------------| :-----|
| emojiList | [required](#emojiList) | array | Emojis Array for display |
| updateEmoji | required | func | Update Emoji Function |
| {...pickerModalProps} | {...} | object | Picker Modal Props |

#### Picker Modal Props
| Prop  | Default  | Type | Description |
| :------------ |---------------:| :---------------| :-----|
| visible | required | bool | Open Picker Modal |
| onSelect | required | func | Select Emoji Function |
| close | required | func | Callback on close Picker Modal |
| data | [emojiData](#defaults) | object | Emoji Data |
| i18n | [`{…}`](#i18n) | object | An object containing localized strings |
| onShow | () => {} | func | Callback on show Picker Modal |
| animationType | `slide` | string | Picker Modal animation type |
| presentationStyle | `fullScreen` | string | Picker Modal presentation style |

#### I18n
```js
search: 'Search',
notFound: 'No Emoji Found',
categories: {
  search: 'Search Results',
  recent: 'Frequently Used',
  people: 'Smileys & People',
  nature: 'Animals & Nature',
  foods: 'Food & Drink',
  activity: 'Activity',
  places: 'Travel & Places',
  objects: 'Objects',
  symbols: 'Symbols',
  flags: 'Flags',
  custom: 'Custom',
}
```

## Todos
- Support for Custom Emojis
- Support for all Emoji Sets
- Full Coverage of Tests

## Contribution

- [@pritishvaidya](mailto:pritishvaidya94@gmail.com) The main author.

## Questions

Feel free to [contact me](mailto:pritishvaidya94@gmail.com) or [create an issue](https://github.com/pritishvaidya/react-native-slack-emoji/issues/new)
