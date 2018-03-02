
const resolvers = {
    Query : {
      users: async () => {
        const res = await fetch('YOUR URL')
        return await res.json()
      }
    }
}

module.exports = resolvers
