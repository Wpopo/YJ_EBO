import React, { useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import { makeStyles } from '@material-ui/core/styles';

import CKEditor from 'Layout/CKEditor';
import htmlFormat from 'Layout/CKEditor/htmlFormat/htmlFormat';

export default {
  title: 'INP-EBO | 統一版型組件/CKEditor5',
};

const useStyles = makeStyles(theme => ({
  wrap: {
    display: 'flex',
    height: '500px',
  },
  ckeditor: {
    width: '50%',
  },
}));

/**
 * @param {Function} handleChange 控制 onChange 事件
 * @param {Function} handleClick 控制文本 Submit 事件
 * @param {Function} handleError 控制文本檔案 > 3MB 時的事件
 *
 */

export const ckeditor5 = () => {
  const classes = useStyles();
  const editorRef = useRef(null);
  const [result, setResult] = useState();
  const [err, setErr] = useState();

  const [ckeditorOpen, setCkeditorOpen] = useImmer({
    open: true,
  });
  const [ckeditorData, setCkeditorData] = useImmer({
    text: '',
  });

  const createMarkup = () => ({
    __html: htmlFormat(ckeditorData.text),
  });
  const MyComponent = () => (
    <div
      className={classes.ckeditor}
      dangerouslySetInnerHTML={createMarkup()}
    />
  );

  return (
    <>
      <button
        onClick={() =>
          setCkeditorOpen(draft => {
            draft.open = !draft.open;
          })
        }
      >
        Toggle
      </button>
      <button
        onClick={() => {
          let EditorFile;
          let err;
          try {
            EditorFile = editorRef.current.handleSendFile();
            setResult(JSON.stringify(EditorFile));
          } catch (e) {
            setErr(e);
          }
        }}
      >
        Submit
      </button>
      <div className={classes.wrap}>
        <div className={classes.ckeditor}>
          {ckeditorOpen.open ? (
            <CKEditor
              handleChange={v => {
                setCkeditorData(draft => {
                  draft.text = v;
                });
              }}
              handleError={v => console.log(v)}
              ref={editorRef}
            />
          ) : null}
        </div>
        <MyComponent />
      </div>
      <h1>Submit Result</h1>
      <h2> {err}</h2>
      {result}
    </>
  );
};
