/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDeck = /* GraphQL */ `
  subscription OnCreateDeck($filter: ModelSubscriptionDeckFilterInput) {
    onCreateDeck(filter: $filter) {
      id
      name
      userId
      cards
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDeck = /* GraphQL */ `
  subscription OnUpdateDeck($filter: ModelSubscriptionDeckFilterInput) {
    onUpdateDeck(filter: $filter) {
      id
      name
      userId
      cards
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDeck = /* GraphQL */ `
  subscription OnDeleteDeck($filter: ModelSubscriptionDeckFilterInput) {
    onDeleteDeck(filter: $filter) {
      id
      name
      userId
      cards
      createdAt
      updatedAt
    }
  }
`;
