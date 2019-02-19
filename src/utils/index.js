/*eslint-disable*/
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

export {
  charFromUtf16,
  deepMerge,
};
