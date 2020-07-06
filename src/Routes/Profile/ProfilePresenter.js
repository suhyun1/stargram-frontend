import React from "react";
import styled from "styled-components";
import { Link, Route, Switch } from "react-router-dom";
import {Helmet} from "react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";
import Following from "../../Components/Following";
import Follower from "../../Components/Follower";

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

const UsernameRow = styled.div`
    display: flex;
    align-items: center;
`;

const Username = styled.span`
    font-size: 26px;
    display: block;
    margin-right: 20px;
`;

const Buttons = styled.span`
    display: flex;
    {
        button{
            margin: 0px 3px;
        }
    }
`;

const Counts = styled.ul`
    display: flex;
    margin: 15px 0px;
`;

const Count = styled.li`
    font-size: 16px;
    &:not(:last-child){
        margin-right: 10px;
    }
`;
const FullName = styled(FatText)`
    font-size: 16px;
`;
const Bio = styled.p`
    margin: 10px 0px;

`;

const Posts = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 280px);
    grid-template-rows: 200px;
    grid-auto-rows: 200px;
`;

const ELink = styled(Link)`
    color: inherit;
`;


export default ({ loading, data, logOut})=> {
  

    if (loading === true) {
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    } else if(!loading && data && data.seeUserProfile) {


      const { seeUserProfile: {
          id,
          avatar,
          username,
          fullName,
          bio,
          isFollowing,
          isSelf,
          followingCount,
          followersCount,
          postsCount,
          posts
      } } = data;

      //post 날짜 순 정렬
      const cmpDate = (a, b) =>{
        return a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0;
      };
      posts.sort(cmpDate);  

      return (
        <Wrapper>
          <Helmet>
            <title>{username} | Stargram</title>
          </Helmet>
          <Header>
            <HeaderColumn>
              <Avatar size="lg" url={avatar} />
            </HeaderColumn>
            <HeaderColumn>
              <UsernameRow>
                <Username>{username}</Username>
                {isSelf ? (
                  <Buttons>
                    <Link to="/editProfile">
                      <Button text="Edit Profile" />
                    </Link>
                    <Button onClick={logOut} text="Log Out" />
                  </Buttons>
                ) : (
                  <FollowButton id={id} isFollowing={isFollowing} />
                )}
              </UsernameRow>
              <Counts>
                <Count>
                    <FatText text={String(postsCount)} /> posts
                </Count>
                {followersCount !== 0 ? (
                <Count>
                  <ELink to={{ pathname: `/${username}/followers` }}>
                    <FatText text={String(followersCount)} /> followers
                  </ELink>
                </Count>
                ):(
                  <Count>
                    <FatText text={String(followersCount)} /> followers
                  </Count>
                )}
                {followingCount !== 0 ? (
                  <Count>
                    <ELink to={{ pathname: `/${username}/followings` }}>
                      <FatText text={String(followingCount)} /> followings
                    </ELink>
                  </Count>
                ) : (
                    <Count>
                      <FatText text={String(followingCount)} /> followings
                    </Count>
                )}
                <Switch>
                  <Route exact path="/:username/followers" children={<Follower />} />
                  <Route exact path="/:username/followings" children={<Following />} />
                </Switch>
              </Counts>
              <FullName text={fullName} />
              <Bio>{bio}</Bio>
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


