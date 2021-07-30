import React from "react";
import DashboardAuth from "../../layouts/PanelLayout/PanelAuth";
import Checkout from "../../components/add/Checkout";
import {gql, useQuery} from "@apollo/client";

export default function addAdvertisement() {
    const GET_USER_INFO = gql`
        query userInfo {
            me{
                id
                name
            }
            categories{
                id
                name
            }

        }
    `;
    const {loading, error, data} = useQuery(GET_USER_INFO);
    if (error) {
        console.log(error.graphQLErrors)
    }
    if (loading || !data) return <p>Loading...</p>;
    return <Checkout data={data}/>;
}

addAdvertisement.Layout = DashboardAuth;
