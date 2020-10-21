import React from 'react';
import { notify } from 'Layout/Notification';
import ButtonBase from 'BaseComponent/ButtonBase';

const Demo = ({ styleDemo = 'style-1' }) => {
  return (
    <div>
      {(() => {
        switch (styleDemo) {
          case 'style-1':
            return (
              <ButtonBase
                size="xl"
                list={[
                  {
                    value: 'openMessage',
                    onClick: () => {
                      notify({ type: 'error', title: '标题x', text: '内文x' });
                      notify({ title: '标题o', text: '内文o' });
                      notify();
                    },
                  },
                ]}
              />
            );
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default Demo;
