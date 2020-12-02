/*
 * @Author: 叶有志 
 * @Date: 2019-10-11 23:17:42 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-12-04 23:32:46
 */

import React, { PureComponent } from 'react';
import {Card, Form, Input, Cascader, Button, Icon, message} from 'antd';

import LinkButton from "../../components/link-button";
import UploadImg from "./upload";
import RichTextEditor from './rich-text-editor';
import { reqCategorys, reqAddOrUpdateProduct } from '../../api';

const { Item } = Form;
const { TextArea } = Input;



class ProductAddUpdate extends PureComponent {

    constructor(props) {
         super(props);
         this.editor = React.createRef();
         this.addImg = React.createRef();
         //取出携带的state
         const product = this.props.location.state;
         //保存一个是否是更新的标识
         this.isUpdate = !!product;
         //保存商品，没有值则为{}
         this.product = product || {};
    }
    state = {
        options: [],
        detail: ''
    }

    validatePrice = (rule, value, callback) => {
        if(value * 1 > 0) {
            callback();
        } else {
            callback('数值必须大于0');
        }
    }
    submit = () => {
        this.props.form.validateFields(async (errors, values) => {
            if(!errors){
                //手机数据并封装成product对象
                const { name, desc, price, categoryIds } = values;
                let pCategoryId, categoryId;
                if(categoryIds.length === 1) {
                    pCategoryId = '0';
                    categoryId = categoryIds[0];
                } else {
                    pCategoryId = categoryIds[0];
                    categoryId = categoryIds[1];
                }

                const imgs = this.addImg.current.getImage();
                const detail = this.editor.current.getDetail();

                const product = {name, desc, price, imgs, detail, pCategoryId, categoryId};

                //如果是更新，还需要添加_id;
                if(this.isUpdate) {
                    product._id = this.product._id;
                }

                //调用接口请求函数去添加/更新
                const result = await reqAddOrUpdateProduct(product);

                //根据结果提示
                if(result.status === 0) {
                    message.success(`${this.isUpdate ? '更新' : '添加'} 商品成功`);
                    this.props.history.goBack();
                } else {
                    message.success(`${this.isUpdate ? '更新' : '添加'} 商品失败`);
                }
            }
        });


    }

    getCategorys = async (parentId) => {
        const result = await reqCategorys(parentId);
        console.log(result);
        if(result.status === 0) {
            const categorys = result.data;
            if(parentId === '0') {   //如果当前是0，则请求一级分类列表
                this.initOptions(categorys);
            } else {
                return categorys;  //返回二级分类列表
            }
        }
    }

    initOptions = async categorys => {
        const options = categorys.map(item => ({
            value: item._id,
            label: item.name,
            isLeaf: false,
        }));

        //如果是一个二级分类商品的更新
        const { isUpdate, product } = this;
        const { pCategoryId } = product;
        if(isUpdate && pCategoryId !== '0') {
            //获取对应的二级分类列表
            const subCategorys = await this.getCategorys(pCategoryId);

            //获取到二级分类列表后生成二级分类下拉列表
            const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }));
            //找到当前商品对应的一级option对象
            const targetOption = options.find(option => option.value === pCategoryId);

            targetOption.children = childOptions;
        }

        this.setState({
            options
        })
    }
    loadData = async selectedOptions => {
        const targetOption = selectedOptions[0];
        targetOption.loading = true;

        //根据选中的分类，请求获取二级分类列表
        const subCategorys = await this.getCategorys(targetOption.value);
        targetOption.loading = false;
        //如果存在二级分类
        if(subCategorys && subCategorys.length > 0) {
            const childOptions = subCategorys.map(item => ({
                value: item._id,
                label: item.name,
                isLeaf: true,
            }));
            targetOption.children = childOptions;
        } else {
            targetOption.isLeaf = true;
        }

        //更新options状态
        this.setState({
            options: [...this.state.options]
        })
    };

    componentDidMount() {
        this.getCategorys('0');
    }

    render () {
        const { getFieldDecorator } = this.props.form;
        const { options, detail } = this.state;
        const { isUpdate, product } = this;
        const { pCategoryId, categoryId, imgs } = product;

        //用来接收级联分类ID的数组
        const categoryIds = [];
        if(pCategoryId === '0') {
           categoryIds.push(categoryId);
        } else {
           categoryIds.push(pCategoryId);
           categoryIds.push(categoryId);
        }
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type='arrow-left' style={{fontSize: 18}} />
                </LinkButton>
                <span>{isUpdate ? '更新商品' : '添加商品'}</span>
            </span>
        )
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
        };

        return (
            <Card title={title}>
                <Form>
                    <Item {...formItemLayout} label="商品名称">
                        {getFieldDecorator('name', {
                            initialValue: product.name,
                            rules: [
                                {required: true, message: '必须输入商品名称'},
                            ]
                        })(<Input placeholder='请输入商品名称'/>)}
                    </Item>
                    <Item {...formItemLayout} label='商品描述'>
                        {getFieldDecorator('desc', {
                            initialValue: product.desc,
                            rules: [
                                {required: true, message: '必须输入商品描述'},
                            ]
                        })(<TextArea placeholder="请输入商品描述" autosize={{minRows: 2, maxRows: 6}} />)}
                    </Item>
                    <Item {...formItemLayout} label="商品价格">
                        {getFieldDecorator('price', {
                            initialValue: product.price,
                            rules: [
                                {required: true, message: '必须输入商品价格'},
                                {validator: this.validatePrice}
                            ]
                        })(<Input type='number' placeholder='请输入商品价格' addonAfter='元'/>)}
                    </Item>
                    <Item {...formItemLayout} label="商品分类">
                        {getFieldDecorator('categoryIds', {
                            initialValue: categoryIds,
                            rules: [
                                {required: true, message: '请选择商品分类'}
                            ]
                        })(<Cascader
                            options={options}
                            loadData={this.loadData}
                            placeholder='请选择分类'
                        />)}
                    </Item>
                    <Item {...formItemLayout} label="商品图片">
                        <UploadImg ref={this.addImg} imgs={imgs} />
                    </Item>
                    <Item {...formItemLayout} label="商品详情" labelCol={{span: 2}} wrapperCol={{span: 20} } >
                        <RichTextEditor ref={this.editor} datail={detail} />
                    </Item>
                    <Item style={{marginLeft: 25}}>
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(ProductAddUpdate);
