import gql from 'graphql-tag';

// speedy query for getting the shifts/market info relevant to this user
export const userShifts = gql`
  query userShifts($userId: Uuid!) {
    allUserShiftsMobiles(condition: { userId: $userId }) {
        nodes {
          shiftId
          startTime
          endTime
          workersAssigned
          workersRequestedNum
          workersInvited
          instructions
          hourlyBonusPay
          unpaidBreakTime
          shiftDateCreated
          biddingPeriodExpiration
          workerId
          marketId
          positionId
          workplaceId
          startTime
          endTime
          isBooked
          workerResponse
          workplaceName
          address
          workplacePhoneNumber
          workplaceImageUrl
          locationJson
          addressJson
          zipCode
          isFromPhoneTree
          positionName
          clockInDate
          clockOutDate
          clockInLocation
          clockOutLocation
          clockInVerified
          clockOutVerified
          bookedByAutoAssign
          bookedByPhoneTree
          locked
          wage
          brandName
          userId
          userEmail
          callMade
        }
    }
  }`