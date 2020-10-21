import bankCard from './assets/bankCard.png';
import React, { useEffect, useState } from 'react';
import styles from './BankCard.module.scss';

const BankCard = ({
  cardName,
  cardNum,
  bankName,
  bankAdd = [],
  realName,
  onDelete = v => null,
}) => {
  const [show, setShow] = useState(false);
  const handleShow = e => {
    e.stopPropagation();
    setShow(prev => !prev);
  };

  if (typeof cardNum !== 'string' || cardNum.length !== 16) return null;

  const cardNumArr = show => {
    let arr = [];
    for (let i = 0; i < cardNum.length; i = i + 4) {
      if (!show && i < 12) arr.push('****');
      else arr.push(cardNum.substring(i, i + 4));
    }
    return arr;
  };

  return (
    <div className={styles.bankCard}>
      <img src={bankCard} alt="bankCard" />
      <div className={styles.iconRound} onClick={handleShow} />
      <i
        className={`${show ? `las la-low-vision` : `las la-eye`} la-lg ${
          styles.icon
        }`}
        onClick={handleShow}
      />
      {!show && (
        <div className={styles.hide}>
          <div className={styles.cardName}>{cardName}</div>
          <div className={styles.cardNum}>
            {cardNumArr(false).map((sub, idx) => (
              <span className={styles.num} key={idx}>
                {sub}
              </span>
            ))}
          </div>
          <div className={styles.bankName}>
            <span className={styles.text}>开户银行</span>
            {bankName}
          </div>
        </div>
      )}
      {show && (
        <div className={styles.show}>
          <div className={styles.row14}>{cardName}</div>
          <div className={styles.row}>
            <span className={styles.text12}>开户银行</span>
            <span className={styles.boldText12}>{bankName}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.text12}>银行地址</span>
            {bankAdd.map((sub, idx) => (
              <span className={styles.sub} key={'add' + idx}>
                <span className={styles.boldText12}>{sub}</span>
              </span>
            ))}
          </div>
          <div className={styles.row}>
            <span className={styles.text12}>真实姓名</span>
            <span className={styles.boldText12}>{realName}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.text12}>卡片号码</span>
            <span className={styles.boldText12}>
              {cardNumArr(true).map((sub, idx) => (
                <span className={styles.subText} key={idx}>
                  {sub}
                </span>
              ))}
            </span>
          </div>
          <div className={styles.iconRoundDel} onClick={onDelete}></div>
          <i
            className={`las la-trash-alt la-lg ${styles.delete}`}
            onClick={onDelete}
          />
        </div>
      )}
    </div>
  );
};

export default BankCard;
