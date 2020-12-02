/*
 * @Author: 叶有志 
 * @Date: 2019-10-06 00:54:32 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-10-06 00:56:47
 */

import React from 'react';
import './index.less';

export default function LinkButton(props) {
    return <button className="link-button" {...props}>{props.children}</button>
}
