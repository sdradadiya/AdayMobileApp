import gql from 'graphql-tag';

// query to get bump notifications
export const numBumpActionsNeeded = gql
    `query numBumpActionsNeeded($userIdParam: Uuid!){
        numBumpActionsNeeded(userIdParam: $userIdParam)
}`