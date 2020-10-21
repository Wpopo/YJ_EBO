import React from 'react';
import styles from './FooterButton.module.scss';
import ButtonBase from 'BaseComponent/ButtonBase';

const FooterButton = ({
  saveDisabled = false,
  onSave = v => null,
  onBack = v => null,
}) => {
  return (
    <div className={styles.footer_btn}>
      <span className={styles.buttonSave}>
        <ButtonBase
          list={[
            {
              value: '保存',
              onClick: () => {
                onSave();
              },
              disabled: saveDisabled,
            },
          ]}
          size={'lg'}
          styleType={'style-3'}
        />
      </span>
      <span className={styles.buttonSave}>
        <ButtonBase
          list={[
            {
              value: '返回列表',
              onClick: () => {
                onBack();
              },
            },
          ]}
          size={'lg'}
          styleType={'style-1'}
        />
      </span>
    </div>
  );
};

export default FooterButton;
