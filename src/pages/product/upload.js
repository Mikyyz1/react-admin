import React from 'react';
import {Upload, Icon, Modal, message} from 'antd';
import { reqDeleteImg } from '../../api';
import {BASE_IMG_URL} from "../../utils/constants";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class UploadImg extends React.Component {
    constructor(props) {
        super(props);
        const {imgs} = this.props;
        let fileList = [];
        if(imgs && imgs.length > 0) {
            fileList = imgs.map((img, index) => ({
                uid: -index,
                name: img,
                status: 'done',
                url: BASE_IMG_URL + img
            }))
        }
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList
        }
    }

    /*
    * 获取fileList中的所有name
    * */
    getImage = () => this.state.fileList.map(file => file.name);

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };
    /*
    * file: 当前操作的图片文件
    * fileList: 所有已上传的的文件数组
    * */
    handleChange = async ({file, fileList }) => {
        console.log(file.status);
        //一旦上传成功，将当前上传的file信息修正（name，url)
        if(file.status === 'done') {
            const result = file.response;
            if(result.status === 0) {
                message.success('图片上传成功!');
                const {name, url}  = result.data;
                file = fileList[fileList.length - 1]; //取出当前数组的最后一项
                file.name = name;
                file.url = url;
            } else {
                message.error('图片上传失败!');
            }
        } else if(file.status === 'removed') {
            console.log(file);
            //删除图片
            const result = await reqDeleteImg(file.name);
            if(result.status === 0) {
                message.success('图片删除成功!');
            } else {
                message.error('图片删除失败!');
            }
        }
        this.setState({ fileList })
    };

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    action="/manage/img/upload"
                    accept='image/*'
                    name='image' /*请求参数名字*/
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}
export default UploadImg;
