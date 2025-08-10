import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const typeDefs = gql`
  type Post { id: ID!, title: String!, body: String!, createdAt: String! }
  type Query { posts: [Post!]! }
  type Mutation { createPost(title: String!, body: String!): Post! }
`;

const resolvers = {
  Query: { posts: async () => prisma.post.findMany({ orderBy: { createdAt: 'desc' } }) },
  Mutation: { createPost: async (_p, { title, body }) => prisma.post.create({ data: { title, body } }) }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen({ port: 4000 }).then(({ url }) => console.log(`GraphQL ready at ${url}`));
