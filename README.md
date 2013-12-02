# concurix-monitor
Node.js Real-time Visual Profiler and Monitoring

Node.js offers phenomenal performance and scalability (particularly on modern multi and manycore servers), but sublte programming bugs can demolish performance rapidly. Concurix builds trace analysis and visualization tools that make it easy for developers to pinpoint bottlenecks and uncork parallelism. 

For more information, visit [www.concurix.com](http://www.concurix.com).

[![NPM](https://nodei.co/npm/concurix-monitor.png)](https://nodei.co/npm/concurix-monitor/)

[![david-dm](https://david-dm.org/Concurix/concurix-monitor.png)](https://david-dm.org/Concurix/concurix-monitor)
[![david-dm](https://david-dm.org/Concurix/concurix-monitor/dev-status.png)](https://david-dm.org/Concurix/concurix-monitor#info=devDependencies)

[![Build Status](https://travis-ci.org/Concurix/concurix-monitor.png?branch=master)](https://travis-ci.org/Concurix/concurix-monitor)

## Installation
    $ npm install concurix-monitor

## Quick Start

1. Login on to [www.concurix.com](http://www.concurix.com) and create a project.  You can find your account key here.

2. Include the following snippet before any other ``require`` statement:

 ```js
 var cx = require('concurix-monitor')({accountKey: <your account key> });
 cx.start();
 ```

3. Run your app
 
 ```
 $ node app.js
 ```

4. Visit [www.concurix.com/dashboard](http://www.concurix.com/dashboard) -> and select your project to view performance graphs.


## API

### concurix-monitor(opts:Object)
Initializes tracer. The tracer automatically wraps every function found in the exports object returned by ``require``. This allows the tracer to partially reconstruct and visualize the call tree of your running code. 

The following options are suported:

* ``accountKey`` your account key, data is collected and analyzed per account key
