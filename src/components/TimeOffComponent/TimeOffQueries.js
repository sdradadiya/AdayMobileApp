import { gql } from 'react-apollo';

const userTimeOffRequestQuery = gql`
  query ($requestorId: Uuid!){
    allTimeOffRequests(
      	condition: {requestorId: $requestorId},
        orderBy: START_DATE_DESC){
      edges{
        node{
          id
          startDate
          endDate
          submissionDate
          minutesPaid
          decisionStatus
          payDate
          notes
        }
      }
    }
  }
`

const submitTimeOffRequestMutation = gql`
    mutation ($data : CreateTimeOffRequestInput!) {
      createTimeOffRequest(input: $data) {
        timeOffRequest {
          id
        }
      }
    }
`

const deleteTimeOffRequestMutation = gql`
  mutation ($data: DeleteTimeOffRequestByIdInput!){
    deleteTimeOffRequestById(
      	input: $data){
      clientMutationId
    }
  }
`

export { userTimeOffRequestQuery, submitTimeOffRequestMutation, deleteTimeOffRequestMutation};