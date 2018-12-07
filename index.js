const argv = require('yargs').argv
const hue = require('node-hue-api')
const HueApi = hue.HueApi
const HueLightState = hue.lightState

const host = '192.168.0.48'
const username = 'ioN0Hs2H3-fHd8vMyv0Wjvn-0b-qwjH9ICD9WvgX'
const api = new HueApi(host, username)

// log JSON to console
const displayResult = function(result) {
  console.log(JSON.stringify(result, null, 2))
}

// find bridge
if (argv.findBridge) {
  hue.nupnpSearch(function(err, result) {
    if (err) throw err
    displayResult(result)
  })

  // register user
} else if (argv.registerUser) {
  api.createUser(host, function(err, user) {
    if (err) {
      console.log(err)
      throw err
    }
    displayResult(user)
  })

  // show bridge config
} else if (argv.bridgeConfig) {
  api.config(function(err, config) {
    if (err) {
      console.log(err)
      throw err
    }
    displayResult(config)
  })

  // show full bridge state inc connected lights
} else if (argv.bridgeState) {
  api.getFullState(function(err, config) {
    if (err) {
      console.log(err)
      throw err
    }
    displayResult(config)
  })
} else {
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
}
