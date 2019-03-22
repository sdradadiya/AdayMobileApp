Object.defineProperty(exports,"__esModule",{value:true});exports.deleteTimeOffRequestMutation=exports.submitTimeOffRequestMutation=exports.userTimeOffRequestQuery=undefined;var _templateObject=_taggedTemplateLiteral(['\n  query ($requestorId: Uuid!){\n    allTimeOffRequests(\n      \tcondition: {requestorId: $requestorId},\n        orderBy: START_DATE_DESC){\n      edges{\n        node{\n          id\n          startDate\n          endDate\n          submissionDate\n          minutesPaid\n          decisionStatus\n          requestType\n          payDate\n          notes\n        }\n      }\n    }\n  }\n'],['\n  query ($requestorId: Uuid!){\n    allTimeOffRequests(\n      \tcondition: {requestorId: $requestorId},\n        orderBy: START_DATE_DESC){\n      edges{\n        node{\n          id\n          startDate\n          endDate\n          submissionDate\n          minutesPaid\n          decisionStatus\n          requestType\n          payDate\n          notes\n        }\n      }\n    }\n  }\n']),_templateObject2=_taggedTemplateLiteral(['\n    mutation ($data : CreateTimeOffRequestInput!) {\n      createTimeOffRequest(\n        \tinput: $data) {\n        userByRequestorId {\n          firstName\n    \t\t}\n      }\n    }\n'],['\n    mutation ($data : CreateTimeOffRequestInput!) {\n      createTimeOffRequest(\n        \tinput: $data) {\n        userByRequestorId {\n          firstName\n    \t\t}\n      }\n    }\n']),_templateObject3=_taggedTemplateLiteral(['\n  mutation ($data: DeleteTimeOffRequestByIdInput!){\n    deleteTimeOffRequestById(\n      \tinput: $data){\n      clientMutationId\n    }\n  }\n'],['\n  mutation ($data: DeleteTimeOffRequestByIdInput!){\n    deleteTimeOffRequestById(\n      \tinput: $data){\n      clientMutationId\n    }\n  }\n']);var _reactApollo=require('react-apollo');function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}

var userTimeOffRequestQuery=(0,_reactApollo.gql)(_templateObject);





















var submitTimeOffRequestMutation=(0,_reactApollo.gql)(_templateObject2);










var deleteTimeOffRequestMutation=(0,_reactApollo.gql)(_templateObject3);exports.








userTimeOffRequestQuery=userTimeOffRequestQuery;exports.submitTimeOffRequestMutation=submitTimeOffRequestMutation;exports.deleteTimeOffRequestMutation=deleteTimeOffRequestMutation;