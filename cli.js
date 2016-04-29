#!/usr/bin/env node

var program = require('commander');

var spawn = require('child_process').spawn;

var nodemon = process.platform === 'win32' ? 'nodemon.cmd' : 'nodemon';

program
    .command('start')
    .action(() => {        
        spawn(nodemon, ['server/index.js'],
            { stdio: 'inherit', env: Object.assign(process.env, { HOST: 'localhost', PORT: 8888 }) });
    });

program.parse(process.argv);
