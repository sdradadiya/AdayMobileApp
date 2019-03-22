import gql from 'graphql-tag';

// all queries and mutations for bumping
export const bumpPositionsQuery = gql `
  query jobsByUserId($id: Uuid!){
    userById(id: $id){
      id
      jobsByUserId(condition: {isPositionActive: true}){
        nodes{
          id
          workplaceId
          primaryJob
          positionByPositionId{
            id
            brandId
            positionName
            ranking
          }
        }
      }
    }
}`;

export const createBumpMutation = gql `
  mutation createBump($bump: BumpInput!){
    createBump(input: {bump: $bump}){
      bump{
        id
        positionByPositionDesired{
            id
            positionName
        }
        bumpAnyPosition
        userId
        shiftsAssigned
        cycleNum
        timeCreated
        rejected
        weekPublishedId
        weekPublishedByWeekPublishedId{
            id
            start
        }
        bidLineId
        bidLineByBidLineId{
            shifts
        }
        altBidLineId
        bidLineByAltBidLineId{
            shifts
        }
      }
    }
}`;

export const weeksQuery = gql `
    query weeksQuery ($brandId: Uuid!) {
      allWeekPublisheds (condition: {brandId: $brandId}, orderBy: START_ASC){
        nodes{
          id
          start
          published
        }
      }
    }
`

export const bumpsQuery = gql `
  query bumpsQuery($id: Uuid!){
    allBumps(condition: {userId: $id}){
      nodes{
        id
        positionByPositionDesired{
            id
            positionName
        }
        bumpAnyPosition
        userId
        shiftsAssigned
        cycleNum
        timeCreated
        rejected
        weekPublishedId
        weekPublishedByWeekPublishedId{
            id
            start
        }
        bidLineId
        bidLineByBidLineId{
            id
            shifts
        }
        altBidLineId
        bidLineByAltBidLineId{
            id
            shifts
        }
      }
    }
}`;

export const deleteBumpMutation = gql `
  mutation deleteBump($id: Uuid!){
      deleteBumpById(input: {id: $id}){
        deletedBumpId
        bump {
            id
        }
      }
}`;

export const updateBumpMutation = gql `
    mutation updateBump($id: Uuid!, $bumpPatch: BumpPatch!){
      updateBumpById(input: {id: $id, bumpPatch: $bumpPatch}){
        bump{
          id
          rejected
          bidLineId
          bidLineByBidLineId{
              id
              shifts
          }
        }
      }
}`;

export const shiftsAssignedQuery = gql `
    query getShiftsByIds($ids: [Uuid]){
      getShiftsByIds(shiftIds: $ids){
        nodes{
          id
          startTime
          endTime
          positionByPositionId {
            positionName
            partTimeWage
            ranking
            brandByBrandId {
              brandName
            }
          }
          workplaceByWorkplaceId {
            workplaceName
          }
        }
      }
}`

export const createBumpsMutation = gql `
  mutation createBumps($newBumps: [BumpInputInput]!){
    createBumps(input: {newBumps: $newBumps}){
        clientMutationId
    }
}`;