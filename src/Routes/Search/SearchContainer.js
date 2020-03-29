import React from "react";
import { withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter"
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./SearchQueries";

export default withRouter(({ location: { search } }) => {
    const term = search.split("=")[1];
    const { data, loading } = useQuery(SEARCH, {
        skip: term === undefined,   //term 없으면 query 실행하지 않도록함
        variables: {
            term
        }
    });
    return <SearchPresenter searchTerm={term}loading={loading} data={data}/>;
});