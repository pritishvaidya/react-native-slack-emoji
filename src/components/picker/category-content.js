/* eslint-disable no-restricted-syntax */
import React from 'react';
import {
  FlatList, Image, Text, TouchableHighlight, View,
} from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { charFromUtf16 } from '../../utils';

import style from './style';
import { getEmoji } from '../../utils/store';

const colors = ['#fabfff', '#aee0ff', '#abe981', '#f8ef55'];

const icons = {
  recent: 'ios-timer',
  people: 'ios-happy',
  nature: 'ios-leaf',
  foods: 'ios-beaker',
  activity: 'ios-american-football',
  places: 'ios-airplane',
  objects: 'ios-bulb',
  symbols: 'ios-heart-empty',
  flags: 'ios-flag',
  custom: 'ios-code',
};

class CategoryContent extends React.Component {
  constructor(props) {
    super(props);
    this.flatListRef = React.createRef();
    this.state = {
      list: [],
      stickyHeaderIndices: [],
      randomColor: colors[0],
      activeIndex: 0,
    };
  }

  async componentDidMount() {
    let stickyIndex = 0;
    const list = [];
    const stickyHeaderIndices = [];
    const { categories, i18n } = this.props;
    const categoryKeys = Object.keys(i18n.categories);

    let recentCategory = categories.filter(({ id }) => id === 'recent')[0];
    const recentEmojis = await getEmoji();
    if (recentCategory) {
      recentCategory.emojis = recentEmojis;
    } else {
      recentCategory = { id: 'recent', name: 'Recent', emojis: recentEmojis };
    }
    categories.push(recentCategory);

    for (const value of categoryKeys) {
      const filteredValues = categories.filter(({ id }) => id === value)[0];
      const emojis = filteredValues ? filteredValues.emojis : [];
      const custom = value === 'custom';
      list.push({
        content: value, header: true, index: stickyIndex, custom,
      });
      list.push({
        content: emojis, header: false, index: stickyIndex + 1, custom,
      });
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

  onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length) {
      const { index } = viewableItems[0];
      if (index % 2 === 0) {
        this.setState({ activeIndex: index });
      }
    }
  }

  scrollCategory(id) {
    const { list } = this.state;
    const { index } = list.filter(({ content, header }) => content === id && header)[0];
    this.flatListRef.scrollToIndex({ animated: true, index });
    this.setState({ activeIndex: index });
  }

  selectEmoji(emoji, name, data) {
    const { onSelect } = this.props;
    this.randomColor();
    onSelect(emoji, name, data);
  }

  render() {
    const { data, i18n } = this.props;
    const {
      list, stickyHeaderIndices, randomColor, activeIndex,
    } = this.state;
    const categoryKeys = Object.keys(i18n.categories);
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ref={(ref) => { this.flatListRef = ref; }}
          viewabilityConfig={{
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 10,
          }}
          onScrollToIndexFailed={() => {}}
          onViewableItemsChanged={this.onViewableItemsChanged}
          keyboardShouldPersistTaps="always"
          style={{ flex: 1 }}
          stickyHeaderIndices={stickyHeaderIndices}
          data={list}
          keyExtractor={this._keyExtractor}
          renderItem={({
            item: {
              content, header, custom,
            },
          }) => {
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
                  const emoji = custom ? name.imageUrl : charFromUtf16(data.emojis[name].unified);
                  return (
                    <TouchableHighlight
                      underlayColor={randomColor}
                      onPress={() => this.selectEmoji(emoji, name, data.emojis[name])}
                      onLongPress={this.randomColor}
                      style={[style.categoryEmojiWrapper]}
                      key={emoji}
                    >
                      {custom
                        ? (
                          <Image
                            source={{ uri: emoji }}
                            style={style.categoryEmojiImage}
                          />
                        )
                        : (
                          <Text
                            style={style.categoryEmojiText}
                          >
                            {emoji}
                          </Text>
                        )}
                    </TouchableHighlight>
                  );
                })}
              </View>
            );
          }}
        />
        <View style={style.bottomPicker}>
          {categoryKeys.map((id, index) => {
            const active = index === Math.floor(activeIndex / 2);
            return (
              <TouchableHighlight
                underlayColor="#ffffff"
                onPress={() => this.scrollCategory(id)}
                style={[style.category, active && { borderTopWidth: 3, borderColor: 'green' }]}
                key={id}
              >
                <Ionicons name={icons[id]} style={[style.categoryIcon, active && { color: 'green' }]} />
              </TouchableHighlight>
            );
          })}
        </View>
      </View>
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
