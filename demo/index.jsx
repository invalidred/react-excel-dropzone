'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import ExcelDropzone from '../src/ExcelDropzone.js';

class Demo extends React.Component {

  render() {
    return (
      <div>
        <ExcelDropzone
          showSampleFile={true}
          onDropAccepted={(data) => { debugger; }}
        />
      </div>
    );
  }

}

ReactDOM.render(
  <Demo />,
  document.getElementById('demo')
);
