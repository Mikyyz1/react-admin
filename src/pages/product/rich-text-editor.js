import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class RichTextEditor extends Component {
    constructor(props) {
        super(props);
        const html = this.props.detail;
        //如果是是修改商品信息，将数据回填到编辑器中
        if(html) {
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                this.state = {
                    editorState,
                };
            }
        } else {
            //如果是添加商品信息，默认生成空的文本
            this.state = {
                editorState: EditorState.createEmpty(),
            }
        }

    }
    static propTypes = {
        detail: PropTypes.string
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    getDetail = () => {
        //返回输入数据对应的html格式的文本
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }

    uploadImageCallBack = file => {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/manage/img/upload');
                xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    const url = response.data.url; //得到图片的url
                    resolve({data: {link: url}});
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    editorStyle={{border: '1px solid #ccc', minHeight: 200}}
                    toolbarStyle={{border: '1px solid #ccc'}}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                        image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                    }}
                />
            </div>
        );
    }
}

export default RichTextEditor;
