const {ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const PORT = process.env.PORT || 5000

dotenv.config()

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>({req})
})

const MONGO_URI= process.env.MONGO_URI

mongoose.connect(MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDB")
    return server.listen({port:PORT})
})
.then(res=>{
    console.log(`Server running at ${res.url}`)
})