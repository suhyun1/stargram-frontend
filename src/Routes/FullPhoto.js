import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from 'react-apollo-hooks';
import { useHistory, withRouter } from "react-router-dom";
import Loader from "../Components/Loader";
import Post from "../Components/Post";

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
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 999;
`;

const ModalInner = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-around;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    border-radius: 8px;
    overflow-y: scroll;
`;


export default withRouter(({ match: { params: { postId } } }) => {
    const { data, loading } = useQuery(GET_POST, { variables: { id: postId } });
    // let history = useHistory();
    // const back = e => {
    //     e.stopPropagation();
    //     history.goBack();
    // };

    if(loading){
        return (
            <ModalWrapper>
                <Loader />
            </ModalWrapper>
        );
    } else if (!loading && data && data.seeFullPost){
        const post = data.seeFullPost;
        return (
            <ModalWrapper>
                {/* <ModalOverlay onClick={back} /> */}
                {/* <ModalInner> */}
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
                {/* </ModalInner> */}
            </ModalWrapper>
        );
    }

    return null;

});
