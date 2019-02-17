import React from 'react';
import {
  ScrollView, Text, TouchableHighlight, View,
} from 'react-native';
import PropTypes from 'prop-types';

import { charFromUtf16 } from '../../utils';

import style from './style';

function SearchContent({
  onSelect, emojis, data, i18n, searchText,
}) {
  if (!emojis.length) {
    return (
      <View style={style.emptySearchWrapper}>
        <Text style={style.emptySearchText}>{i18n.notFound}</Text>
        <Text style={[style.emptySearchText, { fontWeight: '600' }]}>{`"${searchText}"`}</Text>
      </View>
    );
  }

  return (
    <ScrollView keyboardShouldPersistTaps="always" style={{ flex: 0.8 }}>
      {emojis.map((filteredEmoji) => {
        const emoji = charFromUtf16(data.emojis[filteredEmoji].unified);
        return (
          <TouchableHighlight
            key={filteredEmoji}
            underlayColor="blue"
            onPress={() => onSelect(emoji, data.emojis[filteredEmoji])}
          >
            <View style={style.searchRow}>
              <Text style={style.searchEmoji}>{emoji}</Text>
              <Text style={style.searchEmojiText} numberOfLines={1}>
                {`:${filteredEmoji}:`}
              </Text>
            </View>
          </TouchableHighlight>
        );
      })}
    </ScrollView>
  );
}

SearchContent.propTypes = {
  onSelect: PropTypes.func.isRequired,
  emojis: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  searchText: PropTypes.string.isRequired,
};

export default SearchContent;
