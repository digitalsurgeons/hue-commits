# Hue Commits

Flash Hue lights based on GitLab activity

```bash
# Find Hue Bridge and return IP / ID
$ node index.js --findBridge

# Register user with Bridge and return username
$ node index.js --registerUser

# Return Bridge configuration object
$ node index.js --bridgeConfig

# Return full Bridge state including light configuration
$ node index.js --bridgeState

# Start Socket client
# On GitLab pushes set lights to random color and flash for each commit
$ node index.js
```