var program = require('commander')
var request = require('request')

var version = '1.0.0'
var API_BASE = 'http://ws.audioscrobbler.com/2.0/'

var urlOptions = {
  method: 'user.gettopartists',
  api_key: program.key || process.env.LASTFM_APIKEY,
  user: program.user || undefined,
  period: '7day',
  format: 'json'
}

program
  .version(version)
  .option('-u, --user <username>', 'Specify which user to generate top artists from')
  .option('-n, --number <n>', 'Number of top artists to return')
  .option('-k, --key', 'LastFM API key')
  .parse(process.argv)

var topArtistsNo = parseInt(program.number, 10)

if (program.user) {
  urlOptions.user = program.user
  request(`${API_BASE}?${processUrlOptions(urlOptions)}`, lastfmCallback)
} else {
  process.stderr.write('User must be specified. See --help for more information')
}

function lastfmCallback (err, resp, body) {
  if (err) return process.stderr.write('Oh noes, errors', err)
  if (resp.statusCode !== 200) return process.stderr.write('Last FM didn\'t return status code 200, please try again later')

  var topArtists = JSON.parse(body).topartists.artist
  formatArtists(topArtists)
}

function formatArtists (artists) {
  var topArtists = []

  for (var i = 0; i < artists.length && i < topArtistsNo; i++) {
    topArtists.push(`${artists[i].name} (${artists[i].playcount})`)
  }

  var joinedArtists = `My top ${topArtistsNo} #lastfm artists: ${formatArray(topArtists, ',', '&')}`
  var formattedString = joinedArtists.length >= 140
    ? `${joinedArtists.slice(0, 135)}(...)`
    : joinedArtists

  process.stdout.write(formattedString)
}

function formatArray (arr, all, last) {
  var outStr = ''

  if (arr.length === 1) {
    outStr = arr[0]
  } else if (arr.length === 2) {
    outStr = arr.join(` ${last} `)
  } else if (arr.length > 2) {
    outStr = `${arr.slice(0, -1).join(`${all} `)} ${last} ${arr.slice(-1)}`
  }

  return outStr
}

function processUrlOptions (obj) {
  var objKeys = Object.keys(obj)
  var objLength = objKeys.length
  var optionString = ''

  for (var i = 0; i < objLength; i++) {
    optionString += `${objKeys[i]}=${obj[objKeys[i]]}`

    if (i !== objLength - 1) {
      optionString += '&'
    }
  }

  return optionString
}
