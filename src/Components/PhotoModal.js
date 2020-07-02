import React from 'react';
import { gql } from "apollo-boost";
import { useQuery } from 'react-apollo-hooks';
import styled from "styled-components";
import PropTypes from 'prop-types'
import Post from "./Post";
import Loader from './Loader';

const GET_POST = gql`
    query seeFullPost($id: String!){
        seeFullPost(id:$id){
            id
            user{
                id
                username
                avatar
            }
            files{
                id
                url
            }
            comments{
                id
                user{
                    id
                    username
                }
                text
            }
            caption
            commentCount
            likeCount
            isLiked
            createdAt
        }
    }
`;

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-around;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
  padding-top: 10%;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;


const Modal = ({ 
    onClose,
    visible,
    maskClosable,
    id
}) => {
    const { data, loading } = useQuery(GET_POST, { variables: {id} });

    const onMaskClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose(e);
        }
    };
    
    if (loading === true) {
        return (
            <>
                <ModalOverlay visible={visible} />
                <ModalWrapper tabIndex="-1" visible={visible}>
                    <Loader />
                </ModalWrapper>
            </>
            
        );
    }
    else if (!loading && data && data.seeFullPost) {
        const post = data.seeFullPost;

        return (
            <>
                <ModalOverlay visible={visible} />
                <ModalWrapper
                    onClick={maskClosable ? onMaskClick : null}
                    tabIndex="-1"
                    visible={visible}
                >
                    <Post
                        key={post.id}
                        id={post.id}
                        location={post.location}
                        caption={post.caption}
                        user={post.user}
                        files={post.files}
                        likeCount={post.likeCount}
                        isLiked={post.isLiked}
                        comments={post.comments}
                        createdAt={post.createdAt}
                    />
                </ModalWrapper>

            </>
        );

    }
    return null;

    
};

Modal.propTypes = {
    visible: PropTypes.bool,
}

Modal.defaultProps = {
    visible: false,
    maskClosable: true,
}

export default Modal;