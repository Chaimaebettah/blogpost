import React, {Component} from 'react';
import {Card, Col, Icon} from 'antd';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {classes} from './helpers';


class PostCard extends Component {

    //
    // deleteMyPost = () => {
    //     Object.keys(this.props.post).filter((myId) =>{
    //         console.log('khraaaaaa dial bessah'+myId);
    //         return myId
    //     })
    // }



    render() {
        const postId = this.props.id;
        return (
            <Col span={8} className={classes('category', this.props.className)}>

                <Card style={{width: 240}} bodyStyle={{padding: 0}}>
                    <Link to={`/post/${postId}`}>

                        <div className="custom-image">
                            <div className="close-icon">
                                <Link to="/addPost"><Icon type="edit"/></Link>

                                <Icon type="close"/>
                            </div>

                            <img alt="example" width="100%"
                                 src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>
                        </div>
                        <div className="custom-card">
                            <h1>{this.props.title}</h1>
                            <p>{this.props.body}</p>
                        </div>
                    </Link>
                    <div className="post-details">
                        <p>Category: {this.props.category}</p>
                        <p>author: {this.props.author}</p>
                    </div>
                </Card>

            </Col>
        )
    }
}

export default styled(PostCard)`
     background: '#ECECEC'; 
     padding: '100px';
     
     .custom-image{
        position: relative;
     }
     
    .custom-image img {
        display: block;
    }
    
    .custom-card {
        padding: 20px 16px;
    }
    
    .custom-card p {
        color: #999;
    }
     
    .close-icon {
        position: absolute;
        right: 2px;
        top: 2px;
        color: rgba(212, 212, 222, 0.98);
        font-size: 21px;
    }
`;