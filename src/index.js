const { GraphQLServer } = require('graphql-yoga')
var fetch = require('isomorphic-fetch')

const typeDefs = `
  type User {
    id : ID!
    name : String!
    username : String!
    email : String!
    address : Address
    phone : String!
    company : Company

    todos: [Todo]
  }

  type Address {
    street : String!
    suite : String!
    city : String!
    zipcode : String!
    geo : Geo
  }

  type Geo {
      lat : String!
      lng : String!
    }

  type Company {
    name : String!
    catchPhrase : String!
    bs : String!
  }

  type Post {
    userId: ID!
    id: ID!
    title: String!
    body: String!
  }

  type Comment {
    postId: ID!
    id: ID!
    name: String!
    email: String!
    body: String!
  }

  type Album {
    userId: ID!
    id: ID!
    title: String!
  }

  type Photo {
    albumId: ID!
    id: ID!
    title: String!
    url: String!
    thumbnailUrl: String!
  }

  type Todo {
    userId: ID!
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    users(id: ID): [User!]
    posts(userId: ID): [Post!]
    comments(postId: ID): [Comment!]
    albums(userId: ID): [Album!]
    photos(albumId: ID): [Photo!]
    todos(userId: ID): [Todo!]
  }
`

const opts = {
  port: 4000 //configurable port no
}

const endpoint = 'https://jsonplaceholder.typicode.com'

const resolvers = {
  Query: {
    users: async (_, { id }) => {
      const url = id ? `${endpoint}/users/${id}` : `${endpoint}/users`
      const res = await fetch(url);
      const users = await res.json()
      return id ? [users] : users;
    },
    posts: async (_, { userId }) => {
      const url = userId ? `${endpoint}/posts?userId=${ userId }` : `${endpoint}/posts`
      const res = await fetch(url);
      return await res.json();
    },
    albums: async (_, { userId }) => {
      const url = userId ? `${endpoint}/albums?userId=${ userId }` : `${endpoint}/albums`
      const res = await fetch(url);
      return await res.json();
    },
    photos: async (_, { albumId }) => {
      const url = albumId ? `${endpoint}/photos?albumId=${ albumId }` : `${endpoint}/photos`
      const res = await fetch(url);
      return await res.json();
    },
    todos: async (_, { userId }) => {
      const url = userId ? `${endpoint}/todos?userId=${ userId }` : `${endpoint}/todos`
      const res = await fetch(url);
      return await res.json();
    },
    comments: async (_, { postId }) => {
      const url = postId ? `${endpoint}/comments?postId=${ postId }` : `${endpoint}/comments`
      const res = await fetch(url);
      return await res.json();
    }
  },
}


const server = new GraphQLServer({ typeDefs, resolvers, opts })
server.start(() => console.log(`Server is running at http://localhost:${opts.port}`))
