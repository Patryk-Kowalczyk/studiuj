import {useRouter} from 'next/dist/client/router';
import Pagination from "../../../components/Pagination";
import {gql} from "@apollo/client";
import DashboardAuth from "../../../components/dashboard/DashboardAuth";

export default function AdvertsmentsPage() {
    const GET_ADV = gql`
        query{
            advertisements(first: 5,page: 1){
                data{
                    id
                    description
                }
                paginatorInfo{
                    count

                }
            }
        }
    `;
    const {query} = useRouter();
    const page = parseInt(query.page);
    console.log(page);
    return (
        <div>
            <Pagination page={page || 1}/>
            <p>x</p>
            <Pagination page={page || 1}/>
        </div>
    );
}
AdvertsmentsPage.Layout = DashboardAuth;
