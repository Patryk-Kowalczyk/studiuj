import styled from 'styled-components';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/client';
import CardComponent from "./CardComponent";
import {perPage} from "../../config";

export const ALL_ADVERTISEMENTS_IN_PAGE_QUERY = gql`
    query ALL_ADVERTISEMENTS_IN_PAGE_QUERY($page: Int = 1,$perPage:Int = 3) {
        advertisements(first:$perPage,page: $page) {
            data{
                id
                name
                rating
                description
                price
                type
                created_at
                category{
                    name
                }
                user{
                    id
                    avatar
                    name
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


export default function Advertisements({page}) {
    const {data, error, loading} = useQuery(ALL_ADVERTISEMENTS_IN_PAGE_QUERY, {
        variables: {
            page: page,
            perPage: perPage
        },
    });
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>{error.message}</p>;
    console.log(data)
    return (
        <div>
            <AdvertisementsListStyles>
                {data.advertisements.data.map((product) => (
                    <CardComponent key={product.id} data={product}/>

                ))}
            </AdvertisementsListStyles>
        </div>
    );
}
