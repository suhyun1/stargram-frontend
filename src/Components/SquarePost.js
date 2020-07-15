import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { HeartFull, CommentFull } from "./Icons";

const Overlay = styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content:center;
    align-items:center;
    opacity: 0;
    transition: opacity 0.3s linear;
    svg{
        fill: white;
    }
`;

const Container =  styled.div`
    background-image: url(${props=> props.bg});
    background-size: cover;
    cursor: point;
    &:hover{
        ${Overlay}{
            opacity:1;
        }
    }
`;

const Number = styled.div`
    color: white;
    display: flex;
    align-items: center;
    &: first-child {
        margin-right: 30px;
    }
`;

const NumberText = styled.div`
    margin-left: 10px;
    font-size: 16px;
`;

const SquarePost = ({id, likeCount, commentCount, file}) => {

    return (
        <Container bg={file.url}>
            <Link to={{ pathname: `/post/${id}` }}>
            <Overlay>
                <Number>
                    <HeartFull />
                    <NumberText>{likeCount} </NumberText>
                </Number>
                <Number>
                    <CommentFull />
                    <NumberText>{commentCount} </NumberText>
                </Number>
            </Overlay>
            </Link>
        </Container>
    );
    

};

SquarePost.propTypes= {
    likeCount: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
    file: PropTypes.object.isRequired
}

export default SquarePost;