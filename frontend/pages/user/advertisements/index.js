import {useRouter} from 'next/dist/client/router';
import Pagination from "../../../components/Pagination";
import DashboardAuth from "../../../components/dashboard/DashboardAuth";
import Advertisements from "../../../components/advertisements/Advertisements";
import Filter from "../../../components/advertisements/Filter";
import {gql, useQuery} from "@apollo/client";
import React, {useState} from "react";

export default function AdvertsmentsPage() {
    const [id, setId] = useState(null);
    const [type, updateType] = useState('all');

    const {query} = useRouter();
    const GET_CATEGORIES_INFO = gql`
        query categories {

            categories{
                id
                name
            }

        }
    `;

    const {loading, error, data} = useQuery(GET_CATEGORIES_INFO);
    if (error) {
        console.log(error.graphQLErrors)
    }
    if (loading || !data) return <p>Loading...</p>;

    const page = parseInt(query.page);
    return (
        <div>
            <Filter data={data} id={id} setId={setId} type={type} updateType={updateType}/>
            <Pagination id={id} type={type} page={page || 1}/>
            <Advertisements id={id} type={type} page={page || 1}/>
            <Pagination id={id} type={type} page={page || 1}/>
        </div>
    );
}
AdvertsmentsPage.Layout = DashboardAuth;
