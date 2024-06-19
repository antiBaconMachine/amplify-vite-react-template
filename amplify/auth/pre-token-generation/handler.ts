import type { PreTokenGenerationV2TriggerHandler } from "aws-lambda";

export const handler: PreTokenGenerationV2TriggerHandler = async (event) => {
  const userAttributes = event.request.userAttributes;

  const currentMembership = userAttributes["custom:current_membership"];
  const memberships = userAttributes["custom:memberships"] || "";

  event.response = {
    claimsAndScopeOverrideDetails: {
      idTokenGeneration: {
        claimsToAddOrOverride: {
          someCustomIdClaim: "sqirble",
        },
      },
      accessTokenGeneration: {
        claimsToAddOrOverride: {
          current_membership: currentMembership,
          memberships,
          propFromAmplifyLamb: "blungabowl",
        },
        scopesToAdd: ["membership:" + currentMembership],
      },
    },
  };
  console.log(
    JSON.stringify(
      {
        currentMembership,
        memberships,
        response: event.response,
        userAttributes,
      },
      null,
      2
    )
  );
  return event;
};
