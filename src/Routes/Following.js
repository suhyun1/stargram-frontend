import React from "react";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import UserList from "../Components/UserList";



const GET_FOLLOWING = gql`
    query seeFollowing($username: String!){
        seeFollowing(username: $username){
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
    const { data, loading } = useQuery(GET_FOLLOWING, { variables: { username } });

    return (
        <UserList data={data} loading={loading} following={true} />
    );
   
});