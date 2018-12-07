const hue = require('node-hue-api')
const HueApi = hue.HueApi
const HueLightState = hue.lightState

const displayResult = function(result) {
  console.log(JSON.stringify(result, null, 2))
}

// find bridge
// hue.nupnpSearch(function(err, result) {
//   if (err) throw err
//   displayResult(result)
// })

const host = '192.168.0.48'
const username = 'ioN0Hs2H3-fHd8vMyv0Wjvn-0b-qwjH9ICD9WvgX'
const api = new HueApi(host, username)

// register user
// api.createUser(host, function(err, user) {
//   if (err) {
//     console.log(err)
//     throw err
//   }
//   displayResult(user)
// })

// show bridge config
// api.config(function(err, config) {
//   if (err) {
//     console.log(err)
//     throw err
//   }
//   displayResult(config)
// })

// show full bridge config and connected lights
// api.getFullState(function(err, config) {
//   if (err) {
//     console.log(err)
//     throw err
//   }
//   displayResult(config)
// })

// set light color
// api.setLightState(
//   3,
//   HueLightState.create()
//     .on()
//     .rgb(255, 192, 203),
//   function(err, lights) {
//     if (err) {
//       console.log(JSON.stringify(err, null, 2))
//       throw err
//     }
//   }
// )

api.setLightState(
  3,
  HueLightState.create()
    .on()
    .longAlert(),
  function(err, lights) {
    if (err) {
      console.log(JSON.stringify(err, null, 2))
      throw err
    }
  }
)
