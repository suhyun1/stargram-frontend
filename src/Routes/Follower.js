import React from "react";
import { gql } from "apollo-boost";
import withRouter from "react-router-dom/withRouter";
import { useQuery } from "react-apollo-hooks";
import UserList from "../Components/UserList";


const GET_FOLLOWER = gql`
    query seeFollower($username: String!){
        seeFollower(username: $username){
            id
            username
            fullName
            avatar
            isFollowing
            isSelf
        }
    }
`;


export default withRouter(({ match: { params: { username } } }) => {
    const { data, loading } = useQuery(GET_FOLLOWER, { variables: { username } });

    return (
        <UserList data={data} loading={loading} following={false} />
    );

});