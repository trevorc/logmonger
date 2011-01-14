#!/usr/bin/env node

require('./init');
require('logmonger').main('./client', process.argv[2]);
