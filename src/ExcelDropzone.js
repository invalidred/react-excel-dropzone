import React, { PropTypes, Component } from 'react';
import Dropzone from 'react-dropzone';

import '../node_modules/xlsx/dist/xlsx.core.min.js';

class ExcelDropzone extends Component {
  static propTypes = {
    dragAndDropText: PropTypes.string,
    onDropFile: PropTypes.func,
    showSampleFile: PropTypes.bool,
    sampleFileUrl: PropTypes.string,
    sampleFileAnchorText: PropTypes.string,
    sampleFileOtherText: PropTypes.string,
    onDropRejected: PropTypes.func,
    sampleFileAnchorClass: PropTypes.string
  }

  static defaultProps = {
    dragAndDropText: 'Drag and Drop Excel File To Continue',
    showSampleFile: false,
    sampleFileUrl: '',
    sampleFileAnchorText: 'Click Here',
    sampleFileOtherText: 'to download the file',
    sampleFileText: '',
    onDropRejected: () => {},
    onDropFile: this.onDropFile
  }

  constructor() {
    super();
    this.accept = [
      '.csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ].join(',');
  }

  toJSON(workbook = {}) {
    let result = {};
    workbook.SheetNames.forEach(sheetName => {
      const rowObjectArray = window.XLSX
        .utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
      if (rowObjectArray.length > 0) {
        result[sheetName] = rowObjectArray;
      }
    });
    debugger;
    return result;
  }

  parseData = (files) => {
    return new Promise((resolve, reject) => {
      const [file] = files;
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbookRaw = window.XLSX.read(data, { type: 'binary' });
        const result = this.toJSON(workbookRaw);
        resolve({ result, workbookRaw });
      };
      reader.readAsBinaryString(file);
    });
  }

  onDropFile = (files) => {
    debugger;
    this.parseData(files)
      .then(this.props.onDropAccepted);
  }

  render() {
    return (
      <div className="upload-form-container">
        <h1>HI HOW ARE YOU</h1>
        <Dropzone
          {...this.props}
          onDropAccepted={this.onDropFile}
          accept={this.accept}
        >
          <div className="upload-form-content">
              {this.props.dragAndDropText}
          </div>
        </Dropzone>
        {
          this.props.showSampleFile ?
          <div className={this.props.sampleFileWrapperClass}>
            <a href={this.props.sampleFileUrl}
              className={this.props.sampleFileAnchorClass}
            >
              {this.props.sampleFileAnchorText}
            </a>
            {this.props.sampleFileOtherText}
          </div>
          : null
        }
      </div>
    );
  }
}

export default ExcelDropzone;
