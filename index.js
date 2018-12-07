const argv = require('yargs').argv
const socket = require('socket.io-client')(
  'http://commits.digitalsurgeonsdev.com:8000'
)
const randomColor = require('random-color')
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
  setRandomColor(3, flashLight(3, 3), setBrightness(3, 20))
}

socket.on('event', data => {
  setRandomColor(3, flashLight(3, 3), setBrightness(3, 20))
})

function setRandomColor(light, cb = () => {}) {
  api.setLightState(
    light,
    HueLightState.create()
      .on()
      .rgb(...randomColor(0.3, 0.99).values.rgb),
    function(err, lights) {
      if (err) {
        console.log(JSON.stringify(err, null, 2))
        throw err
      }

      setTimeout(() => {
        cb()
      }, 2000)
    }
  )
}

function flashLight(light, times = 1, cb = () => {}) {
  let i = 0
  flash()
  function flash() {
    api.setLightState(
      light,
      HueLightState.create()
        .on()
        .shortAlert(),
      function(err, lights) {
        if (err) {
          console.log(JSON.stringify(err, null, 2))
          throw err
        }
        if (i < times - 1) {
          i++
          setTimeout(() => {
            flash()
          }, 1000)
        } else {
          setTimeout(() => {
            cb()
          }, 1000)
        }
      }
    )
  }
}

function setBrightness(light, brightness = 100, cb = () => {}) {
  api.setLightState(
    light,
    HueLightState.create()
      .on()
      .brightness(brightness),
    function(err, lights) {
      if (err) {
        console.log(JSON.stringify(err, null, 2))
        throw err
      }
      setTimeout(() => {
        cb()
      }, 1000)
    }
  )
}
