import Client from 'apollo-boost'

const client = new Client({ uri: 'http://192.168.100.131:4000/' })
// const client = new Client({ uri: 'http://52.221.232.130:4000/' })

export { client }
