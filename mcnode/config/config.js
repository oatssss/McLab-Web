"use strict";
var path = require('path');

const MCNODE_HOME = path.join(__dirname + '/../../');

module.exports = {
    development: {
        app: {
            name: 'McNode',
            host: 'localhost',
            port: 4000
        }
    },
    production: {
        app: {
            name: 'McNode',
            host: 'localhost',
            port: 4000
        }
    }
};

module.exports.MEDIA_ROOT =  path.join(MCNODE_HOME, 'user-files');
module.exports.USER_FILE_FOLDER =  'workspace';

// CHANGE THESE:
module.exports.MCLAB_CORE_JAR_PATH = './bin/McLabCore.jar';
module.exports.MC2FOR_PATH = './bin/Mc2For.jar';
module.exports.MCVM_PATH = './bin/mcvm.js';
module.exports.LINK_SHORTENER_API_KEY = 'AIzaSyDzVFgYHzwEeLLt7nUNkJ0tQ8igTLoXVUE';
