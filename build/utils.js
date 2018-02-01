const path = require('path');

/**
 * @desc: 判断环境，返回一个配置的路径
 */
function assetsPath(_path) {
  const assetsSubDirectory = './static'
  return path.posix.join(assetsSubDirectory, _path)
}

module.exports = {
  assetsPath
}