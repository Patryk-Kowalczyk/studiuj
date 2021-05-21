import DashboardAuth from "../../../components/dashboard/DashboardAuth";
import SingleAdvertisement from "../../../components/advertisements/SingleAdvertisment";
import {useRouter} from 'next/dist/client/router';
import {gql, useQuery} from "@apollo/client";

export const GET_ADV_INFO = gql`
    query GET_ADV_INFO($id: Int!) {
        advertisement(id:$id){
            id
            user{
                id
                name
                avatar
            }
            name
            description
            price
            type
            category{
                name
            }
            created_at
            rating
            comments{
                id
                user{
                    id
                    name
                    avatar
                }
                created_at
                updated_at
                description
                rating
            }
        }
        me{
            id
            name
        }
    }
`;
export default function SingleAdvertisementPage() {

    const {query} = useRouter();
    const id = parseInt(query.id);
    const {data, error, loading} = useQuery(GET_ADV_INFO, {
        variables: {
            id: id,
        },
    });
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>{error.message}</p>;
    return <SingleAdvertisement data={data}/>;
}
SingleAdvertisementPage.Layout = DashboardAuth;
