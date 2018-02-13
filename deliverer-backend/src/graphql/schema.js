const typeDefinitions = `
type Address {
	id: ID!
	street: String!
	number: String!
	city: String!
	postalCode: String!
}

type Deliverer {
	id: Int!
	name: String!
	email: String!
	address: Address!
}

# the schema allows the following queries:
type RootQuery {
    deliverer(id: Int!): Deliverer
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
    query: RootQuery
#    mutation: RootMutation
}
`;
export default [typeDefinitions];