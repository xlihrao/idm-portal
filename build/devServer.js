require('babel-polyfill')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config.dev')

const app = express()
const compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '../index.html'))
})

app.listen(8848, 'localhost', (error) => {
    if (error) {
        console.log('Occurred Exception: ', error)
        return
    }

    console.log('Server started, listening at http://localhost:8848')
})