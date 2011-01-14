#!/usr/bin/env node

require('./init');
require('logmonger').main('./listener', process.argv[2]);
