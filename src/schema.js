console.log("ici");
const typeDefs = `
  type user {
    id : int!
    name : string!
    username : string!
    email : mail!
    address : address
    phone : string!
    company : company
  }

  type address {
    street : string!
    suite : string!
    city : string!
    zipcode : string!
    geo : geo
  }

  type geo {
    lat : string!
    lng : string!
  }

  type company {
    name : string!
    catchPhrase : string!
    bs : string!
  }
  type Query {
    users: [user!]
  }
`

module.exports = typeDefs

const resolvers = {
    Query : {
      users: async () => {
        const res = await fetch('YOUR URL')
        return await res.json()
      }
    }
}
