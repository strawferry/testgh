


var path = require('path');
var fs = require('fs');

var appDirectory = fs.realpathSync(process.cwd());

function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
}

module.exports = {
    target: 'http://localhost',
    defaultHost: 'localhost',
    defaultPort: 8890,
    appBuild: resolveApp('build'),
    appPublic: resolveApp('src/public'),
    appHtml: resolveApp('src/public/index.html'),
    entryJS: resolveApp('src/index.js'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appStyle: resolveApp('src/assets/styles'),
    appNodeModules: resolveApp('node_modules'),
    ownNodeModules: resolveApp('node_modules'),
    proxy: 'https://ruby-china.org/api/v3/*',
    proxyTarget: 'https://ruby-china.org',
    proxyPath: '/api/v3/*'
};
