/* eslint-disable no-restricted-syntax */
import React from 'react';
import {
  FlatList, TouchableHighlight, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';

import { charFromUtf16 } from '../../utils';

import style from './style';

const colors = ['#fabfff', '#aee0ff', '#abe981', '#f8ef55'];

class CategoryContent extends React.Component {
  state = {
    list: [],
    stickyHeaderIndices: [],
    randomColor: colors[0],
  }

  componentDidMount() {
    let stickyIndex = 0;
    const list = [];
    const stickyHeaderIndices = [];
    const { categories, i18n } = this.props;
    const categoryKeys = Object.keys(i18n.categories);
    for (const [index, value] of categoryKeys.entries()) {
      const filteredValues = categories.filter(({ id }) => id === value)[0];
      const emojis = filteredValues ? filteredValues.emojis : [];
      list.push({ content: value, header: true, index });
      list.push({ content: emojis, header: false, index: index + 1 });
      stickyHeaderIndices.push(stickyIndex);

      stickyIndex += 2;
    }
    this.setState({ list, stickyHeaderIndices });
  }

  _keyExtractor = (item, index) => `${item.index} + ${index}`;

  randomColor = () => {
    const index = Math.floor(colors.length * Math.random());
    this.setState({ randomColor: colors[index] });
  }

  selectEmoji(emoji, data) {
    const { onSelect } = this.props;
    this.randomColor();
    onSelect(emoji, data);
  }

  render() {
    const { data, i18n } = this.props;
    const { list, stickyHeaderIndices, randomColor } = this.state;
    return (
      <FlatList
        keyboardShouldPersistTaps="always"
        style={{ flex: 0.8 }}
        stickyHeaderIndices={stickyHeaderIndices}
        data={list}
        keyExtractor={this._keyExtractor}
        renderItem={({ item: { content, header } }) => {
          if (header) {
            return (
              <View style={style.categoryHeader}>
                <Text style={style.categoryHeaderText}>{i18n.categories[content]}</Text>
              </View>
            );
          }
          return (
            <View style={style.categoryContent}>
              {content.map((name) => {
                const emoji = charFromUtf16(data.emojis[name].unified);
                return (
                  <TouchableHighlight
                    underlayColor={randomColor}
                    onPress={() => this.selectEmoji(emoji, data.emojis[name])}
                    onLongPress={this.randomColor}
                    style={style.categoryEmojiWrapper}
                    key={emoji}
                  >
                    <Text style={style.categoryEmojiText}>{emoji}</Text>
                  </TouchableHighlight>
                );
              })}
            </View>
          );
        }}
      />
    );
  }
}

CategoryContent.propTypes = {
  onSelect: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  i18n: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default CategoryContent;
