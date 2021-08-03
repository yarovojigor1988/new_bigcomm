import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';


export default function (token) {
    const client = new ApolloClient({
        headers: { Authorization: `Bearer ${token}` },
    });

    client.query({
        query: gql`
            query MyFirstQuery {
                site {
                    products {
                        edges {
                            node {
                                name
                                sku
                                prices{price{value currencyCode}}
                                defaultImage { url(width: 500) }
                            }
                        }
                    }
                }
            }
        `,
    })
        .then(data => console.log(data))
        .catch(error => console.error(error));
}