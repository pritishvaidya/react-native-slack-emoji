import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
  },
  searchBarWrapper: {
    flex: 0.1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    fontSize: 20,
    color: '#888888',
  },
  searchBarInput: {
    fontSize: 14,
    flex: 1,
  },
  cancel: {
    paddingHorizontal: 5,
    fontSize: 16,
    color: '#5f5f5f',
  },
  categoryWrapper: {
    flex: 0.8,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#b7b7b7',
  },
  emojiWrapper: {
    flexWrap: 'wrap',
  },
  searchRow: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderBottomWidth: 0.3,
    borderBottomColor: '#b7b7b7',
  },
  searchEmoji: {
    paddingRight: 10,
    fontSize: 14,
  },
  searchEmojiText: {
    fontSize: 14,
    color: '#939393',
    fontWeight: '600',
    paddingRight: 25,
  },
  emptySearchWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  emptySearchText: {
    fontSize: 16,
    color: '#b7b7b7',
  },
  categoryHeader: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  categoryHeaderText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#939393',
  },
  categoryContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryEmojiWrapper: {
    borderRadius: 10,
  },
  categoryEmojiText: {
    marginHorizontal: 6,
    marginVertical: 5,
    fontSize: 30,
  },
  categoryEmojiImage: {
    marginHorizontal: 6,
    marginVertical: 5,
    resizeMode: 'contain',
    height: 30,
    width: 30,
  },
  bottomPicker: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 0.05,
    borderTopColor: '#b7b7b7',
  },
  category: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 10,
  },
  categoryIcon: {
    fontSize: 30,
    color: '#888888',
  },
});
