import React from 'react';
import {
  View, TextInput, TouchableOpacity, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';

import style from './style';

function SearchBar({
  onChangeText, placeholder, placeholderTextColor, cancel,
}) {
  return (
    <View style={style.searchBarWrapper}>
      <Ionicons name="ios-search" style={style.searchIcon} />
      <TextInput
        autoFocus
        style={style.searchBarInput}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
      />
      <TouchableOpacity onPress={cancel}>
        <Text style={style.cancel}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

SearchBar.defaultProps = {
  placeholder: 'Search',
  placeholderTextColor: '#b7b7b7',
};

SearchBar.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  cancel: PropTypes.func.isRequired,
};

export default SearchBar;
