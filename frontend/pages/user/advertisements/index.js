import {useRouter} from 'next/dist/client/router';
import Pagination from "../../../components/Pagination";
import DashboardAuth from "../../../components/dashboard/DashboardAuth";
import Advertisements from "../../../components/advertisements/Advertisements";

export default function AdvertsmentsPage() {

    const {query} = useRouter();
    const page = parseInt(query.page);
    return (
        <div>
            <Pagination page={page || 1}/>
            <Advertisements page={page || 1}/>
            <Pagination page={page || 1}/>
        </div>
    );
}
AdvertsmentsPage.Layout = DashboardAuth;
