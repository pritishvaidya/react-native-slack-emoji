/* eslint-disable no-restricted-syntax */
import React from 'react';
import {
  Modal, SafeAreaView, KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';

import SearchBar from './search-bar';
import SearchContent from './search-content';

import emojiData from '../../../data/all.json';
import { deepMerge } from '../../utils';
import { uncompress } from '../../utils/data';

import style from './style';
import CategoryContent from './category-content';

const I18N = {
  search: 'Search',
  notFound: 'No Emoji Found Matching',
  categories: {
    recent: 'Frequently Used',
    people: 'People',
    nature: 'Nature',
    foods: 'Foods',
    activity: 'Activity',
    places: 'Places',
    objects: 'Objects',
    symbols: 'Symbols',
    flags: 'Flags',
    custom: 'Custom',
  },
};

class PickerModal extends React.Component {
  constructor(props) {
    super(props);
    const {
      visible, data, custom, i18n,
    } = props;

    this.recentCategory = { id: 'recent', name: 'Recent', emojis: null };
    this.customCategory = { id: 'custom', name: 'Custom', emojis: null };

    if (data.compressed) {
      uncompress(data);
    }

    this.data = data;
    this.i18n = deepMerge(I18N, i18n);

    this.categories = [];
    const allCategories = [].concat(this.data.categories);
    if (custom.length) {
      this.customCategory.emojis = custom.map(emoji => ({
        ...emoji,
        id: emoji.short_names[0],
        custom: true,
      }));
      allCategories.push(this.customCategory);
    }

    for (const category of allCategories) {
      this.categories.push(category);
    }

    this.state = {
      visible,
      searchText: null,
    };
  }

  filter = searchText => this.setState({ searchText })

  _keyExtractor = item => item;

  closeModal = () => this.setState({ visible: false })

  selectEmoji = (emoji, data) => {
    const { onSelect } = this.props;
    onSelect(emoji, data);
    this.closeModal();
  }

  render() {
    const {
      onShow,
      onClose,
      animationType,
      presentationStyle,
    } = this.props;
    const { visible, searchText } = this.state;
    const filteredEmojis = Object.keys(this.data.emojis)
      .filter(key => key.includes(searchText && searchText.toLowerCase()));
    return (
      <Modal
        visible={visible}
        onShow={onShow}
        onDismiss={onClose}
        onRequestClose={onClose}
        animationType={animationType}
        presentationStyle={presentationStyle}
        transparent={false}
      >
        <SafeAreaView style={style.container}>
          <KeyboardAvoidingView style={style.container} behavior="padding" enabled>
            <SearchBar onChangeText={this.filter} cancel={this.closeModal} />
            {searchText
              ? (
                <SearchContent
                  onSelect={this.selectEmoji}
                  emojis={filteredEmojis}
                  data={this.data}
                  i18n={this.i18n}
                  searchText={searchText}
                />
              ) : (
                <CategoryContent
                  onSelect={this.selectEmoji}
                  close={this.closeModal}
                  categories={this.categories}
                  i18n={this.i18n}
                  data={this.data}
                />
              )}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    );
  }
}

PickerModal.defaultProps = {
  data: emojiData,
  custom: [],
  i18n: {},
  set: 'apple',
  onShow: () => {},
  onClose: () => {},
  animationType: 'slide',
  presentationStyle: 'fullScreen',
};

PickerModal.propTypes = {
  visible: PropTypes.bool.isRequired,
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
  set: PropTypes.oneOf(['apple', 'google', 'twitter', 'emojione', 'messenger', 'facebook']),
  onShow: PropTypes.func,
  onClose: PropTypes.func,
  animationType: PropTypes.string,
  presentationStyle: PropTypes.string,
};

export default PickerModal;
