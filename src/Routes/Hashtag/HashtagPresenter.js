import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Loader";
import SquarePost from "../../Components/SquarePost";
import FatText from "../../Components/FatText";
import Avatar from "../../Components/Avatar";
import { Logo } from "../../Components/Icons";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const HeaderColumn = styled.div`
  width: 100%;
`;

const TagNameRow = styled.div`
  display: flex;
  align-items: center;
`;

const TagName = styled.span`
  font-size: 26px;
  display: block;
  margin-right: 20px;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 280px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

export default ({ loading, data, tag }) => {

    if (loading === true) {
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    } else if (!loading && data && data.seeHashtagPost === null) {
        return (
            <Wrapper>
                <Helmet>
                    <title>#{tag} | Stargram</title>
                </Helmet>
                <Header>
                    <HeaderColumn>
                        <Logo size={100} />
                    </HeaderColumn>
                    <HeaderColumn>
                        <TagNameRow>
                            <TagName>#{tag}</TagName>
                        </TagNameRow>
                        <Counts>
                            <Count>
                                <FatText text={"No post"} />
                            </Count>
                        </Counts>
                    </HeaderColumn>
                </Header>
            </Wrapper>
        );
    } else if (!loading && data && data.seeHashtagPost) {
        const {
            seeHashtagPost: {
                name,
                posts,
                postsCount
            }
        } = data;

        //post 좋아요 순 정렬
        const cmpDate = (a, b) => {
            return a.likeCount > b.likeCount ? -1 : a.likeCount < b.likeCount ? 1 : 0;
        };
        posts.sort(cmpDate);

        return (
            <Wrapper>
                <Helmet>
                    <title>#{name} | Stargram</title>
                </Helmet>
                <Header>
                    <HeaderColumn>
                        <Avatar size="lg" url={posts[0].files[0].url} />
                    </HeaderColumn>
                    <HeaderColumn>
                        <TagNameRow>
                            <TagName>#{name}</TagName>
                        </TagNameRow>
                        <Counts>
                            <Count>
                                <FatText text={String(postsCount)} /> posts
                  </Count>
                        </Counts>
                    </HeaderColumn>
                </Header>
                <Posts>
                    {posts &&
                        posts.map((post) => (
                            <SquarePost
                                key={post.id}
                                id={post.id}
                                likeCount={post.likeCount}
                                commentCount={post.commentCount}
                                file={post.files[0]}
                            />
                        ))}
                </Posts>
            </Wrapper>
        );
    }

    return null;

};