# tweebler-cli
With Tweebler gone, this cli can help you quickly generate a tweet containing
your top LastFM artists from the past week.

## Installation
```bash
npm install -g tweebler-cli
```

## Usage
```bash
Usage: tweebler [options]

Options:

  -h, --help             output usage information
  -V, --version          output the version number
  -u, --user <username>  Specify which user to generate top artists from
  -n, --number <n>       Number of top artists to return
  -k, --key              LastFM API key
```

- You must always specify a user.
- If no number has been specified, tweebler-cli will default to `3`
- If no key has been specified, tweebler-cli will look for the env variable:
`LASTFM_APIKEY`

### Obtain LastFM API Key
In order to get an API key you need to create a LastFM application. That can be
done at
[https://www.last.fm/api/account/create](https://www.last.fm/api/account/create)

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by Simon Brix ([@br11x](https://twitter.com/br11x)).
