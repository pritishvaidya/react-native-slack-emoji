import { AsyncStorage } from 'react-native';

const DEFAULTS = [
  '+1',
  'grinning',
  'kissing_heart',
  'heart_eyes',
  'laughing',
  'stuck_out_tongue_winking_eye',
  'sweat_smile',
  'joy',
  'scream',
  'disappointed',
  'unamused',
  'weary',
  'sob',
  'sunglasses',
  'heart',
];

const KEY = 'react-native-slack-emoji/RECENT';

let items; let
  initialized;

async function init() {
  initialized = true;
  const storageItems = await AsyncStorage.getItem(KEY);
  if (!storageItems) {
    items = DEFAULTS;
    await AsyncStorage.setItem(KEY, JSON.stringify(items));
  } else {
    items = JSON.parse(storageItems);
  }
}

async function addEmoji(emoji) {
  if (!initialized) {
    await init();
  }
  const updatedArray = [...items];
  const emojiIndex = updatedArray.indexOf(emoji);
  if (emojiIndex !== -1) {
    updatedArray.push(updatedArray.splice(emojiIndex, 1)[0]);
  } else {
    updatedArray.push(emoji);
  }
  items = updatedArray;
  await AsyncStorage.setItem(KEY, JSON.stringify(updatedArray));
  return updatedArray;
}

async function getEmoji() {
  if (!initialized) {
    await init();
  }
  return items;
}

export { addEmoji, getEmoji };
