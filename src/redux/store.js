/*
 * @Author: 叶有志 
 * @Date: 2019-12-04 20:38:34 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-12-04 20:48:19
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducer';

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));