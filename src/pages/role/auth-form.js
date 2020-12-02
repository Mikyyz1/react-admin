import React, {PureComponent} from 'react';
import {Form, Input, Tree} from 'antd';
import PropTypes from 'prop-types';

import menuList from '../../config/menuConfig';


const Item = Form.Item;
const {TreeNode} = Tree;

class AuthForm extends PureComponent {
    constructor(props) {
        super(props);
        const {menus} = this.props.role;
        this.state = {
            checkedKeys: menus
        }
        this.treeNodes = this.getTreeNodes(menuList);
    }

    static propTypes = {
        role: PropTypes.object
    }

    //将checkedKeys传给父组件
    getMenus = () => this.state.checkedKeys

    getTreeNodes = menuList => {
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.path} >
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            )
            return pre;
        }, [])
    }
    onCheck = checkedKeys => {
        //console.log(checkedKeys)
        this.setState({
            checkedKeys
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const menus = nextProps.role.menus;
        this.setState({
            checkedKeys: menus
        })
    }

    render() {
        const {role} = this.props;

        const {checkedKeys} = this.state;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 18}
        }
        return (
             <div className='auth-role'>
                 <Item label='角色名称' {...formItemLayout}>
                     <Input value={role.name} disabled />
                 </Item>
                 <Tree
                    checkable
                    defaultExpandAll={true}
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                 >
                     <TreeNode title='平台权限' key="all">
                        {this.treeNodes}
                     </TreeNode>
                 </Tree>
             </div>
        );
    }
}

export default AuthForm;
