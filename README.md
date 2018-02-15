# graphql-schema-stitching
Test for the graphql schema stitching.

## use case

There is an shop system (presented by the **api**)

The shop has different categories with some products. The data is provided by the **product-backend**

Each product has got a deliverer with an address. This data is provided by the **deliverer-backend**

The **api** merge all data.

## Usage

1. Install and start the **product-backend**
2. Install and start the **deliverer-backend**
3. Install and start the **api**
3. visit [http://localhost:8080/graphiql](http://localhost:8080/graphiql) for testing


## more informations

Official documentation: https://www.apollographql.com/docs/graphql-tools/schema-stitching.html

See https://dev-blog.apollodata.com/graphql-schema-stitching-8af23354ac37 for an overview and detailed talk

## further steps: 

1. testing with Docker 
2. research the possibilities of service locators to remove hard coded urls 
3. research the possibility of failure handling. How can you downgrade the schema if there is any failure in network or on a backend server