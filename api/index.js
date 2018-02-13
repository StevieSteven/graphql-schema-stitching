import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import express from 'express';
import bodyParser from 'body-parser';
import {makeRemoteExecutableSchema, mergeSchemas, introspectSchema} from 'graphql-tools';
import {createApolloFetch,} from 'apollo-fetch';

async function run() {
    const createRemoteSchema = async (uri) => {
        const fetcher = createApolloFetch({uri});
        return makeRemoteExecutableSchema({
            schema: await introspectSchema(fetcher),
            fetcher
        });
    };
    const productSchema = await createRemoteSchema('http://localhost:8081/graphql');
    const delivererSchema = await createRemoteSchema('http://localhost:8082/graphql');
    const linkSchemaDefs = `
    extend type Product {
        deliverer: Deliverer
    }
  `;
    const schema = mergeSchemas({
        schemas: [productSchema, delivererSchema, linkSchemaDefs],
        resolvers: mergeInfo => ({
            Product: {
                deliverer: {
                    fragment: `fragment ProductFragment on Product {deliverer_id}`,
                    resolve(parent, args, context, info) {
                        const delivererId = parent.deliverer_id;
                        console.log('delivererID: ', delivererId);
                        return mergeInfo.delegate(
                            'query',
                            'deliverer',
                            {id: delivererId},
                            context,
                            info
                        );
                    }
                }
            }
        })
    });

    const app = express();

    app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

    app.use(
        '/graphiql',
        graphiqlExpress({
            endpointURL: '/graphql',
            query: `query {
	category {
 		id
		name
    products {
      id
      name
      deliverer {
        id
        name
        address {
          id
          city
        }
      }
    
    }
	}
}
      `,
        })
    );

    app.listen(8080);
    console.log('Server running. Open http://localhost:8080/graphiql to run queries.');
}

try {
    run();
} catch (e) {
    console.log(e, e.message, e.stack);
}
