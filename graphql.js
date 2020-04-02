import ApolloClient, { gql } from 'apollo-boost'

export default new ApolloClient({
    uri: 'http://192.168.100.131:4000/',
    clientState: {
        resolvers: {
            Mutation: {},
            defaults: {
                movies: []
            }
        }
    }
})
