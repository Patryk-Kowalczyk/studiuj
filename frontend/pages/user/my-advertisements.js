import styled from 'styled-components';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/client';
import CardComponent from "../../components/advertisements/CardComponent";
import DashboardAuth from "../../components/dashboard/DashboardAuth";

export const MY_ADVERTISEMENTS = gql`
    query MY_ADVERTISEMENTS {
        user:me{
            id
            name
            advertisements{
                id
                name
                description
                price
                created_at
                updated_at
                type
                category{
                    id
                    name

                }
                user{
                    id
                    name
                    avatar
                }
            }
        }
    }
`;

const AdvertisementsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 50px;
  justify-self: center;

  
  @media (max-width:1500px){
  grid-template-columns: 1fr 1fr;
   }
  @media (max-width:800px){
     grid-template-columns: 1fr
   }

`;


export default function MyAdvertisements({page}) {
    const {data, error, loading} = useQuery(MY_ADVERTISEMENTS);
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>{error.message}</p>;
    console.log(data)
    return (
        <div>
            <AdvertisementsListStyles>
                {data.user.advertisements.map((product) => (
                    <CardComponent key={product.id} data={product} my/>

                ))}
            </AdvertisementsListStyles>
        </div>
    );
}
MyAdvertisements.Layout = DashboardAuth;
