import React from "react";
import DashboardAuth from "../../components/dashboard/DashboardAuth";
import Checkout from "../../components/add/Checkout";
import {gql, useQuery} from "@apollo/client";

export default function addAdvertisement() {
    const GET_USER_INFO = gql`
        query userInfo {
            user{
                id
                name
            }
        }
    `;
    const {loading, error, data} = useQuery(GET_USER_INFO);
    if (loading) return <p>Loading...</p>;
    return <Checkout data={data}/>;
}

addAdvertisement.Layout = DashboardAuth;
