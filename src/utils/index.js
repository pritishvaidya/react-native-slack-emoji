/* eslint-disable*/
const charFromUtf16 = utf16 => String.fromCodePoint(...utf16.split('-').map(u => `0x${u}`));

function deepMerge(a, b) {
  const o = {};

  for (const key in a) {
    const originalValue = a[key];


    let value = originalValue;

    if (b.hasOwnProperty(key)) {
      value = b[key];
    }

    if (typeof value === 'object') {
      value = deepMerge(originalValue, value);
    }

    o[key] = value;
  }

  return o;
}

function getData(emoji, skin, set, data) {
  var emojiData = {}

  if (typeof emoji === 'string') {

    if (data.aliases.hasOwnProperty(emoji)) {
      emoji = data.aliases[emoji]
    }

    if (data.emojis.hasOwnProperty(emoji)) {
      emojiData = data.emojis[emoji]
    } else {
      return null
    }
  } else if (emoji.id) {
    if (data.aliases.hasOwnProperty(emoji.id)) {
      emoji.id = data.aliases[emoji.id]
    }

    if (data.emojis.hasOwnProperty(emoji.id)) {
      emojiData = data.emojis[emoji.id]
      skin || (skin = emoji.skin)
    }
  }

  if (!Object.keys(emojiData).length) {
    emojiData = emoji
    emojiData.custom = true

    if (!emojiData.search) {
      emojiData.search = buildSearch(emoji)
    }
  }

  emojiData.emoticons || (emojiData.emoticons = [])
  emojiData.variations || (emojiData.variations = [])

  if (emojiData.skin_variations && skin > 1 && set) {
    emojiData = JSON.parse(JSON.stringify(emojiData))

    var skinKey = SKINS[skin - 1],
      variationData = emojiData.skin_variations[skinKey]

    if (!variationData.variations && emojiData.variations) {
      delete emojiData.variations
    }

    if (
      variationData[`has_img_${set}`] == undefined ||
      variationData[`has_img_${set}`]
    ) {
      emojiData.skin_tone = skin

      for (let k in variationData) {
        let v = variationData[k]
        emojiData[k] = v
      }
    }
  }

  if (emojiData.variations && emojiData.variations.length) {
    emojiData = JSON.parse(_JSON.stringify(emojiData))
    emojiData.unified = emojiData.variations.shift()
  }

  return emojiData
}

export {
  charFromUtf16,
  deepMerge,
  getData
};
