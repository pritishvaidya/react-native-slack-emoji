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

const MAX_RECENT_LENGTH = 15;

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
    updatedArray.unshift(updatedArray.splice(emojiIndex, 1)[0]);
  } else {
    updatedArray.unshift(emoji);
  }
  items = updatedArray.slice(0, MAX_RECENT_LENGTH);
  await AsyncStorage.setItem(KEY, JSON.stringify(items));
  return items;
}

async function getEmoji() {
  if (!initialized) {
    await init();
  }
  return items;
}

export { addEmoji, getEmoji };
