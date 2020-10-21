const Helper = {
  // 是否要設定，如果傳遞非數值時，固定為回傳 NaN變數
  NaN: 'NAN',
  nanCustomFlag: true,
  nanCustomResult(val, nanCustomFlag = this.nanCustomFlag) {
    return nanCustomFlag || val === undefined ? this.NaN : val;
  },

  // 判斷是不是有效數值
  isNaN(val) {
    if (Number.isNaN(parseFloat(val)) || val === '') {
      return true;
    }
    return false;
  },

  // 判斷是否為整數
  isInteger(val) {
    return this.isNaN(val) ? false : val % 1 === 0;
  },

  // 清理數值 (去掉 +,% 字元)
  clearNum: num => {
    return typeof num === 'string' ? num.replace(/[,+%]/g, '') : num;
  },

  /**
   * 格式化數值
   * @param  {int/false/string} [afterPoint=2]
   *  (int)小數點後顯示幾位數
   *  (false)不執行
   *  (string[ceil/floor]) 捨棄小數位或無條件進位
   *
   * @param  {boolean} [noTail=false] 小數後是否顯示尾數0
   * @param  {string} [suffix=''] 當數值為有效值時，加入該後綴詞
   * @param  {string} [prefix=''] 當數值為有效值時，加入該前綴詞
   * @param  {boolean} [likeComma=true] 是否顯示千分位數逗號
   * @param  {boolean} [isZeroNoTail=false] 若數值為零時，則不顯示小數後數值
   * @param  {boolean} [abs=false]  取絕對值
   * @param  {boolean} [integerNoTail=false]  若數值為整數，則不顯示小數後數值
   * @param {any} nanValue 當回傳為NaN時，特定回傳數值
   *
   * @return {string}     回傳格式化後的字串
   */
  format(...args) {
    let { num, afterPoint = 3 } = args[0] || {
      num: 'NAN',
    };

    const {
      suffix = '',
      prefix = '',
      likeComma = true,
      noTail = false,
      isZeroNoTail = false,
      abs = false,
      integerNoTail = false,
      nanValue,
    } = args[0] || { num: 'NAN' };

    if (args.length === 1 && typeof args[0] !== 'object') {
      num = args[0];
    } else if (args.length === 2) {
      num = args[0];
      afterPoint = args[1];
    }

    if (
      this.isNaN(num) ||
      (afterPoint !== false &&
        ['floor', 'ceil'].indexOf(afterPoint) === -1 &&
        this.isNaN(afterPoint))
    ) {
      return this.nanCustomResult(nanValue, false);
    }

    if (abs) num = Math.abs(num);

    num = parseFloat(num);
    switch (afterPoint) {
      case 'floor':
        num = Math.floor(num);
        break;
      case 'ceil':
        num = Math.ceil(num);
        break;
      case false:
        break;
      default: {
        let fixNum = num.toFixed(afterPoint);

        if (
          noTail ||
          (integerNoTail && this.isInteger(num)) ||
          (parseFloat(fixNum) === 0 && isZeroNoTail)
        ) {
          fixNum = parseFloat(fixNum).toString();
        }

        num = fixNum;
        break;
      }
    }

    return likeComma
      ? prefix + this.formatComma(num) + suffix
      : prefix + num + suffix;
  },

  // 格式化為千分位
  // eg. 123456 => 123,456
  formatComma(val) {
    if (isNaN(val)) return this.nanCustomResult(val);
    return val
      .toString()
      .replace(
        /(^|[^\w.])(\d{4,})/g,
        ($0, $1, $2) => $1 + $2.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      );
  },

  // 數值做安全的運算，會檢查數值並回傳特定格式字串
  // Arguments:
  // num (string/int): 初始數值
  // pairs (array): 運算組
  // ex.
  //     it will be (num + 100) * 10
  //     [
  //         ['+', 100],
  //         ['*', 10]
  //     ]
  // ex. (nested)
  //     it will be (num / ((100+10) - (5 + 5))) * 2
  //     [
  //         [
  //             '/',
  //             [
  //                 [100, '+', 10],
  //                 '-',
  //                 [ 5, '+', 5 ]
  //             ]
  //         ],
  //         ['*', 2]
  //     ]

  // afterPoint(int/false/string):
  //     (int)小數點後顯示幾位數
  //     (false)不執行
  //     (string[ceil/floor]) 捨棄小數位或無條件進位
  // likeComma (boolean): 是否要用千分位格式
  // suffix (string): 後綴字串 (ex. %)，當數值有效時，一併回傳後綴
  // clearNum: (boolean[false]): 是否要清理數值
  // nanValue: (*) : 當回傳為NaN時，特定回傳數值
  // useFormat(boolean) : 是否要格式化
  // noTail: 把小數點後尾數是0的部份去除，需與afterPoint搭配
  // abs: 是否取絕對值
  calc({
    pairs = [],
    num,
    clearNum = false,
    afterPoint = 3,
    likeComma = true,
    addSign = false,
    suffix = '',
    prefix = '',
    useFormat = true,
    nanValue = undefined,
    noTail = false,
    abs = false,
  }) {
    // 清理數值格式
    if (clearNum) {
      num = this.clearNum(num);
    }
    // 驗證參數
    if (this.isNaN(num)) {
      // JustConsole.log('init number is not a number');
      return this.nanCustomResult(nanValue, false);
    }

    if (!Array.isArray(pairs)) {
      return num;
    }

    const valid = pairs.every(pair => {
      if (Array.isArray(pair) && pair.length === 2) {
        const operator = pair[0];
        let n = pair[1];

        if (clearNum) {
          n = this.clearNum(n);
        }

        if (
          (!this.isNaN(n) || Array.isArray(n)) &&
          typeof operator === 'string' &&
          operator.length === 1 &&
          /[+\-*/]/.test(operator)
        ) {
          return true;
        }
      }

      return false;
    });

    if (!valid) {
      return this.nanCustomResult(nanValue, false);
    }

    // start calculating
    const result = pairs.reduce((prev, curr) => {
      const operator = curr[0];
      let a = curr[1];

      a = this.calcRecursive(a, clearNum, nanValue);

      if (clearNum) {
        a = this.clearNum(a);
      }

      a = parseFloat(a);

      switch (operator) {
        case '+':
          prev += a;
          break;
        case '-':
          prev -= a;
          break;
        case '*':
          prev *= a;
          break;
        case '/':
          if (a === 0) prev = this.nanCustomResult(nanValue, false);
          else prev /= a;

          break;
        default:
          console.error(`unknown operator ${operator}`);
      }

      return prev;
    }, parseFloat(num));

    if (addSign && result > 0) {
      prefix += '+';
    }

    return useFormat
      ? this.format({
          num: result,
          afterPoint,
          likeComma,
          suffix,
          prefix,
          noTail,
          abs,
        })
      : result;
  },

  calcRecursive(pairs, clearNum, nanValue) {
    if (Array.isArray(pairs)) {
      if (pairs.length !== 3) {
        console.error('Invalid paris length. Expect for 3 elements.');
        return this.nanCustomResult(nanValue, false);
      }

      const operator = pairs[1];
      let { 0: a, 2: b } = pairs;

      a = this.calcRecursive(a);
      b = this.calcRecursive(b);

      if (clearNum) {
        a = this.clearNum(a);
        b = this.clearNum(b);
      }

      if (
        this.isNaN(a) ||
        this.isNaN(b) ||
        !(
          typeof operator === 'string' &&
          operator.length === 1 &&
          /[+\-*/]/.test(operator)
        )
      ) {
        console.log('Invalid number in pairs');
        return this.nanCustomResult(nanValue, false);
      }

      a = parseFloat(a);
      b = parseFloat(b);

      let result;
      switch (operator) {
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        case '*':
          result = a * b;
          break;
        case '/':
          if (b === 0) result = this.nanCustomResult(nanValue, false);
          else result = a / b;
          break;
        default:
          console.error(`unknown operator ${operator}`);
      }

      return result;
    }

    return pairs;
  },
};

export default Helper;
