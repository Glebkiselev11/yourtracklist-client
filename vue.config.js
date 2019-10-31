const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../dist'),
    devServer: {
        proxy: {
            '/get-ip-adress': {
                target: 'http://localhost:3000'
            }
        }
    }
}