import React from 'react';
import PropTypes from 'prop-types';
import {
  View, TouchableHighlight, Text,
} from 'react-native';
import EntypoIcons from 'react-native-vector-icons/Entypo';

import PickerModal from './picker-modal';

import style from './style';

class Picker extends React.Component {
  state = {
    visible: false,
  }

  closeModal = () => this.setState({ visible: false })

  openModal = () => this.setState({ visible: true })

  render() {
    const { visible } = this.state;
    const {
      emojiList,
      updateEmoji,
      onSelect,
      data,
      custom,
      i18n,
      onShow,
      onClose,
      animationType,
      presentationStyle,
    } = this.props;
    return (
      <React.Fragment>
        <View style={style.wrapper}>
          {emojiList.map(({ emoji, name, index }) => (
            <TouchableHighlight
              underlayColor="#ffffff"
              onPress={() => updateEmoji(emoji, name, index)}
              key={name}
            >
              <View style={[style.picker, style.emojiPicker]}>
                <Text style={style.emoji}>{`${emoji} ${index}`}</Text>
              </View>
            </TouchableHighlight>
          ))}
          <TouchableHighlight
            underlayColor="#ffffff"
            onPress={this.openModal}
          >
            <View style={style.picker}>
              <EntypoIcons name="emoji-happy" style={style.pickerIcon} />
            </View>
          </TouchableHighlight>
        </View>
        <PickerModal
          onSelect={onSelect}
          close={this.closeModal}
          visible={visible}
          data={data}
          custom={custom}
          i18n={i18n}
          onShow={onShow}
          onDismiss={onClose}
          onRequestClose={onClose}
          animationType={animationType}
          presentationStyle={presentationStyle}
          transparent={false}
        />
      </React.Fragment>
    );
  }
}

Picker.defaultProps = {
  custom: [{
    name: 'Octocat',
    short_names: ['octocat'],
    text: '',
    emoticons: [],
    keywords: ['github'],
    imageUrl: 'https://octodex.github.com/images/Sentrytocat_octodex.jpg',
  }],
  i18n: {},
  // set: 'native',
  onShow: () => {},
  onClose: () => {},
  animationType: 'slide',
  presentationStyle: 'fullScreen',
};

Picker.propTypes = {
  emojiList: PropTypes.array.isRequired,
  updateEmoji: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  data: PropTypes.object,
  custom: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      short_names: PropTypes.arrayOf(PropTypes.string).isRequired,
      emoticons: PropTypes.arrayOf(PropTypes.string),
      keywords: PropTypes.arrayOf(PropTypes.string),
      imageUrl: PropTypes.string.isRequired,
    }),
  ),
  i18n: PropTypes.object,
  // set: PropTypes.oneOf(
  // ['native', 'apple', 'google', 'twitter', 'emojione', 'messenger', 'facebook']
  // ),
  onShow: PropTypes.func,
  onClose: PropTypes.func,
  animationType: PropTypes.string,
  presentationStyle: PropTypes.string,
};

export default Picker;
