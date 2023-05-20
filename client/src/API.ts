/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateDeckInput = {
  id?: string | null,
  name: string,
  userId: string,
  cards?: Array< number > | null,
};

export type ModelDeckConditionInput = {
  name?: ModelStringInput | null,
  userId?: ModelStringInput | null,
  cards?: ModelFloatInput | null,
  and?: Array< ModelDeckConditionInput | null > | null,
  or?: Array< ModelDeckConditionInput | null > | null,
  not?: ModelDeckConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Deck = {
  __typename: "Deck",
  id: string,
  name: string,
  userId: string,
  cards?: Array< number > | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateDeckInput = {
  id: string,
  name?: string | null,
  userId?: string | null,
  cards?: Array< number > | null,
};

export type DeleteDeckInput = {
  id: string,
};

export type ModelDeckFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  userId?: ModelStringInput | null,
  cards?: ModelFloatInput | null,
  and?: Array< ModelDeckFilterInput | null > | null,
  or?: Array< ModelDeckFilterInput | null > | null,
  not?: ModelDeckFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelDeckConnection = {
  __typename: "ModelDeckConnection",
  items:  Array<Deck | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionDeckFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionStringInput | null,
  cards?: ModelSubscriptionFloatInput | null,
  and?: Array< ModelSubscriptionDeckFilterInput | null > | null,
  or?: Array< ModelSubscriptionDeckFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateDeckMutationVariables = {
  input: CreateDeckInput,
  condition?: ModelDeckConditionInput | null,
};

export type CreateDeckMutation = {
  createDeck?:  {
    __typename: "Deck",
    id: string,
    name: string,
    userId: string,
    cards?: Array< number > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateDeckMutationVariables = {
  input: UpdateDeckInput,
  condition?: ModelDeckConditionInput | null,
};

export type UpdateDeckMutation = {
  updateDeck?:  {
    __typename: "Deck",
    id: string,
    name: string,
    userId: string,
    cards?: Array< number > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteDeckMutationVariables = {
  input: DeleteDeckInput,
  condition?: ModelDeckConditionInput | null,
};

export type DeleteDeckMutation = {
  deleteDeck?:  {
    __typename: "Deck",
    id: string,
    name: string,
    userId: string,
    cards?: Array< number > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetDeckQueryVariables = {
  id: string,
};

export type GetDeckQuery = {
  getDeck?:  {
    __typename: "Deck",
    id: string,
    name: string,
    userId: string,
    cards?: Array< number > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListDecksQueryVariables = {
  filter?: ModelDeckFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDecksQuery = {
  listDecks?:  {
    __typename: "ModelDeckConnection",
    items:  Array< {
      __typename: "Deck",
      id: string,
      name: string,
      userId: string,
      cards?: Array< number > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateDeckSubscriptionVariables = {
  filter?: ModelSubscriptionDeckFilterInput | null,
};

export type OnCreateDeckSubscription = {
  onCreateDeck?:  {
    __typename: "Deck",
    id: string,
    name: string,
    userId: string,
    cards?: Array< number > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateDeckSubscriptionVariables = {
  filter?: ModelSubscriptionDeckFilterInput | null,
};

export type OnUpdateDeckSubscription = {
  onUpdateDeck?:  {
    __typename: "Deck",
    id: string,
    name: string,
    userId: string,
    cards?: Array< number > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteDeckSubscriptionVariables = {
  filter?: ModelSubscriptionDeckFilterInput | null,
};

export type OnDeleteDeckSubscription = {
  onDeleteDeck?:  {
    __typename: "Deck",
    id: string,
    name: string,
    userId: string,
    cards?: Array< number > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
