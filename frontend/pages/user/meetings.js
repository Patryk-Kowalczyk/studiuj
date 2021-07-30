import DashboardAuth from "../../layouts/PanelLayout/PanelAuth";
import * as React from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {gql, useQuery} from "@apollo/client";
import ButtonLink from "../../components/common/ButtonLink";


const columns = [
        {field: 'id', headerName: 'ID', width: 90},
        {field: 'type', headerName: 'Typ', width: 100},
        {field: 'name', headerName: 'Odbiorca', width: 190},
        {
            field: 'advertisement',
            headerName: 'Nazwa',
            width: 200,
        },
        {
            field: "link",
            headerName: "Link do spotkania",
            width: 180,

            sortable: false,
            disableClickEventBubbling: true,
            renderCell: (params) => (
                <ButtonLink target color="primary" variant="contained" href={params.row.link}>Link</ButtonLink>
            ),
        },

    ]
;

export const GET_MEETINGS_INFO = gql`
    query meets {
        meets:MeetsAuth{
            id
            zoom_link
            order{
                created_at
                advertisement{
                    type
                    name
                    user{
                        uuid
                        name
                    }
                }
            }}
        me{
            name
        }
    }
`;
export default function MeetingsPage() {

    const {loading, error, data} = useQuery(GET_MEETINGS_INFO);
    if (error) {
        console.log(error.graphQLErrors)
    }
    if (loading || !data) return <p>Loading...</p>;
    let rows = []
    data.meets.forEach((meet) => (
        rows.push({
            id: meet.id,
            type: data.me.name !== meet.order.advertisement.user.name ? 'zamówiłem' : 'sprzedałem',
            name: meet.order.advertisement.user.name,
            advertisement: meet.order.advertisement.name,
            date: meet.order.created_at,
            link: meet.zoom_link,

        })
    ))
    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid rows={rows} columns={columns} pageSize={5}/>
        </div>
    );
}
MeetingsPage.Layout = DashboardAuth;


