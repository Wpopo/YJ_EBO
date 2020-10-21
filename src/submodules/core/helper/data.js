const Helper = {
  /**
   * 格式化 馬賽克
   * @param  {integer} showLen 欲顯示的尾數數量 (-1代表全部馬賽克)
   * @param  {string} [suffix=''] 當數值為有效值時，加入該後綴詞
   * @param  {string} [prefix=''] 當數值為有效值時，加入該前綴詞
   *
   * @return {string}     回傳格式化後的馬賽克字串
   */
  formatMosaic(...args) {
    let { str, showLen = 4 } = args[0] || {
      str: '-',
    };

    const { suffix = '', prefix = '' } = args[0] || {
      str: '-',
    };

    if (args.length === 1 && typeof args[0] !== 'object') {
      str = args[0];
    } else if (args.length === 2) {
      str = args[0];
      showLen = args[1];
    }
    if (!str) return;
    // 若字串長度小於等於欲顯示的尾數數量 則全部馬賽克
    if (str.length <= showLen) showLen = -1;

    if (showLen > 0 || showLen === -1) {
      if (showLen === -1) {
        str = str
          .split('')
          .map(() => '*')
          .join('');
      } else {
        str =
          str
            .substring(0, str.length - showLen)
            .split('')
            .map(() => '*')
            .join('') + str.substring(str.length - showLen, str.length);
      }
    }

    return prefix + str + suffix;
  },
  /**
   * 判斷是否為Object
   * @param {object} object
   */
  isObject(object) {
    return object != null && typeof object === 'object';
  },
  /**
   * 判斷object是否為相等 (deepEqual)
   * @param {object} object1
   * @param {object} object2
   * @param {String||Array} ignoreKey 忽略不比的Key
   */
  objectCompare(object1, object2, ignoreKey) {
    if (!object1 || !object2) return false;
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (!Array.isArray(ignoreKey)) {
        if (key === ignoreKey) continue;
      } else {
        if (ignoreKey.includes(key)) continue;
      }
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = this.isObject(val1) && this.isObject(val2);
      if (
        (areObjects && !this.objectCompare(val1, val2, ignoreKey)) ||
        (!areObjects && val1 !== val2)
      ) {
        return false;
      }
    }

    return true;
  },
};

export default Helper;
