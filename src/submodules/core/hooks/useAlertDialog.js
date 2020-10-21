import { useDispatch } from 'react-redux';
import { setMessageTitle } from 'Redux/uiMBO/uiMessagePopup/action';
import { openMessage, closeMessage } from 'Redux/uiMBO/uiMessagePopup/action';
import { setContent, setParams } from 'Redux/messagePopup/action';

const useAlertDialog = () => {
  const dispatch = useDispatch();

  const alert = (title, message, config) => {
    const { cancelText = '取消', confirmText = '確認' } = config || {};
    return new Promise((resolve, reject) => {
      const buttonList = [
        {
          value: confirmText,
          disabled: false,
          onClick: () => {
            resolve();
            dispatch(closeMessage());
          },
        },
        {
          value: cancelText,
          disabled: false,
          onClick: () => {
            reject();
            dispatch(closeMessage());
          },
        },
      ];
      dispatch(setMessageTitle(title));
      dispatch(setContent(message));
      dispatch(setParams({ buttonList }));
      dispatch(openMessage());
    });
  };

  return alert;
};

export default useAlertDialog;
