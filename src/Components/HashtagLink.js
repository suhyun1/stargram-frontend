import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
`;

const LinkText = styled.span`
  color: ${(props) => props.theme.blueColor};
`;

const HashtagLink = ({text}) => (
    <Wrapper>
        {text.split(/(#[^\s]+)/g).map((v, i)=>{
            return v.match(/#[^\s]+/) ? (
              <Link to={`/tags/${v.slice(1)}`} key={i}>
                <LinkText>{v}</LinkText>
              </Link>
            ) : (
              v
            );
        })}
    </Wrapper>
);

HashtagLink.propTypes = {
  text: PropTypes.string.isRequired,
};

export default HashtagLink;