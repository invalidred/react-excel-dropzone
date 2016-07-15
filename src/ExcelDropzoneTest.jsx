'use strict';

import expect from 'unexpected';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import ExcelDropzone from './ExcelDropZone.js'

const shallowRenderer = TestUtils.createRenderer();

describe('Your Component Test Case', () => {

  it('should render', () => {
    shallowRenderer.render(<ExcelDropzone />);
    expect(shallowRenderer.getRenderOutput(), 'to be defined');
  });

});
