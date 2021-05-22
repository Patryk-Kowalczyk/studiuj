import DashboardAuth from "../../../components/dashboard/DashboardAuth";
import {useRouter} from 'next/dist/client/router';
import {gql, useQuery} from "@apollo/client";
import SingleMyAdvertisement from "../../../components/advertisements/SingleMyAdvertisement";

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
                id
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
            advertisements{
                id
            }
        }
        categories{
            id
            name
        }
    }
`;

export default function SingleMyAdvertisementPage() {

    const {query} = useRouter();
    const id = parseInt(query.id);
    const {data, error, loading} = useQuery(GET_ADV_INFO, {
        variables: {
            id: id,
        },
    });
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>{error.message}</p>;
    let combinedArray = []
    data.me.advertisements.forEach(item => (
        combinedArray.push(item.id)
    ))
    if (combinedArray.includes(query.id)) return <SingleMyAdvertisement data={data}/>;
    return <p>ooooops</p>
}
SingleMyAdvertisementPage.Layout = DashboardAuth;
