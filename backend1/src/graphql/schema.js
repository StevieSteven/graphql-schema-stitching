const typeDefinitions = `
type Address {
	id: ID!
	street: String!
	number: String!
	city: String!
	postalCode: String!
}

type Category {
	id: ID!
	name: String!
	parent: Category
	products: [Product!]
}

type Deliverer {
	id: ID!
	name: String!
	email: String!
	address: Address!
}


type Product {
	id: ID!
	name: String!
	price: Float!
	deliveryTime: Int
	description: String
	categories: [Category]!
	deliverer: Deliverer!
}




# the schema allows the following queries:
type RootQuery {
    deliverer(id: ID!): Deliverer
    category(name: String): [Category]
}


# this schema allows the following two mutations:
#type RootMutation {
#    putProductIntoShoppingCard(
#        productId: ID!
#        count: Int!): Shoppingcard
#        
#    finishOrder(addressId: ID!): Order
#    
#    addRating(
#        productId: ID!
#        stars: Int!
#        comment: String
#    ):Rating   
#
#}
# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
    query: RootQuery
#    mutation: RootMutation
}
`;
export default [typeDefinitions];