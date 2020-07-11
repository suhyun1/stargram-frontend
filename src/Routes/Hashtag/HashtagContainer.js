import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { withRouter } from "react-router-dom";
import HashtagPresenter from "./HashtagPresenter";

const SEARCH_HASHTAG = gql`
  query seeHashtagPost($tag: String!) {
    seeHashtagPost(tag: $tag) {
      name
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
        createdAt
      }
      postsCount
    }
  }
`;

export default withRouter(
    ({
        match: {
            params: { tag },
        },
    }) => {
        const { data, loading } = useQuery(SEARCH_HASHTAG, {
            variables: { tag },
        });
        return <HashtagPresenter loading={loading} data={data} tag={tag}/>;
    }
);