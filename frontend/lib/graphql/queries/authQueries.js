import {gql} from "@apollo/client";

export const LOGGED_USER = gql`
    query users {
        me {
            id
            uuid
            name
            email
            avatar
            provider
            profile {
                id
            }
        }
    }
`;