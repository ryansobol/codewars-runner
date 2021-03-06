var shovel = require('../shovel'),
    util = require('../util'),
    temp = require('temp');

module.exports.run = function run(opts, cb) {
    var dir = temp.mkdirSync('typescript');
    shovel.start(opts, cb, {
        solutionOnly: function () {
            // TODO: Support Setup Code
            return function (run) {
                var solutionFile = util.codeWriteSync('typescript', opts.solution, dir, 'solution.ts', true);
                util.exec('tsc ' + solutionFile, function () {
                    run({name: 'node', args: [solutionFile.replace('.ts', '.js')]});
                });
            }
        },
        fullProject: function () {
            throw new Error('Test framework is not supported');
        }
    });

};