import {gql} from "@apollo/client";

export const GET_LAST_MESSAGES = gql`
    query LastUnseenMessages {
        LastUnseenMessages {
            messages {
                text
                chat {
                    id
                }
                sender {
                    name
                    avatar
                }
            }
            unseenChatsCounter
        }
    }
`;