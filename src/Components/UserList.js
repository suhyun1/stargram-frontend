import React from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import Avatar from "./Avatar";
import FatText from "./FatText";
import Loader from "./Loader";
import FollowButton from "./FollowButton";

const ModalWrapper = styled.div`
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
    background-color: white;
    position:absolute;
    top:30%;
    left:50%;
    transform: translate(-50%,-50%);
    width: 30%;
    z-index: 1000;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    overflow-y: hidden;
`;

const Header = styled.div`
    width: 100%;
    border: 0;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: ${props => props.theme.boxBorder};
    border-radius: 0px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const List = styled.div`
    display: table;
    height: 100%;
    width: 100%;
    overflow-y:scroll;
    padding: 6px 0px;
`;

const Card = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 6px 15px;
    justify-content: space-between;
`;

const UserInfo = styled.span`
    display: flex;
    align-items: center;
`;

const EAvatar = styled(Avatar)`
    margin-right: 10px;
`;

const ELink = styled(Link)`
    color: inherit;
`;


const UserList = ({data, loading, following}) => {
    let history = useHistory();
    const back = e => {
      e.stopPropagation();
      history.goBack();
    };

    let users;
    if (!loading && data && data.seeFollowing){
        users = data.seeFollowing;
    }
    else if (!loading && data && data.seeFollower){
        users = data.seeFollower;
    }

    return (
        <ModalWrapper>
            <ModalOverlay onClick={back} />
            <ModalInner>
                <Header>
                    <FatText text={following?"Following": "Follower"} />
                </Header>
                <List>
                    {!loading && data && users!==undefined ? 
                       (users.map(user => (
                           <Card key={user.id}>
                               <UserInfo>
                                <EAvatar url={user.avatar} size={"sm"} />
                                <ELink to={`/${user.username}`}>
                                    <FatText text={user.username} />({user.fullName})
                                </ELink>
                               </UserInfo>
                               {!user.isSelf && <FollowButton id={user.id} isFollowing={user.isFollowing} />}
                           </Card >

                        ))):(
                            <Loader />
                        )
                    }
                </List>
            </ModalInner>
        </ModalWrapper>
    );

};

export default UserList;