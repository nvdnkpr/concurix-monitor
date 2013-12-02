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
1. Include the following snippet before any other ``require`` statement:

 ```js
 var cx = require('concurix-monitor')({accountKey: <your account key> });
 cx.start();
 ```

2. Run your app
 
 ```
 $ node app.js
 ```

3. Visit [www.concurix.com/dashboard](http://www.concurix.com/dashboard) -> Select *Guest Project for Localhost* to view performance graphs.

Note that, by default, the online dashboard will try to connect  to ``http://localhost``. If you'd like to use anything other than ``localhost`` you should sign up for [concurix.com](http://www.concurix.com) and create your custom project.

## API

### concurix-monitor(opts:Object)
Initializes tracer and debugger. The tracer automatically wraps every function found in the exports object returned by ``require``. This allows the tracer to partially reconstruct and visualize the call tree of your running code. The debugger enables steb-by-step debugging, REPL and live code editing of your application. In case when clustering is enabled only the master process will be controlled by the debugger.

The following options are suported:

* ``accountKey`` your account key, data is collected and analyzed per account key
