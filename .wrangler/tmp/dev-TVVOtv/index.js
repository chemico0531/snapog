var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// .wrangler/tmp/bundle-qCMhKL/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader.apply(null, argArray)
    ]);
  }
});

// node_modules/unenv/dist/runtime/_internal/utils.mjs
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
function notImplemented(name) {
  const fn2 = /* @__PURE__ */ __name(() => {
    throw createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn2, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
__name(PerformanceEntry, "PerformanceEntry");
var PerformanceMark = /* @__PURE__ */ __name(class PerformanceMark2 extends PerformanceEntry {
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
}, "PerformanceMark");
var PerformanceMeasure = class extends PerformanceEntry {
  entryType = "measure";
};
__name(PerformanceMeasure, "PerformanceMeasure");
var PerformanceResourceTiming = class extends PerformanceEntry {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
__name(PerformanceResourceTiming, "PerformanceResourceTiming");
var PerformanceObserverEntryList = class {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
__name(PerformanceObserverEntryList, "PerformanceObserverEntryList");
var Performance = class {
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
__name(Performance, "Performance");
var PerformanceObserver = class {
  __unenv__ = true;
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn2) {
    return fn2;
  }
  runInAsyncScope(fn2, thisArg, ...args) {
    return fn2.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
__name(PerformanceObserver, "PerformanceObserver");
__publicField(PerformanceObserver, "supportedEntryTypes", []);
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
import { Socket } from "node:net";
var ReadStream = class extends Socket {
  fd;
  constructor(fd2) {
    super();
    this.fd = fd2;
  }
  isRaw = false;
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
  isTTY = false;
};
__name(ReadStream, "ReadStream");

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
import { Socket as Socket2 } from "node:net";
var WriteStream = class extends Socket2 {
  fd;
  constructor(fd2) {
    super();
    this.fd = fd2;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  columns = 80;
  rows = 24;
  isTTY = false;
};
__name(WriteStream, "WriteStream");

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class extends EventEmitter {
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return "";
  }
  get versions() {
    return {};
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  ref() {
  }
  unref() {
  }
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: () => 0 });
  mainModule = void 0;
  domain = void 0;
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
__name(Process, "Process");

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var { exit, platform, nextTick } = getBuiltinModule(
  "node:process"
);
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  nextTick
});
var {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  finalization,
  features,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  on,
  off,
  once,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// node_modules/hono/dist/compose.js
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context2, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context2.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context2, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context2.error = err;
            res = await onError(err, context2);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context2.finalized === false && onNotFound) {
          res = await onNotFound(context2);
        }
      }
      if (res && (context2.finalized === false || isError)) {
        context2.res = res;
      }
      return context2;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// node_modules/hono/dist/utils/body.js
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");

// node_modules/hono/dist/utils/url.js
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path = url.slice(start, end);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
var HonoRequest = /* @__PURE__ */ __name(class {
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  };
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
}, "HonoRequest");

// node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context2, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context: context2 }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context2, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var createResponseInstance = /* @__PURE__ */ __name((body, init) => new Response(body, init), "createResponseInstance");
var Context = /* @__PURE__ */ __name(class {
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = (layout2) => this.#layout = layout2;
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = () => this.#layout;
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  };
  status = (status) => {
    this.#status = status;
  };
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, { status, headers: responseHeaders });
  }
  newResponse = (...args) => this.#newResponse(...args);
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  };
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = (object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  };
  html = (html, arg, headers) => {
    const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = (location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  };
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = () => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  };
}, "Context");

// node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = /* @__PURE__ */ __name(class extends Error {
}, "UnsupportedPathError");

// node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = /* @__PURE__ */ __name(class _Hono {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m2 of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m2.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { basePath: this._basePath, path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env2, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env2, "GET")))();
    }
    const path = this.getPath(request, { env: env2 });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env: env2,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context2 = await composed(c);
        if (!context2.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context2.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} Env - env Object
   * @param {ExecutionContext} - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  };
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
}, "_Hono");

// node_modules/hono/dist/router/reg-exp-router/matcher.js
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = /* @__PURE__ */ __name((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }, "match2");
  this.match = match2;
  return match2(method, path);
}
__name(match, "match");

// node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
__name(compareKey, "compareKey");
var Node = /* @__PURE__ */ __name(class _Node {
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context2, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new _Node();
        if (name !== "") {
          node.#varIndex = context2.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new _Node();
      }
    }
    node.insert(restTokens, index, paramMap, context2, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
}, "_Node");

// node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = /* @__PURE__ */ __name(class {
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m2) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m2];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
}, "Trie");

// node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h2]) => [h2, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h2, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h2, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = /* @__PURE__ */ __name(class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m2) => {
          middleware[m2][path] ||= findMiddleware(middleware[m2], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m2) => {
        if (method === METHOD_NAME_ALL || method === m2) {
          Object.keys(middleware[m2]).forEach((p) => {
            re.test(p) && middleware[m2][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m2) => {
        if (method === METHOD_NAME_ALL || method === m2) {
          Object.keys(routes[m2]).forEach(
            (p) => re.test(p) && routes[m2][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m2) => {
        if (method === METHOD_NAME_ALL || method === m2) {
          routes[m2][path2] ||= [
            ...findMiddleware(middleware[m2], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m2][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
}, "RegExpRouter");

// node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = /* @__PURE__ */ __name(class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
}, "SmartRouter");

// node_modules/hono/dist/router/trie-router/node.js
var emptyParams = /* @__PURE__ */ Object.create(null);
var hasChildren = /* @__PURE__ */ __name((children) => {
  for (const _ in children) {
    return true;
  }
  return false;
}, "hasChildren");
var Node2 = /* @__PURE__ */ __name(class _Node2 {
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m2 = /* @__PURE__ */ Object.create(null);
      m2[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m2];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new _Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m2 = node.#methods[i];
      const handlerSet = m2[method] || m2[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              this.#pushHandlerSets(handlerSets, astNode, method, node.#params);
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          if (matcher instanceof RegExp) {
            if (partOffsets === null) {
              partOffsets = new Array(len);
              let offset = path[0] === "/" ? 1 : 0;
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path.substring(partOffsets[i]);
            const m2 = matcher.exec(restPathString);
            if (m2) {
              params[name] = m2[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (hasChildren(child.#children)) {
                child.#params = params;
                const componentCount = m2[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  params,
                  node.#params
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
}, "_Node");

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = /* @__PURE__ */ __name(class {
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
}, "TrieRouter");

// node_modules/hono/dist/hono.js
var Hono2 = /* @__PURE__ */ __name(class extends Hono {
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
}, "Hono");

// node_modules/workers-og/dist/index.js
import ly from "./ef4866ecae192fd87727067cf2c0c0cf9fb8b020-yoga-ZMNYPE6Z.wasm";
import fy from "./a7e702bc5ba9227243abda7977c8096f59478d3f-resvg-M76RMNOG.wasm";
var Hl = Object.create;
var Ja = Object.defineProperty;
var Xl = Object.getOwnPropertyDescriptor;
var ql = Object.getOwnPropertyNames;
var Yl = Object.getPrototypeOf;
var Zl = Object.prototype.hasOwnProperty;
var tt = /* @__PURE__ */ __name((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "tt");
var Ql = /* @__PURE__ */ __name((e, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let i of ql(t))
      !Zl.call(e, i) && i !== r && Ja(e, i, { get: () => t[i], enumerable: !(n = Xl(t, i)) || n.enumerable });
  return e;
}, "Ql");
var Tt = /* @__PURE__ */ __name((e, t, r) => (r = e != null ? Hl(Yl(e)) : {}, Ql(t || !e || !e.__esModule ? Ja(r, "default", { value: e, enumerable: true }) : r, e)), "Tt");
var lo = tt((dy, uo) => {
  var vi = 0, ro = -3;
  function Ir() {
    this.table = new Uint16Array(16), this.trans = new Uint16Array(288);
  }
  __name(Ir, "Ir");
  function Jl(e, t) {
    this.source = e, this.sourceIndex = 0, this.tag = 0, this.bitcount = 0, this.dest = t, this.destLen = 0, this.ltree = new Ir(), this.dtree = new Ir();
  }
  __name(Jl, "Jl");
  var no = new Ir(), io = new Ir(), gi = new Uint8Array(30), mi = new Uint16Array(30), ao = new Uint8Array(30), oo = new Uint16Array(30), Kl = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), Ka = new Ir(), Wt = new Uint8Array(288 + 32);
  function so(e, t, r, n) {
    var i, a;
    for (i = 0; i < r; ++i)
      e[i] = 0;
    for (i = 0; i < 30 - r; ++i)
      e[i + r] = i / r | 0;
    for (a = n, i = 0; i < 30; ++i)
      t[i] = a, a += 1 << e[i];
  }
  __name(so, "so");
  function ef(e, t) {
    var r;
    for (r = 0; r < 7; ++r)
      e.table[r] = 0;
    for (e.table[7] = 24, e.table[8] = 152, e.table[9] = 112, r = 0; r < 24; ++r)
      e.trans[r] = 256 + r;
    for (r = 0; r < 144; ++r)
      e.trans[24 + r] = r;
    for (r = 0; r < 8; ++r)
      e.trans[24 + 144 + r] = 280 + r;
    for (r = 0; r < 112; ++r)
      e.trans[24 + 144 + 8 + r] = 144 + r;
    for (r = 0; r < 5; ++r)
      t.table[r] = 0;
    for (t.table[5] = 32, r = 0; r < 32; ++r)
      t.trans[r] = r;
  }
  __name(ef, "ef");
  var eo = new Uint16Array(16);
  function hi(e, t, r, n) {
    var i, a;
    for (i = 0; i < 16; ++i)
      e.table[i] = 0;
    for (i = 0; i < n; ++i)
      e.table[t[r + i]]++;
    for (e.table[0] = 0, a = 0, i = 0; i < 16; ++i)
      eo[i] = a, a += e.table[i];
    for (i = 0; i < n; ++i)
      t[r + i] && (e.trans[eo[t[r + i]]++] = i);
  }
  __name(hi, "hi");
  function tf(e) {
    e.bitcount-- || (e.tag = e.source[e.sourceIndex++], e.bitcount = 7);
    var t = e.tag & 1;
    return e.tag >>>= 1, t;
  }
  __name(tf, "tf");
  function $t(e, t, r) {
    if (!t)
      return r;
    for (; e.bitcount < 24; )
      e.tag |= e.source[e.sourceIndex++] << e.bitcount, e.bitcount += 8;
    var n = e.tag & 65535 >>> 16 - t;
    return e.tag >>>= t, e.bitcount -= t, n + r;
  }
  __name($t, "$t");
  function di(e, t) {
    for (; e.bitcount < 24; )
      e.tag |= e.source[e.sourceIndex++] << e.bitcount, e.bitcount += 8;
    var r = 0, n = 0, i = 0, a = e.tag;
    do
      n = 2 * n + (a & 1), a >>>= 1, ++i, r += t.table[i], n -= t.table[i];
    while (n >= 0);
    return e.tag = a, e.bitcount -= i, t.trans[r + n];
  }
  __name(di, "di");
  function rf(e, t, r) {
    var n, i, a, o, u, s;
    for (n = $t(e, 5, 257), i = $t(e, 5, 1), a = $t(e, 4, 4), o = 0; o < 19; ++o)
      Wt[o] = 0;
    for (o = 0; o < a; ++o) {
      var l = $t(e, 3, 0);
      Wt[Kl[o]] = l;
    }
    for (hi(Ka, Wt, 0, 19), u = 0; u < n + i; ) {
      var f = di(e, Ka);
      switch (f) {
        case 16:
          var c = Wt[u - 1];
          for (s = $t(e, 2, 3); s; --s)
            Wt[u++] = c;
          break;
        case 17:
          for (s = $t(e, 3, 3); s; --s)
            Wt[u++] = 0;
          break;
        case 18:
          for (s = $t(e, 7, 11); s; --s)
            Wt[u++] = 0;
          break;
        default:
          Wt[u++] = f;
          break;
      }
    }
    hi(t, Wt, 0, n), hi(r, Wt, n, i);
  }
  __name(rf, "rf");
  function to(e, t, r) {
    for (; ; ) {
      var n = di(e, t);
      if (n === 256)
        return vi;
      if (n < 256)
        e.dest[e.destLen++] = n;
      else {
        var i, a, o, u;
        for (n -= 257, i = $t(e, gi[n], mi[n]), a = di(e, r), o = e.destLen - $t(e, ao[a], oo[a]), u = o; u < o + i; ++u)
          e.dest[e.destLen++] = e.dest[u];
      }
    }
  }
  __name(to, "to");
  function nf(e) {
    for (var t, r, n; e.bitcount > 8; )
      e.sourceIndex--, e.bitcount -= 8;
    if (t = e.source[e.sourceIndex + 1], t = 256 * t + e.source[e.sourceIndex], r = e.source[e.sourceIndex + 3], r = 256 * r + e.source[e.sourceIndex + 2], t !== (~r & 65535))
      return ro;
    for (e.sourceIndex += 4, n = t; n; --n)
      e.dest[e.destLen++] = e.source[e.sourceIndex++];
    return e.bitcount = 0, vi;
  }
  __name(nf, "nf");
  function af(e, t) {
    var r = new Jl(e, t), n, i, a;
    do {
      switch (n = tf(r), i = $t(r, 2, 0), i) {
        case 0:
          a = nf(r);
          break;
        case 1:
          a = to(r, no, io);
          break;
        case 2:
          rf(r, r.ltree, r.dtree), a = to(r, r.ltree, r.dtree);
          break;
        default:
          a = ro;
      }
      if (a !== vi)
        throw new Error("Data error");
    } while (!n);
    return r.destLen < r.dest.length ? typeof r.dest.slice == "function" ? r.dest.slice(0, r.destLen) : r.dest.subarray(0, r.destLen) : r.dest;
  }
  __name(af, "af");
  ef(no, io);
  so(gi, mi, 4, 3);
  so(ao, oo, 2, 1);
  gi[28] = 0;
  mi[28] = 258;
  uo.exports = af;
});
var po = tt((vy, co) => {
  var of = new Uint8Array(new Uint32Array([305419896]).buffer)[0] === 18, fo = /* @__PURE__ */ __name((e, t, r) => {
    let n = e[t];
    e[t] = e[r], e[r] = n;
  }, "fo"), sf = /* @__PURE__ */ __name((e) => {
    let t = e.length;
    for (let r = 0; r < t; r += 4)
      fo(e, r, r + 3), fo(e, r + 1, r + 2);
  }, "sf"), uf = /* @__PURE__ */ __name((e) => {
    of && sf(e);
  }, "uf");
  co.exports = { swap32LE: uf };
});
var mo = tt((gy, go) => {
  var ho = lo(), { swap32LE: lf } = po(), bi = 6 + 5, mr = 5, ff = bi - mr, cf = 65536 >> bi, pf = 1 << ff, hf = pf - 1, dn = 2, df = 1 << mr, Di = df - 1, vo = 65536 >> mr, vf = 1024 >> mr, gf = vo + vf, mf = gf, Df = 32, yf = mf + Df, bf = 1 << dn, yi = /* @__PURE__ */ __name(class {
    constructor(t) {
      let r = typeof t.readUInt32BE == "function" && typeof t.slice == "function";
      if (r || t instanceof Uint8Array) {
        let n;
        if (r)
          this.highStart = t.readUInt32LE(0), this.errorValue = t.readUInt32LE(4), n = t.readUInt32LE(8), t = t.slice(12);
        else {
          let i = new DataView(t.buffer);
          this.highStart = i.getUint32(0, true), this.errorValue = i.getUint32(4, true), n = i.getUint32(8, true), t = t.subarray(12);
        }
        t = ho(t, new Uint8Array(n)), t = ho(t, new Uint8Array(n)), lf(t), this.data = new Uint32Array(t.buffer);
      } else
        ({ data: this.data, highStart: this.highStart, errorValue: this.errorValue } = t);
    }
    get(t) {
      let r;
      return t < 0 || t > 1114111 ? this.errorValue : t < 55296 || t > 56319 && t <= 65535 ? (r = (this.data[t >> mr] << dn) + (t & Di), this.data[r]) : t <= 65535 ? (r = (this.data[vo + (t - 55296 >> mr)] << dn) + (t & Di), this.data[r]) : t < this.highStart ? (r = this.data[yf - cf + (t >> bi)], r = this.data[r + (t >> mr & hf)], r = (r << dn) + (t & Di), this.data[r]) : this.data[this.data.length - bf];
    }
  }, "yi");
  go.exports = yi;
});
var Do = tt((vn) => {
  var xf = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  (function(e) {
    "use strict";
    var t = typeof Uint8Array < "u" ? Uint8Array : Array, r = "+".charCodeAt(0), n = "/".charCodeAt(0), i = "0".charCodeAt(0), a = "a".charCodeAt(0), o = "A".charCodeAt(0), u = "-".charCodeAt(0), s = "_".charCodeAt(0);
    function l(p) {
      var v = p.charCodeAt(0);
      if (v === r || v === u)
        return 62;
      if (v === n || v === s)
        return 63;
      if (v < i)
        return -1;
      if (v < i + 10)
        return v - i + 26 + 26;
      if (v < o + 26)
        return v - o;
      if (v < a + 26)
        return v - a + 26;
    }
    __name(l, "l");
    function f(p) {
      var v, D, d, g, y, b;
      if (p.length % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
      var S = p.length;
      y = p.charAt(S - 2) === "=" ? 2 : p.charAt(S - 1) === "=" ? 1 : 0, b = new t(p.length * 3 / 4 - y), d = y > 0 ? p.length - 4 : p.length;
      var k = 0;
      function C(E) {
        b[k++] = E;
      }
      __name(C, "C");
      for (v = 0, D = 0; v < d; v += 4, D += 3)
        g = l(p.charAt(v)) << 18 | l(p.charAt(v + 1)) << 12 | l(p.charAt(v + 2)) << 6 | l(p.charAt(v + 3)), C((g & 16711680) >> 16), C((g & 65280) >> 8), C(g & 255);
      return y === 2 ? (g = l(p.charAt(v)) << 2 | l(p.charAt(v + 1)) >> 4, C(g & 255)) : y === 1 && (g = l(p.charAt(v)) << 10 | l(p.charAt(v + 1)) << 4 | l(p.charAt(v + 2)) >> 2, C(g >> 8 & 255), C(g & 255)), b;
    }
    __name(f, "f");
    function c(p) {
      var v, D = p.length % 3, d = "", g, y;
      function b(k) {
        return xf.charAt(k);
      }
      __name(b, "b");
      function S(k) {
        return b(k >> 18 & 63) + b(k >> 12 & 63) + b(k >> 6 & 63) + b(k & 63);
      }
      __name(S, "S");
      for (v = 0, y = p.length - D; v < y; v += 3)
        g = (p[v] << 16) + (p[v + 1] << 8) + p[v + 2], d += S(g);
      switch (D) {
        case 1:
          g = p[p.length - 1], d += b(g >> 2), d += b(g << 4 & 63), d += "==";
          break;
        case 2:
          g = (p[p.length - 2] << 8) + p[p.length - 1], d += b(g >> 10), d += b(g >> 4 & 63), d += b(g << 2 & 63), d += "=";
          break;
      }
      return d;
    }
    __name(c, "c");
    e.toByteArray = f, e.fromByteArray = c;
  })(typeof vn > "u" ? vn.base64js = {} : vn);
});
var To = tt((yy, _o) => {
  var Ci = "(".charCodeAt(0), Si = ")".charCodeAt(0), mn = "'".charCodeAt(0), ki = '"'.charCodeAt(0), _i = "\\".charCodeAt(0), Sr = "/".charCodeAt(0), Ti = ",".charCodeAt(0), Ai = ":".charCodeAt(0), Dn = "*".charCodeAt(0), Rf = "u".charCodeAt(0), Uf = "U".charCodeAt(0), Bf = "+".charCodeAt(0), Nf = /^[a-f0-9?-]+$/i;
  _o.exports = function(e) {
    for (var t = [], r = e, n, i, a, o, u, s, l, f, c = 0, p = r.charCodeAt(c), v = r.length, D = [{ nodes: t }], d = 0, g, y = "", b = "", S = ""; c < v; )
      if (p <= 32) {
        n = c;
        do
          n += 1, p = r.charCodeAt(n);
        while (p <= 32);
        o = r.slice(c, n), a = t[t.length - 1], p === Si && d ? S = o : a && a.type === "div" ? (a.after = o, a.sourceEndIndex += o.length) : p === Ti || p === Ai || p === Sr && r.charCodeAt(n + 1) !== Dn && (!g || g && g.type === "function" && g.value !== "calc") ? b = o : t.push({ type: "space", sourceIndex: c, sourceEndIndex: n, value: o }), c = n;
      } else if (p === mn || p === ki) {
        n = c, i = p === mn ? "'" : '"', o = { type: "string", sourceIndex: c, quote: i };
        do
          if (u = false, n = r.indexOf(i, n + 1), ~n)
            for (s = n; r.charCodeAt(s - 1) === _i; )
              s -= 1, u = !u;
          else
            r += i, n = r.length - 1, o.unclosed = true;
        while (u);
        o.value = r.slice(c + 1, n), o.sourceEndIndex = o.unclosed ? n : n + 1, t.push(o), c = n + 1, p = r.charCodeAt(c);
      } else if (p === Sr && r.charCodeAt(c + 1) === Dn)
        n = r.indexOf("*/", c), o = { type: "comment", sourceIndex: c, sourceEndIndex: n + 2 }, n === -1 && (o.unclosed = true, n = r.length, o.sourceEndIndex = n), o.value = r.slice(c + 2, n), t.push(o), c = n + 2, p = r.charCodeAt(c);
      else if ((p === Sr || p === Dn) && g && g.type === "function" && g.value === "calc")
        o = r[c], t.push({ type: "word", sourceIndex: c - b.length, sourceEndIndex: c + o.length, value: o }), c += 1, p = r.charCodeAt(c);
      else if (p === Sr || p === Ti || p === Ai)
        o = r[c], t.push({ type: "div", sourceIndex: c - b.length, sourceEndIndex: c + o.length, value: o, before: b, after: "" }), b = "", c += 1, p = r.charCodeAt(c);
      else if (Ci === p) {
        n = c;
        do
          n += 1, p = r.charCodeAt(n);
        while (p <= 32);
        if (f = c, o = { type: "function", sourceIndex: c - y.length, value: y, before: r.slice(f + 1, n) }, c = n, y === "url" && p !== mn && p !== ki) {
          n -= 1;
          do
            if (u = false, n = r.indexOf(")", n + 1), ~n)
              for (s = n; r.charCodeAt(s - 1) === _i; )
                s -= 1, u = !u;
            else
              r += ")", n = r.length - 1, o.unclosed = true;
          while (u);
          l = n;
          do
            l -= 1, p = r.charCodeAt(l);
          while (p <= 32);
          f < l ? (c !== l + 1 ? o.nodes = [{ type: "word", sourceIndex: c, sourceEndIndex: l + 1, value: r.slice(c, l + 1) }] : o.nodes = [], o.unclosed && l + 1 !== n ? (o.after = "", o.nodes.push({ type: "space", sourceIndex: l + 1, sourceEndIndex: n, value: r.slice(l + 1, n) })) : (o.after = r.slice(l + 1, n), o.sourceEndIndex = n)) : (o.after = "", o.nodes = []), c = n + 1, o.sourceEndIndex = o.unclosed ? n : c, p = r.charCodeAt(c), t.push(o);
        } else
          d += 1, o.after = "", o.sourceEndIndex = c + 1, t.push(o), D.push(o), t = o.nodes = [], g = o;
        y = "";
      } else if (Si === p && d)
        c += 1, p = r.charCodeAt(c), g.after = S, g.sourceEndIndex += S.length, S = "", d -= 1, D[D.length - 1].sourceEndIndex = c, D.pop(), g = D[d], t = g.nodes;
      else {
        n = c;
        do
          p === _i && (n += 1), n += 1, p = r.charCodeAt(n);
        while (n < v && !(p <= 32 || p === mn || p === ki || p === Ti || p === Ai || p === Sr || p === Ci || p === Dn && g && g.type === "function" && g.value === "calc" || p === Sr && g.type === "function" && g.value === "calc" || p === Si && d));
        o = r.slice(c, n), Ci === p ? y = o : (Rf === o.charCodeAt(0) || Uf === o.charCodeAt(0)) && Bf === o.charCodeAt(1) && Nf.test(o.slice(2)) ? t.push({ type: "unicode-range", sourceIndex: c, sourceEndIndex: n, value: o }) : t.push({ type: "word", sourceIndex: c, sourceEndIndex: n, value: o }), c = n;
      }
    for (c = D.length - 1; c; c -= 1)
      D[c].unclosed = true, D[c].sourceEndIndex = r.length;
    return D[0].nodes;
  };
});
var Oo = tt((by, Ao) => {
  Ao.exports = /* @__PURE__ */ __name(function e(t, r, n) {
    var i, a, o, u;
    for (i = 0, a = t.length; i < a; i += 1)
      o = t[i], n || (u = r(o, i, t)), u !== false && o.type === "function" && Array.isArray(o.nodes) && e(o.nodes, r, n), n && r(o, i, t);
  }, "e");
});
var Ro = tt((xy, Io) => {
  function Lo(e, t) {
    var r = e.type, n = e.value, i, a;
    return t && (a = t(e)) !== void 0 ? a : r === "word" || r === "space" ? n : r === "string" ? (i = e.quote || "", i + n + (e.unclosed ? "" : i)) : r === "comment" ? "/*" + n + (e.unclosed ? "" : "*/") : r === "div" ? (e.before || "") + n + (e.after || "") : Array.isArray(e.nodes) ? (i = Po(e.nodes, t), r !== "function" ? i : n + "(" + (e.before || "") + i + (e.after || "") + (e.unclosed ? "" : ")")) : n;
  }
  __name(Lo, "Lo");
  function Po(e, t) {
    var r, n;
    if (Array.isArray(e)) {
      for (r = "", n = e.length - 1; ~n; n -= 1)
        r = Lo(e[n], t) + r;
      return r;
    }
    return Lo(e, t);
  }
  __name(Po, "Po");
  Io.exports = Po;
});
var Bo = tt((wy, Uo) => {
  var yn = "-".charCodeAt(0), bn = "+".charCodeAt(0), Oi = ".".charCodeAt(0), Mf = "e".charCodeAt(0), Gf = "E".charCodeAt(0);
  function Wf(e) {
    var t = e.charCodeAt(0), r;
    if (t === bn || t === yn) {
      if (r = e.charCodeAt(1), r >= 48 && r <= 57)
        return true;
      var n = e.charCodeAt(2);
      return r === Oi && n >= 48 && n <= 57;
    }
    return t === Oi ? (r = e.charCodeAt(1), r >= 48 && r <= 57) : t >= 48 && t <= 57;
  }
  __name(Wf, "Wf");
  Uo.exports = function(e) {
    var t = 0, r = e.length, n, i, a;
    if (r === 0 || !Wf(e))
      return false;
    for (n = e.charCodeAt(t), (n === bn || n === yn) && t++; t < r && (n = e.charCodeAt(t), !(n < 48 || n > 57)); )
      t += 1;
    if (n = e.charCodeAt(t), i = e.charCodeAt(t + 1), n === Oi && i >= 48 && i <= 57)
      for (t += 2; t < r && (n = e.charCodeAt(t), !(n < 48 || n > 57)); )
        t += 1;
    if (n = e.charCodeAt(t), i = e.charCodeAt(t + 1), a = e.charCodeAt(t + 2), (n === Mf || n === Gf) && (i >= 48 && i <= 57 || (i === bn || i === yn) && a >= 48 && a <= 57))
      for (t += i === bn || i === yn ? 3 : 2; t < r && (n = e.charCodeAt(t), !(n < 48 || n > 57)); )
        t += 1;
    return { number: e.slice(0, t), unit: e.slice(t) };
  };
});
var Li = tt((Ey, Go) => {
  var $f = To(), No = Oo(), Mo = Ro();
  function ar(e) {
    return this instanceof ar ? (this.nodes = $f(e), this) : new ar(e);
  }
  __name(ar, "ar");
  ar.prototype.toString = function() {
    return Array.isArray(this.nodes) ? Mo(this.nodes) : "";
  };
  ar.prototype.walk = function(e, t) {
    return No(this.nodes, e, t), this;
  };
  ar.unit = Bo();
  ar.walk = No;
  ar.stringify = Mo;
  Go.exports = ar;
});
var jo = tt((Fy, $o) => {
  "use strict";
  $o.exports = function(e) {
    return typeof e == "string" ? Wo(e) : Pi(e);
  };
  function Pi(e) {
    return !e || typeof e != "object" || Vf(e) || zf(e) ? e : jf(e) ? qf(e, Pi) : Yf(Xf(e), function(t, r) {
      var n = Wo(r);
      return t[n] = Pi(e[r]), t;
    }, {});
  }
  __name(Pi, "Pi");
  function Wo(e) {
    return e.replace(/[_.-](\w|$)/g, function(t, r) {
      return r.toUpperCase();
    });
  }
  __name(Wo, "Wo");
  var jf = Array.isArray || function(e) {
    return Object.prototype.toString.call(e) === "[object Array]";
  }, Vf = /* @__PURE__ */ __name(function(e) {
    return Object.prototype.toString.call(e) === "[object Date]";
  }, "Vf"), zf = /* @__PURE__ */ __name(function(e) {
    return Object.prototype.toString.call(e) === "[object RegExp]";
  }, "zf"), Hf = Object.prototype.hasOwnProperty, Xf = Object.keys || function(e) {
    var t = [];
    for (var r in e)
      Hf.call(e, r) && t.push(r);
    return t;
  };
  function qf(e, t) {
    if (e.map)
      return e.map(t);
    for (var r = [], n = 0; n < e.length; n++)
      r.push(t(e[n], n));
    return r;
  }
  __name(qf, "qf");
  function Yf(e, t, r) {
    if (e.reduce)
      return e.reduce(t, r);
    for (var n = 0; n < e.length; n++)
      r = t(r, e[n], n);
    return r;
  }
  __name(Yf, "Yf");
});
var Vo = tt((Cy, Zf) => {
  Zf.exports = { black: "#000000", silver: "#c0c0c0", gray: "#808080", white: "#ffffff", maroon: "#800000", red: "#ff0000", purple: "#800080", fuchsia: "#ff00ff", green: "#008000", lime: "#00ff00", olive: "#808000", yellow: "#ffff00", navy: "#000080", blue: "#0000ff", teal: "#008080", aqua: "#00ffff", orange: "#ffa500", aliceblue: "#f0f8ff", antiquewhite: "#faebd7", aquamarine: "#7fffd4", azure: "#f0ffff", beige: "#f5f5dc", bisque: "#ffe4c4", blanchedalmond: "#ffebcd", blueviolet: "#8a2be2", brown: "#a52a2a", burlywood: "#deb887", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", cornflowerblue: "#6495ed", cornsilk: "#fff8dc", crimson: "#dc143c", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkgray: "#a9a9a9", darkgreen: "#006400", darkgrey: "#a9a9a9", darkkhaki: "#bdb76b", darkmagenta: "#8b008b", darkolivegreen: "#556b2f", darkorange: "#ff8c00", darkorchid: "#9932cc", darkred: "#8b0000", darksalmon: "#e9967a", darkseagreen: "#8fbc8f", darkslateblue: "#483d8b", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", darkturquoise: "#00ced1", darkviolet: "#9400d3", deeppink: "#ff1493", deepskyblue: "#00bfff", dimgray: "#696969", dimgrey: "#696969", dodgerblue: "#1e90ff", firebrick: "#b22222", floralwhite: "#fffaf0", forestgreen: "#228b22", gainsboro: "#dcdcdc", ghostwhite: "#f8f8ff", gold: "#ffd700", goldenrod: "#daa520", greenyellow: "#adff2f", grey: "#808080", honeydew: "#f0fff0", hotpink: "#ff69b4", indianred: "#cd5c5c", indigo: "#4b0082", ivory: "#fffff0", khaki: "#f0e68c", lavender: "#e6e6fa", lavenderblush: "#fff0f5", lawngreen: "#7cfc00", lemonchiffon: "#fffacd", lightblue: "#add8e6", lightcoral: "#f08080", lightcyan: "#e0ffff", lightgoldenrodyellow: "#fafad2", lightgray: "#d3d3d3", lightgreen: "#90ee90", lightgrey: "#d3d3d3", lightpink: "#ffb6c1", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", lightskyblue: "#87cefa", lightslategray: "#778899", lightslategrey: "#778899", lightsteelblue: "#b0c4de", lightyellow: "#ffffe0", limegreen: "#32cd32", linen: "#faf0e6", mediumaquamarine: "#66cdaa", mediumblue: "#0000cd", mediumorchid: "#ba55d3", mediumpurple: "#9370db", mediumseagreen: "#3cb371", mediumslateblue: "#7b68ee", mediumspringgreen: "#00fa9a", mediumturquoise: "#48d1cc", mediumvioletred: "#c71585", midnightblue: "#191970", mintcream: "#f5fffa", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", navajowhite: "#ffdead", oldlace: "#fdf5e6", olivedrab: "#6b8e23", orangered: "#ff4500", orchid: "#da70d6", palegoldenrod: "#eee8aa", palegreen: "#98fb98", paleturquoise: "#afeeee", palevioletred: "#db7093", papayawhip: "#ffefd5", peachpuff: "#ffdab9", peru: "#cd853f", pink: "#ffc0cb", plum: "#dda0dd", powderblue: "#b0e0e6", rosybrown: "#bc8f8f", royalblue: "#4169e1", saddlebrown: "#8b4513", salmon: "#fa8072", sandybrown: "#f4a460", seagreen: "#2e8b57", seashell: "#fff5ee", sienna: "#a0522d", skyblue: "#87ceeb", slateblue: "#6a5acd", slategray: "#708090", slategrey: "#708090", snow: "#fffafa", springgreen: "#00ff7f", steelblue: "#4682b4", tan: "#d2b48c", thistle: "#d8bfd8", tomato: "#ff6347", turquoise: "#40e0d0", violet: "#ee82ee", wheat: "#f5deb3", whitesmoke: "#f5f5f5", yellowgreen: "#9acd32", rebeccapurple: "#663399" };
});
var Ho = tt((Sy, zo) => {
  "use strict";
  zo.exports = Vo();
});
var wn = tt((Tr) => {
  "use strict";
  Object.defineProperty(Tr, "__esModule", { value: true });
  function Ni(e) {
    return e && typeof e == "object" && "default" in e ? e.default : e;
  }
  __name(Ni, "Ni");
  var Yo = Li(), Qf = Ni(Yo), Jf = Ni(jo()), Kf = Ni(Ho()), ec = /* @__PURE__ */ __name(function(t) {
    return t.type !== "string" ? null : t.value.replace(/\\([0-9a-f]{1,6})(?:\s|$)/gi, function(r, n) {
      return String.fromCharCode(parseInt(n, 16));
    }).replace(/\\/g, "");
  }, "ec"), tc = /^(#(?:[0-9a-f]{3,4}){1,2})$/i, rc = /^(rgba?|hsla?|hwb|lab|lch|gray|color)$/, nc = /* @__PURE__ */ __name(function(t) {
    return t.type === "word" && (tc.test(t.value) || t.value in Kf || t.value === "transparent") ? t.value : t.type === "function" && rc.test(t.value) ? Yo.stringify(t) : null;
  }, "nc"), ic = /^(none)$/i, ac = /^(auto)$/i, oc = /(^-?[_a-z][_a-z0-9-]*$)/i, sc = /^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?)$/i, uc = /^(0$|(?:[+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?)(?=px$))/i, lc = /^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?(ch|em|ex|rem|vh|vw|vmin|vmax|cm|mm|in|pc|pt))$/i, fc = /^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?(?:deg|rad))$/i, cc = /^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?%)$/i, Mi = /* @__PURE__ */ __name(function(t) {
    return function(r) {
      return t(r) ? "<token>" : null;
    };
  }, "Mi"), pc = /* @__PURE__ */ __name(function(t) {
    return function(r) {
      return r.type === t ? r.value : null;
    };
  }, "pc"), Xe = /* @__PURE__ */ __name(function(t, r) {
    return r === void 0 && (r = String), function(n) {
      if (n.type !== "word")
        return null;
      var i = n.value.match(t);
      if (i === null)
        return null;
      var a = r(i[1]);
      return a;
    };
  }, "Xe"), Ze = Mi(function(e) {
    return e.type === "space";
  }), Zo = Mi(function(e) {
    return e.type === "div" && e.value === "/";
  }), hc = Mi(function(e) {
    return e.type === "div" && e.value === ",";
  }), dc = pc("word"), Gi = Xe(ic), Ui = Xe(ac), _r = Xe(sc, Number), gt = Xe(uc, Number), Yt = Xe(lc), Qo = Xe(fc, function(e) {
    return e.toLowerCase();
  }), Wi = Xe(cc), xn = Xe(oc), vc = ec, Br = nc, Bi = Xe(/^(none|underline|line-through)$/i), gc = /* @__PURE__ */ __name(function(t) {
    var r = t.expect(_r);
    return t.hasTokens() && (t.expect(Zo), r /= t.expect(_r)), { aspectRatio: r };
  }, "gc"), mc = Xe(/^(solid|dashed|dotted)$/), Dc = 1, yc = "black", bc = "solid", xc = /* @__PURE__ */ __name(function(t) {
    var r, n, i;
    if (t.matches(Gi))
      return t.expectEmpty(), { borderWidth: 0, borderColor: "black", borderStyle: "solid" };
    for (var a = 0; a < 3 && t.hasTokens(); )
      a !== 0 && t.expect(Ze), r === void 0 && t.matches(gt, Yt) ? r = t.lastValue : n === void 0 && t.matches(Br) ? n = t.lastValue : i === void 0 && t.matches(mc) ? i = t.lastValue : t.throw(), a += 1;
    return t.expectEmpty(), r === void 0 && (r = Dc), n === void 0 && (n = yc), i === void 0 && (i = bc), { borderWidth: r, borderColor: n, borderStyle: i };
  }, "xc"), Nr = /* @__PURE__ */ __name(function(t) {
    var r = t.types, n = r === void 0 ? [gt, Yt, Wi] : r, i = t.directions, a = i === void 0 ? ["Top", "Right", "Bottom", "Left"] : i, o = t.prefix, u = o === void 0 ? "" : o, s = t.suffix, l = s === void 0 ? "" : s;
    return function(f) {
      var c, p = [];
      for (p.push(f.expect.apply(f, n)); p.length < 4 && f.hasTokens(); )
        f.expect(Ze), p.push(f.expect.apply(f, n));
      f.expectEmpty();
      var v = p[0], D = p[1], d = D === void 0 ? v : D, g = p[2], y = g === void 0 ? v : g, b = p[3], S = b === void 0 ? d : b, k = /* @__PURE__ */ __name(function(E) {
        return "" + u + a[E] + l;
      }, "k");
      return c = {}, c[k(0)] = v, c[k(1)] = d, c[k(2)] = y, c[k(3)] = S, c;
    };
  }, "Nr"), Jo = /* @__PURE__ */ __name(function(t) {
    var r = t.expect(gt), n = t.matches(Ze) ? t.expect(gt) : r;
    return t.expectEmpty(), { width: r, height: n };
  }, "Jo"), Ko = /* @__PURE__ */ __name(function(t) {
    var r, n, i, a;
    if (t.matches(Gi))
      return t.expectEmpty(), { offset: { width: 0, height: 0 }, radius: 0, color: "black" };
    for (var o = false; t.hasTokens(); )
      o && t.expect(Ze), r === void 0 && t.matches(gt, Yt) ? (r = t.lastValue, t.expect(Ze), n = t.expect(gt, Yt), t.saveRewindPoint(), t.matches(Ze) && t.matches(gt, Yt) ? i = t.lastValue : t.rewind()) : a === void 0 && t.matches(Br) ? a = t.lastValue : t.throw(), o = true;
    return r === void 0 && t.throw(), { offset: { width: r, height: n }, radius: i !== void 0 ? i : 0, color: a !== void 0 ? a : "black" };
  }, "Ko"), wc = /* @__PURE__ */ __name(function(t) {
    var r = Ko(t), n = r.offset, i = r.radius, a = r.color;
    return { shadowOffset: n, shadowRadius: i, shadowColor: a, shadowOpacity: 1 };
  }, "wc"), Ec = 1, Fc = 1, Cc = 0, Sc = /* @__PURE__ */ __name(function(t) {
    var r, n, i;
    if (t.matches(Gi))
      return t.expectEmpty(), { flexGrow: 0, flexShrink: 0, flexBasis: "auto" };
    if (t.saveRewindPoint(), t.matches(Ui) && !t.hasTokens())
      return { flexGrow: 1, flexShrink: 1, flexBasis: "auto" };
    t.rewind();
    for (var a = 0; a < 2 && t.hasTokens(); )
      a !== 0 && t.expect(Ze), r === void 0 && t.matches(_r) ? (r = t.lastValue, t.saveRewindPoint(), t.matches(Ze) && t.matches(_r) ? n = t.lastValue : t.rewind()) : i === void 0 && t.matches(gt, Yt, Wi) ? i = t.lastValue : i === void 0 && t.matches(Ui) ? i = "auto" : t.throw(), a += 1;
    return t.expectEmpty(), r === void 0 && (r = Ec), n === void 0 && (n = Fc), i === void 0 && (i = Cc), { flexGrow: r, flexShrink: n, flexBasis: i };
  }, "Sc"), kc = Xe(/(nowrap|wrap|wrap-reverse)/), _c = Xe(/(row|row-reverse|column|column-reverse)/), Tc = "nowrap", Ac = "row", Oc = /* @__PURE__ */ __name(function(t) {
    for (var r, n, i = 0; i < 2 && t.hasTokens(); )
      i !== 0 && t.expect(Ze), r === void 0 && t.matches(kc) ? r = t.lastValue : n === void 0 && t.matches(_c) ? n = t.lastValue : t.throw(), i += 1;
    return t.expectEmpty(), r === void 0 && (r = Tc), n === void 0 && (n = Ac), { flexWrap: r, flexDirection: n };
  }, "Oc"), es = /* @__PURE__ */ __name(function(t) {
    var r;
    if (t.matches(vc))
      r = t.lastValue;
    else
      for (r = t.expect(xn); t.hasTokens(); ) {
        t.expect(Ze);
        var n = t.expect(xn);
        r += " " + n;
      }
    return t.expectEmpty(), { fontFamily: r };
  }, "es"), Lc = Xe(/^(normal)$/), Pc = Xe(/^(italic)$/), Ic = Xe(/^([1-9]00|bold)$/), Rc = Xe(/^(small-caps)$/), Uc = "normal", Bc = "normal", Nc = [], Mc = /* @__PURE__ */ __name(function(t) {
    for (var r, n, i, a, o = 0; o < 3 && t.hasTokens(); ) {
      if (!t.matches(Lc))
        if (r === void 0 && t.matches(Pc))
          r = t.lastValue;
        else if (n === void 0 && t.matches(Ic))
          n = t.lastValue;
        else if (i === void 0 && t.matches(Rc))
          i = [t.lastValue];
        else
          break;
      t.expect(Ze), o += 1;
    }
    var u = t.expect(gt, Yt);
    t.matches(Zo) && (a = t.expect(gt, Yt)), t.expect(Ze);
    var s = es(t), l = s.fontFamily;
    r === void 0 && (r = Uc), n === void 0 && (n = Bc), i === void 0 && (i = Nc);
    var f = { fontStyle: r, fontWeight: n, fontVariant: i, fontSize: u, fontFamily: l };
    return a !== void 0 && (f.lineHeight = a), f;
  }, "Mc"), Gc = /* @__PURE__ */ __name(function(t) {
    for (var r = [t.expect(xn)]; t.hasTokens(); )
      t.expect(Ze), r.push(t.expect(xn));
    return { fontVariant: r };
  }, "Gc"), Wc = Xe(/(flex-(?:start|end)|center|stretch|space-(?:between|around))/), $c = Xe(/(flex-(?:start|end)|center|space-(?:between|around|evenly))/), jc = /* @__PURE__ */ __name(function(t) {
    var r = t.expect(Wc), n;
    return t.hasTokens() ? (t.expect(Ze), n = t.expect($c)) : n = "stretch", t.expectEmpty(), { alignContent: r, justifyContent: n };
  }, "jc"), Vc = Xe(/^(solid|double|dotted|dashed)$/), zc = "none", Hc = "solid", Xc = "black", qc = /* @__PURE__ */ __name(function(t) {
    for (var r, n, i, a = false; t.hasTokens(); ) {
      if (a && t.expect(Ze), r === void 0 && t.matches(Bi)) {
        var o = [t.lastValue.toLowerCase()];
        t.saveRewindPoint(), o[0] !== "none" && t.matches(Ze) && t.matches(Bi) ? (o.push(t.lastValue.toLowerCase()), o.sort().reverse()) : t.rewind(), r = o.join(" ");
      } else
        n === void 0 && t.matches(Vc) ? n = t.lastValue : i === void 0 && t.matches(Br) ? i = t.lastValue : t.throw();
      a = true;
    }
    return { textDecorationLine: r !== void 0 ? r : zc, textDecorationColor: i !== void 0 ? i : Xc, textDecorationStyle: n !== void 0 ? n : Hc };
  }, "qc"), Yc = /* @__PURE__ */ __name(function(t) {
    for (var r = [], n = false; t.hasTokens(); )
      n && t.expect(Ze), r.push(t.expect(Bi).toLowerCase()), n = true;
    return r.sort().reverse(), { textDecorationLine: r.join(" ") };
  }, "Yc"), Zc = /* @__PURE__ */ __name(function(t) {
    var r = Ko(t), n = r.offset, i = r.radius, a = r.color;
    return { textShadowOffset: n, textShadowRadius: i, textShadowColor: a };
  }, "Zc"), $i = /* @__PURE__ */ __name(function(t) {
    return function(r) {
      var n = r.expect(t);
      return r.expectEmpty(), n;
    };
  }, "$i"), Ii = $i(_r), Xo = $i(gt), kr = $i(Qo), ji = /* @__PURE__ */ __name(function(t) {
    return function(r, n) {
      return function(i) {
        var a, o, u = i.expect(t), s;
        if (i.hasTokens())
          i.expect(hc), s = i.expect(t);
        else if (n !== void 0)
          s = n;
        else
          return u;
        return i.expectEmpty(), [(a = {}, a[r + "Y"] = s, a), (o = {}, o[r + "X"] = u, o)];
      };
    };
  }, "ji"), Qc = ji(_r), Jc = ji(gt), Kc = ji(Qo), ep = { perspective: Ii, scale: Qc("scale"), scaleX: Ii, scaleY: Ii, translate: Jc("translate", 0), translateX: Xo, translateY: Xo, rotate: kr, rotateX: kr, rotateY: kr, rotateZ: kr, skewX: kr, skewY: kr, skew: Kc("skew", "0deg") }, tp = /* @__PURE__ */ __name(function(t) {
    for (var r = [], n = false; t.hasTokens(); ) {
      n && t.expect(Ze);
      var i = t.expectFunction(), a = i.functionName, o = ep[a](i);
      if (!Array.isArray(o)) {
        var u;
        o = [(u = {}, u[a] = o, u)];
      }
      r = o.concat(r), n = true;
    }
    return { transform: r };
  }, "tp"), rp = /* @__PURE__ */ __name(function(t) {
    return { backgroundColor: t.expect(Br) };
  }, "rp"), np = Nr({ types: [Br], prefix: "border", suffix: "Color" }), ip = Nr({ directions: ["TopLeft", "TopRight", "BottomRight", "BottomLeft"], prefix: "border", suffix: "Radius" }), ap = Nr({ prefix: "border", suffix: "Width" }), op = Nr({ types: [gt, Yt, Wi, Ui], prefix: "margin" }), sp = Nr({ prefix: "padding" }), up = /* @__PURE__ */ __name(function(t) {
    return { fontWeight: t.expect(dc) };
  }, "up"), lp = /* @__PURE__ */ __name(function(t) {
    return { shadowOffset: Jo(t) };
  }, "lp"), fp = /* @__PURE__ */ __name(function(t) {
    return { textShadowOffset: Jo(t) };
  }, "fp"), ts = { aspectRatio: gc, background: rp, border: xc, borderColor: np, borderRadius: ip, borderWidth: ap, boxShadow: wc, flex: Sc, flexFlow: Oc, font: Mc, fontFamily: es, fontVariant: Gc, fontWeight: up, margin: op, padding: sp, placeContent: jc, shadowOffset: lp, textShadow: Zc, textShadowOffset: fp, textDecoration: qc, textDecorationLine: Yc, transform: tp }, qo, ky = qo != null ? new RegExp(qo.join("|")) : null, Ri = "SYMBOL_MATCH", cp = function() {
    function e(r, n) {
      this.index = 0, this.nodes = r, this.functionName = n != null ? n.value : null, this.lastValue = null, this.rewindIndex = -1;
    }
    __name(e, "e");
    var t = e.prototype;
    return t.hasTokens = function() {
      return this.index <= this.nodes.length - 1;
    }, t[Ri] = function() {
      if (!this.hasTokens())
        return null;
      for (var r = this.nodes[this.index], n = 0; n < arguments.length; n += 1) {
        var i = n < 0 || arguments.length <= n ? void 0 : arguments[n], a = i(r);
        if (a !== null)
          return this.index += 1, this.lastValue = a, a;
      }
      return null;
    }, t.matches = function() {
      return this[Ri].apply(this, arguments) !== null;
    }, t.expect = function() {
      var n = this[Ri].apply(this, arguments);
      return n !== null ? n : this.throw();
    }, t.matchesFunction = function() {
      var n = this.nodes[this.index];
      if (n.type !== "function")
        return null;
      var i = new e(n.nodes, n);
      return this.index += 1, this.lastValue = null, i;
    }, t.expectFunction = function() {
      var n = this.matchesFunction();
      return n !== null ? n : this.throw();
    }, t.expectEmpty = function() {
      this.hasTokens() && this.throw();
    }, t.throw = function() {
      throw new Error("Unexpected token type: " + this.nodes[this.index].type);
    }, t.saveRewindPoint = function() {
      this.rewindIndex = this.index;
    }, t.rewind = function() {
      if (this.rewindIndex === -1)
        throw new Error("Internal error");
      this.index = this.rewindIndex, this.lastValue = null;
    }, e;
  }(), pp = /^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?)(?:px)?$/i, hp = /^true|false$/i, dp = /^null$/i, vp = /^undefined$/i, rs = /* @__PURE__ */ __name(function(t, r) {
    if (false)
      var n, i;
    var a = r.match(pp);
    if (a !== null)
      return Number(a[1]);
    var o = r.match(hp);
    if (o !== null)
      return o[0].toLowerCase() === "true";
    var u = r.match(dp);
    if (u !== null)
      return null;
    var s = r.match(vp);
    if (s === null)
      return r;
  }, "rs"), gp = /* @__PURE__ */ __name(function(t, r) {
    var n = Qf(r), i = new cp(n.nodes);
    return ts[t](i);
  }, "gp"), mp = gp, ns = /* @__PURE__ */ __name(function(t, r, n) {
    var i, a = n === false || !(t in ts), o = r.trim(), u = a ? (i = {}, i[t] = rs(t, o), i) : mp(t, o);
    return u;
  }, "ns"), is = /* @__PURE__ */ __name(function(t) {
    var r = /^--\w+/.test(t);
    return r ? t : Jf(t);
  }, "is"), Dp = /* @__PURE__ */ __name(function(t, r) {
    return r === void 0 && (r = []), t.reduce(function(n, i) {
      var a = is(i[0]), o = i[1], u = r.indexOf(a) === -1;
      return Object.assign(n, ns(a, o, u));
    }, {});
  }, "Dp");
  Tr.default = Dp;
  Tr.getPropertyName = is;
  Tr.getStylesForProperty = ns;
  Tr.transformRawValue = rs;
});
var os = tt((as, En) => {
  (function(e) {
    function t(o) {
      if (!(this instanceof t))
        return new t();
      this.backgrounds = o || [];
    }
    __name(t, "t");
    t.prototype.toString = function() {
      return this.backgrounds.join(", ");
    };
    function r(o) {
      if (!(this instanceof r))
        return new r(o);
      o = o || {};
      var u = this;
      function s(l, f) {
        u[l] = l in o ? o[l] : f;
      }
      __name(s, "s");
      s("color", ""), s("image", "none"), s("attachment", "scroll"), s("clip", "border-box"), s("origin", "padding-box"), s("position", "0% 0%"), s("repeat", "repeat"), s("size", "auto");
    }
    __name(r, "r");
    r.prototype.toString = function() {
      var o = [this.image, this.repeat, this.attachment, this.position + " / " + this.size, this.origin, this.clip];
      return this.color && o.unshift(this.color), o.join(" ");
    }, e.BackgroundList = t, e.Background = r;
    function n(o) {
      var u = [], s = /[,\(\)]/, l = 0, f = "";
      if (o == null)
        return u;
      for (; o.length; ) {
        var c = s.exec(o);
        if (!c)
          break;
        var p = c[0], v = false;
        switch (p) {
          case ",":
            l || (u.push(f.trim()), f = "", v = true);
            break;
          case "(":
            l++;
            break;
          case ")":
            l--;
            break;
        }
        var D = c.index + 1;
        f += o.slice(0, v ? D - 1 : D), o = o.slice(D);
      }
      return (f.length || o.length) && u.push((f + o).trim()), u;
    }
    __name(n, "n");
    function i(o) {
      return o.trim();
    }
    __name(i, "i");
    function a(o) {
      return (o || "").split(",").map(i);
    }
    __name(a, "a");
    e.parseElementStyle = function(o) {
      var u = new t();
      if (o == null)
        return u;
      for (var s = n(o.backgroundImage), l = o.backgroundColor, f = a(o.backgroundAttachment), c = a(o.backgroundClip), p = a(o.backgroundOrigin), v = a(o.backgroundPosition), D = a(o.backgroundRepeat), d = a(o.backgroundSize), g, y = 0, b = s.length; y < b; y++)
        g = new r({ image: s[y], attachment: f[y % f.length], clip: c[y % c.length], origin: p[y % p.length], position: v[y % v.length], repeat: D[y % D.length], size: d[y % d.length] }), y === b - 1 && (g.color = l), u.backgrounds.push(g);
      return u;
    };
  })(function(e) {
    return typeof En < "u" && En.exports !== void 0 ? En.exports : e.cssBgParser = {};
  }(as));
});
var us = tt((Ty, ss) => {
  var yp = /,(?![^\(]*\))/, bp = /\s(?![^(]*\))/, xp = /^[0-9]+[a-zA-Z%]+?$/, wp = /* @__PURE__ */ __name((e) => {
    let t = e.split(bp), r = t.includes("inset"), n = t.slice(-1)[0], i = Fp(n) ? void 0 : n, a = t.filter((f) => f !== "inset").filter((f) => f !== i).map(Cp), [o, u, s, l] = a;
    return { inset: r, offsetX: o, offsetY: u, blurRadius: s, spreadRadius: l, color: i };
  }, "wp"), Ep = /* @__PURE__ */ __name((e) => {
    let { inset: t, offsetX: r = 0, offsetY: n = 0, blurRadius: i = 0, spreadRadius: a, color: o } = e || {};
    return [t ? "inset" : null, r, n, i, a, o].filter((u) => u != null).map(Sp).map((u) => ("" + u).trim()).join(" ");
  }, "Ep"), Fp = /* @__PURE__ */ __name((e) => e === "0" || xp.test(e), "Fp"), Cp = /* @__PURE__ */ __name((e) => {
    if (!/px$/.test(e) && e !== "0")
      return e;
    let t = parseFloat(e);
    return isNaN(t) ? e : t;
  }, "Cp"), Sp = /* @__PURE__ */ __name((e) => typeof e == "number" && e !== 0 ? e + "px" : e, "Sp"), kp = /* @__PURE__ */ __name((e) => e.split(yp).map((t) => t.trim()).map(wp), "kp"), _p = /* @__PURE__ */ __name((e) => e.map(Ep).join(", "), "_p");
  ss.exports = { parse: kp, stringify: _p };
});
var Hi = tt((Vi, zi) => {
  (function(e, t) {
    typeof Vi == "object" && typeof zi < "u" ? zi.exports = t() : typeof define == "function" && define.amd ? define(t) : (e = e || self).parseCssColor = t();
  })(Vi, function() {
    "use strict";
    var e = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] }, t = new RegExp(/^#([a-f0-9]{3,4}|[a-f0-9]{4}(?:[a-f0-9]{2}){1,2})\b$/, "i"), r = "-?\\d*(?:\\.\\d+)", n = "(" + r + "?)", i = "(" + r + "?%)", a = (`^
  hsla?\\(
    \\s*(-?\\d*(?:\\.\\d+)?(?:deg|rad|turn)?)\\s*,
    \\s*` + i + `\\s*,
    \\s*` + i + `\\s*
    (?:,\\s*(-?\\d*(?:\\.\\d+)?%?)\\s*)?
  \\)
  $
`).replace(/\n|\s/g, ""), o = new RegExp(a), u = (`^
  hsla?\\(
    \\s*(-?\\d*(?:\\.\\d+)?(?:deg|rad|turn)?)\\s*
    \\s+` + i + `
    \\s+` + i + `
    \\s*(?:\\s*\\/\\s*(-?\\d*(?:\\.\\d+)?%?)\\s*)?
  \\)
  $
`).replace(/\n|\s/g, ""), s = new RegExp(u), l = (`^
  rgba?\\(
    \\s*` + n + `\\s*,
    \\s*` + n + `\\s*,
    \\s*` + n + `\\s*
    (?:,\\s*(-?\\d*(?:\\.\\d+)?%?)\\s*)?
  \\)
  $
`).replace(/\n|\s/g, ""), f = new RegExp(l), c = (`^
  rgba?\\(
    \\s*` + i + `\\s*,
    \\s*` + i + `\\s*,
    \\s*` + i + `\\s*
    (?:,\\s*(-?\\d*(?:\\.\\d+)?%?)\\s*)?
  \\)
  $
`).replace(/\n|\s/g, ""), p = new RegExp(c), v = (`^
  rgba?\\(
    \\s*` + n + `
    \\s+` + n + `
    \\s+` + n + `
    \\s*(?:\\s*\\/\\s*(-?\\d*(?:\\.\\d+)?%?)\\s*)?
  \\)
$
`).replace(/\n|\s/g, ""), D = new RegExp(v), d = (`^
  rgba?\\(
    \\s*` + i + `
    \\s+` + i + `
    \\s+` + i + `
    \\s*(?:\\s*\\/\\s*(-?\\d*(?:\\.\\d+)?%?)\\s*)?
  \\)
$
`).replace(/\n|\s/g, ""), g = new RegExp(d), y = new RegExp(/^transparent$/, "i"), b = new RegExp("[^#a-f\\d]", "gi"), S = new RegExp("^#?[a-f\\d]{3}[a-f\\d]?$|^#?[a-f\\d]{6}([a-f\\d]{2})?$", "i"), k = /* @__PURE__ */ __name(function(N, X, Y) {
      return Math.min(Math.max(X, N), Y);
    }, "k"), C = /* @__PURE__ */ __name(function(N) {
      var X = N;
      return typeof X != "number" && (X = X.endsWith("%") ? 255 * parseFloat(X) / 100 : parseFloat(X)), k(Math.round(X), 0, 255);
    }, "C"), E = /* @__PURE__ */ __name(function(N) {
      return k(parseFloat(N), 0, 100);
    }, "E");
    function L(N) {
      var X = N;
      return typeof X != "number" && (X = X.endsWith("%") ? parseFloat(X) / 100 : parseFloat(X)), k(X, 0, 1);
    }
    __name(L, "L");
    function _(N) {
      var X = function(Y, ee) {
        if (ee === void 0 && (ee = {}), typeof Y != "string" || b.test(Y) || !S.test(Y))
          throw new TypeError("Expected a valid hex string");
        var A = 1;
        (Y = Y.replace(/^#/, "")).length === 8 && (A = Number.parseInt(Y.slice(6, 8), 16) / 255, Y = Y.slice(0, 6)), Y.length === 4 && (A = Number.parseInt(Y.slice(3, 4).repeat(2), 16) / 255, Y = Y.slice(0, 3)), Y.length === 3 && (Y = Y[0] + Y[0] + Y[1] + Y[1] + Y[2] + Y[2]);
        var R = Number.parseInt(Y, 16), O = R >> 16, H = R >> 8 & 255, Z = 255 & R, te = typeof ee.alpha == "number" ? ee.alpha : A;
        return ee.format === "array" ? [O, H, Z, te] : ee.format === "css" ? "rgb(" + O + " " + H + " " + Z + (te === 1 ? "" : " / " + Number((100 * te).toFixed(2)) + "%") + ")" : { red: O, green: H, blue: Z, alpha: te };
      }(N, { format: "array" });
      return U([null, X[0], X[1], X[2], X[3]]);
    }
    __name(_, "_");
    function U(N) {
      var X = N[1], Y = N[2], ee = N[3], A = N[4];
      return A === void 0 && (A = 1), { type: "rgb", values: [X, Y, ee].map(C), alpha: L(A === null ? 1 : A) };
    }
    __name(U, "U");
    return function(N) {
      if (typeof N != "string")
        return null;
      var X = t.exec(N);
      if (X)
        return _(X[0]);
      var Y = s.exec(N) || o.exec(N);
      if (Y)
        return function(R) {
          var O = R[1], H = R[2], Z = R[3], te = R[4];
          te === void 0 && (te = 1);
          var re = O;
          return { type: "hsl", values: [re = re.endsWith("turn") ? 360 * parseFloat(re) / 1 : re.endsWith("rad") ? Math.round(180 * parseFloat(re) / Math.PI) : parseFloat(re), E(H), E(Z)], alpha: L(te === null ? 1 : te) };
        }(Y);
      var ee = D.exec(N) || g.exec(N) || f.exec(N) || p.exec(N);
      if (ee)
        return U(ee);
      if (y.exec(N))
        return U([null, 0, 0, 0, 0]);
      var A = e[N.toLowerCase()];
      return A ? U([null, A[0], A[1], A[2], 1]) : null;
    };
  });
});
var fs = tt((Ay, ls) => {
  "use strict";
  var Tp = /["'&<>]/;
  ls.exports = Ap;
  function Ap(e) {
    var t = "" + e, r = Tp.exec(t);
    if (!r)
      return t;
    var n, i = "", a = 0, o = 0;
    for (a = r.index; a < t.length; a++) {
      switch (t.charCodeAt(a)) {
        case 34:
          n = "&quot;";
          break;
        case 38:
          n = "&amp;";
          break;
        case 39:
          n = "&#39;";
          break;
        case 60:
          n = "&lt;";
          break;
        case 62:
          n = "&gt;";
          break;
        default:
          continue;
      }
      o !== a && (i += t.substring(o, a)), o = a + 1, i += n;
    }
    return o !== a ? i + t.substring(o, a) : i;
  }
  __name(Ap, "Ap");
});
var Fo = Tt(mo(), 1);
var Co = Tt(Do(), 1);
var Fi = {};
var wf = 5;
var yo = 12;
var Ef = 13;
var Ff = 16;
var Cf = 17;
var Sf = 22;
var bo = 28;
var xo = 31;
var kf = 33;
var gn = 34;
var _f = 35;
var xi = 36;
var wi = 37;
var So = 38;
var Tf = 39;
var Af = 40;
var Rr = 41;
var Of = 42;
var h = 0;
var m = 1;
var Ce = 2;
var ko = 3;
var F = 4;
var Lf = [[F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, ko, F, F, F, F, F, F, F, F, F, F, F], [h, F, F, m, m, F, F, F, F, m, m, h, h, h, h, m, m, m, h, h, F, Ce, F, h, h, h, h, h, h, h, h, m, h], [h, F, F, m, m, F, F, F, F, m, m, m, m, m, h, m, m, m, h, h, F, Ce, F, h, h, h, h, h, h, h, h, m, h], [F, F, F, m, m, m, F, F, F, m, m, m, m, m, m, m, m, m, m, m, F, Ce, F, m, m, m, m, m, m, m, m, m, m], [m, F, F, m, m, m, F, F, F, m, m, m, m, m, m, m, m, m, m, m, F, Ce, F, m, m, m, m, m, m, m, m, m, m], [h, F, F, m, m, m, F, F, F, h, h, h, h, h, h, m, m, m, h, h, F, Ce, F, h, h, h, h, h, h, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, h, h, h, h, h, m, m, m, h, h, F, Ce, F, h, h, h, h, h, h, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, h, m, h, m, h, m, m, m, h, h, F, Ce, F, h, h, h, h, h, h, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, h, m, m, m, h, m, m, m, h, h, F, Ce, F, h, h, h, h, h, h, h, h, m, h], [m, F, F, m, m, m, F, F, F, h, h, m, m, m, m, m, m, m, h, h, F, Ce, F, m, m, m, m, m, h, m, m, m, h], [m, F, F, m, m, m, F, F, F, h, h, m, m, m, h, m, m, m, h, h, F, Ce, F, h, h, h, h, h, h, h, h, m, h], [m, F, F, m, m, m, F, F, F, m, m, m, m, m, h, m, m, m, h, h, F, Ce, F, h, h, h, h, h, h, h, h, m, h], [m, F, F, m, m, m, F, F, F, m, m, m, m, m, h, m, m, m, h, h, F, Ce, F, h, h, h, h, h, h, h, h, m, h], [m, F, F, m, m, m, F, F, F, m, m, m, m, m, h, m, m, m, h, h, F, Ce, F, h, h, h, h, h, h, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, m, h, h, h, h, m, m, m, h, h, F, Ce, F, h, h, h, h, h, h, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, h, h, h, h, h, m, m, m, h, h, F, Ce, F, h, h, h, h, h, h, h, h, m, h], [h, F, F, m, h, m, F, F, F, h, h, m, h, h, h, m, m, m, h, h, F, Ce, F, h, h, h, h, h, h, h, h, m, h], [h, F, F, m, h, m, F, F, F, h, h, h, h, h, h, m, m, m, h, h, F, Ce, F, h, h, h, h, h, h, h, h, m, h], [m, F, F, m, m, m, F, F, F, m, m, m, m, m, m, m, m, m, m, m, F, Ce, F, m, m, m, m, m, m, m, m, m, h], [h, F, F, m, m, m, F, F, F, h, h, h, h, h, h, m, m, m, h, F, F, Ce, F, h, h, h, h, h, h, h, h, m, h], [h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, F, h, h, h, h, h, h, h, h, h, h, h, h], [m, F, F, m, m, m, F, F, F, m, m, m, m, m, h, m, m, m, h, h, F, Ce, F, h, h, h, h, h, h, h, h, m, h], [m, F, F, m, m, m, F, F, F, m, m, m, m, m, m, m, m, m, m, m, F, Ce, F, m, m, m, m, m, m, m, m, m, m], [h, F, F, m, m, m, F, F, F, h, m, h, h, h, h, m, m, m, h, h, F, Ce, F, h, h, h, m, m, h, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, m, h, h, h, h, m, m, m, h, h, F, Ce, F, h, h, h, h, m, h, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, m, h, h, h, h, m, m, m, h, h, F, Ce, F, m, m, m, m, h, h, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, m, h, h, h, h, m, m, m, h, h, F, Ce, F, h, h, h, m, m, h, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, m, h, h, h, h, m, m, m, h, h, F, Ce, F, h, h, h, h, m, h, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, h, h, h, h, h, m, m, m, h, h, F, Ce, F, h, h, h, h, h, m, h, h, m, h], [h, F, F, m, m, m, F, F, F, h, m, h, h, h, h, m, m, m, h, h, F, Ce, F, h, h, h, h, h, h, h, m, m, h], [h, F, F, m, m, m, F, F, F, h, m, h, h, h, h, m, m, m, h, h, F, Ce, F, h, h, h, h, h, h, h, h, m, h], [m, F, F, m, m, m, F, F, F, m, m, m, m, m, h, m, m, m, h, h, F, Ce, F, h, h, h, h, h, h, h, h, m, h], [h, F, F, m, m, h, F, F, F, h, h, h, h, h, h, h, h, h, h, h, F, Ce, F, h, h, h, h, h, h, h, h, m, h]];
var Pf = Co.default.toByteArray("AAgOAAAAAAAQ4QAAAQ0P8vDtnQuMXUUZx+eyu7d7797d9m5bHoWltKVUlsjLWE0VJNigQoMVqkStEoNQQUl5GIo1KKmogEgqkKbBRki72lYabZMGKoGAjQRtJJDaCCIRiiigREBQS3z+xzOTnZ3O+3HOhd5NfpkzZx7fN9988zivu2M9hGwB28F94DnwEngd/Asc1EtIs9c/bIPDwCxwLDgezHcodyo4w5C+CCwBS8FnwSXgCnA1uFbI93XwbXAbWAfWgx+CzWAb+An4KfgFeAzsYWWfYuFz4CXwGvgb+Dfo6yNkEEwGh4CZYB44FpwI3g1OY+kfBItZOo2fB84Hy8DF4HJwNbiWpV8PVoO1LH4n2NRXyN+KcAd4kNVP9XsY4aPgcfAbsBfs6SniL4K/sPjfEf6HlanXCRkCw2BGvUh/keWfXS/CY+pFXs7x9XHmM94LTmWIeU2cgbxnS/k/B3kf86jDhU8L9V2E40vAFWAlWFUfb++NOL4F3C7JX4/4GiE+hvgWsF0oS7mXldspnN+F493gyXrh9xTav0cg3EvzgVfBG6wsmVSEkxBOBgdPGpd7JI6PnqRvJ68/xlbHof53gPeA94OzwLngk+ACsAwsByvASrAK3MB0Ws3CtQjvBJvAVrADPMDSHkb4CNijaccTwvnf4fiPEs8Lxy+D18A/QU8/xjgYBjPAbDAKTgYLwOngTHAO+EQ/8wuEF4EvsPiVCFf2+9tsFStzA8LVHuXXBsi6QyqzUYiPMR/7Mc7dAx7oL8bzw/3u/Bw8Bp4Az4AXwCtgHzsmDXP5fiF9iiVvly5d0sHngar16NKlS5cuXbp06fLmYlqHXrcd3ph4P0THUY3iXh49novju4S0tzfs5d+JPKewfAsRntZb3K9ZhOMlrO6lCC8An28U9+OuovcPcPxlVu5rCL/VmHh/iHIrzn3fIPu7SN8Axmg+8AOwEWwCm7tp3bRuWjetm5Y8bSu4B9zbKO6ZVsnORrVU3f4uXTqZ2H3sLoyx3eDXjfDndE9qyj6L838CfwVvgFpzYnof4oNgOhgBc8Fos9DrZIQLmtXPP1MmF6wGj4H+KXoWguvADkXaPil+YpuQy8Am8Ey7ODdtmJDF4HowBp4De6HDTNjhfHAHeBr0DBBy0kDxfPbcgSIusgrcWhtnJ8vL+TPix7UIOQtcBq4C28Cr4KRBnANbwSuDE+s50JgyNNFuXbp06XIgsXjIvPafjvXozKY+fVFz/z0LT1uCtKVSWbrOLWPnztG8e0Xfy7ol8XtZJi7WtG+5od2UFXQ/A12vUeS7jp27yVKHjdsU9lXB869TyNvAzt0lpP2oWbwLdjiO78bx/Sz+EMJHwK9Y/LcIfw+eZ3F67/Hl5vh9xX80J+rwX8SvRDhpgL17iPAQMHNArfPrqHPewLheI+AERV6efwV418B4nOZ/H+IfYHV8GOF5LJ3eAz0fx8sM9S0fUNud39O9CulfGZhY5huI3wzWgNvBelbHZoTbNPVpfYjKQpkHwUNgl0LWblbnk0LbbDxr0OMFpL3iqWdu9nWYPlVAWkXY39LnGdCkDbeqv1YNbfcMQ3t9oe8lzm6NH9N1ZB6Ln4BwfkJZJk7RyFnYKt6b/JDQXx9p5X+eFdqOjzM9P9MB/lUlFzr20aXIdzlY4dmn9F3YqtvoO76/2hp/D/xA5Zue88nNyL8GbFbs075X0tyUig3Qd2MCnf//HjnzpbsR3g9+1kHzzVjdnE71/qVBX9rGPUh/ysNWe1neFzvIDi5zAufV1sT0N0poR22wkFUfTOPfA4N2mbZ5fSrqOHSw+IbkSBbOGSzSRgf91/GTUWYBOB2cIZQ/G8cfBZ8CFwrnL8XxF8FKcA24jqXdiPA7Qr61OF7H4mMItwzuv2/YLth1ISt3Hzu3k4W7EH5JqPdRHD/O4k+z8A8IX5Lq3y7Z4nXE9xn6kX6vQ4bKfy+ok+hH+xf3hq9dnTTHhjKd2GmDuWA242iHMq4cC7A8kJ7i8o1+skSa7Jieo38HCWnoNjKFhdSFBxzpZ7QE6lI8N4S14aASZcryaV/WWHw66f6NHuCoxuQxmvM56GX9QMd8Q4D65ywGP+ZzRJuM+zQvx/MOS2VFeqQ4IXnH26zM9Xe6/E6D+4foAzzuajPZp8Qyw5ayZVDWuH0z0BtYRkeIDqH9KO9VbH1btd/lhNqCzvl8zeLnG0S/hnU6baHfpiuO6yy0rd+DHURo/zYF5H26j03rQsip2ndzz82u1z9N4VjWKWeb68Tedpt95HRVXp7H1R6p+/Wt4FPy/PpWwscOLRJ+PVWF/+W0iVyGzs18TIvXkOJ1Wxm66vSXz+vylenrZcj1ub439W+K8RNCGTJi2p/TJ1K23VaXr35tRpnzmjxequgfcfyk6B/TGBVlyedsNgpdd/h+W1U3P99QyFPNo1X3TwpM/WLTIWYfoBqXrv6iskHZ/RFr79R6hIyHBrH3f1nrUVnjP8SnZZ+rYtzr9Exld5MNbPNErusAPg+77u/eDOPftU9yj39TH7rezxd1LvsZQJlzkWlOirG/79zjMj/mtHUKu7vKy+3/LnXr9okyKedjX5/0He9iP/j63LwOQdarEVlfy8OO/Lqw023j6xcqmwxLiOd6heM2i9cV9LJy8jMJ23yQ+rpbfu7EQ/pXE8KYvUSqvVnb4XzZa6LrHMXHR+zcLvqWbm/Bn0/HzIs6fWPHoat8XfnDKmZGxRxeMbn2UqZ5Q94nmcZRbqqUXbZ8+lcjE+cPX11t814orvvAXNcG8vqj2vvk1MGn3anlj0bIT72v47bvE+Lc98T9b6r7AKn6j+8Duf7D0nnZx/j7Zjn0j9nbpSTndaLr9WNLivP+iN23xF7L+fqv6ZouFyb78jxVXvv5jJ9YUs9/sddO8h7KNg5jrhfaJGztT6G7KF+1d6yCmD5Kdb2fan60rSc552fZr3zeQ9DpnPp+Si5cx5Ktv2QfSzF/mMbWdOm46rFI4XstnU9xeqX4NKb7TKEdcr6pZOK3ID1k/LvFHkVczEuZLEDr499YqvqBym1aEHWgcvoYOtv0M91qQl5TfpO/in6rWx8OVpT1Wedkv3f5xom3T/xeR/6Gx6V86PWAOB4bBpqWdN+yTcVxjIyGRz/FrDGu6w/3d7kPm8StX8RyPu+uuvpNju/vTLJV37GpvoM0oZPnW87VLnL/5pDno1NoW1R6yedU6TyUv3u19a3KFnIbTLYz+ZCLP4T0tU1uivFgso0pnsJ/UtXvarNY28Xq5cvkBDrQP/E5ZaiuQwwfmTlsOiQRU1fMuqrDd/3ISSuwjOwXOfTyGUMpZIXq4GpLn3pUcdfzch2x7XO1u2uZHOPb1G6b3Xg9PH1IIWeEpJlPQtqos2EKW8b0u8rnuP1UeVLoXJb9be0uG9nnbchjU+XTszT5VeNBThPHnc5OKj1U9aj0GTHIVaGy1YhEWT4ixns00DT+XEzWn/7VAsIc63Cov3OdyhwjrnaqQqZvWKXdypRdlq+k8msZ031U+Rm4fA+3TtyeR9hwfW9G9yxDN0fZMN33F+9TE6md4hwoxumfaUzI9fN3PFT3xVV2msrQ3UsnChm6Nulk8TndpS28D3zX9tTIPsF/z7Am5OkTjm1tI1JZW74+4VgsZ0N3L1yXV3WeP5uR7TGHHdvC3JQlxybfpd22tDlk/2eofRK8TzrN/qnar/K/OUTth6I/+jAnEptNbPvFHP2gs40N3+dfMWtwqvVct7/wfd8gtQ7imifial9ZJ9/3IHLYU6eDj3+4PhsNhX+vwvcWLnu6kGfEMe8DuciPfUfGZB8X/7HJy/Gefe5n+VRGFd/wyP2ta7/LO4yh/sbLV/k9lev6kfO9Dt/5U67b1/6u/epqB1U9Me23jfHY9sscAg4tkbLl+e4/U36rJ9ddxfd6sg5vq5ice42Wpk/pb9FOJ36/W9tpv4kbC79nUbZceX8Zu6/qJ+P3WvhvA8v3reh7Jbn2d6rrNC7XNZTLma4Ba0JI9efX2uLzF5scG/w9UNU1ZxW+ymUfzELeTllXlQ1rUuhzjS5fp9c964iFBOqeSz63bU065nZKdU+mDEz3qHIjjifquw0pnb/raRtvrnsYcb46ihT3taoYz6brdNW9l6rWRnE/navdPn1XlR1km7hcz1WlH/elKuSOSvLLuE8U6m8uzwRdfcGl73VyTHuyMvzJ1Sa2cWDTP/Z63Kc94n2B1PYr24dz1JlyHLlcP+S4B6vD1c9EW4q2LWstCvUjeVy63k/LMYdUNd5D1xQfvVTzX1VjkMsUv88N8VH5fReVn/Fjn++/h6X6Q8a6b1/q3g/i/ewi0/Scs8zxXeV6mWIOUPlPzBgdFerW+bZrm2P18dnjuK6HunEp+rHvPMXbr+sHVb/lnL+pTP57jPw9Cvk3PW178JD9qChfzuvTf7Htl38L1QUf/VKu9SFjwWbTWPvFEvu7Uq76y7+31g6QlYPc669pbsm9Xur2LWI9Pu8ypfDXqm3A2z8s1FWGn4ntL9NfQu2oSlftX9uetvTtv7J8Ql4zxfXGZ3zk8PeQ9w59x2uMfqI8/q5eKh/l9cb2rwsu9rSNl06ZP2Pmxtz+rNMx93yno0n2/82rVH7rQ+y9P15H6FyRun9ViH81ATmffI7nJ5r8uXXW6enbP6b/B8/l5OifVHYLnb9S39s2zcc+Ph+rh8+eQgVPS72elzGWY/tUtbbabBpDiI7yN1q6/4th2y+ErAc5+9BVvu/7KamJbWNZeuqI/R4tRf+YyD1HmOZM1bMV3/14Sn10c0Xu+Sj1nOXb5jL73ncdy02uvlXZNde65dOHYl7Vs4KYuS6FzWLn2zJlpZqPXPVPOa5yzKOyn1VhT9lmMfdbfH7D11Wf2PXN5h9y+dD287+qxgSnaYmnIrRtIb8pJe6/Uv9OVer6Whn0zfGO/BEloZI9ojmfAlUflClDd178bTmVHVTpZXOkAlk/lb42UujmI89HH5V+cl7XtowY6vTxLVWok6UrGzoGTHN+bB+6ri05687VNpvfuvRfaP2uMlNQth1D5JjGelm/8yn+9p3p/7qk9gnfeddXZmq/Sm333PJT659Kv1zjNbZ9uv2Oi//67CV8/N1nj1DmviyXDNVeJkaeaX8UsyesYg8cu2+NvdaPfb+lLDu5tvt/");
var If = new Fo.default(Pf);
var wo = /* @__PURE__ */ __name(function(e) {
  switch (e) {
    case kf:
      return yo;
    case Tf:
    case Af:
    case Of:
      return yo;
    case _f:
      return wf;
    default:
      return e;
  }
}, "wo");
var Eo = /* @__PURE__ */ __name(function(e) {
  switch (e) {
    case wi:
    case So:
      return gn;
    case Rr:
      return Sf;
    default:
      return e;
  }
}, "Eo");
var Ur = /* @__PURE__ */ __name(class {
  constructor(t, r = false) {
    this.position = t, this.required = r;
  }
}, "Ur");
var Ei = /* @__PURE__ */ __name(class {
  nextCodePoint() {
    let t = this.string.charCodeAt(this.pos++), r = this.string.charCodeAt(this.pos);
    return 55296 <= t && t <= 56319 && 56320 <= r && r <= 57343 ? (this.pos++, (t - 55296) * 1024 + (r - 56320) + 65536) : t;
  }
  nextCharClass() {
    return wo(If.get(this.nextCodePoint()));
  }
  getSimpleBreak() {
    switch (this.nextClass) {
      case Rr:
        return false;
      case gn:
      case wi:
      case So:
        return this.curClass = gn, false;
      case xi:
        return this.curClass = xi, false;
    }
    return null;
  }
  getPairTableBreak(t) {
    let r = false;
    switch (Lf[this.curClass][this.nextClass]) {
      case h:
        r = true;
        break;
      case m:
        r = t === Rr;
        break;
      case Ce:
        if (r = t === Rr, !r)
          return r = false, r;
        break;
      case ko:
        if (t !== Rr)
          return r;
        break;
      case F:
        break;
    }
    return this.LB8a && (r = false), this.LB21a && (this.curClass === Ff || this.curClass === Cf) ? (r = false, this.LB21a = false) : this.LB21a = this.curClass === Ef, this.curClass === bo ? (this.LB30a++, this.LB30a == 2 && this.nextClass === bo && (r = true, this.LB30a = 0)) : this.LB30a = 0, this.curClass = this.nextClass, r;
  }
  nextBreak() {
    if (this.curClass == null) {
      let t = this.nextCharClass();
      this.curClass = Eo(t), this.nextClass = t, this.LB8a = t === xo, this.LB30a = 0;
    }
    for (; this.pos < this.string.length; ) {
      this.lastPos = this.pos;
      let t = this.nextClass;
      if (this.nextClass = this.nextCharClass(), this.curClass === gn || this.curClass === xi && this.nextClass !== wi)
        return this.curClass = Eo(wo(this.nextClass)), new Ur(this.lastPos, true);
      let r = this.getSimpleBreak();
      if (r === null && (r = this.getPairTableBreak(t)), this.LB8a = this.nextClass === xo, r)
        return new Ur(this.lastPos);
    }
    return this.lastPos < this.string.length ? (this.lastPos = this.string.length, new Ur(this.string.length)) : null;
  }
  constructor(t) {
    this.string = t, this.pos = 0, this.lastPos = 0, this.curClass = null, this.nextClass = null, this.LB8a = false, this.LB21a = false, this.LB30a = 0;
  }
}, "Ei");
Fi = Ei;
var Ut = Tt(wn(), 1);
var vl = Tt(os(), 1);
var gl = Tt(us(), 1);
var ml = Tt(Hi(), 1);
var Dl = Tt(Li(), 1);
var yl = Tt(wn(), 1);
var Ca = Tt(fs(), 1);
var El = Tt(Hi(), 1);
var Sa = Tt(wn(), 1);
var wt = Uint8Array;
var yr = Uint16Array;
var Ns = Uint32Array;
var Ms = new wt([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]);
var Gs = new wt([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]);
var Op = new wt([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var Ws = /* @__PURE__ */ __name(function(e, t) {
  for (var r = new yr(31), n = 0; n < 31; ++n)
    r[n] = t += 1 << e[n - 1];
  for (var i = new Ns(r[30]), n = 1; n < 30; ++n)
    for (var a = r[n]; a < r[n + 1]; ++a)
      i[a] = a - r[n] << 5 | n;
  return [r, i];
}, "Ws");
var $s = Ws(Ms, 2);
var js = $s[0];
var Lp = $s[1];
js[28] = 258, Lp[258] = 28;
var Pp = Ws(Gs, 0);
var Ip = Pp[0];
var ra = new yr(32768);
for (ke = 0; ke < 32768; ++ke)
  Zt = (ke & 43690) >>> 1 | (ke & 21845) << 1, Zt = (Zt & 52428) >>> 2 | (Zt & 13107) << 2, Zt = (Zt & 61680) >>> 4 | (Zt & 3855) << 4, ra[ke] = ((Zt & 65280) >>> 8 | (Zt & 255) << 8) >>> 1;
var Zt;
var ke;
var Gr = /* @__PURE__ */ __name(function(e, t, r) {
  for (var n = e.length, i = 0, a = new yr(t); i < n; ++i)
    e[i] && ++a[e[i] - 1];
  var o = new yr(t);
  for (i = 0; i < t; ++i)
    o[i] = o[i - 1] + a[i - 1] << 1;
  var u;
  if (r) {
    u = new yr(1 << t);
    var s = 15 - t;
    for (i = 0; i < n; ++i)
      if (e[i])
        for (var l = i << 4 | e[i], f = t - e[i], c = o[e[i] - 1]++ << f, p = c | (1 << f) - 1; c <= p; ++c)
          u[ra[c] >>> s] = l;
  } else
    for (u = new yr(n), i = 0; i < n; ++i)
      e[i] && (u[i] = ra[o[e[i] - 1]++] >>> 15 - e[i]);
  return u;
}, "Gr");
var jr = new wt(288);
for (ke = 0; ke < 144; ++ke)
  jr[ke] = 8;
var ke;
for (ke = 144; ke < 256; ++ke)
  jr[ke] = 9;
var ke;
for (ke = 256; ke < 280; ++ke)
  jr[ke] = 7;
var ke;
for (ke = 280; ke < 288; ++ke)
  jr[ke] = 8;
var ke;
var Vs = new wt(32);
for (ke = 0; ke < 32; ++ke)
  Vs[ke] = 5;
var ke;
var Rp = Gr(jr, 9, 1);
var Up = Gr(Vs, 5, 1);
var Xi = /* @__PURE__ */ __name(function(e) {
  for (var t = e[0], r = 1; r < e.length; ++r)
    e[r] > t && (t = e[r]);
  return t;
}, "Xi");
var At = /* @__PURE__ */ __name(function(e, t, r) {
  var n = t / 8 | 0;
  return (e[n] | e[n + 1] << 8) >> (t & 7) & r;
}, "At");
var qi = /* @__PURE__ */ __name(function(e, t) {
  var r = t / 8 | 0;
  return (e[r] | e[r + 1] << 8 | e[r + 2] << 16) >> (t & 7);
}, "qi");
var Bp = /* @__PURE__ */ __name(function(e) {
  return (e + 7) / 8 | 0;
}, "Bp");
var Np = /* @__PURE__ */ __name(function(e, t, r) {
  (t == null || t < 0) && (t = 0), (r == null || r > e.length) && (r = e.length);
  var n = new (e.BYTES_PER_ELEMENT == 2 ? yr : e.BYTES_PER_ELEMENT == 4 ? Ns : wt)(r - t);
  return n.set(e.subarray(t, r)), n;
}, "Np");
var Mp = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", , "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data"];
var ur = /* @__PURE__ */ __name(function(e, t, r) {
  var n = new Error(t || Mp[e]);
  if (n.code = e, Error.captureStackTrace && Error.captureStackTrace(n, ur), !r)
    throw n;
  return n;
}, "ur");
var Gp = /* @__PURE__ */ __name(function(e, t, r) {
  var n = e.length;
  if (!n || r && r.f && !r.l)
    return t || new wt(0);
  var i = !t || r, a = !r || r.i;
  r || (r = {}), t || (t = new wt(n * 3));
  var o = /* @__PURE__ */ __name(function(W) {
    var fe = t.length;
    if (W > fe) {
      var ce = new wt(Math.max(fe * 2, W));
      ce.set(t), t = ce;
    }
  }, "o"), u = r.f || 0, s = r.p || 0, l = r.b || 0, f = r.l, c = r.d, p = r.m, v = r.n, D = n * 8;
  do {
    if (!f) {
      u = At(e, s, 1);
      var d = At(e, s + 1, 3);
      if (s += 3, d)
        if (d == 1)
          f = Rp, c = Up, p = 9, v = 5;
        else if (d == 2) {
          var S = At(e, s, 31) + 257, k = At(e, s + 10, 15) + 4, C = S + At(e, s + 5, 31) + 1;
          s += 14;
          for (var E = new wt(C), L = new wt(19), _ = 0; _ < k; ++_)
            L[Op[_]] = At(e, s + _ * 3, 7);
          s += k * 3;
          for (var U = Xi(L), N = (1 << U) - 1, X = Gr(L, U, 1), _ = 0; _ < C; ) {
            var Y = X[At(e, s, N)];
            s += Y & 15;
            var g = Y >>> 4;
            if (g < 16)
              E[_++] = g;
            else {
              var ee = 0, A = 0;
              for (g == 16 ? (A = 3 + At(e, s, 3), s += 2, ee = E[_ - 1]) : g == 17 ? (A = 3 + At(e, s, 7), s += 3) : g == 18 && (A = 11 + At(e, s, 127), s += 7); A--; )
                E[_++] = ee;
            }
          }
          var R = E.subarray(0, S), O = E.subarray(S);
          p = Xi(R), v = Xi(O), f = Gr(R, p, 1), c = Gr(O, v, 1);
        } else
          ur(1);
      else {
        var g = Bp(s) + 4, y = e[g - 4] | e[g - 3] << 8, b = g + y;
        if (b > n) {
          a && ur(0);
          break;
        }
        i && o(l + y), t.set(e.subarray(g, b), l), r.b = l += y, r.p = s = b * 8, r.f = u;
        continue;
      }
      if (s > D) {
        a && ur(0);
        break;
      }
    }
    i && o(l + 131072);
    for (var H = (1 << p) - 1, Z = (1 << v) - 1, te = s; ; te = s) {
      var ee = f[qi(e, s) & H], re = ee >>> 4;
      if (s += ee & 15, s > D) {
        a && ur(0);
        break;
      }
      if (ee || ur(2), re < 256)
        t[l++] = re;
      else if (re == 256) {
        te = s, f = null;
        break;
      } else {
        var B = re - 254;
        if (re > 264) {
          var _ = re - 257, j = Ms[_];
          B = At(e, s, (1 << j) - 1) + js[_], s += j;
        }
        var T = c[qi(e, s) & Z], $ = T >>> 4;
        T || ur(3), s += T & 15;
        var O = Ip[$];
        if ($ > 3) {
          var j = Gs[$];
          O += qi(e, s) & (1 << j) - 1, s += j;
        }
        if (s > D) {
          a && ur(0);
          break;
        }
        i && o(l + 131072);
        for (var ie = l + B; l < ie; l += 4)
          t[l] = t[l - O], t[l + 1] = t[l + 1 - O], t[l + 2] = t[l + 2 - O], t[l + 3] = t[l + 3 - O];
        l = ie;
      }
    }
    r.l = f, r.p = te, r.b = l, r.f = u, f && (u = 1, r.m = p, r.d = c, r.n = v);
  } while (!u);
  return l == t.length ? t : Np(t, 0, l);
}, "Gp");
var Wp = new wt(0);
function $p(e, t) {
  return Gp(e, t);
}
__name($p, "$p");
var jp = typeof TextDecoder < "u" && new TextDecoder();
var Vp = 0;
try {
  jp.decode(Wp, { stream: true }), Vp = 1;
} catch {
}
function at() {
  this.commands = [], this.fill = "black", this.stroke = null, this.strokeWidth = 1;
}
__name(at, "at");
at.prototype.moveTo = function(e, t) {
  this.commands.push({ type: "M", x: e, y: t });
};
at.prototype.lineTo = function(e, t) {
  this.commands.push({ type: "L", x: e, y: t });
};
at.prototype.curveTo = at.prototype.bezierCurveTo = function(e, t, r, n, i, a) {
  this.commands.push({ type: "C", x1: e, y1: t, x2: r, y2: n, x: i, y: a });
};
at.prototype.quadTo = at.prototype.quadraticCurveTo = function(e, t, r, n) {
  this.commands.push({ type: "Q", x1: e, y1: t, x: r, y: n });
};
at.prototype.close = at.prototype.closePath = function() {
  this.commands.push({ type: "Z" });
};
at.prototype.extend = function(e) {
  e.commands && (e = e.commands), Array.prototype.push.apply(this.commands, e);
};
at.prototype.toPathData = function(e) {
  e = e !== void 0 ? e : 2;
  function t(o) {
    return Math.round(o) === o ? "" + Math.round(o) : o.toFixed(e);
  }
  __name(t, "t");
  function r() {
    for (var o = arguments, u = "", s = 0; s < arguments.length; s += 1) {
      var l = o[s];
      l >= 0 && s > 0 && (u += " "), u += t(l);
    }
    return u;
  }
  __name(r, "r");
  for (var n = "", i = 0; i < this.commands.length; i += 1) {
    var a = this.commands[i];
    a.type === "M" ? n += "M" + r(a.x, a.y) : a.type === "L" ? n += "L" + r(a.x, a.y) : a.type === "C" ? n += "C" + r(a.x1, a.y1, a.x2, a.y2, a.x, a.y) : a.type === "Q" ? n += "Q" + r(a.x1, a.y1, a.x, a.y) : a.type === "Z" && (n += "Z");
  }
  return n;
};
var zp = [".notdef", "space", "exclam", "quotedbl", "numbersign", "dollar", "percent", "ampersand", "quoteright", "parenleft", "parenright", "asterisk", "plus", "comma", "hyphen", "period", "slash", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "colon", "semicolon", "less", "equal", "greater", "question", "at", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "bracketleft", "backslash", "bracketright", "asciicircum", "underscore", "quoteleft", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "braceleft", "bar", "braceright", "asciitilde", "exclamdown", "cent", "sterling", "fraction", "yen", "florin", "section", "currency", "quotesingle", "quotedblleft", "guillemotleft", "guilsinglleft", "guilsinglright", "fi", "fl", "endash", "dagger", "daggerdbl", "periodcentered", "paragraph", "bullet", "quotesinglbase", "quotedblbase", "quotedblright", "guillemotright", "ellipsis", "perthousand", "questiondown", "grave", "acute", "circumflex", "tilde", "macron", "breve", "dotaccent", "dieresis", "ring", "cedilla", "hungarumlaut", "ogonek", "caron", "emdash", "AE", "ordfeminine", "Lslash", "Oslash", "OE", "ordmasculine", "ae", "dotlessi", "lslash", "oslash", "oe", "germandbls", "onesuperior", "logicalnot", "mu", "trademark", "Eth", "onehalf", "plusminus", "Thorn", "onequarter", "divide", "brokenbar", "degree", "thorn", "threequarters", "twosuperior", "registered", "minus", "eth", "multiply", "threesuperior", "copyright", "Aacute", "Acircumflex", "Adieresis", "Agrave", "Aring", "Atilde", "Ccedilla", "Eacute", "Ecircumflex", "Edieresis", "Egrave", "Iacute", "Icircumflex", "Idieresis", "Igrave", "Ntilde", "Oacute", "Ocircumflex", "Odieresis", "Ograve", "Otilde", "Scaron", "Uacute", "Ucircumflex", "Udieresis", "Ugrave", "Yacute", "Ydieresis", "Zcaron", "aacute", "acircumflex", "adieresis", "agrave", "aring", "atilde", "ccedilla", "eacute", "ecircumflex", "edieresis", "egrave", "iacute", "icircumflex", "idieresis", "igrave", "ntilde", "oacute", "ocircumflex", "odieresis", "ograve", "otilde", "scaron", "uacute", "ucircumflex", "udieresis", "ugrave", "yacute", "ydieresis", "zcaron", "exclamsmall", "Hungarumlautsmall", "dollaroldstyle", "dollarsuperior", "ampersandsmall", "Acutesmall", "parenleftsuperior", "parenrightsuperior", "266 ff", "onedotenleader", "zerooldstyle", "oneoldstyle", "twooldstyle", "threeoldstyle", "fouroldstyle", "fiveoldstyle", "sixoldstyle", "sevenoldstyle", "eightoldstyle", "nineoldstyle", "commasuperior", "threequartersemdash", "periodsuperior", "questionsmall", "asuperior", "bsuperior", "centsuperior", "dsuperior", "esuperior", "isuperior", "lsuperior", "msuperior", "nsuperior", "osuperior", "rsuperior", "ssuperior", "tsuperior", "ff", "ffi", "ffl", "parenleftinferior", "parenrightinferior", "Circumflexsmall", "hyphensuperior", "Gravesmall", "Asmall", "Bsmall", "Csmall", "Dsmall", "Esmall", "Fsmall", "Gsmall", "Hsmall", "Ismall", "Jsmall", "Ksmall", "Lsmall", "Msmall", "Nsmall", "Osmall", "Psmall", "Qsmall", "Rsmall", "Ssmall", "Tsmall", "Usmall", "Vsmall", "Wsmall", "Xsmall", "Ysmall", "Zsmall", "colonmonetary", "onefitted", "rupiah", "Tildesmall", "exclamdownsmall", "centoldstyle", "Lslashsmall", "Scaronsmall", "Zcaronsmall", "Dieresissmall", "Brevesmall", "Caronsmall", "Dotaccentsmall", "Macronsmall", "figuredash", "hypheninferior", "Ogoneksmall", "Ringsmall", "Cedillasmall", "questiondownsmall", "oneeighth", "threeeighths", "fiveeighths", "seveneighths", "onethird", "twothirds", "zerosuperior", "foursuperior", "fivesuperior", "sixsuperior", "sevensuperior", "eightsuperior", "ninesuperior", "zeroinferior", "oneinferior", "twoinferior", "threeinferior", "fourinferior", "fiveinferior", "sixinferior", "seveninferior", "eightinferior", "nineinferior", "centinferior", "dollarinferior", "periodinferior", "commainferior", "Agravesmall", "Aacutesmall", "Acircumflexsmall", "Atildesmall", "Adieresissmall", "Aringsmall", "AEsmall", "Ccedillasmall", "Egravesmall", "Eacutesmall", "Ecircumflexsmall", "Edieresissmall", "Igravesmall", "Iacutesmall", "Icircumflexsmall", "Idieresissmall", "Ethsmall", "Ntildesmall", "Ogravesmall", "Oacutesmall", "Ocircumflexsmall", "Otildesmall", "Odieresissmall", "OEsmall", "Oslashsmall", "Ugravesmall", "Uacutesmall", "Ucircumflexsmall", "Udieresissmall", "Yacutesmall", "Thornsmall", "Ydieresissmall", "001.000", "001.001", "001.002", "001.003", "Black", "Bold", "Book", "Light", "Medium", "Regular", "Roman", "Semibold"];
var Hp = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "space", "exclam", "quotedbl", "numbersign", "dollar", "percent", "ampersand", "quoteright", "parenleft", "parenright", "asterisk", "plus", "comma", "hyphen", "period", "slash", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "colon", "semicolon", "less", "equal", "greater", "question", "at", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "bracketleft", "backslash", "bracketright", "asciicircum", "underscore", "quoteleft", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "braceleft", "bar", "braceright", "asciitilde", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "exclamdown", "cent", "sterling", "fraction", "yen", "florin", "section", "currency", "quotesingle", "quotedblleft", "guillemotleft", "guilsinglleft", "guilsinglright", "fi", "fl", "", "endash", "dagger", "daggerdbl", "periodcentered", "", "paragraph", "bullet", "quotesinglbase", "quotedblbase", "quotedblright", "guillemotright", "ellipsis", "perthousand", "", "questiondown", "", "grave", "acute", "circumflex", "tilde", "macron", "breve", "dotaccent", "dieresis", "", "ring", "cedilla", "", "hungarumlaut", "ogonek", "caron", "emdash", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "AE", "", "ordfeminine", "", "", "", "", "Lslash", "Oslash", "OE", "ordmasculine", "", "", "", "", "", "ae", "", "", "", "dotlessi", "", "", "lslash", "oslash", "oe", "germandbls"];
var Xp = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "space", "exclamsmall", "Hungarumlautsmall", "", "dollaroldstyle", "dollarsuperior", "ampersandsmall", "Acutesmall", "parenleftsuperior", "parenrightsuperior", "twodotenleader", "onedotenleader", "comma", "hyphen", "period", "fraction", "zerooldstyle", "oneoldstyle", "twooldstyle", "threeoldstyle", "fouroldstyle", "fiveoldstyle", "sixoldstyle", "sevenoldstyle", "eightoldstyle", "nineoldstyle", "colon", "semicolon", "commasuperior", "threequartersemdash", "periodsuperior", "questionsmall", "", "asuperior", "bsuperior", "centsuperior", "dsuperior", "esuperior", "", "", "isuperior", "", "", "lsuperior", "msuperior", "nsuperior", "osuperior", "", "", "rsuperior", "ssuperior", "tsuperior", "", "ff", "fi", "fl", "ffi", "ffl", "parenleftinferior", "", "parenrightinferior", "Circumflexsmall", "hyphensuperior", "Gravesmall", "Asmall", "Bsmall", "Csmall", "Dsmall", "Esmall", "Fsmall", "Gsmall", "Hsmall", "Ismall", "Jsmall", "Ksmall", "Lsmall", "Msmall", "Nsmall", "Osmall", "Psmall", "Qsmall", "Rsmall", "Ssmall", "Tsmall", "Usmall", "Vsmall", "Wsmall", "Xsmall", "Ysmall", "Zsmall", "colonmonetary", "onefitted", "rupiah", "Tildesmall", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "exclamdownsmall", "centoldstyle", "Lslashsmall", "", "", "Scaronsmall", "Zcaronsmall", "Dieresissmall", "Brevesmall", "Caronsmall", "", "Dotaccentsmall", "", "", "Macronsmall", "", "", "figuredash", "hypheninferior", "", "", "Ogoneksmall", "Ringsmall", "Cedillasmall", "", "", "", "onequarter", "onehalf", "threequarters", "questiondownsmall", "oneeighth", "threeeighths", "fiveeighths", "seveneighths", "onethird", "twothirds", "", "", "zerosuperior", "onesuperior", "twosuperior", "threesuperior", "foursuperior", "fivesuperior", "sixsuperior", "sevensuperior", "eightsuperior", "ninesuperior", "zeroinferior", "oneinferior", "twoinferior", "threeinferior", "fourinferior", "fiveinferior", "sixinferior", "seveninferior", "eightinferior", "nineinferior", "centinferior", "dollarinferior", "periodinferior", "commainferior", "Agravesmall", "Aacutesmall", "Acircumflexsmall", "Atildesmall", "Adieresissmall", "Aringsmall", "AEsmall", "Ccedillasmall", "Egravesmall", "Eacutesmall", "Ecircumflexsmall", "Edieresissmall", "Igravesmall", "Iacutesmall", "Icircumflexsmall", "Idieresissmall", "Ethsmall", "Ntildesmall", "Ogravesmall", "Oacutesmall", "Ocircumflexsmall", "Otildesmall", "Odieresissmall", "OEsmall", "Oslashsmall", "Ugravesmall", "Uacutesmall", "Ucircumflexsmall", "Udieresissmall", "Yacutesmall", "Thornsmall", "Ydieresissmall"];
function zs(e) {
  this.font = e;
}
__name(zs, "zs");
zs.prototype.charToGlyphIndex = function(e) {
  var t = e.codePointAt(0), r = this.font.glyphs;
  if (r) {
    for (var n = 0; n < r.length; n += 1)
      for (var i = r.get(n), a = 0; a < i.unicodes.length; a += 1)
        if (i.unicodes[a] === t)
          return n;
  }
  return null;
};
function Hs(e) {
  this.cmap = e;
}
__name(Hs, "Hs");
Hs.prototype.charToGlyphIndex = function(e) {
  return this.cmap.glyphIndexMap[e.codePointAt(0)] || 0;
};
function kn(e, t) {
  this.encoding = e, this.charset = t;
}
__name(kn, "kn");
kn.prototype.charToGlyphIndex = function(e) {
  var t = e.codePointAt(0), r = this.encoding[t];
  return this.charset.indexOf(r);
};
function qp(e) {
  for (var t, r = e.tables.cmap.glyphIndexMap, n = Object.keys(r), i = 0; i < n.length; i += 1) {
    var a = n[i], o = r[a];
    t = e.glyphs.get(o), t.addUnicode(parseInt(a));
  }
}
__name(qp, "qp");
function Yp(e) {
  e._IndexToUnicodeMap = {};
  for (var t = e.tables.cmap.glyphIndexMap, r = Object.keys(t), n = 0; n < r.length; n += 1) {
    var i = r[n], a = t[i];
    e._IndexToUnicodeMap[a] === void 0 ? e._IndexToUnicodeMap[a] = { unicodes: [parseInt(i)] } : e._IndexToUnicodeMap[a].unicodes.push(parseInt(i));
  }
}
__name(Yp, "Yp");
function Zp(e, t) {
  t.lowMemory ? Yp(e) : qp(e);
}
__name(Zp, "Zp");
function Xs(e) {
  throw new Error(e);
}
__name(Xs, "Xs");
function cs(e, t) {
  e || Xs(t);
}
__name(cs, "cs");
var _e = { fail: Xs, argument: cs, assert: cs };
function Qp(e, t) {
  var r = t || new at();
  return { configurable: true, get: function() {
    return typeof r == "function" && (r = r()), r;
  }, set: function(n) {
    r = n;
  } };
}
__name(Qp, "Qp");
function Kt(e) {
  this.bindConstructorValues(e);
}
__name(Kt, "Kt");
Kt.prototype.bindConstructorValues = function(e) {
  this.index = e.index || 0, this.name = e.name || null, this.unicode = e.unicode || void 0, this.unicodes = e.unicodes || e.unicode !== void 0 ? [e.unicode] : [], "xMin" in e && (this.xMin = e.xMin), "yMin" in e && (this.yMin = e.yMin), "xMax" in e && (this.xMax = e.xMax), "yMax" in e && (this.yMax = e.yMax), "advanceWidth" in e && (this.advanceWidth = e.advanceWidth), Object.defineProperty(this, "path", Qp(this, e.path));
};
Kt.prototype.addUnicode = function(e) {
  this.unicodes.length === 0 && (this.unicode = e), this.unicodes.push(e);
};
Kt.prototype.getPath = function(e, t, r, n, i) {
  e = e !== void 0 ? e : 0, t = t !== void 0 ? t : 0, r = r !== void 0 ? r : 72;
  var a, o;
  n || (n = {});
  var u = n.xScale, s = n.yScale;
  if (n.hinting && i && i.hinting && (o = this.path && i.hinting.exec(this, r)), o)
    a = i.hinting.getCommands(o), e = Math.round(e), t = Math.round(t), u = s = 1;
  else {
    a = this.path.commands;
    var l = 1 / (this.path.unitsPerEm || 1e3) * r;
    u === void 0 && (u = l), s === void 0 && (s = l);
  }
  for (var f = new at(), c = 0; c < a.length; c += 1) {
    var p = a[c];
    p.type === "M" ? f.moveTo(e + p.x * u, t + -p.y * s) : p.type === "L" ? f.lineTo(e + p.x * u, t + -p.y * s) : p.type === "Q" ? f.quadraticCurveTo(e + p.x1 * u, t + -p.y1 * s, e + p.x * u, t + -p.y * s) : p.type === "C" ? f.curveTo(e + p.x1 * u, t + -p.y1 * s, e + p.x2 * u, t + -p.y2 * s, e + p.x * u, t + -p.y * s) : p.type === "Z" && f.closePath();
  }
  return f;
};
Kt.prototype.getContours = function() {
  if (this.points === void 0)
    return [];
  for (var e = [], t = [], r = 0; r < this.points.length; r += 1) {
    var n = this.points[r];
    t.push(n), n.lastPointOfContour && (e.push(t), t = []);
  }
  return _e.argument(t.length === 0, "There are still points left in the current contour."), e;
};
Kt.prototype.getMetrics = function() {
  for (var e = this.path.commands, t = [], r = [], n = 0; n < e.length; n += 1) {
    var i = e[n];
    i.type !== "Z" && (t.push(i.x), r.push(i.y)), (i.type === "Q" || i.type === "C") && (t.push(i.x1), r.push(i.y1)), i.type === "C" && (t.push(i.x2), r.push(i.y2));
  }
  var a = { xMin: Math.min.apply(null, t), yMin: Math.min.apply(null, r), xMax: Math.max.apply(null, t), yMax: Math.max.apply(null, r), leftSideBearing: this.leftSideBearing };
  return isFinite(a.xMin) || (a.xMin = 0), isFinite(a.xMax) || (a.xMax = this.advanceWidth), isFinite(a.yMin) || (a.yMin = 0), isFinite(a.yMax) || (a.yMax = 0), a.rightSideBearing = this.advanceWidth - a.leftSideBearing - (a.xMax - a.xMin), a;
};
function Fn(e, t, r) {
  Object.defineProperty(e, t, { get: function() {
    return e.path, e[r];
  }, set: function(n) {
    e[r] = n;
  }, enumerable: true, configurable: true });
}
__name(Fn, "Fn");
function aa(e, t) {
  if (this.font = e, this.glyphs = {}, Array.isArray(t))
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.path.unitsPerEm = e.unitsPerEm, this.glyphs[r] = n;
    }
  this.length = t && t.length || 0;
}
__name(aa, "aa");
aa.prototype.get = function(e) {
  if (this.glyphs[e] === void 0) {
    this.font._push(e), typeof this.glyphs[e] == "function" && (this.glyphs[e] = this.glyphs[e]());
    var t = this.glyphs[e], r = this.font._IndexToUnicodeMap[e];
    if (r)
      for (var n = 0; n < r.unicodes.length; n++)
        t.addUnicode(r.unicodes[n]);
    this.glyphs[e].advanceWidth = this.font._hmtxTableData[e].advanceWidth, this.glyphs[e].leftSideBearing = this.font._hmtxTableData[e].leftSideBearing;
  } else
    typeof this.glyphs[e] == "function" && (this.glyphs[e] = this.glyphs[e]());
  return this.glyphs[e];
};
aa.prototype.push = function(e, t) {
  this.glyphs[e] = t, this.length++;
};
function Jp(e, t) {
  return new Kt({ index: t, font: e });
}
__name(Jp, "Jp");
function Kp(e, t, r, n, i, a) {
  return function() {
    var o = new Kt({ index: t, font: e });
    return o.path = function() {
      r(o, n, i);
      var u = a(e.glyphs, o);
      return u.unitsPerEm = e.unitsPerEm, u;
    }, Fn(o, "xMin", "_xMin"), Fn(o, "xMax", "_xMax"), Fn(o, "yMin", "_yMin"), Fn(o, "yMax", "_yMax"), o;
  };
}
__name(Kp, "Kp");
function eh(e, t, r, n) {
  return function() {
    var i = new Kt({ index: t, font: e });
    return i.path = function() {
      var a = r(e, i, n);
      return a.unitsPerEm = e.unitsPerEm, a;
    }, i;
  };
}
__name(eh, "eh");
var Vt = { GlyphSet: aa, glyphLoader: Jp, ttfGlyphLoader: Kp, cffGlyphLoader: eh };
function Yi(e, t) {
  for (var r = 0, n = e.length - 1; r <= n; ) {
    var i = r + n >>> 1, a = e[i].tag;
    if (a === t)
      return i;
    a < t ? r = i + 1 : n = i - 1;
  }
  return -r - 1;
}
__name(Yi, "Yi");
function ps(e, t) {
  for (var r = 0, n = e.length - 1; r <= n; ) {
    var i = r + n >>> 1, a = e[i];
    if (a === t)
      return i;
    a < t ? r = i + 1 : n = i - 1;
  }
  return -r - 1;
}
__name(ps, "ps");
function hs(e, t) {
  for (var r, n = 0, i = e.length - 1; n <= i; ) {
    var a = n + i >>> 1;
    r = e[a];
    var o = r.start;
    if (o === t)
      return r;
    o < t ? n = a + 1 : i = a - 1;
  }
  if (n > 0)
    return r = e[n - 1], t > r.end ? 0 : r;
}
__name(hs, "hs");
function Vr(e, t) {
  this.font = e, this.tableName = t;
}
__name(Vr, "Vr");
Vr.prototype = { searchTag: Yi, binSearch: ps, getTable: function(e) {
  var t = this.font.tables[this.tableName];
  return !t && e && (t = this.font.tables[this.tableName] = this.createDefaultTable()), t;
}, getDefaultScriptName: function() {
  var e = this.getTable();
  if (e) {
    for (var t = false, r = 0; r < e.scripts.length; r++) {
      var n = e.scripts[r].tag;
      if (n === "DFLT")
        return n;
      n === "latn" && (t = true);
    }
    if (t)
      return "latn";
  }
}, getScriptTable: function(e, t) {
  var r = this.getTable(t);
  if (r) {
    e = e || "DFLT";
    var n = r.scripts, i = Yi(r.scripts, e);
    if (i >= 0)
      return n[i].script;
    if (t) {
      var a = { tag: e, script: { defaultLangSys: { reserved: 0, reqFeatureIndex: 65535, featureIndexes: [] }, langSysRecords: [] } };
      return n.splice(-1 - i, 0, a), a.script;
    }
  }
}, getLangSysTable: function(e, t, r) {
  var n = this.getScriptTable(e, r);
  if (n) {
    if (!t || t === "dflt" || t === "DFLT")
      return n.defaultLangSys;
    var i = Yi(n.langSysRecords, t);
    if (i >= 0)
      return n.langSysRecords[i].langSys;
    if (r) {
      var a = { tag: t, langSys: { reserved: 0, reqFeatureIndex: 65535, featureIndexes: [] } };
      return n.langSysRecords.splice(-1 - i, 0, a), a.langSys;
    }
  }
}, getFeatureTable: function(e, t, r, n) {
  var i = this.getLangSysTable(e, t, n);
  if (i) {
    for (var a, o = i.featureIndexes, u = this.font.tables[this.tableName].features, s = 0; s < o.length; s++)
      if (a = u[o[s]], a.tag === r)
        return a.feature;
    if (n) {
      var l = u.length;
      return _e.assert(l === 0 || r >= u[l - 1].tag, "Features must be added in alphabetical order."), a = { tag: r, feature: { params: 0, lookupListIndexes: [] } }, u.push(a), o.push(l), a.feature;
    }
  }
}, getLookupTables: function(e, t, r, n, i) {
  var a = this.getFeatureTable(e, t, r, i), o = [];
  if (a) {
    for (var u, s = a.lookupListIndexes, l = this.font.tables[this.tableName].lookups, f = 0; f < s.length; f++)
      u = l[s[f]], u.lookupType === n && o.push(u);
    if (o.length === 0 && i) {
      u = { lookupType: n, lookupFlag: 0, subtables: [], markFilteringSet: void 0 };
      var c = l.length;
      return l.push(u), s.push(c), [u];
    }
  }
  return o;
}, getGlyphClass: function(e, t) {
  switch (e.format) {
    case 1:
      return e.startGlyph <= t && t < e.startGlyph + e.classes.length ? e.classes[t - e.startGlyph] : 0;
    case 2:
      var r = hs(e.ranges, t);
      return r ? r.classId : 0;
  }
}, getCoverageIndex: function(e, t) {
  switch (e.format) {
    case 1:
      var r = ps(e.glyphs, t);
      return r >= 0 ? r : -1;
    case 2:
      var n = hs(e.ranges, t);
      return n ? n.index + t - n.start : -1;
  }
}, expandCoverage: function(e) {
  if (e.format === 1)
    return e.glyphs;
  for (var t = [], r = e.ranges, n = 0; n < r.length; n++)
    for (var i = r[n], a = i.start, o = i.end, u = a; u <= o; u++)
      t.push(u);
  return t;
} };
function zr(e) {
  Vr.call(this, e, "gpos");
}
__name(zr, "zr");
zr.prototype = Vr.prototype;
zr.prototype.init = function() {
  var e = this.getDefaultScriptName();
  this.defaultKerningTables = this.getKerningTables(e);
};
zr.prototype.getKerningValue = function(e, t, r) {
  for (var n = 0; n < e.length; n++)
    for (var i = e[n].subtables, a = 0; a < i.length; a++) {
      var o = i[a], u = this.getCoverageIndex(o.coverage, t);
      if (!(u < 0))
        switch (o.posFormat) {
          case 1:
            for (var s = o.pairSets[u], l = 0; l < s.length; l++) {
              var f = s[l];
              if (f.secondGlyph === r)
                return f.value1 && f.value1.xAdvance || 0;
            }
            break;
          case 2:
            var c = this.getGlyphClass(o.classDef1, t), p = this.getGlyphClass(o.classDef2, r), v = o.classRecords[c][p];
            return v.value1 && v.value1.xAdvance || 0;
        }
    }
  return 0;
};
zr.prototype.getKerningTables = function(e, t) {
  if (this.font.tables.gpos)
    return this.getLookupTables(e, t, "kern", 2);
};
function mt(e) {
  Vr.call(this, e, "gsub");
}
__name(mt, "mt");
function th(e, t) {
  var r = e.length;
  if (r !== t.length)
    return false;
  for (var n = 0; n < r; n++)
    if (e[n] !== t[n])
      return false;
  return true;
}
__name(th, "th");
function oa(e, t, r) {
  for (var n = e.subtables, i = 0; i < n.length; i++) {
    var a = n[i];
    if (a.substFormat === t)
      return a;
  }
  if (r)
    return n.push(r), r;
}
__name(oa, "oa");
mt.prototype = Vr.prototype;
mt.prototype.createDefaultTable = function() {
  return { version: 1, scripts: [{ tag: "DFLT", script: { defaultLangSys: { reserved: 0, reqFeatureIndex: 65535, featureIndexes: [] }, langSysRecords: [] } }], features: [], lookups: [] };
};
mt.prototype.getSingle = function(e, t, r) {
  for (var n = [], i = this.getLookupTables(t, r, e, 1), a = 0; a < i.length; a++)
    for (var o = i[a].subtables, u = 0; u < o.length; u++) {
      var s = o[u], l = this.expandCoverage(s.coverage), f = void 0;
      if (s.substFormat === 1) {
        var c = s.deltaGlyphId;
        for (f = 0; f < l.length; f++) {
          var p = l[f];
          n.push({ sub: p, by: p + c });
        }
      } else {
        var v = s.substitute;
        for (f = 0; f < l.length; f++)
          n.push({ sub: l[f], by: v[f] });
      }
    }
  return n;
};
mt.prototype.getMultiple = function(e, t, r) {
  for (var n = [], i = this.getLookupTables(t, r, e, 2), a = 0; a < i.length; a++)
    for (var o = i[a].subtables, u = 0; u < o.length; u++) {
      var s = o[u], l = this.expandCoverage(s.coverage), f = void 0;
      for (f = 0; f < l.length; f++) {
        var c = l[f], p = s.sequences[f];
        n.push({ sub: c, by: p });
      }
    }
  return n;
};
mt.prototype.getAlternates = function(e, t, r) {
  for (var n = [], i = this.getLookupTables(t, r, e, 3), a = 0; a < i.length; a++)
    for (var o = i[a].subtables, u = 0; u < o.length; u++)
      for (var s = o[u], l = this.expandCoverage(s.coverage), f = s.alternateSets, c = 0; c < l.length; c++)
        n.push({ sub: l[c], by: f[c] });
  return n;
};
mt.prototype.getLigatures = function(e, t, r) {
  for (var n = [], i = this.getLookupTables(t, r, e, 4), a = 0; a < i.length; a++)
    for (var o = i[a].subtables, u = 0; u < o.length; u++)
      for (var s = o[u], l = this.expandCoverage(s.coverage), f = s.ligatureSets, c = 0; c < l.length; c++)
        for (var p = l[c], v = f[c], D = 0; D < v.length; D++) {
          var d = v[D];
          n.push({ sub: [p].concat(d.components), by: d.ligGlyph });
        }
  return n;
};
mt.prototype.addSingle = function(e, t, r, n) {
  var i = this.getLookupTables(r, n, e, 1, true)[0], a = oa(i, 2, { substFormat: 2, coverage: { format: 1, glyphs: [] }, substitute: [] });
  _e.assert(a.coverage.format === 1, "Single: unable to modify coverage table format " + a.coverage.format);
  var o = t.sub, u = this.binSearch(a.coverage.glyphs, o);
  u < 0 && (u = -1 - u, a.coverage.glyphs.splice(u, 0, o), a.substitute.splice(u, 0, 0)), a.substitute[u] = t.by;
};
mt.prototype.addMultiple = function(e, t, r, n) {
  _e.assert(t.by instanceof Array && t.by.length > 1, 'Multiple: "by" must be an array of two or more ids');
  var i = this.getLookupTables(r, n, e, 2, true)[0], a = oa(i, 1, { substFormat: 1, coverage: { format: 1, glyphs: [] }, sequences: [] });
  _e.assert(a.coverage.format === 1, "Multiple: unable to modify coverage table format " + a.coverage.format);
  var o = t.sub, u = this.binSearch(a.coverage.glyphs, o);
  u < 0 && (u = -1 - u, a.coverage.glyphs.splice(u, 0, o), a.sequences.splice(u, 0, 0)), a.sequences[u] = t.by;
};
mt.prototype.addAlternate = function(e, t, r, n) {
  var i = this.getLookupTables(r, n, e, 3, true)[0], a = oa(i, 1, { substFormat: 1, coverage: { format: 1, glyphs: [] }, alternateSets: [] });
  _e.assert(a.coverage.format === 1, "Alternate: unable to modify coverage table format " + a.coverage.format);
  var o = t.sub, u = this.binSearch(a.coverage.glyphs, o);
  u < 0 && (u = -1 - u, a.coverage.glyphs.splice(u, 0, o), a.alternateSets.splice(u, 0, 0)), a.alternateSets[u] = t.by;
};
mt.prototype.addLigature = function(e, t, r, n) {
  var i = this.getLookupTables(r, n, e, 4, true)[0], a = i.subtables[0];
  a || (a = { substFormat: 1, coverage: { format: 1, glyphs: [] }, ligatureSets: [] }, i.subtables[0] = a), _e.assert(a.coverage.format === 1, "Ligature: unable to modify coverage table format " + a.coverage.format);
  var o = t.sub[0], u = t.sub.slice(1), s = { ligGlyph: t.by, components: u }, l = this.binSearch(a.coverage.glyphs, o);
  if (l >= 0) {
    for (var f = a.ligatureSets[l], c = 0; c < f.length; c++)
      if (th(f[c].components, u))
        return;
    f.push(s);
  } else
    l = -1 - l, a.coverage.glyphs.splice(l, 0, o), a.ligatureSets.splice(l, 0, [s]);
};
mt.prototype.getFeature = function(e, t, r) {
  if (/ss\d\d/.test(e))
    return this.getSingle(e, t, r);
  switch (e) {
    case "aalt":
    case "salt":
      return this.getSingle(e, t, r).concat(this.getAlternates(e, t, r));
    case "dlig":
    case "liga":
    case "rlig":
      return this.getLigatures(e, t, r);
    case "ccmp":
      return this.getMultiple(e, t, r).concat(this.getLigatures(e, t, r));
    case "stch":
      return this.getMultiple(e, t, r);
  }
};
mt.prototype.add = function(e, t, r, n) {
  if (/ss\d\d/.test(e))
    return this.addSingle(e, t, r, n);
  switch (e) {
    case "aalt":
    case "salt":
      return typeof t.by == "number" ? this.addSingle(e, t, r, n) : this.addAlternate(e, t, r, n);
    case "dlig":
    case "liga":
    case "rlig":
      return this.addLigature(e, t, r, n);
    case "ccmp":
      return t.by instanceof Array ? this.addMultiple(e, t, r, n) : this.addLigature(e, t, r, n);
  }
};
function Mr(e, t) {
  if (!e)
    throw t;
}
__name(Mr, "Mr");
function ds(e, t) {
  return e.getUint8(t);
}
__name(ds, "ds");
function _n(e, t) {
  return e.getUint16(t, false);
}
__name(_n, "_n");
function rh(e, t) {
  return e.getInt16(t, false);
}
__name(rh, "rh");
function sa(e, t) {
  return e.getUint32(t, false);
}
__name(sa, "sa");
function qs(e, t) {
  var r = e.getInt16(t, false), n = e.getUint16(t + 2, false);
  return r + n / 65535;
}
__name(qs, "qs");
function nh(e, t) {
  for (var r = "", n = t; n < t + 4; n += 1)
    r += String.fromCharCode(e.getInt8(n));
  return r;
}
__name(nh, "nh");
function ih(e, t, r) {
  for (var n = 0, i = 0; i < r; i += 1)
    n <<= 8, n += e.getUint8(t + i);
  return n;
}
__name(ih, "ih");
function ah(e, t, r) {
  for (var n = [], i = t; i < r; i += 1)
    n.push(e.getUint8(i));
  return n;
}
__name(ah, "ah");
function oh(e) {
  for (var t = "", r = 0; r < e.length; r += 1)
    t += String.fromCharCode(e[r]);
  return t;
}
__name(oh, "oh");
var sh = { byte: 1, uShort: 2, short: 2, uLong: 4, fixed: 4, longDateTime: 8, tag: 4 };
function G(e, t) {
  this.data = e, this.offset = t, this.relativeOffset = 0;
}
__name(G, "G");
G.prototype.parseByte = function() {
  var e = this.data.getUint8(this.offset + this.relativeOffset);
  return this.relativeOffset += 1, e;
};
G.prototype.parseChar = function() {
  var e = this.data.getInt8(this.offset + this.relativeOffset);
  return this.relativeOffset += 1, e;
};
G.prototype.parseCard8 = G.prototype.parseByte;
G.prototype.parseUShort = function() {
  var e = this.data.getUint16(this.offset + this.relativeOffset);
  return this.relativeOffset += 2, e;
};
G.prototype.parseCard16 = G.prototype.parseUShort;
G.prototype.parseSID = G.prototype.parseUShort;
G.prototype.parseOffset16 = G.prototype.parseUShort;
G.prototype.parseShort = function() {
  var e = this.data.getInt16(this.offset + this.relativeOffset);
  return this.relativeOffset += 2, e;
};
G.prototype.parseF2Dot14 = function() {
  var e = this.data.getInt16(this.offset + this.relativeOffset) / 16384;
  return this.relativeOffset += 2, e;
};
G.prototype.parseULong = function() {
  var e = sa(this.data, this.offset + this.relativeOffset);
  return this.relativeOffset += 4, e;
};
G.prototype.parseOffset32 = G.prototype.parseULong;
G.prototype.parseFixed = function() {
  var e = qs(this.data, this.offset + this.relativeOffset);
  return this.relativeOffset += 4, e;
};
G.prototype.parseString = function(e) {
  var t = this.data, r = this.offset + this.relativeOffset, n = "";
  this.relativeOffset += e;
  for (var i = 0; i < e; i++)
    n += String.fromCharCode(t.getUint8(r + i));
  return n;
};
G.prototype.parseTag = function() {
  return this.parseString(4);
};
G.prototype.parseLongDateTime = function() {
  var e = sa(this.data, this.offset + this.relativeOffset + 4);
  return e -= 2082844800, this.relativeOffset += 8, e;
};
G.prototype.parseVersion = function(e) {
  var t = _n(this.data, this.offset + this.relativeOffset), r = _n(this.data, this.offset + this.relativeOffset + 2);
  return this.relativeOffset += 4, e === void 0 && (e = 4096), t + r / e / 10;
};
G.prototype.skip = function(e, t) {
  t === void 0 && (t = 1), this.relativeOffset += sh[e] * t;
};
G.prototype.parseULongList = function(e) {
  e === void 0 && (e = this.parseULong());
  for (var t = new Array(e), r = this.data, n = this.offset + this.relativeOffset, i = 0; i < e; i++)
    t[i] = r.getUint32(n), n += 4;
  return this.relativeOffset += e * 4, t;
};
G.prototype.parseOffset16List = G.prototype.parseUShortList = function(e) {
  e === void 0 && (e = this.parseUShort());
  for (var t = new Array(e), r = this.data, n = this.offset + this.relativeOffset, i = 0; i < e; i++)
    t[i] = r.getUint16(n), n += 2;
  return this.relativeOffset += e * 2, t;
};
G.prototype.parseShortList = function(e) {
  for (var t = new Array(e), r = this.data, n = this.offset + this.relativeOffset, i = 0; i < e; i++)
    t[i] = r.getInt16(n), n += 2;
  return this.relativeOffset += e * 2, t;
};
G.prototype.parseByteList = function(e) {
  for (var t = new Array(e), r = this.data, n = this.offset + this.relativeOffset, i = 0; i < e; i++)
    t[i] = r.getUint8(n++);
  return this.relativeOffset += e, t;
};
G.prototype.parseList = function(e, t) {
  t || (t = e, e = this.parseUShort());
  for (var r = new Array(e), n = 0; n < e; n++)
    r[n] = t.call(this);
  return r;
};
G.prototype.parseList32 = function(e, t) {
  t || (t = e, e = this.parseULong());
  for (var r = new Array(e), n = 0; n < e; n++)
    r[n] = t.call(this);
  return r;
};
G.prototype.parseRecordList = function(e, t) {
  t || (t = e, e = this.parseUShort());
  for (var r = new Array(e), n = Object.keys(t), i = 0; i < e; i++) {
    for (var a = {}, o = 0; o < n.length; o++) {
      var u = n[o], s = t[u];
      a[u] = s.call(this);
    }
    r[i] = a;
  }
  return r;
};
G.prototype.parseRecordList32 = function(e, t) {
  t || (t = e, e = this.parseULong());
  for (var r = new Array(e), n = Object.keys(t), i = 0; i < e; i++) {
    for (var a = {}, o = 0; o < n.length; o++) {
      var u = n[o], s = t[u];
      a[u] = s.call(this);
    }
    r[i] = a;
  }
  return r;
};
G.prototype.parseStruct = function(e) {
  if (typeof e == "function")
    return e.call(this);
  for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
    var i = t[n], a = e[i];
    r[i] = a.call(this);
  }
  return r;
};
G.prototype.parseValueRecord = function(e) {
  if (e === void 0 && (e = this.parseUShort()), e !== 0) {
    var t = {};
    return e & 1 && (t.xPlacement = this.parseShort()), e & 2 && (t.yPlacement = this.parseShort()), e & 4 && (t.xAdvance = this.parseShort()), e & 8 && (t.yAdvance = this.parseShort()), e & 16 && (t.xPlaDevice = void 0, this.parseShort()), e & 32 && (t.yPlaDevice = void 0, this.parseShort()), e & 64 && (t.xAdvDevice = void 0, this.parseShort()), e & 128 && (t.yAdvDevice = void 0, this.parseShort()), t;
  }
};
G.prototype.parseValueRecordList = function() {
  for (var e = this.parseUShort(), t = this.parseUShort(), r = new Array(t), n = 0; n < t; n++)
    r[n] = this.parseValueRecord(e);
  return r;
};
G.prototype.parsePointer = function(e) {
  var t = this.parseOffset16();
  if (t > 0)
    return new G(this.data, this.offset + t).parseStruct(e);
};
G.prototype.parsePointer32 = function(e) {
  var t = this.parseOffset32();
  if (t > 0)
    return new G(this.data, this.offset + t).parseStruct(e);
};
G.prototype.parseListOfLists = function(e) {
  for (var t = this.parseOffset16List(), r = t.length, n = this.relativeOffset, i = new Array(r), a = 0; a < r; a++) {
    var o = t[a];
    if (o === 0) {
      i[a] = void 0;
      continue;
    }
    if (this.relativeOffset = o, e) {
      for (var u = this.parseOffset16List(), s = new Array(u.length), l = 0; l < u.length; l++)
        this.relativeOffset = o + u[l], s[l] = e.call(this);
      i[a] = s;
    } else
      i[a] = this.parseUShortList();
  }
  return this.relativeOffset = n, i;
};
G.prototype.parseCoverage = function() {
  var e = this.offset + this.relativeOffset, t = this.parseUShort(), r = this.parseUShort();
  if (t === 1)
    return { format: 1, glyphs: this.parseUShortList(r) };
  if (t === 2) {
    for (var n = new Array(r), i = 0; i < r; i++)
      n[i] = { start: this.parseUShort(), end: this.parseUShort(), index: this.parseUShort() };
    return { format: 2, ranges: n };
  }
  throw new Error("0x" + e.toString(16) + ": Coverage format must be 1 or 2.");
};
G.prototype.parseClassDef = function() {
  var e = this.offset + this.relativeOffset, t = this.parseUShort();
  if (t === 1)
    return { format: 1, startGlyph: this.parseUShort(), classes: this.parseUShortList() };
  if (t === 2)
    return { format: 2, ranges: this.parseRecordList({ start: G.uShort, end: G.uShort, classId: G.uShort }) };
  throw new Error("0x" + e.toString(16) + ": ClassDef format must be 1 or 2.");
};
G.list = function(e, t) {
  return function() {
    return this.parseList(e, t);
  };
};
G.list32 = function(e, t) {
  return function() {
    return this.parseList32(e, t);
  };
};
G.recordList = function(e, t) {
  return function() {
    return this.parseRecordList(e, t);
  };
};
G.recordList32 = function(e, t) {
  return function() {
    return this.parseRecordList32(e, t);
  };
};
G.pointer = function(e) {
  return function() {
    return this.parsePointer(e);
  };
};
G.pointer32 = function(e) {
  return function() {
    return this.parsePointer32(e);
  };
};
G.tag = G.prototype.parseTag;
G.byte = G.prototype.parseByte;
G.uShort = G.offset16 = G.prototype.parseUShort;
G.uShortList = G.prototype.parseUShortList;
G.uLong = G.offset32 = G.prototype.parseULong;
G.uLongList = G.prototype.parseULongList;
G.struct = G.prototype.parseStruct;
G.coverage = G.prototype.parseCoverage;
G.classDef = G.prototype.parseClassDef;
var vs = { reserved: G.uShort, reqFeatureIndex: G.uShort, featureIndexes: G.uShortList };
G.prototype.parseScriptList = function() {
  return this.parsePointer(G.recordList({ tag: G.tag, script: G.pointer({ defaultLangSys: G.pointer(vs), langSysRecords: G.recordList({ tag: G.tag, langSys: G.pointer(vs) }) }) })) || [];
};
G.prototype.parseFeatureList = function() {
  return this.parsePointer(G.recordList({ tag: G.tag, feature: G.pointer({ featureParams: G.offset16, lookupListIndexes: G.uShortList }) })) || [];
};
G.prototype.parseLookupList = function(e) {
  return this.parsePointer(G.list(G.pointer(function() {
    var t = this.parseUShort();
    _e.argument(1 <= t && t <= 9, "GPOS/GSUB lookup type " + t + " unknown.");
    var r = this.parseUShort(), n = r & 16;
    return { lookupType: t, lookupFlag: r, subtables: this.parseList(G.pointer(e[t])), markFilteringSet: n ? this.parseUShort() : void 0 };
  }))) || [];
};
G.prototype.parseFeatureVariationsList = function() {
  return this.parsePointer32(function() {
    var e = this.parseUShort(), t = this.parseUShort();
    _e.argument(e === 1 && t < 1, "GPOS/GSUB feature variations table unknown.");
    var r = this.parseRecordList32({ conditionSetOffset: G.offset32, featureTableSubstitutionOffset: G.offset32 });
    return r;
  }) || [];
};
var se = { getByte: ds, getCard8: ds, getUShort: _n, getCard16: _n, getShort: rh, getULong: sa, getFixed: qs, getTag: nh, getOffset: ih, getBytes: ah, bytesToString: oh, Parser: G };
function gs(e, t, r, n, i) {
  var a;
  return (t & n) > 0 ? (a = e.parseByte(), t & i || (a = -a), a = r + a) : (t & i) > 0 ? a = r : a = r + e.parseShort(), a;
}
__name(gs, "gs");
function Ys(e, t, r) {
  var n = new se.Parser(t, r);
  e.numberOfContours = n.parseShort(), e._xMin = n.parseShort(), e._yMin = n.parseShort(), e._xMax = n.parseShort(), e._yMax = n.parseShort();
  var i, a;
  if (e.numberOfContours > 0) {
    for (var o = e.endPointIndices = [], u = 0; u < e.numberOfContours; u += 1)
      o.push(n.parseUShort());
    e.instructionLength = n.parseUShort(), e.instructions = [];
    for (var s = 0; s < e.instructionLength; s += 1)
      e.instructions.push(n.parseByte());
    var l = o[o.length - 1] + 1;
    i = [];
    for (var f = 0; f < l; f += 1)
      if (a = n.parseByte(), i.push(a), (a & 8) > 0)
        for (var c = n.parseByte(), p = 0; p < c; p += 1)
          i.push(a), f += 1;
    if (_e.argument(i.length === l, "Bad flags."), o.length > 0) {
      var v = [], D;
      if (l > 0) {
        for (var d = 0; d < l; d += 1)
          a = i[d], D = {}, D.onCurve = !!(a & 1), D.lastPointOfContour = o.indexOf(d) >= 0, v.push(D);
        for (var g = 0, y = 0; y < l; y += 1)
          a = i[y], D = v[y], D.x = gs(n, a, g, 2, 16), g = D.x;
        for (var b = 0, S = 0; S < l; S += 1)
          a = i[S], D = v[S], D.y = gs(n, a, b, 4, 32), b = D.y;
      }
      e.points = v;
    } else
      e.points = [];
  } else if (e.numberOfContours === 0)
    e.points = [];
  else {
    e.isComposite = true, e.points = [], e.components = [];
    for (var k = true; k; ) {
      i = n.parseUShort();
      var C = { glyphIndex: n.parseUShort(), xScale: 1, scale01: 0, scale10: 0, yScale: 1, dx: 0, dy: 0 };
      (i & 1) > 0 ? (i & 2) > 0 ? (C.dx = n.parseShort(), C.dy = n.parseShort()) : C.matchedPoints = [n.parseUShort(), n.parseUShort()] : (i & 2) > 0 ? (C.dx = n.parseChar(), C.dy = n.parseChar()) : C.matchedPoints = [n.parseByte(), n.parseByte()], (i & 8) > 0 ? C.xScale = C.yScale = n.parseF2Dot14() : (i & 64) > 0 ? (C.xScale = n.parseF2Dot14(), C.yScale = n.parseF2Dot14()) : (i & 128) > 0 && (C.xScale = n.parseF2Dot14(), C.scale01 = n.parseF2Dot14(), C.scale10 = n.parseF2Dot14(), C.yScale = n.parseF2Dot14()), e.components.push(C), k = !!(i & 32);
    }
    if (i & 256) {
      e.instructionLength = n.parseUShort(), e.instructions = [];
      for (var E = 0; E < e.instructionLength; E += 1)
        e.instructions.push(n.parseByte());
    }
  }
}
__name(Ys, "Ys");
function Zi(e, t) {
  for (var r = [], n = 0; n < e.length; n += 1) {
    var i = e[n], a = { x: t.xScale * i.x + t.scale01 * i.y + t.dx, y: t.scale10 * i.x + t.yScale * i.y + t.dy, onCurve: i.onCurve, lastPointOfContour: i.lastPointOfContour };
    r.push(a);
  }
  return r;
}
__name(Zi, "Zi");
function uh(e) {
  for (var t = [], r = [], n = 0; n < e.length; n += 1) {
    var i = e[n];
    r.push(i), i.lastPointOfContour && (t.push(r), r = []);
  }
  return _e.argument(r.length === 0, "There are still points left in the current contour."), t;
}
__name(uh, "uh");
function Zs(e) {
  var t = new at();
  if (!e)
    return t;
  for (var r = uh(e), n = 0; n < r.length; ++n) {
    var i = r[n], a = null, o = i[i.length - 1], u = i[0];
    if (o.onCurve)
      t.moveTo(o.x, o.y);
    else if (u.onCurve)
      t.moveTo(u.x, u.y);
    else {
      var s = { x: (o.x + u.x) * 0.5, y: (o.y + u.y) * 0.5 };
      t.moveTo(s.x, s.y);
    }
    for (var l = 0; l < i.length; ++l)
      if (a = o, o = u, u = i[(l + 1) % i.length], o.onCurve)
        t.lineTo(o.x, o.y);
      else {
        var f = a, c = u;
        a.onCurve || (f = { x: (o.x + a.x) * 0.5, y: (o.y + a.y) * 0.5 }), u.onCurve || (c = { x: (o.x + u.x) * 0.5, y: (o.y + u.y) * 0.5 }), t.quadraticCurveTo(o.x, o.y, c.x, c.y);
      }
    t.closePath();
  }
  return t;
}
__name(Zs, "Zs");
function Qs(e, t) {
  if (t.isComposite)
    for (var r = 0; r < t.components.length; r += 1) {
      var n = t.components[r], i = e.get(n.glyphIndex);
      if (i.getPath(), i.points) {
        var a = void 0;
        if (n.matchedPoints === void 0)
          a = Zi(i.points, n);
        else {
          if (n.matchedPoints[0] > t.points.length - 1 || n.matchedPoints[1] > i.points.length - 1)
            throw Error("Matched points out of range in " + t.name);
          var o = t.points[n.matchedPoints[0]], u = i.points[n.matchedPoints[1]], s = { xScale: n.xScale, scale01: n.scale01, scale10: n.scale10, yScale: n.yScale, dx: 0, dy: 0 };
          u = Zi([u], s)[0], s.dx = o.x - u.x, s.dy = o.y - u.y, a = Zi(i.points, s);
        }
        t.points = t.points.concat(a);
      }
    }
  return Zs(t.points);
}
__name(Qs, "Qs");
function lh(e, t, r, n) {
  for (var i = new Vt.GlyphSet(n), a = 0; a < r.length - 1; a += 1) {
    var o = r[a], u = r[a + 1];
    o !== u ? i.push(a, Vt.ttfGlyphLoader(n, a, Ys, e, t + o, Qs)) : i.push(a, Vt.glyphLoader(n, a));
  }
  return i;
}
__name(lh, "lh");
function fh(e, t, r, n) {
  var i = new Vt.GlyphSet(n);
  return n._push = function(a) {
    var o = r[a], u = r[a + 1];
    o !== u ? i.push(a, Vt.ttfGlyphLoader(n, a, Ys, e, t + o, Qs)) : i.push(a, Vt.glyphLoader(n, a));
  }, i;
}
__name(fh, "fh");
function ch(e, t, r, n, i) {
  return i.lowMemory ? fh(e, t, r, n) : lh(e, t, r, n);
}
__name(ch, "ch");
var Js = { getPath: Zs, parse: ch };
var Ks;
var br;
var eu;
var na;
function tu(e) {
  this.font = e, this.getCommands = function(t) {
    return Js.getPath(t).commands;
  }, this._fpgmState = this._prepState = void 0, this._errorState = 0;
}
__name(tu, "tu");
function ph(e) {
  return e;
}
__name(ph, "ph");
function ru(e) {
  return Math.sign(e) * Math.round(Math.abs(e));
}
__name(ru, "ru");
function hh(e) {
  return Math.sign(e) * Math.round(Math.abs(e * 2)) / 2;
}
__name(hh, "hh");
function dh(e) {
  return Math.sign(e) * (Math.round(Math.abs(e) + 0.5) - 0.5);
}
__name(dh, "dh");
function vh(e) {
  return Math.sign(e) * Math.ceil(Math.abs(e));
}
__name(vh, "vh");
function gh(e) {
  return Math.sign(e) * Math.floor(Math.abs(e));
}
__name(gh, "gh");
var nu = /* @__PURE__ */ __name(function(e) {
  var t = this.srPeriod, r = this.srPhase, n = this.srThreshold, i = 1;
  return e < 0 && (e = -e, i = -1), e += n - r, e = Math.trunc(e / t) * t, e += r, e < 0 ? r * i : e * i;
}, "nu");
var jt = { x: 1, y: 0, axis: "x", distance: function(e, t, r, n) {
  return (r ? e.xo : e.x) - (n ? t.xo : t.x);
}, interpolate: function(e, t, r, n) {
  var i, a, o, u, s, l, f;
  if (!n || n === this) {
    if (i = e.xo - t.xo, a = e.xo - r.xo, s = t.x - t.xo, l = r.x - r.xo, o = Math.abs(i), u = Math.abs(a), f = o + u, f === 0) {
      e.x = e.xo + (s + l) / 2;
      return;
    }
    e.x = e.xo + (s * u + l * o) / f;
    return;
  }
  if (i = n.distance(e, t, true, true), a = n.distance(e, r, true, true), s = n.distance(t, t, false, true), l = n.distance(r, r, false, true), o = Math.abs(i), u = Math.abs(a), f = o + u, f === 0) {
    jt.setRelative(e, e, (s + l) / 2, n, true);
    return;
  }
  jt.setRelative(e, e, (s * u + l * o) / f, n, true);
}, normalSlope: Number.NEGATIVE_INFINITY, setRelative: function(e, t, r, n, i) {
  if (!n || n === this) {
    e.x = (i ? t.xo : t.x) + r;
    return;
  }
  var a = i ? t.xo : t.x, o = i ? t.yo : t.y, u = a + r * n.x, s = o + r * n.y;
  e.x = u + (e.y - s) / n.normalSlope;
}, slope: 0, touch: function(e) {
  e.xTouched = true;
}, touched: function(e) {
  return e.xTouched;
}, untouch: function(e) {
  e.xTouched = false;
} };
var Qt = { x: 0, y: 1, axis: "y", distance: function(e, t, r, n) {
  return (r ? e.yo : e.y) - (n ? t.yo : t.y);
}, interpolate: function(e, t, r, n) {
  var i, a, o, u, s, l, f;
  if (!n || n === this) {
    if (i = e.yo - t.yo, a = e.yo - r.yo, s = t.y - t.yo, l = r.y - r.yo, o = Math.abs(i), u = Math.abs(a), f = o + u, f === 0) {
      e.y = e.yo + (s + l) / 2;
      return;
    }
    e.y = e.yo + (s * u + l * o) / f;
    return;
  }
  if (i = n.distance(e, t, true, true), a = n.distance(e, r, true, true), s = n.distance(t, t, false, true), l = n.distance(r, r, false, true), o = Math.abs(i), u = Math.abs(a), f = o + u, f === 0) {
    Qt.setRelative(e, e, (s + l) / 2, n, true);
    return;
  }
  Qt.setRelative(e, e, (s * u + l * o) / f, n, true);
}, normalSlope: 0, setRelative: function(e, t, r, n, i) {
  if (!n || n === this) {
    e.y = (i ? t.yo : t.y) + r;
    return;
  }
  var a = i ? t.xo : t.x, o = i ? t.yo : t.y, u = a + r * n.x, s = o + r * n.y;
  e.y = s + n.normalSlope * (e.x - u);
}, slope: Number.POSITIVE_INFINITY, touch: function(e) {
  e.yTouched = true;
}, touched: function(e) {
  return e.yTouched;
}, untouch: function(e) {
  e.yTouched = false;
} };
Object.freeze(jt);
Object.freeze(Qt);
function Hr(e, t) {
  this.x = e, this.y = t, this.axis = void 0, this.slope = t / e, this.normalSlope = -e / t, Object.freeze(this);
}
__name(Hr, "Hr");
Hr.prototype.distance = function(e, t, r, n) {
  return this.x * jt.distance(e, t, r, n) + this.y * Qt.distance(e, t, r, n);
};
Hr.prototype.interpolate = function(e, t, r, n) {
  var i, a, o, u, s, l, f;
  if (o = n.distance(e, t, true, true), u = n.distance(e, r, true, true), i = n.distance(t, t, false, true), a = n.distance(r, r, false, true), s = Math.abs(o), l = Math.abs(u), f = s + l, f === 0) {
    this.setRelative(e, e, (i + a) / 2, n, true);
    return;
  }
  this.setRelative(e, e, (i * l + a * s) / f, n, true);
};
Hr.prototype.setRelative = function(e, t, r, n, i) {
  n = n || this;
  var a = i ? t.xo : t.x, o = i ? t.yo : t.y, u = a + r * n.x, s = o + r * n.y, l = n.normalSlope, f = this.slope, c = e.x, p = e.y;
  e.x = (f * c - l * u + s - p) / (f - l), e.y = f * (e.x - c) + p;
};
Hr.prototype.touch = function(e) {
  e.xTouched = true, e.yTouched = true;
};
function Xr(e, t) {
  var r = Math.sqrt(e * e + t * t);
  return e /= r, t /= r, e === 1 && t === 0 ? jt : e === 0 && t === 1 ? Qt : new Hr(e, t);
}
__name(Xr, "Xr");
function Jt(e, t, r, n) {
  this.x = this.xo = Math.round(e * 64) / 64, this.y = this.yo = Math.round(t * 64) / 64, this.lastPointOfContour = r, this.onCurve = n, this.prevPointOnContour = void 0, this.nextPointOnContour = void 0, this.xTouched = false, this.yTouched = false, Object.preventExtensions(this);
}
__name(Jt, "Jt");
Jt.prototype.nextTouched = function(e) {
  for (var t = this.nextPointOnContour; !e.touched(t) && t !== this; )
    t = t.nextPointOnContour;
  return t;
};
Jt.prototype.prevTouched = function(e) {
  for (var t = this.prevPointOnContour; !e.touched(t) && t !== this; )
    t = t.prevPointOnContour;
  return t;
};
var $r = Object.freeze(new Jt(0, 0));
var mh = { cvCutIn: 17 / 16, deltaBase: 9, deltaShift: 0.125, loop: 1, minDis: 1, autoFlip: true };
function fr(e, t) {
  switch (this.env = e, this.stack = [], this.prog = t, e) {
    case "glyf":
      this.zp0 = this.zp1 = this.zp2 = 1, this.rp0 = this.rp1 = this.rp2 = 0;
    case "prep":
      this.fv = this.pv = this.dpv = jt, this.round = ru;
  }
}
__name(fr, "fr");
tu.prototype.exec = function(e, t) {
  if (typeof t != "number")
    throw new Error("Point size is not a number!");
  if (!(this._errorState > 2)) {
    var r = this.font, n = this._prepState;
    if (!n || n.ppem !== t) {
      var i = this._fpgmState;
      if (!i) {
        fr.prototype = mh, i = this._fpgmState = new fr("fpgm", r.tables.fpgm), i.funcs = [], i.font = r, exports.DEBUG && (console.log("---EXEC FPGM---"), i.step = -1);
        try {
          br(i);
        } catch (l) {
          console.log("Hinting error in FPGM:" + l), this._errorState = 3;
          return;
        }
      }
      fr.prototype = i, n = this._prepState = new fr("prep", r.tables.prep), n.ppem = t;
      var a = r.tables.cvt;
      if (a)
        for (var o = n.cvt = new Array(a.length), u = t / r.unitsPerEm, s = 0; s < a.length; s++)
          o[s] = a[s] * u;
      else
        n.cvt = [];
      exports.DEBUG && (console.log("---EXEC PREP---"), n.step = -1);
      try {
        br(n);
      } catch (l) {
        this._errorState < 2 && console.log("Hinting error in PREP:" + l), this._errorState = 2;
      }
    }
    if (!(this._errorState > 1))
      try {
        return eu(e, n);
      } catch (l) {
        this._errorState < 1 && (console.log("Hinting error:" + l), console.log("Note: further hinting errors are silenced")), this._errorState = 1;
        return;
      }
  }
};
eu = /* @__PURE__ */ __name(function(e, t) {
  var r = t.ppem / t.font.unitsPerEm, n = r, i = e.components, a, o, u;
  if (fr.prototype = t, !i)
    u = new fr("glyf", e.instructions), exports.DEBUG && (console.log("---EXEC GLYPH---"), u.step = -1), na(e, u, r, n), o = u.gZone;
  else {
    var s = t.font;
    o = [], a = [];
    for (var l = 0; l < i.length; l++) {
      var f = i[l], c = s.glyphs.get(f.glyphIndex);
      u = new fr("glyf", c.instructions), exports.DEBUG && (console.log("---EXEC COMP " + l + "---"), u.step = -1), na(c, u, r, n);
      for (var p = Math.round(f.dx * r), v = Math.round(f.dy * n), D = u.gZone, d = u.contours, g = 0; g < D.length; g++) {
        var y = D[g];
        y.xTouched = y.yTouched = false, y.xo = y.x = y.x + p, y.yo = y.y = y.y + v;
      }
      var b = o.length;
      o.push.apply(o, D);
      for (var S = 0; S < d.length; S++)
        a.push(d[S] + b);
    }
    e.instructions && !u.inhibitGridFit && (u = new fr("glyf", e.instructions), u.gZone = u.z0 = u.z1 = u.z2 = o, u.contours = a, o.push(new Jt(0, 0), new Jt(Math.round(e.advanceWidth * r), 0)), exports.DEBUG && (console.log("---EXEC COMPOSITE---"), u.step = -1), br(u), o.length -= 2);
  }
  return o;
}, "eu");
na = /* @__PURE__ */ __name(function(e, t, r, n) {
  for (var i = e.points || [], a = i.length, o = t.gZone = t.z0 = t.z1 = t.z2 = [], u = t.contours = [], s, l = 0; l < a; l++)
    s = i[l], o[l] = new Jt(s.x * r, s.y * n, s.lastPointOfContour, s.onCurve);
  for (var f, c, p = 0; p < a; p++)
    s = o[p], f || (f = s, u.push(p)), s.lastPointOfContour ? (s.nextPointOnContour = f, f.prevPointOnContour = s, f = void 0) : (c = o[p + 1], s.nextPointOnContour = c, c.prevPointOnContour = s);
  if (!t.inhibitGridFit) {
    if (exports.DEBUG) {
      console.log("PROCESSING GLYPH", t.stack);
      for (var v = 0; v < a; v++)
        console.log(v, o[v].x, o[v].y);
    }
    if (o.push(new Jt(0, 0), new Jt(Math.round(e.advanceWidth * r), 0)), br(t), o.length -= 2, exports.DEBUG) {
      console.log("FINISHED GLYPH", t.stack);
      for (var D = 0; D < a; D++)
        console.log(D, o[D].x, o[D].y);
    }
  }
}, "na");
br = /* @__PURE__ */ __name(function(e) {
  var t = e.prog;
  if (t) {
    var r = t.length, n;
    for (e.ip = 0; e.ip < r; e.ip++) {
      if (exports.DEBUG && e.step++, n = Ks[t[e.ip]], !n)
        throw new Error("unknown instruction: 0x" + Number(t[e.ip]).toString(16));
      n(e);
    }
  }
}, "br");
function Tn(e) {
  for (var t = e.tZone = new Array(e.gZone.length), r = 0; r < t.length; r++)
    t[r] = new Jt(0, 0);
}
__name(Tn, "Tn");
function iu(e, t) {
  var r = e.prog, n = e.ip, i = 1, a;
  do
    if (a = r[++n], a === 88)
      i++;
    else if (a === 89)
      i--;
    else if (a === 64)
      n += r[n + 1] + 1;
    else if (a === 65)
      n += 2 * r[n + 1] + 1;
    else if (a >= 176 && a <= 183)
      n += a - 176 + 1;
    else if (a >= 184 && a <= 191)
      n += (a - 184 + 1) * 2;
    else if (t && i === 1 && a === 27)
      break;
  while (i > 0);
  e.ip = n;
}
__name(iu, "iu");
function ms(e, t) {
  exports.DEBUG && console.log(t.step, "SVTCA[" + e.axis + "]"), t.fv = t.pv = t.dpv = e;
}
__name(ms, "ms");
function Ds(e, t) {
  exports.DEBUG && console.log(t.step, "SPVTCA[" + e.axis + "]"), t.pv = t.dpv = e;
}
__name(Ds, "Ds");
function ys(e, t) {
  exports.DEBUG && console.log(t.step, "SFVTCA[" + e.axis + "]"), t.fv = e;
}
__name(ys, "ys");
function bs(e, t) {
  var r = t.stack, n = r.pop(), i = r.pop(), a = t.z2[n], o = t.z1[i];
  exports.DEBUG && console.log("SPVTL[" + e + "]", n, i);
  var u, s;
  e ? (u = a.y - o.y, s = o.x - a.x) : (u = o.x - a.x, s = o.y - a.y), t.pv = t.dpv = Xr(u, s);
}
__name(bs, "bs");
function xs(e, t) {
  var r = t.stack, n = r.pop(), i = r.pop(), a = t.z2[n], o = t.z1[i];
  exports.DEBUG && console.log("SFVTL[" + e + "]", n, i);
  var u, s;
  e ? (u = a.y - o.y, s = o.x - a.x) : (u = o.x - a.x, s = o.y - a.y), t.fv = Xr(u, s);
}
__name(xs, "xs");
function Dh(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "SPVFS[]", r, n), e.pv = e.dpv = Xr(n, r);
}
__name(Dh, "Dh");
function yh(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "SPVFS[]", r, n), e.fv = Xr(n, r);
}
__name(yh, "yh");
function bh(e) {
  var t = e.stack, r = e.pv;
  exports.DEBUG && console.log(e.step, "GPV[]"), t.push(r.x * 16384), t.push(r.y * 16384);
}
__name(bh, "bh");
function xh(e) {
  var t = e.stack, r = e.fv;
  exports.DEBUG && console.log(e.step, "GFV[]"), t.push(r.x * 16384), t.push(r.y * 16384);
}
__name(xh, "xh");
function wh(e) {
  e.fv = e.pv, exports.DEBUG && console.log(e.step, "SFVTPV[]");
}
__name(wh, "wh");
function Eh(e) {
  var t = e.stack, r = t.pop(), n = t.pop(), i = t.pop(), a = t.pop(), o = t.pop(), u = e.z0, s = e.z1, l = u[r], f = u[n], c = s[i], p = s[a], v = e.z2[o];
  exports.DEBUG && console.log("ISECT[], ", r, n, i, a, o);
  var D = l.x, d = l.y, g = f.x, y = f.y, b = c.x, S = c.y, k = p.x, C = p.y, E = (D - g) * (S - C) - (d - y) * (b - k), L = D * y - d * g, _ = b * C - S * k;
  v.x = (L * (b - k) - _ * (D - g)) / E, v.y = (L * (S - C) - _ * (d - y)) / E;
}
__name(Eh, "Eh");
function Fh(e) {
  e.rp0 = e.stack.pop(), exports.DEBUG && console.log(e.step, "SRP0[]", e.rp0);
}
__name(Fh, "Fh");
function Ch(e) {
  e.rp1 = e.stack.pop(), exports.DEBUG && console.log(e.step, "SRP1[]", e.rp1);
}
__name(Ch, "Ch");
function Sh(e) {
  e.rp2 = e.stack.pop(), exports.DEBUG && console.log(e.step, "SRP2[]", e.rp2);
}
__name(Sh, "Sh");
function kh(e) {
  var t = e.stack.pop();
  switch (exports.DEBUG && console.log(e.step, "SZP0[]", t), e.zp0 = t, t) {
    case 0:
      e.tZone || Tn(e), e.z0 = e.tZone;
      break;
    case 1:
      e.z0 = e.gZone;
      break;
    default:
      throw new Error("Invalid zone pointer");
  }
}
__name(kh, "kh");
function _h(e) {
  var t = e.stack.pop();
  switch (exports.DEBUG && console.log(e.step, "SZP1[]", t), e.zp1 = t, t) {
    case 0:
      e.tZone || Tn(e), e.z1 = e.tZone;
      break;
    case 1:
      e.z1 = e.gZone;
      break;
    default:
      throw new Error("Invalid zone pointer");
  }
}
__name(_h, "_h");
function Th(e) {
  var t = e.stack.pop();
  switch (exports.DEBUG && console.log(e.step, "SZP2[]", t), e.zp2 = t, t) {
    case 0:
      e.tZone || Tn(e), e.z2 = e.tZone;
      break;
    case 1:
      e.z2 = e.gZone;
      break;
    default:
      throw new Error("Invalid zone pointer");
  }
}
__name(Th, "Th");
function Ah(e) {
  var t = e.stack.pop();
  switch (exports.DEBUG && console.log(e.step, "SZPS[]", t), e.zp0 = e.zp1 = e.zp2 = t, t) {
    case 0:
      e.tZone || Tn(e), e.z0 = e.z1 = e.z2 = e.tZone;
      break;
    case 1:
      e.z0 = e.z1 = e.z2 = e.gZone;
      break;
    default:
      throw new Error("Invalid zone pointer");
  }
}
__name(Ah, "Ah");
function Oh(e) {
  e.loop = e.stack.pop(), exports.DEBUG && console.log(e.step, "SLOOP[]", e.loop);
}
__name(Oh, "Oh");
function Lh(e) {
  exports.DEBUG && console.log(e.step, "RTG[]"), e.round = ru;
}
__name(Lh, "Lh");
function Ph(e) {
  exports.DEBUG && console.log(e.step, "RTHG[]"), e.round = dh;
}
__name(Ph, "Ph");
function Ih(e) {
  var t = e.stack.pop();
  exports.DEBUG && console.log(e.step, "SMD[]", t), e.minDis = t / 64;
}
__name(Ih, "Ih");
function Rh(e) {
  exports.DEBUG && console.log(e.step, "ELSE[]"), iu(e, false);
}
__name(Rh, "Rh");
function Uh(e) {
  var t = e.stack.pop();
  exports.DEBUG && console.log(e.step, "JMPR[]", t), e.ip += t - 1;
}
__name(Uh, "Uh");
function Bh(e) {
  var t = e.stack.pop();
  exports.DEBUG && console.log(e.step, "SCVTCI[]", t), e.cvCutIn = t / 64;
}
__name(Bh, "Bh");
function Nh(e) {
  var t = e.stack;
  exports.DEBUG && console.log(e.step, "DUP[]"), t.push(t[t.length - 1]);
}
__name(Nh, "Nh");
function Qi(e) {
  exports.DEBUG && console.log(e.step, "POP[]"), e.stack.pop();
}
__name(Qi, "Qi");
function Mh(e) {
  exports.DEBUG && console.log(e.step, "CLEAR[]"), e.stack.length = 0;
}
__name(Mh, "Mh");
function Gh(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "SWAP[]"), t.push(r), t.push(n);
}
__name(Gh, "Gh");
function Wh(e) {
  var t = e.stack;
  exports.DEBUG && console.log(e.step, "DEPTH[]"), t.push(t.length);
}
__name(Wh, "Wh");
function $h(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "LOOPCALL[]", r, n);
  var i = e.ip, a = e.prog;
  e.prog = e.funcs[r];
  for (var o = 0; o < n; o++)
    br(e), exports.DEBUG && console.log(++e.step, o + 1 < n ? "next loopcall" : "done loopcall", o);
  e.ip = i, e.prog = a;
}
__name($h, "$h");
function jh(e) {
  var t = e.stack.pop();
  exports.DEBUG && console.log(e.step, "CALL[]", t);
  var r = e.ip, n = e.prog;
  e.prog = e.funcs[t], br(e), e.ip = r, e.prog = n, exports.DEBUG && console.log(++e.step, "returning from", t);
}
__name(jh, "jh");
function Vh(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "CINDEX[]", r), t.push(t[t.length - r]);
}
__name(Vh, "Vh");
function zh(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "MINDEX[]", r), t.push(t.splice(t.length - r, 1)[0]);
}
__name(zh, "zh");
function Hh(e) {
  if (e.env !== "fpgm")
    throw new Error("FDEF not allowed here");
  var t = e.stack, r = e.prog, n = e.ip, i = t.pop(), a = n;
  for (exports.DEBUG && console.log(e.step, "FDEF[]", i); r[++n] !== 45; )
    ;
  e.ip = n, e.funcs[i] = r.slice(a + 1, n);
}
__name(Hh, "Hh");
function ws(e, t) {
  var r = t.stack.pop(), n = t.z0[r], i = t.fv, a = t.pv;
  exports.DEBUG && console.log(t.step, "MDAP[" + e + "]", r);
  var o = a.distance(n, $r);
  e && (o = t.round(o)), i.setRelative(n, $r, o, a), i.touch(n), t.rp0 = t.rp1 = r;
}
__name(ws, "ws");
function Es(e, t) {
  var r = t.z2, n = r.length - 2, i, a, o;
  exports.DEBUG && console.log(t.step, "IUP[" + e.axis + "]");
  for (var u = 0; u < n; u++)
    i = r[u], !e.touched(i) && (a = i.prevTouched(e), a !== i && (o = i.nextTouched(e), a === o && e.setRelative(i, i, e.distance(a, a, false, true), e, true), e.interpolate(i, a, o, e)));
}
__name(Es, "Es");
function Fs(e, t) {
  for (var r = t.stack, n = e ? t.rp1 : t.rp2, i = (e ? t.z0 : t.z1)[n], a = t.fv, o = t.pv, u = t.loop, s = t.z2; u--; ) {
    var l = r.pop(), f = s[l], c = o.distance(i, i, false, true);
    a.setRelative(f, f, c, o), a.touch(f), exports.DEBUG && console.log(t.step, (t.loop > 1 ? "loop " + (t.loop - u) + ": " : "") + "SHP[" + (e ? "rp1" : "rp2") + "]", l);
  }
  t.loop = 1;
}
__name(Fs, "Fs");
function Cs(e, t) {
  var r = t.stack, n = e ? t.rp1 : t.rp2, i = (e ? t.z0 : t.z1)[n], a = t.fv, o = t.pv, u = r.pop(), s = t.z2[t.contours[u]], l = s;
  exports.DEBUG && console.log(t.step, "SHC[" + e + "]", u);
  var f = o.distance(i, i, false, true);
  do
    l !== i && a.setRelative(l, l, f, o), l = l.nextPointOnContour;
  while (l !== s);
}
__name(Cs, "Cs");
function Ss(e, t) {
  var r = t.stack, n = e ? t.rp1 : t.rp2, i = (e ? t.z0 : t.z1)[n], a = t.fv, o = t.pv, u = r.pop();
  exports.DEBUG && console.log(t.step, "SHZ[" + e + "]", u);
  var s;
  switch (u) {
    case 0:
      s = t.tZone;
      break;
    case 1:
      s = t.gZone;
      break;
    default:
      throw new Error("Invalid zone");
  }
  for (var l, f = o.distance(i, i, false, true), c = s.length - 2, p = 0; p < c; p++)
    l = s[p], a.setRelative(l, l, f, o);
}
__name(Ss, "Ss");
function Xh(e) {
  for (var t = e.stack, r = e.loop, n = e.fv, i = t.pop() / 64, a = e.z2; r--; ) {
    var o = t.pop(), u = a[o];
    exports.DEBUG && console.log(e.step, (e.loop > 1 ? "loop " + (e.loop - r) + ": " : "") + "SHPIX[]", o, i), n.setRelative(u, u, i), n.touch(u);
  }
  e.loop = 1;
}
__name(Xh, "Xh");
function qh(e) {
  for (var t = e.stack, r = e.rp1, n = e.rp2, i = e.loop, a = e.z0[r], o = e.z1[n], u = e.fv, s = e.dpv, l = e.z2; i--; ) {
    var f = t.pop(), c = l[f];
    exports.DEBUG && console.log(e.step, (e.loop > 1 ? "loop " + (e.loop - i) + ": " : "") + "IP[]", f, r, "<->", n), u.interpolate(c, a, o, s), u.touch(c);
  }
  e.loop = 1;
}
__name(qh, "qh");
function ks(e, t) {
  var r = t.stack, n = r.pop() / 64, i = r.pop(), a = t.z1[i], o = t.z0[t.rp0], u = t.fv, s = t.pv;
  u.setRelative(a, o, n, s), u.touch(a), exports.DEBUG && console.log(t.step, "MSIRP[" + e + "]", n, i), t.rp1 = t.rp0, t.rp2 = i, e && (t.rp0 = i);
}
__name(ks, "ks");
function Yh(e) {
  for (var t = e.stack, r = e.rp0, n = e.z0[r], i = e.loop, a = e.fv, o = e.pv, u = e.z1; i--; ) {
    var s = t.pop(), l = u[s];
    exports.DEBUG && console.log(e.step, (e.loop > 1 ? "loop " + (e.loop - i) + ": " : "") + "ALIGNRP[]", s), a.setRelative(l, n, 0, o), a.touch(l);
  }
  e.loop = 1;
}
__name(Yh, "Yh");
function Zh(e) {
  exports.DEBUG && console.log(e.step, "RTDG[]"), e.round = hh;
}
__name(Zh, "Zh");
function _s(e, t) {
  var r = t.stack, n = r.pop(), i = r.pop(), a = t.z0[i], o = t.fv, u = t.pv, s = t.cvt[n];
  exports.DEBUG && console.log(t.step, "MIAP[" + e + "]", n, "(", s, ")", i);
  var l = u.distance(a, $r);
  e && (Math.abs(l - s) < t.cvCutIn && (l = s), l = t.round(l)), o.setRelative(a, $r, l, u), t.zp0 === 0 && (a.xo = a.x, a.yo = a.y), o.touch(a), t.rp0 = t.rp1 = i;
}
__name(_s, "_s");
function Qh(e) {
  var t = e.prog, r = e.ip, n = e.stack, i = t[++r];
  exports.DEBUG && console.log(e.step, "NPUSHB[]", i);
  for (var a = 0; a < i; a++)
    n.push(t[++r]);
  e.ip = r;
}
__name(Qh, "Qh");
function Jh(e) {
  var t = e.ip, r = e.prog, n = e.stack, i = r[++t];
  exports.DEBUG && console.log(e.step, "NPUSHW[]", i);
  for (var a = 0; a < i; a++) {
    var o = r[++t] << 8 | r[++t];
    o & 32768 && (o = -((o ^ 65535) + 1)), n.push(o);
  }
  e.ip = t;
}
__name(Jh, "Jh");
function Kh(e) {
  var t = e.stack, r = e.store;
  r || (r = e.store = []);
  var n = t.pop(), i = t.pop();
  exports.DEBUG && console.log(e.step, "WS", n, i), r[i] = n;
}
__name(Kh, "Kh");
function ed(e) {
  var t = e.stack, r = e.store, n = t.pop();
  exports.DEBUG && console.log(e.step, "RS", n);
  var i = r && r[n] || 0;
  t.push(i);
}
__name(ed, "ed");
function td(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "WCVTP", r, n), e.cvt[n] = r / 64;
}
__name(td, "td");
function rd(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "RCVT", r), t.push(e.cvt[r] * 64);
}
__name(rd, "rd");
function Ts(e, t) {
  var r = t.stack, n = r.pop(), i = t.z2[n];
  exports.DEBUG && console.log(t.step, "GC[" + e + "]", n), r.push(t.dpv.distance(i, $r, e, false) * 64);
}
__name(Ts, "Ts");
function As(e, t) {
  var r = t.stack, n = r.pop(), i = r.pop(), a = t.z1[n], o = t.z0[i], u = t.dpv.distance(o, a, e, e);
  exports.DEBUG && console.log(t.step, "MD[" + e + "]", n, i, "->", u), t.stack.push(Math.round(u * 64));
}
__name(As, "As");
function nd(e) {
  exports.DEBUG && console.log(e.step, "MPPEM[]"), e.stack.push(e.ppem);
}
__name(nd, "nd");
function id(e) {
  exports.DEBUG && console.log(e.step, "FLIPON[]"), e.autoFlip = true;
}
__name(id, "id");
function ad(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "LT[]", r, n), t.push(n < r ? 1 : 0);
}
__name(ad, "ad");
function od(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "LTEQ[]", r, n), t.push(n <= r ? 1 : 0);
}
__name(od, "od");
function sd(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "GT[]", r, n), t.push(n > r ? 1 : 0);
}
__name(sd, "sd");
function ud(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "GTEQ[]", r, n), t.push(n >= r ? 1 : 0);
}
__name(ud, "ud");
function ld(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "EQ[]", r, n), t.push(r === n ? 1 : 0);
}
__name(ld, "ld");
function fd(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "NEQ[]", r, n), t.push(r !== n ? 1 : 0);
}
__name(fd, "fd");
function cd(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "ODD[]", r), t.push(Math.trunc(r) % 2 ? 1 : 0);
}
__name(cd, "cd");
function pd(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "EVEN[]", r), t.push(Math.trunc(r) % 2 ? 0 : 1);
}
__name(pd, "pd");
function hd(e) {
  var t = e.stack.pop();
  exports.DEBUG && console.log(e.step, "IF[]", t), t || (iu(e, true), exports.DEBUG && console.log(e.step, "EIF[]"));
}
__name(hd, "hd");
function dd(e) {
  exports.DEBUG && console.log(e.step, "EIF[]");
}
__name(dd, "dd");
function vd(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "AND[]", r, n), t.push(r && n ? 1 : 0);
}
__name(vd, "vd");
function gd(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "OR[]", r, n), t.push(r || n ? 1 : 0);
}
__name(gd, "gd");
function md(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "NOT[]", r), t.push(r ? 0 : 1);
}
__name(md, "md");
function Ji(e, t) {
  var r = t.stack, n = r.pop(), i = t.fv, a = t.pv, o = t.ppem, u = t.deltaBase + (e - 1) * 16, s = t.deltaShift, l = t.z0;
  exports.DEBUG && console.log(t.step, "DELTAP[" + e + "]", n, r);
  for (var f = 0; f < n; f++) {
    var c = r.pop(), p = r.pop(), v = u + ((p & 240) >> 4);
    if (v === o) {
      var D = (p & 15) - 8;
      D >= 0 && D++, exports.DEBUG && console.log(t.step, "DELTAPFIX", c, "by", D * s);
      var d = l[c];
      i.setRelative(d, d, D * s, a);
    }
  }
}
__name(Ji, "Ji");
function Dd(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "SDB[]", r), e.deltaBase = r;
}
__name(Dd, "Dd");
function yd(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "SDS[]", r), e.deltaShift = Math.pow(0.5, r);
}
__name(yd, "yd");
function bd(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "ADD[]", r, n), t.push(n + r);
}
__name(bd, "bd");
function xd(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "SUB[]", r, n), t.push(n - r);
}
__name(xd, "xd");
function wd(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "DIV[]", r, n), t.push(n * 64 / r);
}
__name(wd, "wd");
function Ed(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "MUL[]", r, n), t.push(n * r / 64);
}
__name(Ed, "Ed");
function Fd(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "ABS[]", r), t.push(Math.abs(r));
}
__name(Fd, "Fd");
function Cd(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "NEG[]", r), t.push(-r);
}
__name(Cd, "Cd");
function Sd(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "FLOOR[]", r), t.push(Math.floor(r / 64) * 64);
}
__name(Sd, "Sd");
function kd(e) {
  var t = e.stack, r = t.pop();
  exports.DEBUG && console.log(e.step, "CEILING[]", r), t.push(Math.ceil(r / 64) * 64);
}
__name(kd, "kd");
function Cn(e, t) {
  var r = t.stack, n = r.pop();
  exports.DEBUG && console.log(t.step, "ROUND[]"), r.push(t.round(n / 64) * 64);
}
__name(Cn, "Cn");
function _d(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "WCVTF[]", r, n), e.cvt[n] = r * e.ppem / e.font.unitsPerEm;
}
__name(_d, "_d");
function Ki(e, t) {
  var r = t.stack, n = r.pop(), i = t.ppem, a = t.deltaBase + (e - 1) * 16, o = t.deltaShift;
  exports.DEBUG && console.log(t.step, "DELTAC[" + e + "]", n, r);
  for (var u = 0; u < n; u++) {
    var s = r.pop(), l = r.pop(), f = a + ((l & 240) >> 4);
    if (f === i) {
      var c = (l & 15) - 8;
      c >= 0 && c++;
      var p = c * o;
      exports.DEBUG && console.log(t.step, "DELTACFIX", s, "by", p), t.cvt[s] += p;
    }
  }
}
__name(Ki, "Ki");
function Td(e) {
  var t = e.stack.pop();
  exports.DEBUG && console.log(e.step, "SROUND[]", t), e.round = nu;
  var r;
  switch (t & 192) {
    case 0:
      r = 0.5;
      break;
    case 64:
      r = 1;
      break;
    case 128:
      r = 2;
      break;
    default:
      throw new Error("invalid SROUND value");
  }
  switch (e.srPeriod = r, t & 48) {
    case 0:
      e.srPhase = 0;
      break;
    case 16:
      e.srPhase = 0.25 * r;
      break;
    case 32:
      e.srPhase = 0.5 * r;
      break;
    case 48:
      e.srPhase = 0.75 * r;
      break;
    default:
      throw new Error("invalid SROUND value");
  }
  t &= 15, t === 0 ? e.srThreshold = 0 : e.srThreshold = (t / 8 - 0.5) * r;
}
__name(Td, "Td");
function Ad(e) {
  var t = e.stack.pop();
  exports.DEBUG && console.log(e.step, "S45ROUND[]", t), e.round = nu;
  var r;
  switch (t & 192) {
    case 0:
      r = Math.sqrt(2) / 2;
      break;
    case 64:
      r = Math.sqrt(2);
      break;
    case 128:
      r = 2 * Math.sqrt(2);
      break;
    default:
      throw new Error("invalid S45ROUND value");
  }
  switch (e.srPeriod = r, t & 48) {
    case 0:
      e.srPhase = 0;
      break;
    case 16:
      e.srPhase = 0.25 * r;
      break;
    case 32:
      e.srPhase = 0.5 * r;
      break;
    case 48:
      e.srPhase = 0.75 * r;
      break;
    default:
      throw new Error("invalid S45ROUND value");
  }
  t &= 15, t === 0 ? e.srThreshold = 0 : e.srThreshold = (t / 8 - 0.5) * r;
}
__name(Ad, "Ad");
function Od(e) {
  exports.DEBUG && console.log(e.step, "ROFF[]"), e.round = ph;
}
__name(Od, "Od");
function Ld(e) {
  exports.DEBUG && console.log(e.step, "RUTG[]"), e.round = vh;
}
__name(Ld, "Ld");
function Pd(e) {
  exports.DEBUG && console.log(e.step, "RDTG[]"), e.round = gh;
}
__name(Pd, "Pd");
function Id(e) {
  var t = e.stack.pop();
  exports.DEBUG && console.log(e.step, "SCANCTRL[]", t);
}
__name(Id, "Id");
function Os(e, t) {
  var r = t.stack, n = r.pop(), i = r.pop(), a = t.z2[n], o = t.z1[i];
  exports.DEBUG && console.log(t.step, "SDPVTL[" + e + "]", n, i);
  var u, s;
  e ? (u = a.y - o.y, s = o.x - a.x) : (u = o.x - a.x, s = o.y - a.y), t.dpv = Xr(u, s);
}
__name(Os, "Os");
function Rd(e) {
  var t = e.stack, r = t.pop(), n = 0;
  exports.DEBUG && console.log(e.step, "GETINFO[]", r), r & 1 && (n = 35), r & 32 && (n |= 4096), t.push(n);
}
__name(Rd, "Rd");
function Ud(e) {
  var t = e.stack, r = t.pop(), n = t.pop(), i = t.pop();
  exports.DEBUG && console.log(e.step, "ROLL[]"), t.push(n), t.push(r), t.push(i);
}
__name(Ud, "Ud");
function Bd(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "MAX[]", r, n), t.push(Math.max(n, r));
}
__name(Bd, "Bd");
function Nd(e) {
  var t = e.stack, r = t.pop(), n = t.pop();
  exports.DEBUG && console.log(e.step, "MIN[]", r, n), t.push(Math.min(n, r));
}
__name(Nd, "Nd");
function Md(e) {
  var t = e.stack.pop();
  exports.DEBUG && console.log(e.step, "SCANTYPE[]", t);
}
__name(Md, "Md");
function Gd(e) {
  var t = e.stack.pop(), r = e.stack.pop();
  switch (exports.DEBUG && console.log(e.step, "INSTCTRL[]", t, r), t) {
    case 1:
      e.inhibitGridFit = !!r;
      return;
    case 2:
      e.ignoreCvt = !!r;
      return;
    default:
      throw new Error("invalid INSTCTRL[] selector");
  }
}
__name(Gd, "Gd");
function or(e, t) {
  var r = t.stack, n = t.prog, i = t.ip;
  exports.DEBUG && console.log(t.step, "PUSHB[" + e + "]");
  for (var a = 0; a < e; a++)
    r.push(n[++i]);
  t.ip = i;
}
__name(or, "or");
function sr(e, t) {
  var r = t.ip, n = t.prog, i = t.stack;
  exports.DEBUG && console.log(t.ip, "PUSHW[" + e + "]");
  for (var a = 0; a < e; a++) {
    var o = n[++r] << 8 | n[++r];
    o & 32768 && (o = -((o ^ 65535) + 1)), i.push(o);
  }
  t.ip = r;
}
__name(sr, "sr");
function oe(e, t, r, n, i, a) {
  var o = a.stack, u = e && o.pop(), s = o.pop(), l = a.rp0, f = a.z0[l], c = a.z1[s], p = a.minDis, v = a.fv, D = a.dpv, d, g, y, b;
  g = d = D.distance(c, f, true, true), y = g >= 0 ? 1 : -1, g = Math.abs(g), e && (b = a.cvt[u], n && Math.abs(g - b) < a.cvCutIn && (g = b)), r && g < p && (g = p), n && (g = a.round(g)), v.setRelative(c, f, y * g, D), v.touch(c), exports.DEBUG && console.log(a.step, (e ? "MIRP[" : "MDRP[") + (t ? "M" : "m") + (r ? ">" : "_") + (n ? "R" : "_") + (i === 0 ? "Gr" : i === 1 ? "Bl" : i === 2 ? "Wh" : "") + "]", e ? u + "(" + a.cvt[u] + "," + b + ")" : "", s, "(d =", d, "->", y * g, ")"), a.rp1 = a.rp0, a.rp2 = s, t && (a.rp0 = s);
}
__name(oe, "oe");
Ks = [ms.bind(void 0, Qt), ms.bind(void 0, jt), Ds.bind(void 0, Qt), Ds.bind(void 0, jt), ys.bind(void 0, Qt), ys.bind(void 0, jt), bs.bind(void 0, 0), bs.bind(void 0, 1), xs.bind(void 0, 0), xs.bind(void 0, 1), Dh, yh, bh, xh, wh, Eh, Fh, Ch, Sh, kh, _h, Th, Ah, Oh, Lh, Ph, Ih, Rh, Uh, Bh, void 0, void 0, Nh, Qi, Mh, Gh, Wh, Vh, zh, void 0, void 0, void 0, $h, jh, Hh, void 0, ws.bind(void 0, 0), ws.bind(void 0, 1), Es.bind(void 0, Qt), Es.bind(void 0, jt), Fs.bind(void 0, 0), Fs.bind(void 0, 1), Cs.bind(void 0, 0), Cs.bind(void 0, 1), Ss.bind(void 0, 0), Ss.bind(void 0, 1), Xh, qh, ks.bind(void 0, 0), ks.bind(void 0, 1), Yh, Zh, _s.bind(void 0, 0), _s.bind(void 0, 1), Qh, Jh, Kh, ed, td, rd, Ts.bind(void 0, 0), Ts.bind(void 0, 1), void 0, As.bind(void 0, 0), As.bind(void 0, 1), nd, void 0, id, void 0, void 0, ad, od, sd, ud, ld, fd, cd, pd, hd, dd, vd, gd, md, Ji.bind(void 0, 1), Dd, yd, bd, xd, wd, Ed, Fd, Cd, Sd, kd, Cn.bind(void 0, 0), Cn.bind(void 0, 1), Cn.bind(void 0, 2), Cn.bind(void 0, 3), void 0, void 0, void 0, void 0, _d, Ji.bind(void 0, 2), Ji.bind(void 0, 3), Ki.bind(void 0, 1), Ki.bind(void 0, 2), Ki.bind(void 0, 3), Td, Ad, void 0, void 0, Od, void 0, Ld, Pd, Qi, Qi, void 0, void 0, void 0, void 0, void 0, Id, Os.bind(void 0, 0), Os.bind(void 0, 1), Rd, void 0, Ud, Bd, Nd, Md, Gd, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, or.bind(void 0, 1), or.bind(void 0, 2), or.bind(void 0, 3), or.bind(void 0, 4), or.bind(void 0, 5), or.bind(void 0, 6), or.bind(void 0, 7), or.bind(void 0, 8), sr.bind(void 0, 1), sr.bind(void 0, 2), sr.bind(void 0, 3), sr.bind(void 0, 4), sr.bind(void 0, 5), sr.bind(void 0, 6), sr.bind(void 0, 7), sr.bind(void 0, 8), oe.bind(void 0, 0, 0, 0, 0, 0), oe.bind(void 0, 0, 0, 0, 0, 1), oe.bind(void 0, 0, 0, 0, 0, 2), oe.bind(void 0, 0, 0, 0, 0, 3), oe.bind(void 0, 0, 0, 0, 1, 0), oe.bind(void 0, 0, 0, 0, 1, 1), oe.bind(void 0, 0, 0, 0, 1, 2), oe.bind(void 0, 0, 0, 0, 1, 3), oe.bind(void 0, 0, 0, 1, 0, 0), oe.bind(void 0, 0, 0, 1, 0, 1), oe.bind(void 0, 0, 0, 1, 0, 2), oe.bind(void 0, 0, 0, 1, 0, 3), oe.bind(void 0, 0, 0, 1, 1, 0), oe.bind(void 0, 0, 0, 1, 1, 1), oe.bind(void 0, 0, 0, 1, 1, 2), oe.bind(void 0, 0, 0, 1, 1, 3), oe.bind(void 0, 0, 1, 0, 0, 0), oe.bind(void 0, 0, 1, 0, 0, 1), oe.bind(void 0, 0, 1, 0, 0, 2), oe.bind(void 0, 0, 1, 0, 0, 3), oe.bind(void 0, 0, 1, 0, 1, 0), oe.bind(void 0, 0, 1, 0, 1, 1), oe.bind(void 0, 0, 1, 0, 1, 2), oe.bind(void 0, 0, 1, 0, 1, 3), oe.bind(void 0, 0, 1, 1, 0, 0), oe.bind(void 0, 0, 1, 1, 0, 1), oe.bind(void 0, 0, 1, 1, 0, 2), oe.bind(void 0, 0, 1, 1, 0, 3), oe.bind(void 0, 0, 1, 1, 1, 0), oe.bind(void 0, 0, 1, 1, 1, 1), oe.bind(void 0, 0, 1, 1, 1, 2), oe.bind(void 0, 0, 1, 1, 1, 3), oe.bind(void 0, 1, 0, 0, 0, 0), oe.bind(void 0, 1, 0, 0, 0, 1), oe.bind(void 0, 1, 0, 0, 0, 2), oe.bind(void 0, 1, 0, 0, 0, 3), oe.bind(void 0, 1, 0, 0, 1, 0), oe.bind(void 0, 1, 0, 0, 1, 1), oe.bind(void 0, 1, 0, 0, 1, 2), oe.bind(void 0, 1, 0, 0, 1, 3), oe.bind(void 0, 1, 0, 1, 0, 0), oe.bind(void 0, 1, 0, 1, 0, 1), oe.bind(void 0, 1, 0, 1, 0, 2), oe.bind(void 0, 1, 0, 1, 0, 3), oe.bind(void 0, 1, 0, 1, 1, 0), oe.bind(void 0, 1, 0, 1, 1, 1), oe.bind(void 0, 1, 0, 1, 1, 2), oe.bind(void 0, 1, 0, 1, 1, 3), oe.bind(void 0, 1, 1, 0, 0, 0), oe.bind(void 0, 1, 1, 0, 0, 1), oe.bind(void 0, 1, 1, 0, 0, 2), oe.bind(void 0, 1, 1, 0, 0, 3), oe.bind(void 0, 1, 1, 0, 1, 0), oe.bind(void 0, 1, 1, 0, 1, 1), oe.bind(void 0, 1, 1, 0, 1, 2), oe.bind(void 0, 1, 1, 0, 1, 3), oe.bind(void 0, 1, 1, 1, 0, 0), oe.bind(void 0, 1, 1, 1, 0, 1), oe.bind(void 0, 1, 1, 1, 0, 2), oe.bind(void 0, 1, 1, 1, 0, 3), oe.bind(void 0, 1, 1, 1, 1, 0), oe.bind(void 0, 1, 1, 1, 1, 1), oe.bind(void 0, 1, 1, 1, 1, 2), oe.bind(void 0, 1, 1, 1, 1, 3)];
function Or(e) {
  this.char = e, this.state = {}, this.activeState = null;
}
__name(Or, "Or");
function ua(e, t, r) {
  this.contextName = r, this.startIndex = e, this.endOffset = t;
}
__name(ua, "ua");
function Wd(e, t, r) {
  this.contextName = e, this.openRange = null, this.ranges = [], this.checkStart = t, this.checkEnd = r;
}
__name(Wd, "Wd");
function Ot(e, t) {
  this.context = e, this.index = t, this.length = e.length, this.current = e[t], this.backtrack = e.slice(0, t), this.lookahead = e.slice(t + 1);
}
__name(Ot, "Ot");
function An(e) {
  this.eventId = e, this.subscribers = [];
}
__name(An, "An");
function $d(e) {
  var t = this, r = ["start", "end", "next", "newToken", "contextStart", "contextEnd", "insertToken", "removeToken", "removeRange", "replaceToken", "replaceRange", "composeRUD", "updateContextsRanges"];
  r.forEach(function(i) {
    Object.defineProperty(t.events, i, { value: new An(i) });
  }), e && r.forEach(function(i) {
    var a = e[i];
    typeof a == "function" && t.events[i].subscribe(a);
  });
  var n = ["insertToken", "removeToken", "removeRange", "replaceToken", "replaceRange", "composeRUD"];
  n.forEach(function(i) {
    t.events[i].subscribe(t.updateContextsRanges);
  });
}
__name($d, "$d");
function $e(e) {
  this.tokens = [], this.registeredContexts = {}, this.contextCheckers = [], this.events = {}, this.registeredModifiers = [], $d.call(this, e);
}
__name($e, "$e");
Or.prototype.setState = function(e, t) {
  return this.state[e] = t, this.activeState = { key: e, value: this.state[e] }, this.activeState;
};
Or.prototype.getState = function(e) {
  return this.state[e] || null;
};
$e.prototype.inboundIndex = function(e) {
  return e >= 0 && e < this.tokens.length;
};
$e.prototype.composeRUD = function(e) {
  var t = this, r = true, n = e.map(function(a) {
    return t[a[0]].apply(t, a.slice(1).concat(r));
  }), i = /* @__PURE__ */ __name(function(a) {
    return typeof a == "object" && a.hasOwnProperty("FAIL");
  }, "i");
  if (n.every(i))
    return { FAIL: "composeRUD: one or more operations hasn't completed successfully", report: n.filter(i) };
  this.dispatch("composeRUD", [n.filter(function(a) {
    return !i(a);
  })]);
};
$e.prototype.replaceRange = function(e, t, r, n) {
  t = t !== null ? t : this.tokens.length;
  var i = r.every(function(o) {
    return o instanceof Or;
  });
  if (!isNaN(e) && this.inboundIndex(e) && i) {
    var a = this.tokens.splice.apply(this.tokens, [e, t].concat(r));
    return n || this.dispatch("replaceToken", [e, t, r]), [a, r];
  } else
    return { FAIL: "replaceRange: invalid tokens or startIndex." };
};
$e.prototype.replaceToken = function(e, t, r) {
  if (!isNaN(e) && this.inboundIndex(e) && t instanceof Or) {
    var n = this.tokens.splice(e, 1, t);
    return r || this.dispatch("replaceToken", [e, t]), [n[0], t];
  } else
    return { FAIL: "replaceToken: invalid token or index." };
};
$e.prototype.removeRange = function(e, t, r) {
  t = isNaN(t) ? this.tokens.length : t;
  var n = this.tokens.splice(e, t);
  return r || this.dispatch("removeRange", [n, e, t]), n;
};
$e.prototype.removeToken = function(e, t) {
  if (!isNaN(e) && this.inboundIndex(e)) {
    var r = this.tokens.splice(e, 1);
    return t || this.dispatch("removeToken", [r, e]), r;
  } else
    return { FAIL: "removeToken: invalid token index." };
};
$e.prototype.insertToken = function(e, t, r) {
  var n = e.every(function(i) {
    return i instanceof Or;
  });
  return n ? (this.tokens.splice.apply(this.tokens, [t, 0].concat(e)), r || this.dispatch("insertToken", [e, t]), e) : { FAIL: "insertToken: invalid token(s)." };
};
$e.prototype.registerModifier = function(e, t, r) {
  this.events.newToken.subscribe(function(n, i) {
    var a = [n, i], o = t === null || t.apply(this, a) === true, u = [n, i];
    if (o) {
      var s = r.apply(this, u);
      n.setState(e, s);
    }
  }), this.registeredModifiers.push(e);
};
An.prototype.subscribe = function(e) {
  return typeof e == "function" ? this.subscribers.push(e) - 1 : { FAIL: "invalid '" + this.eventId + "' event handler" };
};
An.prototype.unsubscribe = function(e) {
  this.subscribers.splice(e, 1);
};
Ot.prototype.setCurrentIndex = function(e) {
  this.index = e, this.current = this.context[e], this.backtrack = this.context.slice(0, e), this.lookahead = this.context.slice(e + 1);
};
Ot.prototype.get = function(e) {
  switch (true) {
    case e === 0:
      return this.current;
    case (e < 0 && Math.abs(e) <= this.backtrack.length):
      return this.backtrack.slice(e)[0];
    case (e > 0 && e <= this.lookahead.length):
      return this.lookahead[e - 1];
    default:
      return null;
  }
};
$e.prototype.rangeToText = function(e) {
  if (e instanceof ua)
    return this.getRangeTokens(e).map(function(t) {
      return t.char;
    }).join("");
};
$e.prototype.getText = function() {
  return this.tokens.map(function(e) {
    return e.char;
  }).join("");
};
$e.prototype.getContext = function(e) {
  var t = this.registeredContexts[e];
  return t || null;
};
$e.prototype.on = function(e, t) {
  var r = this.events[e];
  return r ? r.subscribe(t) : null;
};
$e.prototype.dispatch = function(e, t) {
  var r = this, n = this.events[e];
  n instanceof An && n.subscribers.forEach(function(i) {
    i.apply(r, t || []);
  });
};
$e.prototype.registerContextChecker = function(e, t, r) {
  if (this.getContext(e))
    return { FAIL: "context name '" + e + "' is already registered." };
  if (typeof t != "function")
    return { FAIL: "missing context start check." };
  if (typeof r != "function")
    return { FAIL: "missing context end check." };
  var n = new Wd(e, t, r);
  return this.registeredContexts[e] = n, this.contextCheckers.push(n), n;
};
$e.prototype.getRangeTokens = function(e) {
  var t = e.startIndex + e.endOffset;
  return [].concat(this.tokens.slice(e.startIndex, t));
};
$e.prototype.getContextRanges = function(e) {
  var t = this.getContext(e);
  return t ? t.ranges : { FAIL: "context checker '" + e + "' is not registered." };
};
$e.prototype.resetContextsRanges = function() {
  var e = this.registeredContexts;
  for (var t in e)
    if (e.hasOwnProperty(t)) {
      var r = e[t];
      r.ranges = [];
    }
};
$e.prototype.updateContextsRanges = function() {
  this.resetContextsRanges();
  for (var e = this.tokens.map(function(n) {
    return n.char;
  }), t = 0; t < e.length; t++) {
    var r = new Ot(e, t);
    this.runContextCheck(r);
  }
  this.dispatch("updateContextsRanges", [this.registeredContexts]);
};
$e.prototype.setEndOffset = function(e, t) {
  var r = this.getContext(t).openRange.startIndex, n = new ua(r, e, t), i = this.getContext(t).ranges;
  return n.rangeId = t + "." + i.length, i.push(n), this.getContext(t).openRange = null, n;
};
$e.prototype.runContextCheck = function(e) {
  var t = this, r = e.index;
  this.contextCheckers.forEach(function(n) {
    var i = n.contextName, a = t.getContext(i).openRange;
    if (!a && n.checkStart(e) && (a = new ua(r, null, i), t.getContext(i).openRange = a, t.dispatch("contextStart", [i, r])), a && n.checkEnd(e)) {
      var o = r - a.startIndex + 1, u = t.setEndOffset(o, i);
      t.dispatch("contextEnd", [i, u]);
    }
  });
};
$e.prototype.tokenize = function(e) {
  this.tokens = [], this.resetContextsRanges();
  var t = Array.from(e);
  this.dispatch("start");
  for (var r = 0; r < t.length; r++) {
    var n = t[r], i = new Ot(t, r);
    this.dispatch("next", [i]), this.runContextCheck(i);
    var a = new Or(n);
    this.tokens.push(a), this.dispatch("newToken", [a, i]);
  }
  return this.dispatch("end", [this.tokens]), this.tokens;
};
function cr(e) {
  return /[\u0600-\u065F\u066A-\u06D2\u06FA-\u06FF]/.test(e);
}
__name(cr, "cr");
function au(e) {
  return /[\u0630\u0690\u0621\u0631\u0661\u0671\u0622\u0632\u0672\u0692\u06C2\u0623\u0673\u0693\u06C3\u0624\u0694\u06C4\u0625\u0675\u0695\u06C5\u06E5\u0676\u0696\u06C6\u0627\u0677\u0697\u06C7\u0648\u0688\u0698\u06C8\u0689\u0699\u06C9\u068A\u06CA\u066B\u068B\u06CB\u068C\u068D\u06CD\u06FD\u068E\u06EE\u06FE\u062F\u068F\u06CF\u06EF]/.test(e);
}
__name(au, "au");
function pr(e) {
  return /[\u0600-\u0605\u060C-\u060E\u0610-\u061B\u061E\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/.test(e);
}
__name(pr, "pr");
function Sn(e) {
  return /[A-z]/.test(e);
}
__name(Sn, "Sn");
function jd(e) {
  return /\s/.test(e);
}
__name(jd, "jd");
function Dt(e) {
  this.font = e, this.features = {};
}
__name(Dt, "Dt");
function Dr(e) {
  this.id = e.id, this.tag = e.tag, this.substitution = e.substitution;
}
__name(Dr, "Dr");
function qr(e, t) {
  if (!e)
    return -1;
  switch (t.format) {
    case 1:
      return t.glyphs.indexOf(e);
    case 2:
      for (var r = t.ranges, n = 0; n < r.length; n++) {
        var i = r[n];
        if (e >= i.start && e <= i.end) {
          var a = e - i.start;
          return i.index + a;
        }
      }
      break;
    default:
      return -1;
  }
  return -1;
}
__name(qr, "qr");
function Vd(e, t) {
  var r = qr(e, t.coverage);
  return r === -1 ? null : e + t.deltaGlyphId;
}
__name(Vd, "Vd");
function zd(e, t) {
  var r = qr(e, t.coverage);
  return r === -1 ? null : t.substitute[r];
}
__name(zd, "zd");
function ea(e, t) {
  for (var r = [], n = 0; n < e.length; n++) {
    var i = e[n], a = t.current;
    a = Array.isArray(a) ? a[0] : a;
    var o = qr(a, i);
    o !== -1 && r.push(o);
  }
  return r.length !== e.length ? -1 : r;
}
__name(ea, "ea");
function Hd(e, t) {
  var r = t.inputCoverage.length + t.lookaheadCoverage.length + t.backtrackCoverage.length;
  if (e.context.length < r)
    return [];
  var n = ea(t.inputCoverage, e);
  if (n === -1)
    return [];
  var i = t.inputCoverage.length - 1;
  if (e.lookahead.length < t.lookaheadCoverage.length)
    return [];
  for (var a = e.lookahead.slice(i); a.length && pr(a[0].char); )
    a.shift();
  var o = new Ot(a, 0), u = ea(t.lookaheadCoverage, o), s = [].concat(e.backtrack);
  for (s.reverse(); s.length && pr(s[0].char); )
    s.shift();
  if (s.length < t.backtrackCoverage.length)
    return [];
  var l = new Ot(s, 0), f = ea(t.backtrackCoverage, l), c = n.length === t.inputCoverage.length && u.length === t.lookaheadCoverage.length && f.length === t.backtrackCoverage.length, p = [];
  if (c)
    for (var v = 0; v < t.lookupRecords.length; v++)
      for (var D = t.lookupRecords[v], d = D.lookupListIndex, g = this.getLookupByIndex(d), y = 0; y < g.subtables.length; y++) {
        var b = g.subtables[y], S = this.getLookupMethod(g, b), k = this.getSubstitutionType(g, b);
        if (k === "12")
          for (var C = 0; C < n.length; C++) {
            var E = e.get(C), L = S(E);
            L && p.push(L);
          }
      }
  return p;
}
__name(Hd, "Hd");
function Xd(e, t) {
  var r = e.current, n = qr(r, t.coverage);
  if (n === -1)
    return null;
  for (var i, a = t.ligatureSets[n], o = 0; o < a.length; o++) {
    i = a[o];
    for (var u = 0; u < i.components.length; u++) {
      var s = e.lookahead[u], l = i.components[u];
      if (s !== l)
        break;
      if (u === i.components.length - 1)
        return i;
    }
  }
  return null;
}
__name(Xd, "Xd");
function qd(e, t) {
  var r = qr(e, t.coverage);
  return r === -1 ? null : t.sequences[r];
}
__name(qd, "qd");
Dt.prototype.getDefaultScriptFeaturesIndexes = function() {
  for (var e = this.font.tables.gsub.scripts, t = 0; t < e.length; t++) {
    var r = e[t];
    if (r.tag === "DFLT")
      return r.script.defaultLangSys.featureIndexes;
  }
  return [];
};
Dt.prototype.getScriptFeaturesIndexes = function(e) {
  var t = this.font.tables;
  if (!t.gsub)
    return [];
  if (!e)
    return this.getDefaultScriptFeaturesIndexes();
  for (var r = this.font.tables.gsub.scripts, n = 0; n < r.length; n++) {
    var i = r[n];
    if (i.tag === e && i.script.defaultLangSys)
      return i.script.defaultLangSys.featureIndexes;
    var a = i.langSysRecords;
    if (a)
      for (var o = 0; o < a.length; o++) {
        var u = a[o];
        if (u.tag === e) {
          var s = u.langSys;
          return s.featureIndexes;
        }
      }
  }
  return this.getDefaultScriptFeaturesIndexes();
};
Dt.prototype.mapTagsToFeatures = function(e, t) {
  for (var r = {}, n = 0; n < e.length; n++) {
    var i = e[n].tag, a = e[n].feature;
    r[i] = a;
  }
  this.features[t].tags = r;
};
Dt.prototype.getScriptFeatures = function(e) {
  var t = this.features[e];
  if (this.features.hasOwnProperty(e))
    return t;
  var r = this.getScriptFeaturesIndexes(e);
  if (!r)
    return null;
  var n = this.font.tables.gsub;
  return t = r.map(function(i) {
    return n.features[i];
  }), this.features[e] = t, this.mapTagsToFeatures(t, e), t;
};
Dt.prototype.getSubstitutionType = function(e, t) {
  var r = e.lookupType.toString(), n = t.substFormat.toString();
  return r + n;
};
Dt.prototype.getLookupMethod = function(e, t) {
  var r = this, n = this.getSubstitutionType(e, t);
  switch (n) {
    case "11":
      return function(i) {
        return Vd.apply(r, [i, t]);
      };
    case "12":
      return function(i) {
        return zd.apply(r, [i, t]);
      };
    case "63":
      return function(i) {
        return Hd.apply(r, [i, t]);
      };
    case "41":
      return function(i) {
        return Xd.apply(r, [i, t]);
      };
    case "21":
      return function(i) {
        return qd.apply(r, [i, t]);
      };
    default:
      throw new Error("lookupType: " + e.lookupType + " - substFormat: " + t.substFormat + " is not yet supported");
  }
};
Dt.prototype.lookupFeature = function(e) {
  var t = e.contextParams, r = t.index, n = this.getFeature({ tag: e.tag, script: e.script });
  if (!n)
    return new Error("font '" + this.font.names.fullName.en + "' doesn't support feature '" + e.tag + "' for script '" + e.script + "'.");
  for (var i = this.getFeatureLookups(n), a = [].concat(t.context), o = 0; o < i.length; o++)
    for (var u = i[o], s = this.getLookupSubtables(u), l = 0; l < s.length; l++) {
      var f = s[l], c = this.getSubstitutionType(u, f), p = this.getLookupMethod(u, f), v = void 0;
      switch (c) {
        case "11":
          v = p(t.current), v && a.splice(r, 1, new Dr({ id: 11, tag: e.tag, substitution: v }));
          break;
        case "12":
          v = p(t.current), v && a.splice(r, 1, new Dr({ id: 12, tag: e.tag, substitution: v }));
          break;
        case "63":
          v = p(t), Array.isArray(v) && v.length && a.splice(r, 1, new Dr({ id: 63, tag: e.tag, substitution: v }));
          break;
        case "41":
          v = p(t), v && a.splice(r, 1, new Dr({ id: 41, tag: e.tag, substitution: v }));
          break;
        case "21":
          v = p(t.current), v && a.splice(r, 1, new Dr({ id: 21, tag: e.tag, substitution: v }));
          break;
      }
      t = new Ot(a, r), !(Array.isArray(v) && !v.length) && (v = null);
    }
  return a.length ? a : null;
};
Dt.prototype.supports = function(e) {
  if (!e.script)
    return false;
  this.getScriptFeatures(e.script);
  var t = this.features.hasOwnProperty(e.script);
  if (!e.tag)
    return t;
  var r = this.features[e.script].some(function(n) {
    return n.tag === e.tag;
  });
  return t && r;
};
Dt.prototype.getLookupSubtables = function(e) {
  return e.subtables || null;
};
Dt.prototype.getLookupByIndex = function(e) {
  var t = this.font.tables.gsub.lookups;
  return t[e] || null;
};
Dt.prototype.getFeatureLookups = function(e) {
  return e.lookupListIndexes.map(this.getLookupByIndex.bind(this));
};
Dt.prototype.getFeature = function(t) {
  if (!this.font)
    return { FAIL: "No font was found" };
  this.features.hasOwnProperty(t.script) || this.getScriptFeatures(t.script);
  var r = this.features[t.script];
  return r ? r.tags[t.tag] ? this.features[t.script].tags[t.tag] : null : { FAIL: "No feature for script " + t.script };
};
function Yd(e) {
  var t = e.current, r = e.get(-1);
  return r === null && cr(t) || !cr(r) && cr(t);
}
__name(Yd, "Yd");
function Zd(e) {
  var t = e.get(1);
  return t === null || !cr(t);
}
__name(Zd, "Zd");
var Qd = { startCheck: Yd, endCheck: Zd };
function Jd(e) {
  var t = e.current, r = e.get(-1);
  return (cr(t) || pr(t)) && !cr(r);
}
__name(Jd, "Jd");
function Kd(e) {
  var t = e.get(1);
  switch (true) {
    case t === null:
      return true;
    case (!cr(t) && !pr(t)):
      var r = jd(t);
      if (!r)
        return true;
      if (r) {
        var n = false;
        if (n = e.lookahead.some(function(i) {
          return cr(i) || pr(i);
        }), !n)
          return true;
      }
      break;
    default:
      return false;
  }
}
__name(Kd, "Kd");
var e0 = { startCheck: Jd, endCheck: Kd };
function t0(e, t, r) {
  t[r].setState(e.tag, e.substitution);
}
__name(t0, "t0");
function r0(e, t, r) {
  t[r].setState(e.tag, e.substitution);
}
__name(r0, "r0");
function n0(e, t, r) {
  e.substitution.forEach(function(n, i) {
    var a = t[r + i];
    a.setState(e.tag, n);
  });
}
__name(n0, "n0");
function i0(e, t, r) {
  var n = t[r];
  n.setState(e.tag, e.substitution.ligGlyph);
  for (var i = e.substitution.components.length, a = 0; a < i; a++)
    n = t[r + a + 1], n.setState("deleted", true);
}
__name(i0, "i0");
var Ls = { 11: t0, 12: r0, 63: n0, 41: i0 };
function la(e, t, r) {
  e instanceof Dr && Ls[e.id] && Ls[e.id](e, t, r);
}
__name(la, "la");
function a0(e) {
  for (var t = [].concat(e.backtrack), r = t.length - 1; r >= 0; r--) {
    var n = t[r], i = au(n), a = pr(n);
    if (!i && !a)
      return true;
    if (i)
      return false;
  }
  return false;
}
__name(a0, "a0");
function o0(e) {
  if (au(e.current))
    return false;
  for (var t = 0; t < e.lookahead.length; t++) {
    var r = e.lookahead[t], n = pr(r);
    if (!n)
      return true;
  }
  return false;
}
__name(o0, "o0");
function s0(e) {
  var t = this, r = "arab", n = this.featuresTags[r], i = this.tokenizer.getRangeTokens(e);
  if (i.length !== 1) {
    var a = new Ot(i.map(function(u) {
      return u.getState("glyphIndex");
    }), 0), o = new Ot(i.map(function(u) {
      return u.char;
    }), 0);
    i.forEach(function(u, s) {
      if (!pr(u.char)) {
        a.setCurrentIndex(s), o.setCurrentIndex(s);
        var l = 0;
        a0(o) && (l |= 1), o0(o) && (l |= 2);
        var f;
        switch (l) {
          case 1:
            f = "fina";
            break;
          case 2:
            f = "init";
            break;
          case 3:
            f = "medi";
            break;
        }
        if (n.indexOf(f) !== -1) {
          var c = t.query.lookupFeature({ tag: f, script: r, contextParams: a });
          if (c instanceof Error)
            return console.info(c.message);
          c.forEach(function(p, v) {
            p instanceof Dr && (la(p, i, v), a.context[v] = p.substitution);
          });
        }
      }
    });
  }
}
__name(s0, "s0");
function Ps(e, t) {
  var r = e.map(function(n) {
    return n.activeState.value;
  });
  return new Ot(r, t || 0);
}
__name(Ps, "Ps");
function u0(e) {
  var t = this, r = "arab", n = this.tokenizer.getRangeTokens(e), i = Ps(n);
  i.context.forEach(function(a, o) {
    i.setCurrentIndex(o);
    var u = t.query.lookupFeature({ tag: "rlig", script: r, contextParams: i });
    u.length && (u.forEach(function(s) {
      return la(s, n, o);
    }), i = Ps(n));
  });
}
__name(u0, "u0");
function l0(e) {
  var t = e.current, r = e.get(-1);
  return r === null && Sn(t) || !Sn(r) && Sn(t);
}
__name(l0, "l0");
function f0(e) {
  var t = e.get(1);
  return t === null || !Sn(t);
}
__name(f0, "f0");
var c0 = { startCheck: l0, endCheck: f0 };
function Is(e, t) {
  var r = e.map(function(n) {
    return n.activeState.value;
  });
  return new Ot(r, t || 0);
}
__name(Is, "Is");
function p0(e) {
  var t = this, r = "latn", n = this.tokenizer.getRangeTokens(e), i = Is(n);
  i.context.forEach(function(a, o) {
    i.setCurrentIndex(o);
    var u = t.query.lookupFeature({ tag: "liga", script: r, contextParams: i });
    u.length && (u.forEach(function(s) {
      return la(s, n, o);
    }), i = Is(n));
  });
}
__name(p0, "p0");
function It(e) {
  this.baseDir = e || "ltr", this.tokenizer = new $e(), this.featuresTags = {};
}
__name(It, "It");
It.prototype.setText = function(e) {
  this.text = e;
};
It.prototype.contextChecks = { latinWordCheck: c0, arabicWordCheck: Qd, arabicSentenceCheck: e0 };
function ta(e) {
  var t = this.contextChecks[e + "Check"];
  return this.tokenizer.registerContextChecker(e, t.startCheck, t.endCheck);
}
__name(ta, "ta");
function h0() {
  return ta.call(this, "latinWord"), ta.call(this, "arabicWord"), ta.call(this, "arabicSentence"), this.tokenizer.tokenize(this.text);
}
__name(h0, "h0");
function d0() {
  var e = this, t = this.tokenizer.getContextRanges("arabicSentence");
  t.forEach(function(r) {
    var n = e.tokenizer.getRangeTokens(r);
    e.tokenizer.replaceRange(r.startIndex, r.endOffset, n.reverse());
  });
}
__name(d0, "d0");
It.prototype.registerFeatures = function(e, t) {
  var r = this, n = t.filter(function(i) {
    return r.query.supports({ script: e, tag: i });
  });
  this.featuresTags.hasOwnProperty(e) ? this.featuresTags[e] = this.featuresTags[e].concat(n) : this.featuresTags[e] = n;
};
It.prototype.applyFeatures = function(e, t) {
  if (!e)
    throw new Error("No valid font was provided to apply features");
  this.query || (this.query = new Dt(e));
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    this.query.supports({ script: n.script }) && this.registerFeatures(n.script, n.tags);
  }
};
It.prototype.registerModifier = function(e, t, r) {
  this.tokenizer.registerModifier(e, t, r);
};
function fa() {
  if (this.tokenizer.registeredModifiers.indexOf("glyphIndex") === -1)
    throw new Error("glyphIndex modifier is required to apply arabic presentation features.");
}
__name(fa, "fa");
function v0() {
  var e = this, t = "arab";
  if (this.featuresTags.hasOwnProperty(t)) {
    fa.call(this);
    var r = this.tokenizer.getContextRanges("arabicWord");
    r.forEach(function(n) {
      s0.call(e, n);
    });
  }
}
__name(v0, "v0");
function g0() {
  var e = this, t = "arab";
  if (this.featuresTags.hasOwnProperty(t)) {
    var r = this.featuresTags[t];
    if (r.indexOf("rlig") !== -1) {
      fa.call(this);
      var n = this.tokenizer.getContextRanges("arabicWord");
      n.forEach(function(i) {
        u0.call(e, i);
      });
    }
  }
}
__name(g0, "g0");
function m0() {
  var e = this, t = "latn";
  if (this.featuresTags.hasOwnProperty(t)) {
    var r = this.featuresTags[t];
    if (r.indexOf("liga") !== -1) {
      fa.call(this);
      var n = this.tokenizer.getContextRanges("latinWord");
      n.forEach(function(i) {
        p0.call(e, i);
      });
    }
  }
}
__name(m0, "m0");
It.prototype.checkContextReady = function(e) {
  return !!this.tokenizer.getContext(e);
};
It.prototype.applyFeaturesToContexts = function() {
  this.checkContextReady("arabicWord") && (v0.call(this), g0.call(this)), this.checkContextReady("latinWord") && m0.call(this), this.checkContextReady("arabicSentence") && d0.call(this);
};
It.prototype.processText = function(e) {
  (!this.text || this.text !== e) && (this.setText(e), h0.call(this), this.applyFeaturesToContexts());
};
It.prototype.getBidiText = function(e) {
  return this.processText(e), this.tokenizer.getText();
};
It.prototype.getTextGlyphs = function(e) {
  this.processText(e);
  for (var t = [], r = 0; r < this.tokenizer.tokens.length; r++) {
    var n = this.tokenizer.tokens[r];
    if (!n.state.deleted) {
      var i = n.activeState.value;
      t.push(Array.isArray(i) ? i[0] : i);
    }
  }
  return t;
};
function ot(e) {
  e = e || {}, e.tables = e.tables || {}, e.empty || (Mr(e.familyName, "When creating a new Font object, familyName is required."), Mr(e.styleName, "When creating a new Font object, styleName is required."), Mr(e.unitsPerEm, "When creating a new Font object, unitsPerEm is required."), Mr(e.ascender, "When creating a new Font object, ascender is required."), Mr(e.descender <= 0, "When creating a new Font object, negative descender value is required."), this.unitsPerEm = e.unitsPerEm || 1e3, this.ascender = e.ascender, this.descender = e.descender, this.createdTimestamp = e.createdTimestamp, this.tables = Object.assign(e.tables, { os2: Object.assign({ usWeightClass: e.weightClass || this.usWeightClasses.MEDIUM, usWidthClass: e.widthClass || this.usWidthClasses.MEDIUM, fsSelection: e.fsSelection || this.fsSelectionValues.REGULAR }, e.tables.os2) })), this.supported = true, this.glyphs = new Vt.GlyphSet(this, e.glyphs || []), this.encoding = new zs(this), this.position = new zr(this), this.substitution = new mt(this), this.tables = this.tables || {}, this._push = null, this._hmtxTableData = {}, Object.defineProperty(this, "hinting", { get: function() {
    if (this._hinting)
      return this._hinting;
    if (this.outlinesFormat === "truetype")
      return this._hinting = new tu(this);
  } });
}
__name(ot, "ot");
ot.prototype.hasChar = function(e) {
  return this.encoding.charToGlyphIndex(e) !== null;
};
ot.prototype.charToGlyphIndex = function(e) {
  return this.encoding.charToGlyphIndex(e);
};
ot.prototype.charToGlyph = function(e) {
  var t = this.charToGlyphIndex(e), r = this.glyphs.get(t);
  return r || (r = this.glyphs.get(0)), r;
};
ot.prototype.updateFeatures = function(e) {
  return this.defaultRenderOptions.features.map(function(t) {
    return t.script === "latn" ? { script: "latn", tags: t.tags.filter(function(r) {
      return e[r];
    }) } : t;
  });
};
ot.prototype.stringToGlyphs = function(e, t) {
  var r = this, n = new It(), i = /* @__PURE__ */ __name(function(c) {
    return r.charToGlyphIndex(c.char);
  }, "i");
  n.registerModifier("glyphIndex", null, i);
  var a = t ? this.updateFeatures(t.features) : this.defaultRenderOptions.features;
  n.applyFeatures(this, a);
  for (var o = n.getTextGlyphs(e), u = o.length, s = new Array(u), l = this.glyphs.get(0), f = 0; f < u; f += 1)
    s[f] = this.glyphs.get(o[f]) || l;
  return s;
};
ot.prototype.getKerningValue = function(e, t) {
  e = e.index || e, t = t.index || t;
  var r = this.position.defaultKerningTables;
  return r ? this.position.getKerningValue(r, e, t) : this.kerningPairs[e + "," + t] || 0;
};
ot.prototype.defaultRenderOptions = { kerning: true, features: [{ script: "arab", tags: ["init", "medi", "fina", "rlig"] }, { script: "latn", tags: ["liga", "rlig"] }] };
ot.prototype.forEachGlyph = function(e, t, r, n, i, a) {
  t = t !== void 0 ? t : 0, r = r !== void 0 ? r : 0, n = n !== void 0 ? n : 72, i = Object.assign({}, this.defaultRenderOptions, i);
  var o = 1 / this.unitsPerEm * n, u = this.stringToGlyphs(e, i), s;
  if (i.kerning) {
    var l = i.script || this.position.getDefaultScriptName();
    s = this.position.getKerningTables(l, i.language);
  }
  for (var f = 0; f < u.length; f += 1) {
    var c = u[f];
    if (a.call(this, c, t, r, n, i), c.advanceWidth && (t += c.advanceWidth * o), i.kerning && f < u.length - 1) {
      var p = s ? this.position.getKerningValue(s, c.index, u[f + 1].index) : this.getKerningValue(c, u[f + 1]);
      t += p * o;
    }
    i.letterSpacing ? t += i.letterSpacing * n : i.tracking && (t += i.tracking / 1e3 * n);
  }
  return t;
};
ot.prototype.getPath = function(e, t, r, n, i) {
  var a = new at();
  return this.forEachGlyph(e, t, r, n, i, function(o, u, s, l) {
    var f = o.getPath(u, s, l, i, this);
    a.extend(f);
  }), a;
};
ot.prototype.getPaths = function(e, t, r, n, i) {
  var a = [];
  return this.forEachGlyph(e, t, r, n, i, function(o, u, s, l) {
    var f = o.getPath(u, s, l, i, this);
    a.push(f);
  }), a;
};
ot.prototype.getAdvanceWidth = function(e, t, r) {
  return this.forEachGlyph(e, 0, 0, t, r, function() {
  });
};
ot.prototype.fsSelectionValues = { ITALIC: 1, UNDERSCORE: 2, NEGATIVE: 4, OUTLINED: 8, STRIKEOUT: 16, BOLD: 32, REGULAR: 64, USER_TYPO_METRICS: 128, WWS: 256, OBLIQUE: 512 };
ot.prototype.usWidthClasses = { ULTRA_CONDENSED: 1, EXTRA_CONDENSED: 2, CONDENSED: 3, SEMI_CONDENSED: 4, MEDIUM: 5, SEMI_EXPANDED: 6, EXPANDED: 7, EXTRA_EXPANDED: 8, ULTRA_EXPANDED: 9 };
ot.prototype.usWeightClasses = { THIN: 100, EXTRA_LIGHT: 200, LIGHT: 300, NORMAL: 400, MEDIUM: 500, SEMI_BOLD: 600, BOLD: 700, EXTRA_BOLD: 800, BLACK: 900 };
function D0(e, t) {
  t.parseUShort(), e.length = t.parseULong(), e.language = t.parseULong();
  var r;
  e.groupCount = r = t.parseULong(), e.glyphIndexMap = {};
  for (var n = 0; n < r; n += 1)
    for (var i = t.parseULong(), a = t.parseULong(), o = t.parseULong(), u = i; u <= a; u += 1)
      e.glyphIndexMap[u] = o, o++;
}
__name(D0, "D0");
function y0(e, t, r, n, i) {
  e.length = t.parseUShort(), e.language = t.parseUShort();
  var a;
  e.segCount = a = t.parseUShort() >> 1, t.skip("uShort", 3), e.glyphIndexMap = {};
  for (var o = new se.Parser(r, n + i + 14), u = new se.Parser(r, n + i + 16 + a * 2), s = new se.Parser(r, n + i + 16 + a * 4), l = new se.Parser(r, n + i + 16 + a * 6), f = n + i + 16 + a * 8, c = 0; c < a - 1; c += 1)
    for (var p = void 0, v = o.parseUShort(), D = u.parseUShort(), d = s.parseShort(), g = l.parseUShort(), y = D; y <= v; y += 1)
      g !== 0 ? (f = l.offset + l.relativeOffset - 2, f += g, f += (y - D) * 2, p = se.getUShort(r, f), p !== 0 && (p = p + d & 65535)) : p = y + d & 65535, e.glyphIndexMap[y] = p;
}
__name(y0, "y0");
function b0(e, t) {
  var r = {};
  r.version = se.getUShort(e, t), _e.argument(r.version === 0, "cmap table version should be 0."), r.numTables = se.getUShort(e, t + 2);
  for (var n = -1, i = r.numTables - 1; i >= 0; i -= 1) {
    var a = se.getUShort(e, t + 4 + i * 8), o = se.getUShort(e, t + 4 + i * 8 + 2);
    if (a === 3 && (o === 0 || o === 1 || o === 10) || a === 0 && (o === 0 || o === 1 || o === 2 || o === 3 || o === 4)) {
      n = se.getULong(e, t + 4 + i * 8 + 4);
      break;
    }
  }
  if (n === -1)
    throw new Error("No valid cmap sub-tables found.");
  var u = new se.Parser(e, t + n);
  if (r.format = u.parseUShort(), r.format === 12)
    D0(r, u);
  else if (r.format === 4)
    y0(r, u, e, t, n);
  else
    throw new Error("Only format 4 and 12 cmap tables are supported (found format " + r.format + ").");
  return r;
}
__name(b0, "b0");
var x0 = { parse: b0 };
function ia(e) {
  var t;
  return e.length < 1240 ? t = 107 : e.length < 33900 ? t = 1131 : t = 32768, t;
}
__name(ia, "ia");
function lr(e, t, r) {
  var n = [], i = [], a = se.getCard16(e, t), o, u;
  if (a !== 0) {
    var s = se.getByte(e, t + 2);
    o = t + (a + 1) * s + 2;
    for (var l = t + 3, f = 0; f < a + 1; f += 1)
      n.push(se.getOffset(e, l, s)), l += s;
    u = o + n[a];
  } else
    u = t + 2;
  for (var c = 0; c < n.length - 1; c += 1) {
    var p = se.getBytes(e, o + n[c], o + n[c + 1]);
    r && (p = r(p)), i.push(p);
  }
  return { objects: i, startOffset: t, endOffset: u };
}
__name(lr, "lr");
function w0(e, t) {
  var r = [], n = se.getCard16(e, t), i, a;
  if (n !== 0) {
    var o = se.getByte(e, t + 2);
    i = t + (n + 1) * o + 2;
    for (var u = t + 3, s = 0; s < n + 1; s += 1)
      r.push(se.getOffset(e, u, o)), u += o;
    a = i + r[n];
  } else
    a = t + 2;
  return { offsets: r, startOffset: t, endOffset: a };
}
__name(w0, "w0");
function E0(e, t, r, n, i) {
  var a = se.getCard16(r, n), o = 0;
  if (a !== 0) {
    var u = se.getByte(r, n + 2);
    o = n + (a + 1) * u + 2;
  }
  var s = se.getBytes(r, o + t[e], o + t[e + 1]);
  return i && (s = i(s)), s;
}
__name(E0, "E0");
function F0(e) {
  for (var t = "", r = 15, n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "E", "E-", null, "-"]; ; ) {
    var i = e.parseByte(), a = i >> 4, o = i & 15;
    if (a === r || (t += n[a], o === r))
      break;
    t += n[o];
  }
  return parseFloat(t);
}
__name(F0, "F0");
function C0(e, t) {
  var r, n, i, a;
  if (t === 28)
    return r = e.parseByte(), n = e.parseByte(), r << 8 | n;
  if (t === 29)
    return r = e.parseByte(), n = e.parseByte(), i = e.parseByte(), a = e.parseByte(), r << 24 | n << 16 | i << 8 | a;
  if (t === 30)
    return F0(e);
  if (t >= 32 && t <= 246)
    return t - 139;
  if (t >= 247 && t <= 250)
    return r = e.parseByte(), (t - 247) * 256 + r + 108;
  if (t >= 251 && t <= 254)
    return r = e.parseByte(), -(t - 251) * 256 - r - 108;
  throw new Error("Invalid b0 " + t);
}
__name(C0, "C0");
function S0(e) {
  for (var t = {}, r = 0; r < e.length; r += 1) {
    var n = e[r][0], i = e[r][1], a = void 0;
    if (i.length === 1 ? a = i[0] : a = i, t.hasOwnProperty(n) && !isNaN(t[n]))
      throw new Error("Object " + t + " already has key " + n);
    t[n] = a;
  }
  return t;
}
__name(S0, "S0");
function ou(e, t, r) {
  t = t !== void 0 ? t : 0;
  var n = new se.Parser(e, t), i = [], a = [];
  for (r = r !== void 0 ? r : e.length; n.relativeOffset < r; ) {
    var o = n.parseByte();
    o <= 21 ? (o === 12 && (o = 1200 + n.parseByte()), i.push([o, a]), a = []) : a.push(C0(n, o));
  }
  return S0(i);
}
__name(ou, "ou");
function Wr(e, t) {
  return t <= 390 ? t = zp[t] : t = e[t - 391], t;
}
__name(Wr, "Wr");
function su(e, t, r) {
  for (var n = {}, i, a = 0; a < t.length; a += 1) {
    var o = t[a];
    if (Array.isArray(o.type)) {
      var u = [];
      u.length = o.type.length;
      for (var s = 0; s < o.type.length; s++)
        i = e[o.op] !== void 0 ? e[o.op][s] : void 0, i === void 0 && (i = o.value !== void 0 && o.value[s] !== void 0 ? o.value[s] : null), o.type[s] === "SID" && (i = Wr(r, i)), u[s] = i;
      n[o.name] = u;
    } else
      i = e[o.op], i === void 0 && (i = o.value !== void 0 ? o.value : null), o.type === "SID" && (i = Wr(r, i)), n[o.name] = i;
  }
  return n;
}
__name(su, "su");
function k0(e, t) {
  var r = {};
  return r.formatMajor = se.getCard8(e, t), r.formatMinor = se.getCard8(e, t + 1), r.size = se.getCard8(e, t + 2), r.offsetSize = se.getCard8(e, t + 3), r.startOffset = t, r.endOffset = t + 4, r;
}
__name(k0, "k0");
var _0 = [{ name: "version", op: 0, type: "SID" }, { name: "notice", op: 1, type: "SID" }, { name: "copyright", op: 1200, type: "SID" }, { name: "fullName", op: 2, type: "SID" }, { name: "familyName", op: 3, type: "SID" }, { name: "weight", op: 4, type: "SID" }, { name: "isFixedPitch", op: 1201, type: "number", value: 0 }, { name: "italicAngle", op: 1202, type: "number", value: 0 }, { name: "underlinePosition", op: 1203, type: "number", value: -100 }, { name: "underlineThickness", op: 1204, type: "number", value: 50 }, { name: "paintType", op: 1205, type: "number", value: 0 }, { name: "charstringType", op: 1206, type: "number", value: 2 }, { name: "fontMatrix", op: 1207, type: ["real", "real", "real", "real", "real", "real"], value: [1e-3, 0, 0, 1e-3, 0, 0] }, { name: "uniqueId", op: 13, type: "number" }, { name: "fontBBox", op: 5, type: ["number", "number", "number", "number"], value: [0, 0, 0, 0] }, { name: "strokeWidth", op: 1208, type: "number", value: 0 }, { name: "xuid", op: 14, type: [], value: null }, { name: "charset", op: 15, type: "offset", value: 0 }, { name: "encoding", op: 16, type: "offset", value: 0 }, { name: "charStrings", op: 17, type: "offset", value: 0 }, { name: "private", op: 18, type: ["number", "offset"], value: [0, 0] }, { name: "ros", op: 1230, type: ["SID", "SID", "number"] }, { name: "cidFontVersion", op: 1231, type: "number", value: 0 }, { name: "cidFontRevision", op: 1232, type: "number", value: 0 }, { name: "cidFontType", op: 1233, type: "number", value: 0 }, { name: "cidCount", op: 1234, type: "number", value: 8720 }, { name: "uidBase", op: 1235, type: "number" }, { name: "fdArray", op: 1236, type: "offset" }, { name: "fdSelect", op: 1237, type: "offset" }, { name: "fontName", op: 1238, type: "SID" }];
var T0 = [{ name: "subrs", op: 19, type: "offset", value: 0 }, { name: "defaultWidthX", op: 20, type: "number", value: 0 }, { name: "nominalWidthX", op: 21, type: "number", value: 0 }];
function A0(e, t) {
  var r = ou(e, 0, e.byteLength);
  return su(r, _0, t);
}
__name(A0, "A0");
function uu(e, t, r, n) {
  var i = ou(e, t, r);
  return su(i, T0, n);
}
__name(uu, "uu");
function Rs(e, t, r, n) {
  for (var i = [], a = 0; a < r.length; a += 1) {
    var o = new DataView(new Uint8Array(r[a]).buffer), u = A0(o, n);
    u._subrs = [], u._subrsBias = 0, u._defaultWidthX = 0, u._nominalWidthX = 0;
    var s = u.private[0], l = u.private[1];
    if (s !== 0 && l !== 0) {
      var f = uu(e, l + t, s, n);
      if (u._defaultWidthX = f.defaultWidthX, u._nominalWidthX = f.nominalWidthX, f.subrs !== 0) {
        var c = l + f.subrs, p = lr(e, c + t);
        u._subrs = p.objects, u._subrsBias = ia(u._subrs);
      }
      u._privateDict = f;
    }
    i.push(u);
  }
  return i;
}
__name(Rs, "Rs");
function O0(e, t, r, n) {
  var i, a, o = new se.Parser(e, t);
  r -= 1;
  var u = [".notdef"], s = o.parseCard8();
  if (s === 0)
    for (var l = 0; l < r; l += 1)
      i = o.parseSID(), u.push(Wr(n, i));
  else if (s === 1)
    for (; u.length <= r; ) {
      i = o.parseSID(), a = o.parseCard8();
      for (var f = 0; f <= a; f += 1)
        u.push(Wr(n, i)), i += 1;
    }
  else if (s === 2)
    for (; u.length <= r; ) {
      i = o.parseSID(), a = o.parseCard16();
      for (var c = 0; c <= a; c += 1)
        u.push(Wr(n, i)), i += 1;
    }
  else
    throw new Error("Unknown charset format " + s);
  return u;
}
__name(O0, "O0");
function L0(e, t, r) {
  var n, i = {}, a = new se.Parser(e, t), o = a.parseCard8();
  if (o === 0)
    for (var u = a.parseCard8(), s = 0; s < u; s += 1)
      n = a.parseCard8(), i[n] = s;
  else if (o === 1) {
    var l = a.parseCard8();
    n = 1;
    for (var f = 0; f < l; f += 1)
      for (var c = a.parseCard8(), p = a.parseCard8(), v = c; v <= c + p; v += 1)
        i[v] = n, n += 1;
  } else
    throw new Error("Unknown encoding format " + o);
  return new kn(i, r);
}
__name(L0, "L0");
function Us(e, t, r) {
  var n, i, a, o, u = new at(), s = [], l = 0, f = false, c = false, p = 0, v = 0, D, d, g, y;
  if (e.isCIDFont) {
    var b = e.tables.cff.topDict._fdSelect[t.index], S = e.tables.cff.topDict._fdArray[b];
    D = S._subrs, d = S._subrsBias, g = S._defaultWidthX, y = S._nominalWidthX;
  } else
    D = e.tables.cff.topDict._subrs, d = e.tables.cff.topDict._subrsBias, g = e.tables.cff.topDict._defaultWidthX, y = e.tables.cff.topDict._nominalWidthX;
  var k = g;
  function C(_, U) {
    c && u.closePath(), u.moveTo(_, U), c = true;
  }
  __name(C, "C");
  function E() {
    var _;
    _ = s.length % 2 !== 0, _ && !f && (k = s.shift() + y), l += s.length >> 1, s.length = 0, f = true;
  }
  __name(E, "E");
  function L(_) {
    for (var U, N, X, Y, ee, A, R, O, H, Z, te, re, B = 0; B < _.length; ) {
      var j = _[B];
      switch (B += 1, j) {
        case 1:
          E();
          break;
        case 3:
          E();
          break;
        case 4:
          s.length > 1 && !f && (k = s.shift() + y, f = true), v += s.pop(), C(p, v);
          break;
        case 5:
          for (; s.length > 0; )
            p += s.shift(), v += s.shift(), u.lineTo(p, v);
          break;
        case 6:
          for (; s.length > 0 && (p += s.shift(), u.lineTo(p, v), s.length !== 0); )
            v += s.shift(), u.lineTo(p, v);
          break;
        case 7:
          for (; s.length > 0 && (v += s.shift(), u.lineTo(p, v), s.length !== 0); )
            p += s.shift(), u.lineTo(p, v);
          break;
        case 8:
          for (; s.length > 0; )
            n = p + s.shift(), i = v + s.shift(), a = n + s.shift(), o = i + s.shift(), p = a + s.shift(), v = o + s.shift(), u.curveTo(n, i, a, o, p, v);
          break;
        case 10:
          ee = s.pop() + d, A = D[ee], A && L(A);
          break;
        case 11:
          return;
        case 12:
          switch (j = _[B], B += 1, j) {
            case 35:
              n = p + s.shift(), i = v + s.shift(), a = n + s.shift(), o = i + s.shift(), R = a + s.shift(), O = o + s.shift(), H = R + s.shift(), Z = O + s.shift(), te = H + s.shift(), re = Z + s.shift(), p = te + s.shift(), v = re + s.shift(), s.shift(), u.curveTo(n, i, a, o, R, O), u.curveTo(H, Z, te, re, p, v);
              break;
            case 34:
              n = p + s.shift(), i = v, a = n + s.shift(), o = i + s.shift(), R = a + s.shift(), O = o, H = R + s.shift(), Z = o, te = H + s.shift(), re = v, p = te + s.shift(), u.curveTo(n, i, a, o, R, O), u.curveTo(H, Z, te, re, p, v);
              break;
            case 36:
              n = p + s.shift(), i = v + s.shift(), a = n + s.shift(), o = i + s.shift(), R = a + s.shift(), O = o, H = R + s.shift(), Z = o, te = H + s.shift(), re = Z + s.shift(), p = te + s.shift(), u.curveTo(n, i, a, o, R, O), u.curveTo(H, Z, te, re, p, v);
              break;
            case 37:
              n = p + s.shift(), i = v + s.shift(), a = n + s.shift(), o = i + s.shift(), R = a + s.shift(), O = o + s.shift(), H = R + s.shift(), Z = O + s.shift(), te = H + s.shift(), re = Z + s.shift(), Math.abs(te - p) > Math.abs(re - v) ? p = te + s.shift() : v = re + s.shift(), u.curveTo(n, i, a, o, R, O), u.curveTo(H, Z, te, re, p, v);
              break;
            default:
              console.log("Glyph " + t.index + ": unknown operator 1200" + j), s.length = 0;
          }
          break;
        case 14:
          s.length > 0 && !f && (k = s.shift() + y, f = true), c && (u.closePath(), c = false);
          break;
        case 18:
          E();
          break;
        case 19:
        case 20:
          E(), B += l + 7 >> 3;
          break;
        case 21:
          s.length > 2 && !f && (k = s.shift() + y, f = true), v += s.pop(), p += s.pop(), C(p, v);
          break;
        case 22:
          s.length > 1 && !f && (k = s.shift() + y, f = true), p += s.pop(), C(p, v);
          break;
        case 23:
          E();
          break;
        case 24:
          for (; s.length > 2; )
            n = p + s.shift(), i = v + s.shift(), a = n + s.shift(), o = i + s.shift(), p = a + s.shift(), v = o + s.shift(), u.curveTo(n, i, a, o, p, v);
          p += s.shift(), v += s.shift(), u.lineTo(p, v);
          break;
        case 25:
          for (; s.length > 6; )
            p += s.shift(), v += s.shift(), u.lineTo(p, v);
          n = p + s.shift(), i = v + s.shift(), a = n + s.shift(), o = i + s.shift(), p = a + s.shift(), v = o + s.shift(), u.curveTo(n, i, a, o, p, v);
          break;
        case 26:
          for (s.length % 2 && (p += s.shift()); s.length > 0; )
            n = p, i = v + s.shift(), a = n + s.shift(), o = i + s.shift(), p = a, v = o + s.shift(), u.curveTo(n, i, a, o, p, v);
          break;
        case 27:
          for (s.length % 2 && (v += s.shift()); s.length > 0; )
            n = p + s.shift(), i = v, a = n + s.shift(), o = i + s.shift(), p = a + s.shift(), v = o, u.curveTo(n, i, a, o, p, v);
          break;
        case 28:
          U = _[B], N = _[B + 1], s.push((U << 24 | N << 16) >> 16), B += 2;
          break;
        case 29:
          ee = s.pop() + e.gsubrsBias, A = e.gsubrs[ee], A && L(A);
          break;
        case 30:
          for (; s.length > 0 && (n = p, i = v + s.shift(), a = n + s.shift(), o = i + s.shift(), p = a + s.shift(), v = o + (s.length === 1 ? s.shift() : 0), u.curveTo(n, i, a, o, p, v), s.length !== 0); )
            n = p + s.shift(), i = v, a = n + s.shift(), o = i + s.shift(), v = o + s.shift(), p = a + (s.length === 1 ? s.shift() : 0), u.curveTo(n, i, a, o, p, v);
          break;
        case 31:
          for (; s.length > 0 && (n = p + s.shift(), i = v, a = n + s.shift(), o = i + s.shift(), v = o + s.shift(), p = a + (s.length === 1 ? s.shift() : 0), u.curveTo(n, i, a, o, p, v), s.length !== 0); )
            n = p, i = v + s.shift(), a = n + s.shift(), o = i + s.shift(), p = a + s.shift(), v = o + (s.length === 1 ? s.shift() : 0), u.curveTo(n, i, a, o, p, v);
          break;
        default:
          j < 32 ? console.log("Glyph " + t.index + ": unknown operator " + j) : j < 247 ? s.push(j - 139) : j < 251 ? (U = _[B], B += 1, s.push((j - 247) * 256 + U + 108)) : j < 255 ? (U = _[B], B += 1, s.push(-(j - 251) * 256 - U - 108)) : (U = _[B], N = _[B + 1], X = _[B + 2], Y = _[B + 3], B += 4, s.push((U << 24 | N << 16 | X << 8 | Y) / 65536));
      }
    }
  }
  __name(L, "L");
  return L(r), t.advanceWidth = k, u;
}
__name(Us, "Us");
function P0(e, t, r, n) {
  var i = [], a, o = new se.Parser(e, t), u = o.parseCard8();
  if (u === 0)
    for (var s = 0; s < r; s++) {
      if (a = o.parseCard8(), a >= n)
        throw new Error("CFF table CID Font FDSelect has bad FD index value " + a + " (FD count " + n + ")");
      i.push(a);
    }
  else if (u === 3) {
    var l = o.parseCard16(), f = o.parseCard16();
    if (f !== 0)
      throw new Error("CFF Table CID Font FDSelect format 3 range has bad initial GID " + f);
    for (var c, p = 0; p < l; p++) {
      if (a = o.parseCard8(), c = o.parseCard16(), a >= n)
        throw new Error("CFF table CID Font FDSelect has bad FD index value " + a + " (FD count " + n + ")");
      if (c > r)
        throw new Error("CFF Table CID Font FDSelect format 3 range has bad GID " + c);
      for (; f < c; f++)
        i.push(a);
      f = c;
    }
    if (c !== r)
      throw new Error("CFF Table CID Font FDSelect format 3 range has bad final GID " + c);
  } else
    throw new Error("CFF Table CID Font FDSelect table has unsupported format " + u);
  return i;
}
__name(P0, "P0");
function I0(e, t, r, n) {
  r.tables.cff = {};
  var i = k0(e, t), a = lr(e, i.endOffset, se.bytesToString), o = lr(e, a.endOffset), u = lr(e, o.endOffset, se.bytesToString), s = lr(e, u.endOffset);
  r.gsubrs = s.objects, r.gsubrsBias = ia(r.gsubrs);
  var l = Rs(e, t, o.objects, u.objects);
  if (l.length !== 1)
    throw new Error("CFF table has too many fonts in 'FontSet' - count of fonts NameIndex.length = " + l.length);
  var f = l[0];
  if (r.tables.cff.topDict = f, f._privateDict && (r.defaultWidthX = f._privateDict.defaultWidthX, r.nominalWidthX = f._privateDict.nominalWidthX), f.ros[0] !== void 0 && f.ros[1] !== void 0 && (r.isCIDFont = true), r.isCIDFont) {
    var c = f.fdArray, p = f.fdSelect;
    if (c === 0 || p === 0)
      throw new Error("Font is marked as a CID font, but FDArray and/or FDSelect information is missing");
    c += t;
    var v = lr(e, c), D = Rs(e, t, v.objects, u.objects);
    f._fdArray = D, p += t, f._fdSelect = P0(e, p, r.numGlyphs, D.length);
  }
  var d = t + f.private[1], g = uu(e, d, f.private[0], u.objects);
  if (r.defaultWidthX = g.defaultWidthX, r.nominalWidthX = g.nominalWidthX, g.subrs !== 0) {
    var y = d + g.subrs, b = lr(e, y);
    r.subrs = b.objects, r.subrsBias = ia(r.subrs);
  } else
    r.subrs = [], r.subrsBias = 0;
  var S;
  n.lowMemory ? (S = w0(e, t + f.charStrings), r.nGlyphs = S.offsets.length) : (S = lr(e, t + f.charStrings), r.nGlyphs = S.objects.length);
  var k = O0(e, t + f.charset, r.nGlyphs, u.objects);
  if (f.encoding === 0 ? r.cffEncoding = new kn(Hp, k) : f.encoding === 1 ? r.cffEncoding = new kn(Xp, k) : r.cffEncoding = L0(e, t + f.encoding, k), r.encoding = r.encoding || r.cffEncoding, r.glyphs = new Vt.GlyphSet(r), n.lowMemory)
    r._push = function(L) {
      var _ = E0(L, S.offsets, e, t + f.charStrings);
      r.glyphs.push(L, Vt.cffGlyphLoader(r, L, Us, _));
    };
  else
    for (var C = 0; C < r.nGlyphs; C += 1) {
      var E = S.objects[C];
      r.glyphs.push(C, Vt.cffGlyphLoader(r, C, Us, E));
    }
}
__name(I0, "I0");
var R0 = { parse: I0 };
function U0(e, t, r) {
  var n = {}, i = new se.Parser(e, t);
  return n.tag = i.parseTag(), n.minValue = i.parseFixed(), n.defaultValue = i.parseFixed(), n.maxValue = i.parseFixed(), i.skip("uShort", 1), n.name = r[i.parseUShort()] || {}, n;
}
__name(U0, "U0");
function B0(e, t, r, n) {
  var i = {}, a = new se.Parser(e, t);
  i.name = n[a.parseUShort()] || {}, a.skip("uShort", 1), i.coordinates = {};
  for (var o = 0; o < r.length; ++o)
    i.coordinates[r[o].tag] = a.parseFixed();
  return i;
}
__name(B0, "B0");
function N0(e, t, r) {
  var n = new se.Parser(e, t), i = n.parseULong();
  _e.argument(i === 65536, "Unsupported fvar table version.");
  var a = n.parseOffset16();
  n.skip("uShort", 1);
  for (var o = n.parseUShort(), u = n.parseUShort(), s = n.parseUShort(), l = n.parseUShort(), f = [], c = 0; c < o; c++)
    f.push(U0(e, t + a + c * u, r));
  for (var p = [], v = t + a + o * u, D = 0; D < s; D++)
    p.push(B0(e, v + D * l, f, r));
  return { axes: f, instances: p };
}
__name(N0, "N0");
var M0 = { parse: N0 };
var G0 = /* @__PURE__ */ __name(function() {
  return { coverage: this.parsePointer(G.coverage), attachPoints: this.parseList(G.pointer(G.uShortList)) };
}, "G0");
var W0 = /* @__PURE__ */ __name(function() {
  var e = this.parseUShort();
  if (_e.argument(e === 1 || e === 2 || e === 3, "Unsupported CaretValue table version."), e === 1)
    return { coordinate: this.parseShort() };
  if (e === 2)
    return { pointindex: this.parseShort() };
  if (e === 3)
    return { coordinate: this.parseShort() };
}, "W0");
var $0 = /* @__PURE__ */ __name(function() {
  return this.parseList(G.pointer(W0));
}, "$0");
var j0 = /* @__PURE__ */ __name(function() {
  return { coverage: this.parsePointer(G.coverage), ligGlyphs: this.parseList(G.pointer($0)) };
}, "j0");
var V0 = /* @__PURE__ */ __name(function() {
  return this.parseUShort(), this.parseList(G.pointer(G.coverage));
}, "V0");
function z0(e, t) {
  t = t || 0;
  var r = new G(e, t), n = r.parseVersion(1);
  _e.argument(n === 1 || n === 1.2 || n === 1.3, "Unsupported GDEF table version.");
  var i = { version: n, classDef: r.parsePointer(G.classDef), attachList: r.parsePointer(G0), ligCaretList: r.parsePointer(j0), markAttachClassDef: r.parsePointer(G.classDef) };
  return n >= 1.2 && (i.markGlyphSets = r.parsePointer(V0)), i;
}
__name(z0, "z0");
var H0 = { parse: z0 };
var Lt = new Array(10);
Lt[1] = function() {
  var t = this.offset + this.relativeOffset, r = this.parseUShort();
  if (r === 1)
    return { posFormat: 1, coverage: this.parsePointer(G.coverage), value: this.parseValueRecord() };
  if (r === 2)
    return { posFormat: 2, coverage: this.parsePointer(G.coverage), values: this.parseValueRecordList() };
  _e.assert(false, "0x" + t.toString(16) + ": GPOS lookup type 1 format must be 1 or 2.");
};
Lt[2] = function() {
  var t = this.offset + this.relativeOffset, r = this.parseUShort();
  _e.assert(r === 1 || r === 2, "0x" + t.toString(16) + ": GPOS lookup type 2 format must be 1 or 2.");
  var n = this.parsePointer(G.coverage), i = this.parseUShort(), a = this.parseUShort();
  if (r === 1)
    return { posFormat: r, coverage: n, valueFormat1: i, valueFormat2: a, pairSets: this.parseList(G.pointer(G.list(function() {
      return { secondGlyph: this.parseUShort(), value1: this.parseValueRecord(i), value2: this.parseValueRecord(a) };
    }))) };
  if (r === 2) {
    var o = this.parsePointer(G.classDef), u = this.parsePointer(G.classDef), s = this.parseUShort(), l = this.parseUShort();
    return { posFormat: r, coverage: n, valueFormat1: i, valueFormat2: a, classDef1: o, classDef2: u, class1Count: s, class2Count: l, classRecords: this.parseList(s, G.list(l, function() {
      return { value1: this.parseValueRecord(i), value2: this.parseValueRecord(a) };
    })) };
  }
};
Lt[3] = function() {
  return { error: "GPOS Lookup 3 not supported" };
};
Lt[4] = function() {
  return { error: "GPOS Lookup 4 not supported" };
};
Lt[5] = function() {
  return { error: "GPOS Lookup 5 not supported" };
};
Lt[6] = function() {
  return { error: "GPOS Lookup 6 not supported" };
};
Lt[7] = function() {
  return { error: "GPOS Lookup 7 not supported" };
};
Lt[8] = function() {
  return { error: "GPOS Lookup 8 not supported" };
};
Lt[9] = function() {
  return { error: "GPOS Lookup 9 not supported" };
};
function X0(e, t) {
  t = t || 0;
  var r = new G(e, t), n = r.parseVersion(1);
  return _e.argument(n === 1 || n === 1.1, "Unsupported GPOS table version " + n), n === 1 ? { version: n, scripts: r.parseScriptList(), features: r.parseFeatureList(), lookups: r.parseLookupList(Lt) } : { version: n, scripts: r.parseScriptList(), features: r.parseFeatureList(), lookups: r.parseLookupList(Lt), variations: r.parseFeatureVariationsList() };
}
__name(X0, "X0");
var q0 = { parse: X0 };
var Pt = new Array(9);
Pt[1] = function() {
  var t = this.offset + this.relativeOffset, r = this.parseUShort();
  if (r === 1)
    return { substFormat: 1, coverage: this.parsePointer(G.coverage), deltaGlyphId: this.parseUShort() };
  if (r === 2)
    return { substFormat: 2, coverage: this.parsePointer(G.coverage), substitute: this.parseOffset16List() };
  _e.assert(false, "0x" + t.toString(16) + ": lookup type 1 format must be 1 or 2.");
};
Pt[2] = function() {
  var t = this.parseUShort();
  return _e.argument(t === 1, "GSUB Multiple Substitution Subtable identifier-format must be 1"), { substFormat: t, coverage: this.parsePointer(G.coverage), sequences: this.parseListOfLists() };
};
Pt[3] = function() {
  var t = this.parseUShort();
  return _e.argument(t === 1, "GSUB Alternate Substitution Subtable identifier-format must be 1"), { substFormat: t, coverage: this.parsePointer(G.coverage), alternateSets: this.parseListOfLists() };
};
Pt[4] = function() {
  var t = this.parseUShort();
  return _e.argument(t === 1, "GSUB ligature table identifier-format must be 1"), { substFormat: t, coverage: this.parsePointer(G.coverage), ligatureSets: this.parseListOfLists(function() {
    return { ligGlyph: this.parseUShort(), components: this.parseUShortList(this.parseUShort() - 1) };
  }) };
};
var Ar = { sequenceIndex: G.uShort, lookupListIndex: G.uShort };
Pt[5] = function() {
  var t = this.offset + this.relativeOffset, r = this.parseUShort();
  if (r === 1)
    return { substFormat: r, coverage: this.parsePointer(G.coverage), ruleSets: this.parseListOfLists(function() {
      var a = this.parseUShort(), o = this.parseUShort();
      return { input: this.parseUShortList(a - 1), lookupRecords: this.parseRecordList(o, Ar) };
    }) };
  if (r === 2)
    return { substFormat: r, coverage: this.parsePointer(G.coverage), classDef: this.parsePointer(G.classDef), classSets: this.parseListOfLists(function() {
      var a = this.parseUShort(), o = this.parseUShort();
      return { classes: this.parseUShortList(a - 1), lookupRecords: this.parseRecordList(o, Ar) };
    }) };
  if (r === 3) {
    var n = this.parseUShort(), i = this.parseUShort();
    return { substFormat: r, coverages: this.parseList(n, G.pointer(G.coverage)), lookupRecords: this.parseRecordList(i, Ar) };
  }
  _e.assert(false, "0x" + t.toString(16) + ": lookup type 5 format must be 1, 2 or 3.");
};
Pt[6] = function() {
  var t = this.offset + this.relativeOffset, r = this.parseUShort();
  if (r === 1)
    return { substFormat: 1, coverage: this.parsePointer(G.coverage), chainRuleSets: this.parseListOfLists(function() {
      return { backtrack: this.parseUShortList(), input: this.parseUShortList(this.parseShort() - 1), lookahead: this.parseUShortList(), lookupRecords: this.parseRecordList(Ar) };
    }) };
  if (r === 2)
    return { substFormat: 2, coverage: this.parsePointer(G.coverage), backtrackClassDef: this.parsePointer(G.classDef), inputClassDef: this.parsePointer(G.classDef), lookaheadClassDef: this.parsePointer(G.classDef), chainClassSet: this.parseListOfLists(function() {
      return { backtrack: this.parseUShortList(), input: this.parseUShortList(this.parseShort() - 1), lookahead: this.parseUShortList(), lookupRecords: this.parseRecordList(Ar) };
    }) };
  if (r === 3)
    return { substFormat: 3, backtrackCoverage: this.parseList(G.pointer(G.coverage)), inputCoverage: this.parseList(G.pointer(G.coverage)), lookaheadCoverage: this.parseList(G.pointer(G.coverage)), lookupRecords: this.parseRecordList(Ar) };
  _e.assert(false, "0x" + t.toString(16) + ": lookup type 6 format must be 1, 2 or 3.");
};
Pt[7] = function() {
  var t = this.parseUShort();
  _e.argument(t === 1, "GSUB Extension Substitution subtable identifier-format must be 1");
  var r = this.parseUShort(), n = new G(this.data, this.offset + this.parseULong());
  return { substFormat: 1, lookupType: r, extension: Pt[r].call(n) };
};
Pt[8] = function() {
  var t = this.parseUShort();
  return _e.argument(t === 1, "GSUB Reverse Chaining Contextual Single Substitution Subtable identifier-format must be 1"), { substFormat: t, coverage: this.parsePointer(G.coverage), backtrackCoverage: this.parseList(G.pointer(G.coverage)), lookaheadCoverage: this.parseList(G.pointer(G.coverage)), substitutes: this.parseUShortList() };
};
function Y0(e, t) {
  t = t || 0;
  var r = new G(e, t), n = r.parseVersion(1);
  return _e.argument(n === 1 || n === 1.1, "Unsupported GSUB table version."), n === 1 ? { version: n, scripts: r.parseScriptList(), features: r.parseFeatureList(), lookups: r.parseLookupList(Pt) } : { version: n, scripts: r.parseScriptList(), features: r.parseFeatureList(), lookups: r.parseLookupList(Pt), variations: r.parseFeatureVariationsList() };
}
__name(Y0, "Y0");
var Z0 = { parse: Y0 };
function Q0(e, t) {
  var r = {}, n = new se.Parser(e, t);
  return r.version = n.parseVersion(), r.fontRevision = Math.round(n.parseFixed() * 1e3) / 1e3, r.checkSumAdjustment = n.parseULong(), r.magicNumber = n.parseULong(), _e.argument(r.magicNumber === 1594834165, "Font header has wrong magic number."), r.flags = n.parseUShort(), r.unitsPerEm = n.parseUShort(), r.created = n.parseLongDateTime(), r.modified = n.parseLongDateTime(), r.xMin = n.parseShort(), r.yMin = n.parseShort(), r.xMax = n.parseShort(), r.yMax = n.parseShort(), r.macStyle = n.parseUShort(), r.lowestRecPPEM = n.parseUShort(), r.fontDirectionHint = n.parseShort(), r.indexToLocFormat = n.parseShort(), r.glyphDataFormat = n.parseShort(), r;
}
__name(Q0, "Q0");
var J0 = { parse: Q0 };
function K0(e, t) {
  var r = {}, n = new se.Parser(e, t);
  return r.version = n.parseVersion(), r.ascender = n.parseShort(), r.descender = n.parseShort(), r.lineGap = n.parseShort(), r.advanceWidthMax = n.parseUShort(), r.minLeftSideBearing = n.parseShort(), r.minRightSideBearing = n.parseShort(), r.xMaxExtent = n.parseShort(), r.caretSlopeRise = n.parseShort(), r.caretSlopeRun = n.parseShort(), r.caretOffset = n.parseShort(), n.relativeOffset += 8, r.metricDataFormat = n.parseShort(), r.numberOfHMetrics = n.parseUShort(), r;
}
__name(K0, "K0");
var ev = { parse: K0 };
function tv(e, t, r, n, i) {
  for (var a, o, u = new se.Parser(e, t), s = 0; s < n; s += 1) {
    s < r && (a = u.parseUShort(), o = u.parseShort());
    var l = i.get(s);
    l.advanceWidth = a, l.leftSideBearing = o;
  }
}
__name(tv, "tv");
function rv(e, t, r, n, i) {
  e._hmtxTableData = {};
  for (var a, o, u = new se.Parser(t, r), s = 0; s < i; s += 1)
    s < n && (a = u.parseUShort(), o = u.parseShort()), e._hmtxTableData[s] = { advanceWidth: a, leftSideBearing: o };
}
__name(rv, "rv");
function nv(e, t, r, n, i, a, o) {
  o.lowMemory ? rv(e, t, r, n, i) : tv(t, r, n, i, a);
}
__name(nv, "nv");
var iv = { parse: nv };
function av(e) {
  var t = {};
  e.skip("uShort");
  var r = e.parseUShort();
  _e.argument(r === 0, "Unsupported kern sub-table version."), e.skip("uShort", 2);
  var n = e.parseUShort();
  e.skip("uShort", 3);
  for (var i = 0; i < n; i += 1) {
    var a = e.parseUShort(), o = e.parseUShort(), u = e.parseShort();
    t[a + "," + o] = u;
  }
  return t;
}
__name(av, "av");
function ov(e) {
  var t = {};
  e.skip("uShort");
  var r = e.parseULong();
  r > 1 && console.warn("Only the first kern subtable is supported."), e.skip("uLong");
  var n = e.parseUShort(), i = n & 255;
  if (e.skip("uShort"), i === 0) {
    var a = e.parseUShort();
    e.skip("uShort", 3);
    for (var o = 0; o < a; o += 1) {
      var u = e.parseUShort(), s = e.parseUShort(), l = e.parseShort();
      t[u + "," + s] = l;
    }
  }
  return t;
}
__name(ov, "ov");
function sv(e, t) {
  var r = new se.Parser(e, t), n = r.parseUShort();
  if (n === 0)
    return av(r);
  if (n === 1)
    return ov(r);
  throw new Error("Unsupported kern table version (" + n + ").");
}
__name(sv, "sv");
var uv = { parse: sv };
function lv(e, t) {
  var r = new se.Parser(e, t), n = r.parseULong();
  _e.argument(n === 1, "Unsupported ltag table version."), r.skip("uLong", 1);
  for (var i = r.parseULong(), a = [], o = 0; o < i; o++) {
    for (var u = "", s = t + r.parseUShort(), l = r.parseUShort(), f = s; f < s + l; ++f)
      u += String.fromCharCode(e.getInt8(f));
    a.push(u);
  }
  return a;
}
__name(lv, "lv");
var fv = { parse: lv };
function cv(e, t, r, n) {
  for (var i = new se.Parser(e, t), a = n ? i.parseUShort : i.parseULong, o = [], u = 0; u < r + 1; u += 1) {
    var s = a.call(i);
    n && (s *= 2), o.push(s);
  }
  return o;
}
__name(cv, "cv");
var pv = { parse: cv };
function hv(e, t) {
  var r = {}, n = new se.Parser(e, t);
  return r.version = n.parseVersion(), r.numGlyphs = n.parseUShort(), r.version === 1 && (r.maxPoints = n.parseUShort(), r.maxContours = n.parseUShort(), r.maxCompositePoints = n.parseUShort(), r.maxCompositeContours = n.parseUShort(), r.maxZones = n.parseUShort(), r.maxTwilightPoints = n.parseUShort(), r.maxStorage = n.parseUShort(), r.maxFunctionDefs = n.parseUShort(), r.maxInstructionDefs = n.parseUShort(), r.maxStackElements = n.parseUShort(), r.maxSizeOfInstructions = n.parseUShort(), r.maxComponentElements = n.parseUShort(), r.maxComponentDepth = n.parseUShort()), r;
}
__name(hv, "hv");
var dv = { parse: hv };
function vv(e, t) {
  var r = {}, n = new se.Parser(e, t);
  r.version = n.parseUShort(), r.xAvgCharWidth = n.parseShort(), r.usWeightClass = n.parseUShort(), r.usWidthClass = n.parseUShort(), r.fsType = n.parseUShort(), r.ySubscriptXSize = n.parseShort(), r.ySubscriptYSize = n.parseShort(), r.ySubscriptXOffset = n.parseShort(), r.ySubscriptYOffset = n.parseShort(), r.ySuperscriptXSize = n.parseShort(), r.ySuperscriptYSize = n.parseShort(), r.ySuperscriptXOffset = n.parseShort(), r.ySuperscriptYOffset = n.parseShort(), r.yStrikeoutSize = n.parseShort(), r.yStrikeoutPosition = n.parseShort(), r.sFamilyClass = n.parseShort(), r.panose = [];
  for (var i = 0; i < 10; i++)
    r.panose[i] = n.parseByte();
  return r.ulUnicodeRange1 = n.parseULong(), r.ulUnicodeRange2 = n.parseULong(), r.ulUnicodeRange3 = n.parseULong(), r.ulUnicodeRange4 = n.parseULong(), r.achVendID = String.fromCharCode(n.parseByte(), n.parseByte(), n.parseByte(), n.parseByte()), r.fsSelection = n.parseUShort(), r.usFirstCharIndex = n.parseUShort(), r.usLastCharIndex = n.parseUShort(), r.sTypoAscender = n.parseShort(), r.sTypoDescender = n.parseShort(), r.sTypoLineGap = n.parseShort(), r.usWinAscent = n.parseUShort(), r.usWinDescent = n.parseUShort(), r.version >= 1 && (r.ulCodePageRange1 = n.parseULong(), r.ulCodePageRange2 = n.parseULong()), r.version >= 2 && (r.sxHeight = n.parseShort(), r.sCapHeight = n.parseShort(), r.usDefaultChar = n.parseUShort(), r.usBreakChar = n.parseUShort(), r.usMaxContent = n.parseUShort()), r;
}
__name(vv, "vv");
var gv = { parse: vv };
function mv(e, t) {
  var r = {}, n = new se.Parser(e, t);
  switch (r.version = n.parseVersion(), r.italicAngle = n.parseFixed(), r.underlinePosition = n.parseShort(), r.underlineThickness = n.parseShort(), r.isFixedPitch = n.parseULong(), r.minMemType42 = n.parseULong(), r.maxMemType42 = n.parseULong(), r.minMemType1 = n.parseULong(), r.maxMemType1 = n.parseULong(), r.names = [], r.version) {
    case 1:
      break;
    case 2:
      r.numberOfGlyphs = n.parseUShort(), r.glyphNameIndex = new Array(r.numberOfGlyphs);
      for (var i = 0; i < r.numberOfGlyphs; i++)
        r.glyphNameIndex[i] = n.parseUShort();
      break;
    case 2.5:
      r.numberOfGlyphs = n.parseUShort(), r.offset = new Array(r.numberOfGlyphs);
      for (var a = 0; a < r.numberOfGlyphs; a++)
        r.offset[a] = n.parseChar();
      break;
  }
  return r;
}
__name(mv, "mv");
var Dv = { parse: mv };
var On = {};
On.UTF8 = function(e, t, r) {
  for (var n = [], i = r, a = 0; a < i; a++, t += 1)
    n[a] = e.getUint8(t);
  return String.fromCharCode.apply(null, n);
};
On.UTF16 = function(e, t, r) {
  for (var n = [], i = r / 2, a = 0; a < i; a++, t += 2)
    n[a] = e.getUint16(t);
  return String.fromCharCode.apply(null, n);
};
var yv = { "x-mac-croatian": "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\u0160\u2122\xB4\xA8\u2260\u017D\xD8\u221E\xB1\u2264\u2265\u2206\xB5\u2202\u2211\u220F\u0161\u222B\xAA\xBA\u03A9\u017E\xF8\xBF\xA1\xAC\u221A\u0192\u2248\u0106\xAB\u010C\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u0110\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\uF8FF\xA9\u2044\u20AC\u2039\u203A\xC6\xBB\u2013\xB7\u201A\u201E\u2030\xC2\u0107\xC1\u010D\xC8\xCD\xCE\xCF\xCC\xD3\xD4\u0111\xD2\xDA\xDB\xD9\u0131\u02C6\u02DC\xAF\u03C0\xCB\u02DA\xB8\xCA\xE6\u02C7", "x-mac-cyrillic": "\u0410\u0411\u0412\u0413\u0414\u0415\u0416\u0417\u0418\u0419\u041A\u041B\u041C\u041D\u041E\u041F\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042A\u042B\u042C\u042D\u042E\u042F\u2020\xB0\u0490\xA3\xA7\u2022\xB6\u0406\xAE\xA9\u2122\u0402\u0452\u2260\u0403\u0453\u221E\xB1\u2264\u2265\u0456\xB5\u0491\u0408\u0404\u0454\u0407\u0457\u0409\u0459\u040A\u045A\u0458\u0405\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\u040B\u045B\u040C\u045C\u0455\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u201E\u040E\u045E\u040F\u045F\u2116\u0401\u0451\u044F\u0430\u0431\u0432\u0433\u0434\u0435\u0436\u0437\u0438\u0439\u043A\u043B\u043C\u043D\u043E\u043F\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044A\u044B\u044C\u044D\u044E", "x-mac-gaelic": "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\xC6\xD8\u1E02\xB1\u2264\u2265\u1E03\u010A\u010B\u1E0A\u1E0B\u1E1E\u1E1F\u0120\u0121\u1E40\xE6\xF8\u1E41\u1E56\u1E57\u027C\u0192\u017F\u1E60\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\u1E61\u1E9B\xFF\u0178\u1E6A\u20AC\u2039\u203A\u0176\u0177\u1E6B\xB7\u1EF2\u1EF3\u204A\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\u2663\xD2\xDA\xDB\xD9\u0131\xDD\xFD\u0174\u0175\u1E84\u1E85\u1E80\u1E81\u1E82\u1E83", "x-mac-greek": "\xC4\xB9\xB2\xC9\xB3\xD6\xDC\u0385\xE0\xE2\xE4\u0384\xA8\xE7\xE9\xE8\xEA\xEB\xA3\u2122\xEE\xEF\u2022\xBD\u2030\xF4\xF6\xA6\u20AC\xF9\xFB\xFC\u2020\u0393\u0394\u0398\u039B\u039E\u03A0\xDF\xAE\xA9\u03A3\u03AA\xA7\u2260\xB0\xB7\u0391\xB1\u2264\u2265\xA5\u0392\u0395\u0396\u0397\u0399\u039A\u039C\u03A6\u03AB\u03A8\u03A9\u03AC\u039D\xAC\u039F\u03A1\u2248\u03A4\xAB\xBB\u2026\xA0\u03A5\u03A7\u0386\u0388\u0153\u2013\u2015\u201C\u201D\u2018\u2019\xF7\u0389\u038A\u038C\u038E\u03AD\u03AE\u03AF\u03CC\u038F\u03CD\u03B1\u03B2\u03C8\u03B4\u03B5\u03C6\u03B3\u03B7\u03B9\u03BE\u03BA\u03BB\u03BC\u03BD\u03BF\u03C0\u03CE\u03C1\u03C3\u03C4\u03B8\u03C9\u03C2\u03C7\u03C5\u03B6\u03CA\u03CB\u0390\u03B0\xAD", "x-mac-icelandic": "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\xDD\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\xC6\xD8\u221E\xB1\u2264\u2265\xA5\xB5\u2202\u2211\u220F\u03C0\u222B\xAA\xBA\u03A9\xE6\xF8\xBF\xA1\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\xFF\u0178\u2044\u20AC\xD0\xF0\xDE\xFE\xFD\xB7\u201A\u201E\u2030\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\uF8FF\xD2\xDA\xDB\xD9\u0131\u02C6\u02DC\xAF\u02D8\u02D9\u02DA\xB8\u02DD\u02DB\u02C7", "x-mac-inuit": "\u1403\u1404\u1405\u1406\u140A\u140B\u1431\u1432\u1433\u1434\u1438\u1439\u1449\u144E\u144F\u1450\u1451\u1455\u1456\u1466\u146D\u146E\u146F\u1470\u1472\u1473\u1483\u148B\u148C\u148D\u148E\u1490\u1491\xB0\u14A1\u14A5\u14A6\u2022\xB6\u14A7\xAE\xA9\u2122\u14A8\u14AA\u14AB\u14BB\u14C2\u14C3\u14C4\u14C5\u14C7\u14C8\u14D0\u14EF\u14F0\u14F1\u14F2\u14F4\u14F5\u1505\u14D5\u14D6\u14D7\u14D8\u14DA\u14DB\u14EA\u1528\u1529\u152A\u152B\u152D\u2026\xA0\u152E\u153E\u1555\u1556\u1557\u2013\u2014\u201C\u201D\u2018\u2019\u1558\u1559\u155A\u155D\u1546\u1547\u1548\u1549\u154B\u154C\u1550\u157F\u1580\u1581\u1582\u1583\u1584\u1585\u158F\u1590\u1591\u1592\u1593\u1594\u1595\u1671\u1672\u1673\u1674\u1675\u1676\u1596\u15A0\u15A1\u15A2\u15A3\u15A4\u15A5\u15A6\u157C\u0141\u0142", "x-mac-ce": "\xC4\u0100\u0101\xC9\u0104\xD6\xDC\xE1\u0105\u010C\xE4\u010D\u0106\u0107\xE9\u0179\u017A\u010E\xED\u010F\u0112\u0113\u0116\xF3\u0117\xF4\xF6\xF5\xFA\u011A\u011B\xFC\u2020\xB0\u0118\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\u0119\xA8\u2260\u0123\u012E\u012F\u012A\u2264\u2265\u012B\u0136\u2202\u2211\u0142\u013B\u013C\u013D\u013E\u0139\u013A\u0145\u0146\u0143\xAC\u221A\u0144\u0147\u2206\xAB\xBB\u2026\xA0\u0148\u0150\xD5\u0151\u014C\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\u014D\u0154\u0155\u0158\u2039\u203A\u0159\u0156\u0157\u0160\u201A\u201E\u0161\u015A\u015B\xC1\u0164\u0165\xCD\u017D\u017E\u016A\xD3\xD4\u016B\u016E\xDA\u016F\u0170\u0171\u0172\u0173\xDD\xFD\u0137\u017B\u0141\u017C\u0122\u02C7", macintosh: "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\xC6\xD8\u221E\xB1\u2264\u2265\xA5\xB5\u2202\u2211\u220F\u03C0\u222B\xAA\xBA\u03A9\xE6\xF8\xBF\xA1\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\xFF\u0178\u2044\u20AC\u2039\u203A\uFB01\uFB02\u2021\xB7\u201A\u201E\u2030\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\uF8FF\xD2\xDA\xDB\xD9\u0131\u02C6\u02DC\xAF\u02D8\u02D9\u02DA\xB8\u02DD\u02DB\u02C7", "x-mac-romanian": "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\u0102\u0218\u221E\xB1\u2264\u2265\xA5\xB5\u2202\u2211\u220F\u03C0\u222B\xAA\xBA\u03A9\u0103\u0219\xBF\xA1\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\xFF\u0178\u2044\u20AC\u2039\u203A\u021A\u021B\u2021\xB7\u201A\u201E\u2030\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\uF8FF\xD2\xDA\xDB\xD9\u0131\u02C6\u02DC\xAF\u02D8\u02D9\u02DA\xB8\u02DD\u02DB\u02C7", "x-mac-turkish": "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\xC6\xD8\u221E\xB1\u2264\u2265\xA5\xB5\u2202\u2211\u220F\u03C0\u222B\xAA\xBA\u03A9\xE6\xF8\xBF\xA1\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\xFF\u0178\u011E\u011F\u0130\u0131\u015E\u015F\u2021\xB7\u201A\u201E\u2030\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\uF8FF\xD2\xDA\xDB\xD9\uF8A0\u02C6\u02DC\xAF\u02D8\u02D9\u02DA\xB8\u02DD\u02DB\u02C7" };
On.MACSTRING = function(e, t, r, n) {
  var i = yv[n];
  if (i !== void 0) {
    for (var a = "", o = 0; o < r; o++) {
      var u = e.getUint8(t + o);
      u <= 127 ? a += String.fromCharCode(u) : a += i[u & 127];
    }
    return a;
  }
};
function bv(e, t) {
  var r = new se.Parser(e, t), n = r.parseULong();
  _e.argument(n === 1, "Unsupported META table version."), r.parseULong(), r.parseULong();
  for (var i = r.parseULong(), a = {}, o = 0; o < i; o++) {
    var u = r.parseTag(), s = r.parseULong(), l = r.parseULong(), f = On.UTF8(e, t + s, l);
    a[u] = f;
  }
  return a;
}
__name(bv, "bv");
var xv = { parse: bv };
function Bs(e, t) {
  for (var r = [], n = 12, i = 0; i < t; i += 1) {
    var a = se.getTag(e, n), o = se.getULong(e, n + 4), u = se.getULong(e, n + 8), s = se.getULong(e, n + 12);
    r.push({ tag: a, checksum: o, offset: u, length: s, compression: false }), n += 16;
  }
  return r;
}
__name(Bs, "Bs");
function wv(e, t) {
  for (var r = [], n = 44, i = 0; i < t; i += 1) {
    var a = se.getTag(e, n), o = se.getULong(e, n + 4), u = se.getULong(e, n + 8), s = se.getULong(e, n + 12), l = void 0;
    u < s ? l = "WOFF" : l = false, r.push({ tag: a, offset: o, compression: l, compressedLength: u, length: s }), n += 20;
  }
  return r;
}
__name(wv, "wv");
function Ve(e, t) {
  if (t.compression === "WOFF") {
    var r = new Uint8Array(e.buffer, t.offset + 2, t.compressedLength - 2), n = new Uint8Array(t.length);
    if ($p(r, n), n.byteLength !== t.length)
      throw new Error("Decompression error: " + t.tag + " decompressed length doesn't match recorded length");
    var i = new DataView(n.buffer, 0);
    return { data: i, offset: 0 };
  } else
    return { data: e, offset: t.offset };
}
__name(Ve, "Ve");
function Ev(e, t) {
  t = t ?? {};
  var r, n = new ot({ empty: true }), i = new DataView(e, 0), a, o = [], u = se.getTag(i, 0);
  if (u === String.fromCharCode(0, 1, 0, 0) || u === "true" || u === "typ1")
    n.outlinesFormat = "truetype", a = se.getUShort(i, 4), o = Bs(i, a);
  else if (u === "OTTO")
    n.outlinesFormat = "cff", a = se.getUShort(i, 4), o = Bs(i, a);
  else if (u === "wOFF") {
    var s = se.getTag(i, 4);
    if (s === String.fromCharCode(0, 1, 0, 0))
      n.outlinesFormat = "truetype";
    else if (s === "OTTO")
      n.outlinesFormat = "cff";
    else
      throw new Error("Unsupported OpenType flavor " + u);
    a = se.getUShort(i, 12), o = wv(i, a);
  } else
    throw new Error("Unsupported OpenType signature " + u);
  for (var l, f, c, p, v, D, d, g, y, b, S, k = 0; k < a; k += 1) {
    var C = o[k], E = void 0;
    switch (C.tag) {
      case "cmap":
        E = Ve(i, C), n.tables.cmap = x0.parse(E.data, E.offset), n.encoding = new Hs(n.tables.cmap);
        break;
      case "cvt ":
        E = Ve(i, C), S = new se.Parser(E.data, E.offset), n.tables.cvt = S.parseShortList(C.length / 2);
        break;
      case "fvar":
        f = C;
        break;
      case "fpgm":
        E = Ve(i, C), S = new se.Parser(E.data, E.offset), n.tables.fpgm = S.parseByteList(C.length);
        break;
      case "head":
        E = Ve(i, C), n.tables.head = J0.parse(E.data, E.offset), n.unitsPerEm = n.tables.head.unitsPerEm, r = n.tables.head.indexToLocFormat;
        break;
      case "hhea":
        E = Ve(i, C), n.tables.hhea = ev.parse(E.data, E.offset), n.ascender = n.tables.hhea.ascender, n.descender = n.tables.hhea.descender, n.numberOfHMetrics = n.tables.hhea.numberOfHMetrics;
        break;
      case "hmtx":
        d = C;
        break;
      case "ltag":
        E = Ve(i, C), ltagTable = fv.parse(E.data, E.offset);
        break;
      case "maxp":
        E = Ve(i, C), n.tables.maxp = dv.parse(E.data, E.offset), n.numGlyphs = n.tables.maxp.numGlyphs;
        break;
      case "OS/2":
        E = Ve(i, C), n.tables.os2 = gv.parse(E.data, E.offset);
        break;
      case "post":
        E = Ve(i, C), n.tables.post = Dv.parse(E.data, E.offset);
        break;
      case "prep":
        E = Ve(i, C), S = new se.Parser(E.data, E.offset), n.tables.prep = S.parseByteList(C.length);
        break;
      case "glyf":
        c = C;
        break;
      case "loca":
        y = C;
        break;
      case "CFF ":
        l = C;
        break;
      case "kern":
        g = C;
        break;
      case "GDEF":
        p = C;
        break;
      case "GPOS":
        v = C;
        break;
      case "GSUB":
        D = C;
        break;
      case "meta":
        b = C;
        break;
    }
  }
  if (c && y) {
    var L = r === 0, _ = Ve(i, y), U = pv.parse(_.data, _.offset, n.numGlyphs, L), N = Ve(i, c);
    n.glyphs = Js.parse(N.data, N.offset, U, n, t);
  } else if (l) {
    var X = Ve(i, l);
    R0.parse(X.data, X.offset, n, t);
  } else
    throw new Error("Font doesn't contain TrueType or CFF outlines.");
  var Y = Ve(i, d);
  if (iv.parse(n, Y.data, Y.offset, n.numberOfHMetrics, n.numGlyphs, n.glyphs, t), Zp(n, t), g) {
    var ee = Ve(i, g);
    n.kerningPairs = uv.parse(ee.data, ee.offset);
  } else
    n.kerningPairs = {};
  if (p) {
    var A = Ve(i, p);
    n.tables.gdef = H0.parse(A.data, A.offset);
  }
  if (v) {
    var R = Ve(i, v);
    n.tables.gpos = q0.parse(R.data, R.offset), n.position.init();
  }
  if (D) {
    var O = Ve(i, D);
    n.tables.gsub = Z0.parse(O.data, O.offset);
  }
  if (f) {
    var H = Ve(i, f);
    n.tables.fvar = M0.parse(H.data, H.offset, n.names);
  }
  if (b) {
    var Z = Ve(i, b);
    n.tables.meta = xv.parse(Z.data, Z.offset), n.metas = n.tables.meta;
  }
  return n;
}
__name(Ev, "Ev");
function Fv() {
}
__name(Fv, "Fv");
function Cv() {
}
__name(Cv, "Cv");
var Sv = Object.freeze({ __proto__: null, Font: ot, Glyph: Kt, Path: at, _parse: se, parse: Ev, load: Fv, loadSync: Cv });
var Ln = Sv;
var kv = Object.create;
var Zn = Object.defineProperty;
var _v = Object.getOwnPropertyDescriptor;
var Tv = Object.getOwnPropertyNames;
var Av = Object.getPrototypeOf;
var Ov = Object.prototype.hasOwnProperty;
var Aa = /* @__PURE__ */ __name((e, t) => () => (e && (t = e(e = 0)), t), "Aa");
var le = /* @__PURE__ */ __name((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "le");
var Oa = /* @__PURE__ */ __name((e, t) => {
  for (var r in t)
    Zn(e, r, { get: t[r], enumerable: true });
}, "Oa");
var Bu = /* @__PURE__ */ __name((e, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let i of Tv(t))
      !Ov.call(e, i) && i !== r && Zn(e, i, { get: () => t[i], enumerable: !(n = _v(t, i)) || n.enumerable });
  return e;
}, "Bu");
var Lv = /* @__PURE__ */ __name((e, t, r) => (r = e != null ? kv(Av(e)) : {}, Bu(t || !e || !e.__esModule ? Zn(r, "default", { value: e, enumerable: true }) : r, e)), "Lv");
var Xn = /* @__PURE__ */ __name((e) => Bu(Zn({}, "__esModule", { value: true }), e), "Xn");
var Nu = {};
Oa(Nu, { getYogaModule: () => Pv });
async function Pv() {
  return {};
}
__name(Pv, "Pv");
var Iv = Aa(() => {
});
var Mu = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "default", { enumerable: true, get: () => t });
  function t(r) {
    if (r = `${r}`, r === "0")
      return "0";
    if (/^[+-]?(\d+|\d*\.\d+)(e[+-]?\d+)?(%|\w+)?$/.test(r))
      return r.replace(/^[+-]?/, (n) => n === "-" ? "" : "-");
    if (r.includes("var(") || r.includes("calc("))
      return `calc(${r} * -1)`;
  }
  __name(t, "t");
});
var Rv = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "default", { enumerable: true, get: () => t });
  var t = ["preflight", "container", "accessibility", "pointerEvents", "visibility", "position", "inset", "isolation", "zIndex", "order", "gridColumn", "gridColumnStart", "gridColumnEnd", "gridRow", "gridRowStart", "gridRowEnd", "float", "clear", "margin", "boxSizing", "display", "aspectRatio", "height", "maxHeight", "minHeight", "width", "minWidth", "maxWidth", "flex", "flexShrink", "flexGrow", "flexBasis", "tableLayout", "borderCollapse", "borderSpacing", "transformOrigin", "translate", "rotate", "skew", "scale", "transform", "animation", "cursor", "touchAction", "userSelect", "resize", "scrollSnapType", "scrollSnapAlign", "scrollSnapStop", "scrollMargin", "scrollPadding", "listStylePosition", "listStyleType", "appearance", "columns", "breakBefore", "breakInside", "breakAfter", "gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateColumns", "gridTemplateRows", "flexDirection", "flexWrap", "placeContent", "placeItems", "alignContent", "alignItems", "justifyContent", "justifyItems", "gap", "space", "divideWidth", "divideStyle", "divideColor", "divideOpacity", "placeSelf", "alignSelf", "justifySelf", "overflow", "overscrollBehavior", "scrollBehavior", "textOverflow", "whitespace", "wordBreak", "borderRadius", "borderWidth", "borderStyle", "borderColor", "borderOpacity", "backgroundColor", "backgroundOpacity", "backgroundImage", "gradientColorStops", "boxDecorationBreak", "backgroundSize", "backgroundAttachment", "backgroundClip", "backgroundPosition", "backgroundRepeat", "backgroundOrigin", "fill", "stroke", "strokeWidth", "objectFit", "objectPosition", "padding", "textAlign", "textIndent", "verticalAlign", "fontFamily", "fontSize", "fontWeight", "textTransform", "fontStyle", "fontVariantNumeric", "lineHeight", "letterSpacing", "textColor", "textOpacity", "textDecoration", "textDecorationColor", "textDecorationStyle", "textDecorationThickness", "textUnderlineOffset", "fontSmoothing", "placeholderColor", "placeholderOpacity", "caretColor", "accentColor", "opacity", "backgroundBlendMode", "mixBlendMode", "boxShadow", "boxShadowColor", "outlineStyle", "outlineWidth", "outlineOffset", "outlineColor", "ringWidth", "ringColor", "ringOpacity", "ringOffsetWidth", "ringOffsetColor", "blur", "brightness", "contrast", "dropShadow", "grayscale", "hueRotate", "invert", "saturate", "sepia", "filter", "backdropBlur", "backdropBrightness", "backdropContrast", "backdropGrayscale", "backdropHueRotate", "backdropInvert", "backdropOpacity", "backdropSaturate", "backdropSepia", "backdropFilter", "transitionProperty", "transitionDelay", "transitionDuration", "transitionTimingFunction", "willChange", "content"];
});
var Uv = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "default", { enumerable: true, get: () => t });
  function t(r, n) {
    return r === void 0 ? n : Array.isArray(r) ? r : [...new Set(n.filter((i) => r !== false && r[i] !== false).concat(Object.keys(r).filter((i) => r[i] !== false)))];
  }
  __name(t, "t");
});
var Gu = le((e, t) => {
  t.exports = { content: [], presets: [], darkMode: "media", theme: { screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px" }, colors: ({ colors: r }) => ({ inherit: r.inherit, current: r.current, transparent: r.transparent, black: r.black, white: r.white, slate: r.slate, gray: r.gray, zinc: r.zinc, neutral: r.neutral, stone: r.stone, red: r.red, orange: r.orange, amber: r.amber, yellow: r.yellow, lime: r.lime, green: r.green, emerald: r.emerald, teal: r.teal, cyan: r.cyan, sky: r.sky, blue: r.blue, indigo: r.indigo, violet: r.violet, purple: r.purple, fuchsia: r.fuchsia, pink: r.pink, rose: r.rose }), columns: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", "3xs": "16rem", "2xs": "18rem", xs: "20rem", sm: "24rem", md: "28rem", lg: "32rem", xl: "36rem", "2xl": "42rem", "3xl": "48rem", "4xl": "56rem", "5xl": "64rem", "6xl": "72rem", "7xl": "80rem" }, spacing: { px: "1px", 0: "0px", 0.5: "0.125rem", 1: "0.25rem", 1.5: "0.375rem", 2: "0.5rem", 2.5: "0.625rem", 3: "0.75rem", 3.5: "0.875rem", 4: "1rem", 5: "1.25rem", 6: "1.5rem", 7: "1.75rem", 8: "2rem", 9: "2.25rem", 10: "2.5rem", 11: "2.75rem", 12: "3rem", 14: "3.5rem", 16: "4rem", 20: "5rem", 24: "6rem", 28: "7rem", 32: "8rem", 36: "9rem", 40: "10rem", 44: "11rem", 48: "12rem", 52: "13rem", 56: "14rem", 60: "15rem", 64: "16rem", 72: "18rem", 80: "20rem", 96: "24rem" }, animation: { none: "none", spin: "spin 1s linear infinite", ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite", pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite", bounce: "bounce 1s infinite" }, aspectRatio: { auto: "auto", square: "1 / 1", video: "16 / 9" }, backdropBlur: ({ theme: r }) => r("blur"), backdropBrightness: ({ theme: r }) => r("brightness"), backdropContrast: ({ theme: r }) => r("contrast"), backdropGrayscale: ({ theme: r }) => r("grayscale"), backdropHueRotate: ({ theme: r }) => r("hueRotate"), backdropInvert: ({ theme: r }) => r("invert"), backdropOpacity: ({ theme: r }) => r("opacity"), backdropSaturate: ({ theme: r }) => r("saturate"), backdropSepia: ({ theme: r }) => r("sepia"), backgroundColor: ({ theme: r }) => r("colors"), backgroundImage: { none: "none", "gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))", "gradient-to-tr": "linear-gradient(to top right, var(--tw-gradient-stops))", "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))", "gradient-to-br": "linear-gradient(to bottom right, var(--tw-gradient-stops))", "gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))", "gradient-to-bl": "linear-gradient(to bottom left, var(--tw-gradient-stops))", "gradient-to-l": "linear-gradient(to left, var(--tw-gradient-stops))", "gradient-to-tl": "linear-gradient(to top left, var(--tw-gradient-stops))" }, backgroundOpacity: ({ theme: r }) => r("opacity"), backgroundPosition: { bottom: "bottom", center: "center", left: "left", "left-bottom": "left bottom", "left-top": "left top", right: "right", "right-bottom": "right bottom", "right-top": "right top", top: "top" }, backgroundSize: { auto: "auto", cover: "cover", contain: "contain" }, blur: { 0: "0", none: "0", sm: "4px", DEFAULT: "8px", md: "12px", lg: "16px", xl: "24px", "2xl": "40px", "3xl": "64px" }, brightness: { 0: "0", 50: ".5", 75: ".75", 90: ".9", 95: ".95", 100: "1", 105: "1.05", 110: "1.1", 125: "1.25", 150: "1.5", 200: "2" }, borderColor: ({ theme: r }) => ({ ...r("colors"), DEFAULT: r("colors.gray.200", "currentColor") }), borderOpacity: ({ theme: r }) => r("opacity"), borderRadius: { none: "0px", sm: "0.125rem", DEFAULT: "0.25rem", md: "0.375rem", lg: "0.5rem", xl: "0.75rem", "2xl": "1rem", "3xl": "1.5rem", full: "9999px" }, borderSpacing: ({ theme: r }) => ({ ...r("spacing") }), borderWidth: { DEFAULT: "1px", 0: "0px", 2: "2px", 4: "4px", 8: "8px" }, boxShadow: { sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)", DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)", md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)", xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)", "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)", inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)", none: "none" }, boxShadowColor: ({ theme: r }) => r("colors"), caretColor: ({ theme: r }) => r("colors"), accentColor: ({ theme: r }) => ({ ...r("colors"), auto: "auto" }), contrast: { 0: "0", 50: ".5", 75: ".75", 100: "1", 125: "1.25", 150: "1.5", 200: "2" }, container: {}, content: { none: "none" }, cursor: { auto: "auto", default: "default", pointer: "pointer", wait: "wait", text: "text", move: "move", help: "help", "not-allowed": "not-allowed", none: "none", "context-menu": "context-menu", progress: "progress", cell: "cell", crosshair: "crosshair", "vertical-text": "vertical-text", alias: "alias", copy: "copy", "no-drop": "no-drop", grab: "grab", grabbing: "grabbing", "all-scroll": "all-scroll", "col-resize": "col-resize", "row-resize": "row-resize", "n-resize": "n-resize", "e-resize": "e-resize", "s-resize": "s-resize", "w-resize": "w-resize", "ne-resize": "ne-resize", "nw-resize": "nw-resize", "se-resize": "se-resize", "sw-resize": "sw-resize", "ew-resize": "ew-resize", "ns-resize": "ns-resize", "nesw-resize": "nesw-resize", "nwse-resize": "nwse-resize", "zoom-in": "zoom-in", "zoom-out": "zoom-out" }, divideColor: ({ theme: r }) => r("borderColor"), divideOpacity: ({ theme: r }) => r("borderOpacity"), divideWidth: ({ theme: r }) => r("borderWidth"), dropShadow: { sm: "0 1px 1px rgb(0 0 0 / 0.05)", DEFAULT: ["0 1px 2px rgb(0 0 0 / 0.1)", "0 1px 1px rgb(0 0 0 / 0.06)"], md: ["0 4px 3px rgb(0 0 0 / 0.07)", "0 2px 2px rgb(0 0 0 / 0.06)"], lg: ["0 10px 8px rgb(0 0 0 / 0.04)", "0 4px 3px rgb(0 0 0 / 0.1)"], xl: ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.08)"], "2xl": "0 25px 25px rgb(0 0 0 / 0.15)", none: "0 0 #0000" }, fill: ({ theme: r }) => r("colors"), grayscale: { 0: "0", DEFAULT: "100%" }, hueRotate: { 0: "0deg", 15: "15deg", 30: "30deg", 60: "60deg", 90: "90deg", 180: "180deg" }, invert: { 0: "0", DEFAULT: "100%" }, flex: { 1: "1 1 0%", auto: "1 1 auto", initial: "0 1 auto", none: "none" }, flexBasis: ({ theme: r }) => ({ auto: "auto", ...r("spacing"), "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", "1/5": "20%", "2/5": "40%", "3/5": "60%", "4/5": "80%", "1/6": "16.666667%", "2/6": "33.333333%", "3/6": "50%", "4/6": "66.666667%", "5/6": "83.333333%", "1/12": "8.333333%", "2/12": "16.666667%", "3/12": "25%", "4/12": "33.333333%", "5/12": "41.666667%", "6/12": "50%", "7/12": "58.333333%", "8/12": "66.666667%", "9/12": "75%", "10/12": "83.333333%", "11/12": "91.666667%", full: "100%" }), flexGrow: { 0: "0", DEFAULT: "1" }, flexShrink: { 0: "0", DEFAULT: "1" }, fontFamily: { sans: ["ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial", '"Noto Sans"', "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'], serif: ["ui-serif", "Georgia", "Cambria", '"Times New Roman"', "Times", "serif"], mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", '"Liberation Mono"', '"Courier New"', "monospace"] }, fontSize: { xs: ["0.75rem", { lineHeight: "1rem" }], sm: ["0.875rem", { lineHeight: "1.25rem" }], base: ["1rem", { lineHeight: "1.5rem" }], lg: ["1.125rem", { lineHeight: "1.75rem" }], xl: ["1.25rem", { lineHeight: "1.75rem" }], "2xl": ["1.5rem", { lineHeight: "2rem" }], "3xl": ["1.875rem", { lineHeight: "2.25rem" }], "4xl": ["2.25rem", { lineHeight: "2.5rem" }], "5xl": ["3rem", { lineHeight: "1" }], "6xl": ["3.75rem", { lineHeight: "1" }], "7xl": ["4.5rem", { lineHeight: "1" }], "8xl": ["6rem", { lineHeight: "1" }], "9xl": ["8rem", { lineHeight: "1" }] }, fontWeight: { thin: "100", extralight: "200", light: "300", normal: "400", medium: "500", semibold: "600", bold: "700", extrabold: "800", black: "900" }, gap: ({ theme: r }) => r("spacing"), gradientColorStops: ({ theme: r }) => r("colors"), gridAutoColumns: { auto: "auto", min: "min-content", max: "max-content", fr: "minmax(0, 1fr)" }, gridAutoRows: { auto: "auto", min: "min-content", max: "max-content", fr: "minmax(0, 1fr)" }, gridColumn: { auto: "auto", "span-1": "span 1 / span 1", "span-2": "span 2 / span 2", "span-3": "span 3 / span 3", "span-4": "span 4 / span 4", "span-5": "span 5 / span 5", "span-6": "span 6 / span 6", "span-7": "span 7 / span 7", "span-8": "span 8 / span 8", "span-9": "span 9 / span 9", "span-10": "span 10 / span 10", "span-11": "span 11 / span 11", "span-12": "span 12 / span 12", "span-full": "1 / -1" }, gridColumnEnd: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", 13: "13" }, gridColumnStart: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", 13: "13" }, gridRow: { auto: "auto", "span-1": "span 1 / span 1", "span-2": "span 2 / span 2", "span-3": "span 3 / span 3", "span-4": "span 4 / span 4", "span-5": "span 5 / span 5", "span-6": "span 6 / span 6", "span-full": "1 / -1" }, gridRowStart: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7" }, gridRowEnd: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7" }, gridTemplateColumns: { none: "none", 1: "repeat(1, minmax(0, 1fr))", 2: "repeat(2, minmax(0, 1fr))", 3: "repeat(3, minmax(0, 1fr))", 4: "repeat(4, minmax(0, 1fr))", 5: "repeat(5, minmax(0, 1fr))", 6: "repeat(6, minmax(0, 1fr))", 7: "repeat(7, minmax(0, 1fr))", 8: "repeat(8, minmax(0, 1fr))", 9: "repeat(9, minmax(0, 1fr))", 10: "repeat(10, minmax(0, 1fr))", 11: "repeat(11, minmax(0, 1fr))", 12: "repeat(12, minmax(0, 1fr))" }, gridTemplateRows: { none: "none", 1: "repeat(1, minmax(0, 1fr))", 2: "repeat(2, minmax(0, 1fr))", 3: "repeat(3, minmax(0, 1fr))", 4: "repeat(4, minmax(0, 1fr))", 5: "repeat(5, minmax(0, 1fr))", 6: "repeat(6, minmax(0, 1fr))" }, height: ({ theme: r }) => ({ auto: "auto", ...r("spacing"), "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", "1/5": "20%", "2/5": "40%", "3/5": "60%", "4/5": "80%", "1/6": "16.666667%", "2/6": "33.333333%", "3/6": "50%", "4/6": "66.666667%", "5/6": "83.333333%", full: "100%", screen: "100vh", min: "min-content", max: "max-content", fit: "fit-content" }), inset: ({ theme: r }) => ({ auto: "auto", ...r("spacing"), "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", full: "100%" }), keyframes: { spin: { to: { transform: "rotate(360deg)" } }, ping: { "75%, 100%": { transform: "scale(2)", opacity: "0" } }, pulse: { "50%": { opacity: ".5" } }, bounce: { "0%, 100%": { transform: "translateY(-25%)", animationTimingFunction: "cubic-bezier(0.8,0,1,1)" }, "50%": { transform: "none", animationTimingFunction: "cubic-bezier(0,0,0.2,1)" } } }, letterSpacing: { tighter: "-0.05em", tight: "-0.025em", normal: "0em", wide: "0.025em", wider: "0.05em", widest: "0.1em" }, lineHeight: { none: "1", tight: "1.25", snug: "1.375", normal: "1.5", relaxed: "1.625", loose: "2", 3: ".75rem", 4: "1rem", 5: "1.25rem", 6: "1.5rem", 7: "1.75rem", 8: "2rem", 9: "2.25rem", 10: "2.5rem" }, listStyleType: { none: "none", disc: "disc", decimal: "decimal" }, margin: ({ theme: r }) => ({ auto: "auto", ...r("spacing") }), maxHeight: ({ theme: r }) => ({ ...r("spacing"), full: "100%", screen: "100vh", min: "min-content", max: "max-content", fit: "fit-content" }), maxWidth: ({ theme: r, breakpoints: n }) => ({ none: "none", 0: "0rem", xs: "20rem", sm: "24rem", md: "28rem", lg: "32rem", xl: "36rem", "2xl": "42rem", "3xl": "48rem", "4xl": "56rem", "5xl": "64rem", "6xl": "72rem", "7xl": "80rem", full: "100%", min: "min-content", max: "max-content", fit: "fit-content", prose: "65ch", ...n(r("screens")) }), minHeight: { 0: "0px", full: "100%", screen: "100vh", min: "min-content", max: "max-content", fit: "fit-content" }, minWidth: { 0: "0px", full: "100%", min: "min-content", max: "max-content", fit: "fit-content" }, objectPosition: { bottom: "bottom", center: "center", left: "left", "left-bottom": "left bottom", "left-top": "left top", right: "right", "right-bottom": "right bottom", "right-top": "right top", top: "top" }, opacity: { 0: "0", 5: "0.05", 10: "0.1", 20: "0.2", 25: "0.25", 30: "0.3", 40: "0.4", 50: "0.5", 60: "0.6", 70: "0.7", 75: "0.75", 80: "0.8", 90: "0.9", 95: "0.95", 100: "1" }, order: { first: "-9999", last: "9999", none: "0", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12" }, padding: ({ theme: r }) => r("spacing"), placeholderColor: ({ theme: r }) => r("colors"), placeholderOpacity: ({ theme: r }) => r("opacity"), outlineColor: ({ theme: r }) => r("colors"), outlineOffset: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" }, outlineWidth: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" }, ringColor: ({ theme: r }) => ({ DEFAULT: r("colors.blue.500", "#3b82f6"), ...r("colors") }), ringOffsetColor: ({ theme: r }) => r("colors"), ringOffsetWidth: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" }, ringOpacity: ({ theme: r }) => ({ DEFAULT: "0.5", ...r("opacity") }), ringWidth: { DEFAULT: "3px", 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" }, rotate: { 0: "0deg", 1: "1deg", 2: "2deg", 3: "3deg", 6: "6deg", 12: "12deg", 45: "45deg", 90: "90deg", 180: "180deg" }, saturate: { 0: "0", 50: ".5", 100: "1", 150: "1.5", 200: "2" }, scale: { 0: "0", 50: ".5", 75: ".75", 90: ".9", 95: ".95", 100: "1", 105: "1.05", 110: "1.1", 125: "1.25", 150: "1.5" }, scrollMargin: ({ theme: r }) => ({ ...r("spacing") }), scrollPadding: ({ theme: r }) => r("spacing"), sepia: { 0: "0", DEFAULT: "100%" }, skew: { 0: "0deg", 1: "1deg", 2: "2deg", 3: "3deg", 6: "6deg", 12: "12deg" }, space: ({ theme: r }) => ({ ...r("spacing") }), stroke: ({ theme: r }) => r("colors"), strokeWidth: { 0: "0", 1: "1", 2: "2" }, textColor: ({ theme: r }) => r("colors"), textDecorationColor: ({ theme: r }) => r("colors"), textDecorationThickness: { auto: "auto", "from-font": "from-font", 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" }, textUnderlineOffset: { auto: "auto", 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" }, textIndent: ({ theme: r }) => ({ ...r("spacing") }), textOpacity: ({ theme: r }) => r("opacity"), transformOrigin: { center: "center", top: "top", "top-right": "top right", right: "right", "bottom-right": "bottom right", bottom: "bottom", "bottom-left": "bottom left", left: "left", "top-left": "top left" }, transitionDelay: { 75: "75ms", 100: "100ms", 150: "150ms", 200: "200ms", 300: "300ms", 500: "500ms", 700: "700ms", 1e3: "1000ms" }, transitionDuration: { DEFAULT: "150ms", 75: "75ms", 100: "100ms", 150: "150ms", 200: "200ms", 300: "300ms", 500: "500ms", 700: "700ms", 1e3: "1000ms" }, transitionProperty: { none: "none", all: "all", DEFAULT: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter", colors: "color, background-color, border-color, text-decoration-color, fill, stroke", opacity: "opacity", shadow: "box-shadow", transform: "transform" }, transitionTimingFunction: { DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)", linear: "linear", in: "cubic-bezier(0.4, 0, 1, 1)", out: "cubic-bezier(0, 0, 0.2, 1)", "in-out": "cubic-bezier(0.4, 0, 0.2, 1)" }, translate: ({ theme: r }) => ({ ...r("spacing"), "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", full: "100%" }), width: ({ theme: r }) => ({ auto: "auto", ...r("spacing"), "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", "1/5": "20%", "2/5": "40%", "3/5": "60%", "4/5": "80%", "1/6": "16.666667%", "2/6": "33.333333%", "3/6": "50%", "4/6": "66.666667%", "5/6": "83.333333%", "1/12": "8.333333%", "2/12": "16.666667%", "3/12": "25%", "4/12": "33.333333%", "5/12": "41.666667%", "6/12": "50%", "7/12": "58.333333%", "8/12": "66.666667%", "9/12": "75%", "10/12": "83.333333%", "11/12": "91.666667%", full: "100%", screen: "100vw", min: "min-content", max: "max-content", fit: "fit-content" }), willChange: { auto: "auto", scroll: "scroll-position", contents: "contents", transform: "transform" }, zIndex: { auto: "auto", 0: "0", 10: "10", 20: "20", 30: "30", 40: "40", 50: "50" } }, variantOrder: ["first", "last", "odd", "even", "visited", "checked", "empty", "read-only", "group-hover", "group-focus", "focus-within", "hover", "focus", "focus-visible", "active", "disabled"], plugins: [] };
});
var Qn = {};
Oa(Qn, { default: () => Wu });
var Wu;
var La = Aa(() => {
  Wu = { info(e, t) {
    console.info(...Array.isArray(e) ? [e] : [t, e]);
  }, warn(e, t) {
    console.warn(...Array.isArray(e) ? [e] : [t, e]);
  }, risk(e, t) {
    console.error(...Array.isArray(e) ? [e] : [t, e]);
  } };
});
var Bv = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "default", { enumerable: true, get: () => i });
  var t = r((La(), Xn(Qn)));
  function r(a) {
    return a && a.__esModule ? a : { default: a };
  }
  __name(r, "r");
  function n({ version: a, from: o, to: u }) {
    t.default.warn(`${o}-color-renamed`, [`As of Tailwind CSS ${a}, \`${o}\` has been renamed to \`${u}\`.`, "Update your configuration file to silence this warning."]);
  }
  __name(n, "n");
  var i = { inherit: "inherit", current: "currentColor", transparent: "transparent", black: "#000", white: "#fff", slate: { 50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1", 400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155", 800: "#1e293b", 900: "#0f172a" }, gray: { 50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db", 400: "#9ca3af", 500: "#6b7280", 600: "#4b5563", 700: "#374151", 800: "#1f2937", 900: "#111827" }, zinc: { 50: "#fafafa", 100: "#f4f4f5", 200: "#e4e4e7", 300: "#d4d4d8", 400: "#a1a1aa", 500: "#71717a", 600: "#52525b", 700: "#3f3f46", 800: "#27272a", 900: "#18181b" }, neutral: { 50: "#fafafa", 100: "#f5f5f5", 200: "#e5e5e5", 300: "#d4d4d4", 400: "#a3a3a3", 500: "#737373", 600: "#525252", 700: "#404040", 800: "#262626", 900: "#171717" }, stone: { 50: "#fafaf9", 100: "#f5f5f4", 200: "#e7e5e4", 300: "#d6d3d1", 400: "#a8a29e", 500: "#78716c", 600: "#57534e", 700: "#44403c", 800: "#292524", 900: "#1c1917" }, red: { 50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d" }, orange: { 50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74", 400: "#fb923c", 500: "#f97316", 600: "#ea580c", 700: "#c2410c", 800: "#9a3412", 900: "#7c2d12" }, amber: { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309", 800: "#92400e", 900: "#78350f" }, yellow: { 50: "#fefce8", 100: "#fef9c3", 200: "#fef08a", 300: "#fde047", 400: "#facc15", 500: "#eab308", 600: "#ca8a04", 700: "#a16207", 800: "#854d0e", 900: "#713f12" }, lime: { 50: "#f7fee7", 100: "#ecfccb", 200: "#d9f99d", 300: "#bef264", 400: "#a3e635", 500: "#84cc16", 600: "#65a30d", 700: "#4d7c0f", 800: "#3f6212", 900: "#365314" }, green: { 50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d" }, emerald: { 50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 300: "#6ee7b7", 400: "#34d399", 500: "#10b981", 600: "#059669", 700: "#047857", 800: "#065f46", 900: "#064e3b" }, teal: { 50: "#f0fdfa", 100: "#ccfbf1", 200: "#99f6e4", 300: "#5eead4", 400: "#2dd4bf", 500: "#14b8a6", 600: "#0d9488", 700: "#0f766e", 800: "#115e59", 900: "#134e4a" }, cyan: { 50: "#ecfeff", 100: "#cffafe", 200: "#a5f3fc", 300: "#67e8f9", 400: "#22d3ee", 500: "#06b6d4", 600: "#0891b2", 700: "#0e7490", 800: "#155e75", 900: "#164e63" }, sky: { 50: "#f0f9ff", 100: "#e0f2fe", 200: "#bae6fd", 300: "#7dd3fc", 400: "#38bdf8", 500: "#0ea5e9", 600: "#0284c7", 700: "#0369a1", 800: "#075985", 900: "#0c4a6e" }, blue: { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a" }, indigo: { 50: "#eef2ff", 100: "#e0e7ff", 200: "#c7d2fe", 300: "#a5b4fc", 400: "#818cf8", 500: "#6366f1", 600: "#4f46e5", 700: "#4338ca", 800: "#3730a3", 900: "#312e81" }, violet: { 50: "#f5f3ff", 100: "#ede9fe", 200: "#ddd6fe", 300: "#c4b5fd", 400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed", 700: "#6d28d9", 800: "#5b21b6", 900: "#4c1d95" }, purple: { 50: "#faf5ff", 100: "#f3e8ff", 200: "#e9d5ff", 300: "#d8b4fe", 400: "#c084fc", 500: "#a855f7", 600: "#9333ea", 700: "#7e22ce", 800: "#6b21a8", 900: "#581c87" }, fuchsia: { 50: "#fdf4ff", 100: "#fae8ff", 200: "#f5d0fe", 300: "#f0abfc", 400: "#e879f9", 500: "#d946ef", 600: "#c026d3", 700: "#a21caf", 800: "#86198f", 900: "#701a75" }, pink: { 50: "#fdf2f8", 100: "#fce7f3", 200: "#fbcfe8", 300: "#f9a8d4", 400: "#f472b6", 500: "#ec4899", 600: "#db2777", 700: "#be185d", 800: "#9d174d", 900: "#831843" }, rose: { 50: "#fff1f2", 100: "#ffe4e6", 200: "#fecdd3", 300: "#fda4af", 400: "#fb7185", 500: "#f43f5e", 600: "#e11d48", 700: "#be123c", 800: "#9f1239", 900: "#881337" }, get lightBlue() {
    return n({ version: "v2.2", from: "lightBlue", to: "sky" }), this.sky;
  }, get warmGray() {
    return n({ version: "v3.0", from: "warmGray", to: "stone" }), this.stone;
  }, get trueGray() {
    return n({ version: "v3.0", from: "trueGray", to: "neutral" }), this.neutral;
  }, get coolGray() {
    return n({ version: "v3.0", from: "coolGray", to: "gray" }), this.gray;
  }, get blueGray() {
    return n({ version: "v3.0", from: "blueGray", to: "slate" }), this.slate;
  } };
});
var Nv = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "defaults", { enumerable: true, get: () => t });
  function t(r, ...n) {
    for (let o of n) {
      for (let u in o) {
        var i;
        !(r == null || (i = r.hasOwnProperty) === null || i === void 0) && i.call(r, u) || (r[u] = o[u]);
      }
      for (let u of Object.getOwnPropertySymbols(o)) {
        var a;
        !(r == null || (a = r.hasOwnProperty) === null || a === void 0) && a.call(r, u) || (r[u] = o[u]);
      }
    }
    return r;
  }
  __name(t, "t");
});
var Mv = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "toPath", { enumerable: true, get: () => t });
  function t(r) {
    if (Array.isArray(r))
      return r;
    let n = r.split("[").length - 1, i = r.split("]").length - 1;
    if (n !== i)
      throw new Error(`Path is invalid. Has unbalanced brackets: ${r}`);
    return r.split(/\.(?![^\[]*\])|[\[\]]/g).filter(Boolean);
  }
  __name(t, "t");
});
var Gv = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "normalizeConfig", { enumerable: true, get: () => i });
  var t = n((La(), Xn(Qn)));
  function r(a) {
    if (typeof WeakMap != "function")
      return null;
    var o = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap();
    return (r = /* @__PURE__ */ __name(function(s) {
      return s ? u : o;
    }, "r"))(a);
  }
  __name(r, "r");
  function n(a, o) {
    if (!o && a && a.__esModule)
      return a;
    if (a === null || typeof a != "object" && typeof a != "function")
      return { default: a };
    var u = r(o);
    if (u && u.has(a))
      return u.get(a);
    var s = {}, l = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var f in a)
      if (f !== "default" && Object.prototype.hasOwnProperty.call(a, f)) {
        var c = l ? Object.getOwnPropertyDescriptor(a, f) : null;
        c && (c.get || c.set) ? Object.defineProperty(s, f, c) : s[f] = a[f];
      }
    return s.default = a, u && u.set(a, s), s;
  }
  __name(n, "n");
  function i(a) {
    if ((() => {
      if (a.purge || !a.content || !Array.isArray(a.content) && !(typeof a.content == "object" && a.content !== null))
        return false;
      if (Array.isArray(a.content))
        return a.content.every((u) => typeof u == "string" ? true : !(typeof u?.raw != "string" || u != null && u.extension && typeof u?.extension != "string"));
      if (typeof a.content == "object" && a.content !== null) {
        if (Object.keys(a.content).some((u) => !["files", "extract", "transform"].includes(u)))
          return false;
        if (Array.isArray(a.content.files)) {
          if (!a.content.files.every((u) => typeof u == "string" ? true : !(typeof u?.raw != "string" || u != null && u.extension && typeof u?.extension != "string")))
            return false;
          if (typeof a.content.extract == "object") {
            for (let u of Object.values(a.content.extract))
              if (typeof u != "function")
                return false;
          } else if (!(a.content.extract === void 0 || typeof a.content.extract == "function"))
            return false;
          if (typeof a.content.transform == "object") {
            for (let u of Object.values(a.content.transform))
              if (typeof u != "function")
                return false;
          } else if (!(a.content.transform === void 0 || typeof a.content.transform == "function"))
            return false;
        }
        return true;
      }
      return false;
    })() || t.default.warn("purge-deprecation", ["The `purge`/`content` options have changed in Tailwind CSS v3.0.", "Update your configuration file to eliminate this warning.", "https://tailwindcss.com/docs/upgrade-guide#configure-content-sources"]), a.safelist = (() => {
      var u;
      let { content: s, purge: l, safelist: f } = a;
      return Array.isArray(f) ? f : Array.isArray(s?.safelist) ? s.safelist : Array.isArray(l?.safelist) ? l.safelist : Array.isArray(l == null || (u = l.options) === null || u === void 0 ? void 0 : u.safelist) ? l.options.safelist : [];
    })(), typeof a.prefix == "function")
      t.default.warn("prefix-function", ["As of Tailwind CSS v3.0, `prefix` cannot be a function.", "Update `prefix` in your configuration to be a string to eliminate this warning.", "https://tailwindcss.com/docs/upgrade-guide#prefix-cannot-be-a-function"]), a.prefix = "";
    else {
      var o;
      a.prefix = (o = a.prefix) !== null && o !== void 0 ? o : "";
    }
    a.content = { files: (() => {
      let { content: u, purge: s } = a;
      return Array.isArray(s) ? s : Array.isArray(s?.content) ? s.content : Array.isArray(u) ? u : Array.isArray(u?.content) ? u.content : Array.isArray(u?.files) ? u.files : [];
    })(), extract: (() => {
      let u = (() => {
        var f, c, p, v, D, d, g, y, b, S;
        return !((f = a.purge) === null || f === void 0) && f.extract ? a.purge.extract : !((c = a.content) === null || c === void 0) && c.extract ? a.content.extract : !((p = a.purge) === null || p === void 0 || (v = p.extract) === null || v === void 0) && v.DEFAULT ? a.purge.extract.DEFAULT : !((D = a.content) === null || D === void 0 || (d = D.extract) === null || d === void 0) && d.DEFAULT ? a.content.extract.DEFAULT : !((g = a.purge) === null || g === void 0 || (y = g.options) === null || y === void 0) && y.extractors ? a.purge.options.extractors : !((b = a.content) === null || b === void 0 || (S = b.options) === null || S === void 0) && S.extractors ? a.content.options.extractors : {};
      })(), s = {}, l = (() => {
        var f, c, p, v;
        if (!((f = a.purge) === null || f === void 0 || (c = f.options) === null || c === void 0) && c.defaultExtractor)
          return a.purge.options.defaultExtractor;
        if (!((p = a.content) === null || p === void 0 || (v = p.options) === null || v === void 0) && v.defaultExtractor)
          return a.content.options.defaultExtractor;
      })();
      if (l !== void 0 && (s.DEFAULT = l), typeof u == "function")
        s.DEFAULT = u;
      else if (Array.isArray(u))
        for (let { extensions: f, extractor: c } of u ?? [])
          for (let p of f)
            s[p] = c;
      else
        typeof u == "object" && u !== null && Object.assign(s, u);
      return s;
    })(), transform: (() => {
      let u = (() => {
        var l, f, c, p, v, D;
        return !((l = a.purge) === null || l === void 0) && l.transform ? a.purge.transform : !((f = a.content) === null || f === void 0) && f.transform ? a.content.transform : !((c = a.purge) === null || c === void 0 || (p = c.transform) === null || p === void 0) && p.DEFAULT ? a.purge.transform.DEFAULT : !((v = a.content) === null || v === void 0 || (D = v.transform) === null || D === void 0) && D.DEFAULT ? a.content.transform.DEFAULT : {};
      })(), s = {};
      return typeof u == "function" && (s.DEFAULT = u), typeof u == "object" && u !== null && Object.assign(s, u), s;
    })() };
    for (let u of a.content.files)
      if (typeof u == "string" && /{([^,]*?)}/g.test(u)) {
        t.default.warn("invalid-glob-braces", [`The glob pattern ${(0, t.dim)(u)} in your Tailwind CSS configuration is invalid.`, `Update it to ${(0, t.dim)(u.replace(/{([^,]*?)}/g, "$1"))} to silence this warning.`]);
        break;
      }
    return a;
  }
  __name(i, "i");
});
var Wv = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "default", { enumerable: true, get: () => t });
  function t(r) {
    if (Object.prototype.toString.call(r) !== "[object Object]")
      return false;
    let n = Object.getPrototypeOf(r);
    return n === null || n === Object.prototype;
  }
  __name(t, "t");
});
var $v = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "cloneDeep", { enumerable: true, get: () => t });
  function t(r) {
    return Array.isArray(r) ? r.map((n) => t(n)) : typeof r == "object" && r !== null ? Object.fromEntries(Object.entries(r).map(([n, i]) => [n, t(i)])) : r;
  }
  __name(t, "t");
});
var $u = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = i;
  function r(a) {
    for (var o = a.toLowerCase(), u = "", s = false, l = 0; l < 6 && o[l] !== void 0; l++) {
      var f = o.charCodeAt(l), c = f >= 97 && f <= 102 || f >= 48 && f <= 57;
      if (s = f === 32, !c)
        break;
      u += o[l];
    }
    if (u.length !== 0) {
      var p = parseInt(u, 16), v = p >= 55296 && p <= 57343;
      return v || p === 0 || p > 1114111 ? ["\uFFFD", u.length + (s ? 1 : 0)] : [String.fromCodePoint(p), u.length + (s ? 1 : 0)];
    }
  }
  __name(r, "r");
  var n = /\\/;
  function i(a) {
    var o = n.test(a);
    if (!o)
      return a;
    for (var u = "", s = 0; s < a.length; s++) {
      if (a[s] === "\\") {
        var l = r(a.slice(s + 1, s + 7));
        if (l !== void 0) {
          u += l[0], s += l[1];
          continue;
        }
        if (a[s + 1] === "\\") {
          u += "\\", s++;
          continue;
        }
        a.length === s + 1 && (u += a[s]);
        continue;
      }
      u += a[s];
    }
    return u;
  }
  __name(i, "i");
  t.exports = e.default;
});
var jv = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = r;
  function r(n) {
    for (var i = arguments.length, a = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++)
      a[o - 1] = arguments[o];
    for (; a.length > 0; ) {
      var u = a.shift();
      if (!n[u])
        return;
      n = n[u];
    }
    return n;
  }
  __name(r, "r");
  t.exports = e.default;
});
var Vv = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = r;
  function r(n) {
    for (var i = arguments.length, a = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++)
      a[o - 1] = arguments[o];
    for (; a.length > 0; ) {
      var u = a.shift();
      n[u] || (n[u] = {}), n = n[u];
    }
  }
  __name(r, "r");
  t.exports = e.default;
});
var zv = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = r;
  function r(n) {
    for (var i = "", a = n.indexOf("/*"), o = 0; a >= 0; ) {
      i = i + n.slice(o, a);
      var u = n.indexOf("*/", a + 2);
      if (u < 0)
        return i;
      o = u + 2, a = n.indexOf("/*", o);
    }
    return i = i + n.slice(o), i;
  }
  __name(r, "r");
  t.exports = e.default;
});
var Jn = le((e) => {
  "use strict";
  e.__esModule = true, e.stripComments = e.ensureObject = e.getProp = e.unesc = void 0;
  var t = a($u());
  e.unesc = t.default;
  var r = a(jv());
  e.getProp = r.default;
  var n = a(Vv());
  e.ensureObject = n.default;
  var i = a(zv());
  e.stripComments = i.default;
  function a(o) {
    return o && o.__esModule ? o : { default: o };
  }
  __name(a, "a");
});
var dr = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = Jn();
  function n(u, s) {
    for (var l = 0; l < s.length; l++) {
      var f = s[l];
      f.enumerable = f.enumerable || false, f.configurable = true, "value" in f && (f.writable = true), Object.defineProperty(u, f.key, f);
    }
  }
  __name(n, "n");
  function i(u, s, l) {
    return s && n(u.prototype, s), l && n(u, l), u;
  }
  __name(i, "i");
  var a = /* @__PURE__ */ __name(function u(s, l) {
    if (typeof s != "object" || s === null)
      return s;
    var f = new s.constructor();
    for (var c in s)
      if (s.hasOwnProperty(c)) {
        var p = s[c], v = typeof p;
        c === "parent" && v === "object" ? l && (f[c] = l) : p instanceof Array ? f[c] = p.map(function(D) {
          return u(D, f);
        }) : f[c] = u(p, f);
      }
    return f;
  }, "u"), o = function() {
    function u(l) {
      l === void 0 && (l = {}), Object.assign(this, l), this.spaces = this.spaces || {}, this.spaces.before = this.spaces.before || "", this.spaces.after = this.spaces.after || "";
    }
    __name(u, "u");
    var s = u.prototype;
    return s.remove = function() {
      return this.parent && this.parent.removeChild(this), this.parent = void 0, this;
    }, s.replaceWith = function() {
      if (this.parent) {
        for (var l in arguments)
          this.parent.insertBefore(this, arguments[l]);
        this.remove();
      }
      return this;
    }, s.next = function() {
      return this.parent.at(this.parent.index(this) + 1);
    }, s.prev = function() {
      return this.parent.at(this.parent.index(this) - 1);
    }, s.clone = function(l) {
      l === void 0 && (l = {});
      var f = a(this);
      for (var c in l)
        f[c] = l[c];
      return f;
    }, s.appendToPropertyAndEscape = function(l, f, c) {
      this.raws || (this.raws = {});
      var p = this[l], v = this.raws[l];
      this[l] = p + f, v || c !== f ? this.raws[l] = (v || p) + c : delete this.raws[l];
    }, s.setPropertyAndEscape = function(l, f, c) {
      this.raws || (this.raws = {}), this[l] = f, this.raws[l] = c;
    }, s.setPropertyWithoutEscape = function(l, f) {
      this[l] = f, this.raws && delete this.raws[l];
    }, s.isAtPosition = function(l, f) {
      if (this.source && this.source.start && this.source.end)
        return !(this.source.start.line > l || this.source.end.line < l || this.source.start.line === l && this.source.start.column > f || this.source.end.line === l && this.source.end.column < f);
    }, s.stringifyProperty = function(l) {
      return this.raws && this.raws[l] || this[l];
    }, s.valueToString = function() {
      return String(this.stringifyProperty("value"));
    }, s.toString = function() {
      return [this.rawSpaceBefore, this.valueToString(), this.rawSpaceAfter].join("");
    }, i(u, [{ key: "rawSpaceBefore", get: function() {
      var l = this.raws && this.raws.spaces && this.raws.spaces.before;
      return l === void 0 && (l = this.spaces && this.spaces.before), l || "";
    }, set: function(l) {
      (0, r.ensureObject)(this, "raws", "spaces"), this.raws.spaces.before = l;
    } }, { key: "rawSpaceAfter", get: function() {
      var l = this.raws && this.raws.spaces && this.raws.spaces.after;
      return l === void 0 && (l = this.spaces.after), l || "";
    }, set: function(l) {
      (0, r.ensureObject)(this, "raws", "spaces"), this.raws.spaces.after = l;
    } }]), u;
  }();
  e.default = o, t.exports = e.default;
});
var st = le((e) => {
  "use strict";
  e.__esModule = true, e.UNIVERSAL = e.ATTRIBUTE = e.CLASS = e.COMBINATOR = e.COMMENT = e.ID = e.NESTING = e.PSEUDO = e.ROOT = e.SELECTOR = e.STRING = e.TAG = void 0;
  var t = "tag";
  e.TAG = t;
  var r = "string";
  e.STRING = r;
  var n = "selector";
  e.SELECTOR = n;
  var i = "root";
  e.ROOT = i;
  var a = "pseudo";
  e.PSEUDO = a;
  var o = "nesting";
  e.NESTING = o;
  var u = "id";
  e.ID = u;
  var s = "comment";
  e.COMMENT = s;
  var l = "combinator";
  e.COMBINATOR = l;
  var f = "class";
  e.CLASS = f;
  var c = "attribute";
  e.ATTRIBUTE = c;
  var p = "universal";
  e.UNIVERSAL = p;
});
var Pa = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = o(dr()), n = a(st());
  function i() {
    if (typeof WeakMap != "function")
      return null;
    var d = /* @__PURE__ */ new WeakMap();
    return i = /* @__PURE__ */ __name(function() {
      return d;
    }, "i"), d;
  }
  __name(i, "i");
  function a(d) {
    if (d && d.__esModule)
      return d;
    if (d === null || typeof d != "object" && typeof d != "function")
      return { default: d };
    var g = i();
    if (g && g.has(d))
      return g.get(d);
    var y = {}, b = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var S in d)
      if (Object.prototype.hasOwnProperty.call(d, S)) {
        var k = b ? Object.getOwnPropertyDescriptor(d, S) : null;
        k && (k.get || k.set) ? Object.defineProperty(y, S, k) : y[S] = d[S];
      }
    return y.default = d, g && g.set(d, y), y;
  }
  __name(a, "a");
  function o(d) {
    return d && d.__esModule ? d : { default: d };
  }
  __name(o, "o");
  function u(d, g) {
    var y;
    if (typeof Symbol > "u" || d[Symbol.iterator] == null) {
      if (Array.isArray(d) || (y = s(d)) || g && d && typeof d.length == "number") {
        y && (d = y);
        var b = 0;
        return function() {
          return b >= d.length ? { done: true } : { done: false, value: d[b++] };
        };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    return y = d[Symbol.iterator](), y.next.bind(y);
  }
  __name(u, "u");
  function s(d, g) {
    if (d) {
      if (typeof d == "string")
        return l(d, g);
      var y = Object.prototype.toString.call(d).slice(8, -1);
      if (y === "Object" && d.constructor && (y = d.constructor.name), y === "Map" || y === "Set")
        return Array.from(d);
      if (y === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(y))
        return l(d, g);
    }
  }
  __name(s, "s");
  function l(d, g) {
    (g == null || g > d.length) && (g = d.length);
    for (var y = 0, b = new Array(g); y < g; y++)
      b[y] = d[y];
    return b;
  }
  __name(l, "l");
  function f(d, g) {
    for (var y = 0; y < g.length; y++) {
      var b = g[y];
      b.enumerable = b.enumerable || false, b.configurable = true, "value" in b && (b.writable = true), Object.defineProperty(d, b.key, b);
    }
  }
  __name(f, "f");
  function c(d, g, y) {
    return g && f(d.prototype, g), y && f(d, y), d;
  }
  __name(c, "c");
  function p(d, g) {
    d.prototype = Object.create(g.prototype), d.prototype.constructor = d, v(d, g);
  }
  __name(p, "p");
  function v(d, g) {
    return v = Object.setPrototypeOf || function(y, b) {
      return y.__proto__ = b, y;
    }, v(d, g);
  }
  __name(v, "v");
  var D = function(d) {
    p(g, d);
    function g(b) {
      var S;
      return S = d.call(this, b) || this, S.nodes || (S.nodes = []), S;
    }
    __name(g, "g");
    var y = g.prototype;
    return y.append = function(b) {
      return b.parent = this, this.nodes.push(b), this;
    }, y.prepend = function(b) {
      return b.parent = this, this.nodes.unshift(b), this;
    }, y.at = function(b) {
      return this.nodes[b];
    }, y.index = function(b) {
      return typeof b == "number" ? b : this.nodes.indexOf(b);
    }, y.removeChild = function(b) {
      b = this.index(b), this.at(b).parent = void 0, this.nodes.splice(b, 1);
      var S;
      for (var k in this.indexes)
        S = this.indexes[k], S >= b && (this.indexes[k] = S - 1);
      return this;
    }, y.removeAll = function() {
      for (var b = u(this.nodes), S; !(S = b()).done; ) {
        var k = S.value;
        k.parent = void 0;
      }
      return this.nodes = [], this;
    }, y.empty = function() {
      return this.removeAll();
    }, y.insertAfter = function(b, S) {
      S.parent = this;
      var k = this.index(b);
      this.nodes.splice(k + 1, 0, S), S.parent = this;
      var C;
      for (var E in this.indexes)
        C = this.indexes[E], k <= C && (this.indexes[E] = C + 1);
      return this;
    }, y.insertBefore = function(b, S) {
      S.parent = this;
      var k = this.index(b);
      this.nodes.splice(k, 0, S), S.parent = this;
      var C;
      for (var E in this.indexes)
        C = this.indexes[E], C <= k && (this.indexes[E] = C + 1);
      return this;
    }, y._findChildAtPosition = function(b, S) {
      var k = void 0;
      return this.each(function(C) {
        if (C.atPosition) {
          var E = C.atPosition(b, S);
          if (E)
            return k = E, false;
        } else if (C.isAtPosition(b, S))
          return k = C, false;
      }), k;
    }, y.atPosition = function(b, S) {
      if (this.isAtPosition(b, S))
        return this._findChildAtPosition(b, S) || this;
    }, y._inferEndPosition = function() {
      this.last && this.last.source && this.last.source.end && (this.source = this.source || {}, this.source.end = this.source.end || {}, Object.assign(this.source.end, this.last.source.end));
    }, y.each = function(b) {
      this.lastEach || (this.lastEach = 0), this.indexes || (this.indexes = {}), this.lastEach++;
      var S = this.lastEach;
      if (this.indexes[S] = 0, !!this.length) {
        for (var k, C; this.indexes[S] < this.length && (k = this.indexes[S], C = b(this.at(k), k), C !== false); )
          this.indexes[S] += 1;
        if (delete this.indexes[S], C === false)
          return false;
      }
    }, y.walk = function(b) {
      return this.each(function(S, k) {
        var C = b(S, k);
        if (C !== false && S.length && (C = S.walk(b)), C === false)
          return false;
      });
    }, y.walkAttributes = function(b) {
      var S = this;
      return this.walk(function(k) {
        if (k.type === n.ATTRIBUTE)
          return b.call(S, k);
      });
    }, y.walkClasses = function(b) {
      var S = this;
      return this.walk(function(k) {
        if (k.type === n.CLASS)
          return b.call(S, k);
      });
    }, y.walkCombinators = function(b) {
      var S = this;
      return this.walk(function(k) {
        if (k.type === n.COMBINATOR)
          return b.call(S, k);
      });
    }, y.walkComments = function(b) {
      var S = this;
      return this.walk(function(k) {
        if (k.type === n.COMMENT)
          return b.call(S, k);
      });
    }, y.walkIds = function(b) {
      var S = this;
      return this.walk(function(k) {
        if (k.type === n.ID)
          return b.call(S, k);
      });
    }, y.walkNesting = function(b) {
      var S = this;
      return this.walk(function(k) {
        if (k.type === n.NESTING)
          return b.call(S, k);
      });
    }, y.walkPseudos = function(b) {
      var S = this;
      return this.walk(function(k) {
        if (k.type === n.PSEUDO)
          return b.call(S, k);
      });
    }, y.walkTags = function(b) {
      var S = this;
      return this.walk(function(k) {
        if (k.type === n.TAG)
          return b.call(S, k);
      });
    }, y.walkUniversals = function(b) {
      var S = this;
      return this.walk(function(k) {
        if (k.type === n.UNIVERSAL)
          return b.call(S, k);
      });
    }, y.split = function(b) {
      var S = this, k = [];
      return this.reduce(function(C, E, L) {
        var _ = b.call(S, E);
        return k.push(E), _ ? (C.push(k), k = []) : L === S.length - 1 && C.push(k), C;
      }, []);
    }, y.map = function(b) {
      return this.nodes.map(b);
    }, y.reduce = function(b, S) {
      return this.nodes.reduce(b, S);
    }, y.every = function(b) {
      return this.nodes.every(b);
    }, y.some = function(b) {
      return this.nodes.some(b);
    }, y.filter = function(b) {
      return this.nodes.filter(b);
    }, y.sort = function(b) {
      return this.nodes.sort(b);
    }, y.toString = function() {
      return this.map(String).join("");
    }, c(g, [{ key: "first", get: function() {
      return this.at(0);
    } }, { key: "last", get: function() {
      return this.at(this.length - 1);
    } }, { key: "length", get: function() {
      return this.nodes.length;
    } }]), g;
  }(r.default);
  e.default = D, t.exports = e.default;
});
var ju = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = i(Pa()), n = st();
  function i(f) {
    return f && f.__esModule ? f : { default: f };
  }
  __name(i, "i");
  function a(f, c) {
    for (var p = 0; p < c.length; p++) {
      var v = c[p];
      v.enumerable = v.enumerable || false, v.configurable = true, "value" in v && (v.writable = true), Object.defineProperty(f, v.key, v);
    }
  }
  __name(a, "a");
  function o(f, c, p) {
    return c && a(f.prototype, c), p && a(f, p), f;
  }
  __name(o, "o");
  function u(f, c) {
    f.prototype = Object.create(c.prototype), f.prototype.constructor = f, s(f, c);
  }
  __name(u, "u");
  function s(f, c) {
    return s = Object.setPrototypeOf || function(p, v) {
      return p.__proto__ = v, p;
    }, s(f, c);
  }
  __name(s, "s");
  var l = function(f) {
    u(c, f);
    function c(v) {
      var D;
      return D = f.call(this, v) || this, D.type = n.ROOT, D;
    }
    __name(c, "c");
    var p = c.prototype;
    return p.toString = function() {
      var v = this.reduce(function(D, d) {
        return D.push(String(d)), D;
      }, []).join(",");
      return this.trailingComma ? v + "," : v;
    }, p.error = function(v, D) {
      return this._error ? this._error(v, D) : new Error(v);
    }, o(c, [{ key: "errorGenerator", set: function(v) {
      this._error = v;
    } }]), c;
  }(r.default);
  e.default = l, t.exports = e.default;
});
var Vu = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = i(Pa()), n = st();
  function i(s) {
    return s && s.__esModule ? s : { default: s };
  }
  __name(i, "i");
  function a(s, l) {
    s.prototype = Object.create(l.prototype), s.prototype.constructor = s, o(s, l);
  }
  __name(a, "a");
  function o(s, l) {
    return o = Object.setPrototypeOf || function(f, c) {
      return f.__proto__ = c, f;
    }, o(s, l);
  }
  __name(o, "o");
  var u = function(s) {
    a(l, s);
    function l(f) {
      var c;
      return c = s.call(this, f) || this, c.type = n.SELECTOR, c;
    }
    __name(l, "l");
    return l;
  }(r.default);
  e.default = u, t.exports = e.default;
});
var Ia = le((e, t) => {
  "use strict";
  var r = {}, n = r.hasOwnProperty, i = /* @__PURE__ */ __name(function(l, f) {
    if (!l)
      return f;
    var c = {};
    for (var p in f)
      c[p] = n.call(l, p) ? l[p] : f[p];
    return c;
  }, "i"), a = /[ -,\.\/:-@\[-\^`\{-~]/, o = /[ -,\.\/:-@\[\]\^`\{-~]/, u = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g, s = /* @__PURE__ */ __name(function l(f, c) {
    c = i(c, l.options), c.quotes != "single" && c.quotes != "double" && (c.quotes = "single");
    for (var p = c.quotes == "double" ? '"' : "'", v = c.isIdentifier, D = f.charAt(0), d = "", g = 0, y = f.length; g < y; ) {
      var b = f.charAt(g++), S = b.charCodeAt(), k = void 0;
      if (S < 32 || S > 126) {
        if (S >= 55296 && S <= 56319 && g < y) {
          var C = f.charCodeAt(g++);
          (C & 64512) == 56320 ? S = ((S & 1023) << 10) + (C & 1023) + 65536 : g--;
        }
        k = "\\" + S.toString(16).toUpperCase() + " ";
      } else
        c.escapeEverything ? a.test(b) ? k = "\\" + b : k = "\\" + S.toString(16).toUpperCase() + " " : /[\t\n\f\r\x0B]/.test(b) ? k = "\\" + S.toString(16).toUpperCase() + " " : b == "\\" || !v && (b == '"' && p == b || b == "'" && p == b) || v && o.test(b) ? k = "\\" + b : k = b;
      d += k;
    }
    return v && (/^-[-\d]/.test(d) ? d = "\\-" + d.slice(1) : /\d/.test(D) && (d = "\\3" + D + " " + d.slice(1))), d = d.replace(u, function(E, L, _) {
      return L && L.length % 2 ? E : (L || "") + _;
    }), !v && c.wrap ? p + d + p : d;
  }, "l");
  s.options = { escapeEverything: false, isIdentifier: false, quotes: "single", wrap: false }, s.version = "3.0.0", t.exports = s;
});
var zu = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = o(Ia()), n = Jn(), i = o(dr()), a = st();
  function o(p) {
    return p && p.__esModule ? p : { default: p };
  }
  __name(o, "o");
  function u(p, v) {
    for (var D = 0; D < v.length; D++) {
      var d = v[D];
      d.enumerable = d.enumerable || false, d.configurable = true, "value" in d && (d.writable = true), Object.defineProperty(p, d.key, d);
    }
  }
  __name(u, "u");
  function s(p, v, D) {
    return v && u(p.prototype, v), D && u(p, D), p;
  }
  __name(s, "s");
  function l(p, v) {
    p.prototype = Object.create(v.prototype), p.prototype.constructor = p, f(p, v);
  }
  __name(l, "l");
  function f(p, v) {
    return f = Object.setPrototypeOf || function(D, d) {
      return D.__proto__ = d, D;
    }, f(p, v);
  }
  __name(f, "f");
  var c = function(p) {
    l(v, p);
    function v(d) {
      var g;
      return g = p.call(this, d) || this, g.type = a.CLASS, g._constructed = true, g;
    }
    __name(v, "v");
    var D = v.prototype;
    return D.valueToString = function() {
      return "." + p.prototype.valueToString.call(this);
    }, s(v, [{ key: "value", get: function() {
      return this._value;
    }, set: function(d) {
      if (this._constructed) {
        var g = (0, r.default)(d, { isIdentifier: true });
        g !== d ? ((0, n.ensureObject)(this, "raws"), this.raws.value = g) : this.raws && delete this.raws.value;
      }
      this._value = d;
    } }]), v;
  }(i.default);
  e.default = c, t.exports = e.default;
});
var Hu = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = i(dr()), n = st();
  function i(s) {
    return s && s.__esModule ? s : { default: s };
  }
  __name(i, "i");
  function a(s, l) {
    s.prototype = Object.create(l.prototype), s.prototype.constructor = s, o(s, l);
  }
  __name(a, "a");
  function o(s, l) {
    return o = Object.setPrototypeOf || function(f, c) {
      return f.__proto__ = c, f;
    }, o(s, l);
  }
  __name(o, "o");
  var u = function(s) {
    a(l, s);
    function l(f) {
      var c;
      return c = s.call(this, f) || this, c.type = n.COMMENT, c;
    }
    __name(l, "l");
    return l;
  }(r.default);
  e.default = u, t.exports = e.default;
});
var Xu = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = i(dr()), n = st();
  function i(s) {
    return s && s.__esModule ? s : { default: s };
  }
  __name(i, "i");
  function a(s, l) {
    s.prototype = Object.create(l.prototype), s.prototype.constructor = s, o(s, l);
  }
  __name(a, "a");
  function o(s, l) {
    return o = Object.setPrototypeOf || function(f, c) {
      return f.__proto__ = c, f;
    }, o(s, l);
  }
  __name(o, "o");
  var u = function(s) {
    a(l, s);
    function l(c) {
      var p;
      return p = s.call(this, c) || this, p.type = n.ID, p;
    }
    __name(l, "l");
    var f = l.prototype;
    return f.valueToString = function() {
      return "#" + s.prototype.valueToString.call(this);
    }, l;
  }(r.default);
  e.default = u, t.exports = e.default;
});
var Ra = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = a(Ia()), n = Jn(), i = a(dr());
  function a(c) {
    return c && c.__esModule ? c : { default: c };
  }
  __name(a, "a");
  function o(c, p) {
    for (var v = 0; v < p.length; v++) {
      var D = p[v];
      D.enumerable = D.enumerable || false, D.configurable = true, "value" in D && (D.writable = true), Object.defineProperty(c, D.key, D);
    }
  }
  __name(o, "o");
  function u(c, p, v) {
    return p && o(c.prototype, p), v && o(c, v), c;
  }
  __name(u, "u");
  function s(c, p) {
    c.prototype = Object.create(p.prototype), c.prototype.constructor = c, l(c, p);
  }
  __name(s, "s");
  function l(c, p) {
    return l = Object.setPrototypeOf || function(v, D) {
      return v.__proto__ = D, v;
    }, l(c, p);
  }
  __name(l, "l");
  var f = function(c) {
    s(p, c);
    function p() {
      return c.apply(this, arguments) || this;
    }
    __name(p, "p");
    var v = p.prototype;
    return v.qualifiedName = function(D) {
      return this.namespace ? this.namespaceString + "|" + D : D;
    }, v.valueToString = function() {
      return this.qualifiedName(c.prototype.valueToString.call(this));
    }, u(p, [{ key: "namespace", get: function() {
      return this._namespace;
    }, set: function(D) {
      if (D === true || D === "*" || D === "&") {
        this._namespace = D, this.raws && delete this.raws.namespace;
        return;
      }
      var d = (0, r.default)(D, { isIdentifier: true });
      this._namespace = D, d !== D ? ((0, n.ensureObject)(this, "raws"), this.raws.namespace = d) : this.raws && delete this.raws.namespace;
    } }, { key: "ns", get: function() {
      return this._namespace;
    }, set: function(D) {
      this.namespace = D;
    } }, { key: "namespaceString", get: function() {
      if (this.namespace) {
        var D = this.stringifyProperty("namespace");
        return D === true ? "" : D;
      } else
        return "";
    } }]), p;
  }(i.default);
  e.default = f, t.exports = e.default;
});
var qu = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = i(Ra()), n = st();
  function i(s) {
    return s && s.__esModule ? s : { default: s };
  }
  __name(i, "i");
  function a(s, l) {
    s.prototype = Object.create(l.prototype), s.prototype.constructor = s, o(s, l);
  }
  __name(a, "a");
  function o(s, l) {
    return o = Object.setPrototypeOf || function(f, c) {
      return f.__proto__ = c, f;
    }, o(s, l);
  }
  __name(o, "o");
  var u = function(s) {
    a(l, s);
    function l(f) {
      var c;
      return c = s.call(this, f) || this, c.type = n.TAG, c;
    }
    __name(l, "l");
    return l;
  }(r.default);
  e.default = u, t.exports = e.default;
});
var Yu = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = i(dr()), n = st();
  function i(s) {
    return s && s.__esModule ? s : { default: s };
  }
  __name(i, "i");
  function a(s, l) {
    s.prototype = Object.create(l.prototype), s.prototype.constructor = s, o(s, l);
  }
  __name(a, "a");
  function o(s, l) {
    return o = Object.setPrototypeOf || function(f, c) {
      return f.__proto__ = c, f;
    }, o(s, l);
  }
  __name(o, "o");
  var u = function(s) {
    a(l, s);
    function l(f) {
      var c;
      return c = s.call(this, f) || this, c.type = n.STRING, c;
    }
    __name(l, "l");
    return l;
  }(r.default);
  e.default = u, t.exports = e.default;
});
var Zu = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = i(Pa()), n = st();
  function i(s) {
    return s && s.__esModule ? s : { default: s };
  }
  __name(i, "i");
  function a(s, l) {
    s.prototype = Object.create(l.prototype), s.prototype.constructor = s, o(s, l);
  }
  __name(a, "a");
  function o(s, l) {
    return o = Object.setPrototypeOf || function(f, c) {
      return f.__proto__ = c, f;
    }, o(s, l);
  }
  __name(o, "o");
  var u = function(s) {
    a(l, s);
    function l(c) {
      var p;
      return p = s.call(this, c) || this, p.type = n.PSEUDO, p;
    }
    __name(l, "l");
    var f = l.prototype;
    return f.toString = function() {
      var c = this.length ? "(" + this.map(String).join(",") + ")" : "";
      return [this.rawSpaceBefore, this.stringifyProperty("value"), c, this.rawSpaceAfter].join("");
    }, l;
  }(r.default);
  e.default = u, t.exports = e.default;
});
var Hv = le((e, t) => {
  t.exports = function(r, n) {
    return function(...i) {
      return console.warn(n), r(...i);
    };
  };
});
var Qu = le((e) => {
  "use strict";
  e.__esModule = true, e.unescapeValue = g, e.default = void 0;
  var t = o(Ia()), r = o($u()), n = o(Ra()), i = st(), a;
  function o(C) {
    return C && C.__esModule ? C : { default: C };
  }
  __name(o, "o");
  function u(C, E) {
    for (var L = 0; L < E.length; L++) {
      var _ = E[L];
      _.enumerable = _.enumerable || false, _.configurable = true, "value" in _ && (_.writable = true), Object.defineProperty(C, _.key, _);
    }
  }
  __name(u, "u");
  function s(C, E, L) {
    return E && u(C.prototype, E), L && u(C, L), C;
  }
  __name(s, "s");
  function l(C, E) {
    C.prototype = Object.create(E.prototype), C.prototype.constructor = C, f(C, E);
  }
  __name(l, "l");
  function f(C, E) {
    return f = Object.setPrototypeOf || function(L, _) {
      return L.__proto__ = _, L;
    }, f(C, E);
  }
  __name(f, "f");
  var c = Hv(), p = /^('|")([^]*)\1$/, v = c(function() {
  }, "Assigning an attribute a value containing characters that might need to be escaped is deprecated. Call attribute.setValue() instead."), D = c(function() {
  }, "Assigning attr.quoted is deprecated and has no effect. Assign to attr.quoteMark instead."), d = c(function() {
  }, "Constructing an Attribute selector with a value without specifying quoteMark is deprecated. Note: The value should be unescaped now.");
  function g(C) {
    var E = false, L = null, _ = C, U = _.match(p);
    return U && (L = U[1], _ = U[2]), _ = (0, r.default)(_), _ !== C && (E = true), { deprecatedUsage: E, unescaped: _, quoteMark: L };
  }
  __name(g, "g");
  function y(C) {
    if (C.quoteMark !== void 0 || C.value === void 0)
      return C;
    d();
    var E = g(C.value), L = E.quoteMark, _ = E.unescaped;
    return C.raws || (C.raws = {}), C.raws.value === void 0 && (C.raws.value = C.value), C.value = _, C.quoteMark = L, C;
  }
  __name(y, "y");
  var b = function(C) {
    l(E, C);
    function E(_) {
      var U;
      return _ === void 0 && (_ = {}), U = C.call(this, y(_)) || this, U.type = i.ATTRIBUTE, U.raws = U.raws || {}, Object.defineProperty(U.raws, "unquoted", { get: c(function() {
        return U.value;
      }, "attr.raws.unquoted is deprecated. Call attr.value instead."), set: c(function() {
        return U.value;
      }, "Setting attr.raws.unquoted is deprecated and has no effect. attr.value is unescaped by default now.") }), U._constructed = true, U;
    }
    __name(E, "E");
    var L = E.prototype;
    return L.getQuotedValue = function(_) {
      _ === void 0 && (_ = {});
      var U = this._determineQuoteMark(_), N = S[U], X = (0, t.default)(this._value, N);
      return X;
    }, L._determineQuoteMark = function(_) {
      return _.smart ? this.smartQuoteMark(_) : this.preferredQuoteMark(_);
    }, L.setValue = function(_, U) {
      U === void 0 && (U = {}), this._value = _, this._quoteMark = this._determineQuoteMark(U), this._syncRawValue();
    }, L.smartQuoteMark = function(_) {
      var U = this.value, N = U.replace(/[^']/g, "").length, X = U.replace(/[^"]/g, "").length;
      if (N + X === 0) {
        var Y = (0, t.default)(U, { isIdentifier: true });
        if (Y === U)
          return E.NO_QUOTE;
        var ee = this.preferredQuoteMark(_);
        if (ee === E.NO_QUOTE) {
          var A = this.quoteMark || _.quoteMark || E.DOUBLE_QUOTE, R = S[A], O = (0, t.default)(U, R);
          if (O.length < Y.length)
            return A;
        }
        return ee;
      } else
        return X === N ? this.preferredQuoteMark(_) : X < N ? E.DOUBLE_QUOTE : E.SINGLE_QUOTE;
    }, L.preferredQuoteMark = function(_) {
      var U = _.preferCurrentQuoteMark ? this.quoteMark : _.quoteMark;
      return U === void 0 && (U = _.preferCurrentQuoteMark ? _.quoteMark : this.quoteMark), U === void 0 && (U = E.DOUBLE_QUOTE), U;
    }, L._syncRawValue = function() {
      var _ = (0, t.default)(this._value, S[this.quoteMark]);
      _ === this._value ? this.raws && delete this.raws.value : this.raws.value = _;
    }, L._handleEscapes = function(_, U) {
      if (this._constructed) {
        var N = (0, t.default)(U, { isIdentifier: true });
        N !== U ? this.raws[_] = N : delete this.raws[_];
      }
    }, L._spacesFor = function(_) {
      var U = { before: "", after: "" }, N = this.spaces[_] || {}, X = this.raws.spaces && this.raws.spaces[_] || {};
      return Object.assign(U, N, X);
    }, L._stringFor = function(_, U, N) {
      U === void 0 && (U = _), N === void 0 && (N = k);
      var X = this._spacesFor(U);
      return N(this.stringifyProperty(_), X);
    }, L.offsetOf = function(_) {
      var U = 1, N = this._spacesFor("attribute");
      if (U += N.before.length, _ === "namespace" || _ === "ns")
        return this.namespace ? U : -1;
      if (_ === "attributeNS" || (U += this.namespaceString.length, this.namespace && (U += 1), _ === "attribute"))
        return U;
      U += this.stringifyProperty("attribute").length, U += N.after.length;
      var X = this._spacesFor("operator");
      U += X.before.length;
      var Y = this.stringifyProperty("operator");
      if (_ === "operator")
        return Y ? U : -1;
      U += Y.length, U += X.after.length;
      var ee = this._spacesFor("value");
      U += ee.before.length;
      var A = this.stringifyProperty("value");
      if (_ === "value")
        return A ? U : -1;
      U += A.length, U += ee.after.length;
      var R = this._spacesFor("insensitive");
      return U += R.before.length, _ === "insensitive" && this.insensitive ? U : -1;
    }, L.toString = function() {
      var _ = this, U = [this.rawSpaceBefore, "["];
      return U.push(this._stringFor("qualifiedAttribute", "attribute")), this.operator && (this.value || this.value === "") && (U.push(this._stringFor("operator")), U.push(this._stringFor("value")), U.push(this._stringFor("insensitiveFlag", "insensitive", function(N, X) {
        return N.length > 0 && !_.quoted && X.before.length === 0 && !(_.spaces.value && _.spaces.value.after) && (X.before = " "), k(N, X);
      }))), U.push("]"), U.push(this.rawSpaceAfter), U.join("");
    }, s(E, [{ key: "quoted", get: function() {
      var _ = this.quoteMark;
      return _ === "'" || _ === '"';
    }, set: function(_) {
      D();
    } }, { key: "quoteMark", get: function() {
      return this._quoteMark;
    }, set: function(_) {
      if (!this._constructed) {
        this._quoteMark = _;
        return;
      }
      this._quoteMark !== _ && (this._quoteMark = _, this._syncRawValue());
    } }, { key: "qualifiedAttribute", get: function() {
      return this.qualifiedName(this.raws.attribute || this.attribute);
    } }, { key: "insensitiveFlag", get: function() {
      return this.insensitive ? "i" : "";
    } }, { key: "value", get: function() {
      return this._value;
    }, set: function(_) {
      if (this._constructed) {
        var U = g(_), N = U.deprecatedUsage, X = U.unescaped, Y = U.quoteMark;
        if (N && v(), X === this._value && Y === this._quoteMark)
          return;
        this._value = X, this._quoteMark = Y, this._syncRawValue();
      } else
        this._value = _;
    } }, { key: "attribute", get: function() {
      return this._attribute;
    }, set: function(_) {
      this._handleEscapes("attribute", _), this._attribute = _;
    } }]), E;
  }(n.default);
  e.default = b, b.NO_QUOTE = null, b.SINGLE_QUOTE = "'", b.DOUBLE_QUOTE = '"';
  var S = (a = { "'": { quotes: "single", wrap: true }, '"': { quotes: "double", wrap: true } }, a[null] = { isIdentifier: true }, a);
  function k(C, E) {
    return "" + E.before + C + E.after;
  }
  __name(k, "k");
});
var Ju = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = i(Ra()), n = st();
  function i(s) {
    return s && s.__esModule ? s : { default: s };
  }
  __name(i, "i");
  function a(s, l) {
    s.prototype = Object.create(l.prototype), s.prototype.constructor = s, o(s, l);
  }
  __name(a, "a");
  function o(s, l) {
    return o = Object.setPrototypeOf || function(f, c) {
      return f.__proto__ = c, f;
    }, o(s, l);
  }
  __name(o, "o");
  var u = function(s) {
    a(l, s);
    function l(f) {
      var c;
      return c = s.call(this, f) || this, c.type = n.UNIVERSAL, c.value = "*", c;
    }
    __name(l, "l");
    return l;
  }(r.default);
  e.default = u, t.exports = e.default;
});
var Ku = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = i(dr()), n = st();
  function i(s) {
    return s && s.__esModule ? s : { default: s };
  }
  __name(i, "i");
  function a(s, l) {
    s.prototype = Object.create(l.prototype), s.prototype.constructor = s, o(s, l);
  }
  __name(a, "a");
  function o(s, l) {
    return o = Object.setPrototypeOf || function(f, c) {
      return f.__proto__ = c, f;
    }, o(s, l);
  }
  __name(o, "o");
  var u = function(s) {
    a(l, s);
    function l(f) {
      var c;
      return c = s.call(this, f) || this, c.type = n.COMBINATOR, c;
    }
    __name(l, "l");
    return l;
  }(r.default);
  e.default = u, t.exports = e.default;
});
var el = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = i(dr()), n = st();
  function i(s) {
    return s && s.__esModule ? s : { default: s };
  }
  __name(i, "i");
  function a(s, l) {
    s.prototype = Object.create(l.prototype), s.prototype.constructor = s, o(s, l);
  }
  __name(a, "a");
  function o(s, l) {
    return o = Object.setPrototypeOf || function(f, c) {
      return f.__proto__ = c, f;
    }, o(s, l);
  }
  __name(o, "o");
  var u = function(s) {
    a(l, s);
    function l(f) {
      var c;
      return c = s.call(this, f) || this, c.type = n.NESTING, c.value = "&", c;
    }
    __name(l, "l");
    return l;
  }(r.default);
  e.default = u, t.exports = e.default;
});
var Xv = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = r;
  function r(n) {
    return n.sort(function(i, a) {
      return i - a;
    });
  }
  __name(r, "r");
  t.exports = e.default;
});
var tl = le((e) => {
  "use strict";
  e.__esModule = true, e.combinator = e.word = e.comment = e.str = e.tab = e.newline = e.feed = e.cr = e.backslash = e.bang = e.slash = e.doubleQuote = e.singleQuote = e.space = e.greaterThan = e.pipe = e.equals = e.plus = e.caret = e.tilde = e.dollar = e.closeSquare = e.openSquare = e.closeParenthesis = e.openParenthesis = e.semicolon = e.colon = e.comma = e.at = e.asterisk = e.ampersand = void 0;
  var t = 38;
  e.ampersand = t;
  var r = 42;
  e.asterisk = r;
  var n = 64;
  e.at = n;
  var i = 44;
  e.comma = i;
  var a = 58;
  e.colon = a;
  var o = 59;
  e.semicolon = o;
  var u = 40;
  e.openParenthesis = u;
  var s = 41;
  e.closeParenthesis = s;
  var l = 91;
  e.openSquare = l;
  var f = 93;
  e.closeSquare = f;
  var c = 36;
  e.dollar = c;
  var p = 126;
  e.tilde = p;
  var v = 94;
  e.caret = v;
  var D = 43;
  e.plus = D;
  var d = 61;
  e.equals = d;
  var g = 124;
  e.pipe = g;
  var y = 62;
  e.greaterThan = y;
  var b = 32;
  e.space = b;
  var S = 39;
  e.singleQuote = S;
  var k = 34;
  e.doubleQuote = k;
  var C = 47;
  e.slash = C;
  var E = 33;
  e.bang = E;
  var L = 92;
  e.backslash = L;
  var _ = 13;
  e.cr = _;
  var U = 12;
  e.feed = U;
  var N = 10;
  e.newline = N;
  var X = 9;
  e.tab = X;
  var Y = S;
  e.str = Y;
  var ee = -1;
  e.comment = ee;
  var A = -2;
  e.word = A;
  var R = -3;
  e.combinator = R;
});
var qv = le((e) => {
  "use strict";
  e.__esModule = true, e.default = D, e.FIELDS = void 0;
  var t = a(tl()), r, n;
  function i() {
    if (typeof WeakMap != "function")
      return null;
    var d = /* @__PURE__ */ new WeakMap();
    return i = /* @__PURE__ */ __name(function() {
      return d;
    }, "i"), d;
  }
  __name(i, "i");
  function a(d) {
    if (d && d.__esModule)
      return d;
    if (d === null || typeof d != "object" && typeof d != "function")
      return { default: d };
    var g = i();
    if (g && g.has(d))
      return g.get(d);
    var y = {}, b = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var S in d)
      if (Object.prototype.hasOwnProperty.call(d, S)) {
        var k = b ? Object.getOwnPropertyDescriptor(d, S) : null;
        k && (k.get || k.set) ? Object.defineProperty(y, S, k) : y[S] = d[S];
      }
    return y.default = d, g && g.set(d, y), y;
  }
  __name(a, "a");
  var o = (r = {}, r[t.tab] = true, r[t.newline] = true, r[t.cr] = true, r[t.feed] = true, r), u = (n = {}, n[t.space] = true, n[t.tab] = true, n[t.newline] = true, n[t.cr] = true, n[t.feed] = true, n[t.ampersand] = true, n[t.asterisk] = true, n[t.bang] = true, n[t.comma] = true, n[t.colon] = true, n[t.semicolon] = true, n[t.openParenthesis] = true, n[t.closeParenthesis] = true, n[t.openSquare] = true, n[t.closeSquare] = true, n[t.singleQuote] = true, n[t.doubleQuote] = true, n[t.plus] = true, n[t.pipe] = true, n[t.tilde] = true, n[t.greaterThan] = true, n[t.equals] = true, n[t.dollar] = true, n[t.caret] = true, n[t.slash] = true, n), s = {}, l = "0123456789abcdefABCDEF";
  for (f = 0; f < l.length; f++)
    s[l.charCodeAt(f)] = true;
  var f;
  function c(d, g) {
    var y = g, b;
    do {
      if (b = d.charCodeAt(y), u[b])
        return y - 1;
      b === t.backslash ? y = p(d, y) + 1 : y++;
    } while (y < d.length);
    return y - 1;
  }
  __name(c, "c");
  function p(d, g) {
    var y = g, b = d.charCodeAt(y + 1);
    if (!o[b])
      if (s[b]) {
        var S = 0;
        do
          y++, S++, b = d.charCodeAt(y + 1);
        while (s[b] && S < 6);
        S < 6 && b === t.space && y++;
      } else
        y++;
    return y;
  }
  __name(p, "p");
  var v = { TYPE: 0, START_LINE: 1, START_COL: 2, END_LINE: 3, END_COL: 4, START_POS: 5, END_POS: 6 };
  e.FIELDS = v;
  function D(d) {
    var g = [], y = d.css.valueOf(), b = y, S = b.length, k = -1, C = 1, E = 0, L = 0, _, U, N, X, Y, ee, A, R, O, H, Z, te, re;
    function B(j, T) {
      if (d.safe)
        y += T, O = y.length - 1;
      else
        throw d.error("Unclosed " + j, C, E - k, E);
    }
    __name(B, "B");
    for (; E < S; ) {
      switch (_ = y.charCodeAt(E), _ === t.newline && (k = E, C += 1), _) {
        case t.space:
        case t.tab:
        case t.newline:
        case t.cr:
        case t.feed:
          O = E;
          do
            O += 1, _ = y.charCodeAt(O), _ === t.newline && (k = O, C += 1);
          while (_ === t.space || _ === t.newline || _ === t.tab || _ === t.cr || _ === t.feed);
          re = t.space, X = C, N = O - k - 1, L = O;
          break;
        case t.plus:
        case t.greaterThan:
        case t.tilde:
        case t.pipe:
          O = E;
          do
            O += 1, _ = y.charCodeAt(O);
          while (_ === t.plus || _ === t.greaterThan || _ === t.tilde || _ === t.pipe);
          re = t.combinator, X = C, N = E - k, L = O;
          break;
        case t.asterisk:
        case t.ampersand:
        case t.bang:
        case t.comma:
        case t.equals:
        case t.dollar:
        case t.caret:
        case t.openSquare:
        case t.closeSquare:
        case t.colon:
        case t.semicolon:
        case t.openParenthesis:
        case t.closeParenthesis:
          O = E, re = _, X = C, N = E - k, L = O + 1;
          break;
        case t.singleQuote:
        case t.doubleQuote:
          te = _ === t.singleQuote ? "'" : '"', O = E;
          do
            for (Y = false, O = y.indexOf(te, O + 1), O === -1 && B("quote", te), ee = O; y.charCodeAt(ee - 1) === t.backslash; )
              ee -= 1, Y = !Y;
          while (Y);
          re = t.str, X = C, N = E - k, L = O + 1;
          break;
        default:
          _ === t.slash && y.charCodeAt(E + 1) === t.asterisk ? (O = y.indexOf("*/", E + 2) + 1, O === 0 && B("comment", "*/"), U = y.slice(E, O + 1), R = U.split(`
`), A = R.length - 1, A > 0 ? (H = C + A, Z = O - R[A].length) : (H = C, Z = k), re = t.comment, C = H, X = H, N = O - Z) : _ === t.slash ? (O = E, re = _, X = C, N = E - k, L = O + 1) : (O = c(y, E), re = t.word, X = C, N = O - k), L = O + 1;
          break;
      }
      g.push([re, C, E - k, X, N, E, L]), Z && (k = Z, Z = null), E = L;
    }
    return g;
  }
  __name(D, "D");
});
var Yv = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = L(ju()), n = L(Vu()), i = L(zu()), a = L(Hu()), o = L(Xu()), u = L(qu()), s = L(Yu()), l = L(Zu()), f = E(Qu()), c = L(Ju()), p = L(Ku()), v = L(el()), D = L(Xv()), d = E(qv()), g = E(tl()), y = E(st()), b = Jn(), S, k;
  function C() {
    if (typeof WeakMap != "function")
      return null;
    var B = /* @__PURE__ */ new WeakMap();
    return C = /* @__PURE__ */ __name(function() {
      return B;
    }, "C"), B;
  }
  __name(C, "C");
  function E(B) {
    if (B && B.__esModule)
      return B;
    if (B === null || typeof B != "object" && typeof B != "function")
      return { default: B };
    var j = C();
    if (j && j.has(B))
      return j.get(B);
    var T = {}, $ = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var ie in B)
      if (Object.prototype.hasOwnProperty.call(B, ie)) {
        var W = $ ? Object.getOwnPropertyDescriptor(B, ie) : null;
        W && (W.get || W.set) ? Object.defineProperty(T, ie, W) : T[ie] = B[ie];
      }
    return T.default = B, j && j.set(B, T), T;
  }
  __name(E, "E");
  function L(B) {
    return B && B.__esModule ? B : { default: B };
  }
  __name(L, "L");
  function _(B, j) {
    for (var T = 0; T < j.length; T++) {
      var $ = j[T];
      $.enumerable = $.enumerable || false, $.configurable = true, "value" in $ && ($.writable = true), Object.defineProperty(B, $.key, $);
    }
  }
  __name(_, "_");
  function U(B, j, T) {
    return j && _(B.prototype, j), T && _(B, T), B;
  }
  __name(U, "U");
  var N = (S = {}, S[g.space] = true, S[g.cr] = true, S[g.feed] = true, S[g.newline] = true, S[g.tab] = true, S), X = Object.assign({}, N, (k = {}, k[g.comment] = true, k));
  function Y(B) {
    return { line: B[d.FIELDS.START_LINE], column: B[d.FIELDS.START_COL] };
  }
  __name(Y, "Y");
  function ee(B) {
    return { line: B[d.FIELDS.END_LINE], column: B[d.FIELDS.END_COL] };
  }
  __name(ee, "ee");
  function A(B, j, T, $) {
    return { start: { line: B, column: j }, end: { line: T, column: $ } };
  }
  __name(A, "A");
  function R(B) {
    return A(B[d.FIELDS.START_LINE], B[d.FIELDS.START_COL], B[d.FIELDS.END_LINE], B[d.FIELDS.END_COL]);
  }
  __name(R, "R");
  function O(B, j) {
    if (B)
      return A(B[d.FIELDS.START_LINE], B[d.FIELDS.START_COL], j[d.FIELDS.END_LINE], j[d.FIELDS.END_COL]);
  }
  __name(O, "O");
  function H(B, j) {
    var T = B[j];
    if (typeof T == "string")
      return T.indexOf("\\") !== -1 && ((0, b.ensureObject)(B, "raws"), B[j] = (0, b.unesc)(T), B.raws[j] === void 0 && (B.raws[j] = T)), B;
  }
  __name(H, "H");
  function Z(B, j) {
    for (var T = -1, $ = []; (T = B.indexOf(j, T + 1)) !== -1; )
      $.push(T);
    return $;
  }
  __name(Z, "Z");
  function te() {
    var B = Array.prototype.concat.apply([], arguments);
    return B.filter(function(j, T) {
      return T === B.indexOf(j);
    });
  }
  __name(te, "te");
  var re = function() {
    function B(T, $) {
      $ === void 0 && ($ = {}), this.rule = T, this.options = Object.assign({ lossy: false, safe: false }, $), this.position = 0, this.css = typeof this.rule == "string" ? this.rule : this.rule.selector, this.tokens = (0, d.default)({ css: this.css, error: this._errorGenerator(), safe: this.options.safe });
      var ie = O(this.tokens[0], this.tokens[this.tokens.length - 1]);
      this.root = new r.default({ source: ie }), this.root.errorGenerator = this._errorGenerator();
      var W = new n.default({ source: { start: { line: 1, column: 1 } } });
      this.root.append(W), this.current = W, this.loop();
    }
    __name(B, "B");
    var j = B.prototype;
    return j._errorGenerator = function() {
      var T = this;
      return function($, ie) {
        return typeof T.rule == "string" ? new Error($) : T.rule.error($, ie);
      };
    }, j.attribute = function() {
      var T = [], $ = this.currToken;
      for (this.position++; this.position < this.tokens.length && this.currToken[d.FIELDS.TYPE] !== g.closeSquare; )
        T.push(this.currToken), this.position++;
      if (this.currToken[d.FIELDS.TYPE] !== g.closeSquare)
        return this.expected("closing square bracket", this.currToken[d.FIELDS.START_POS]);
      var ie = T.length, W = { source: A($[1], $[2], this.currToken[3], this.currToken[4]), sourceIndex: $[d.FIELDS.START_POS] };
      if (ie === 1 && !~[g.word].indexOf(T[0][d.FIELDS.TYPE]))
        return this.expected("attribute", T[0][d.FIELDS.START_POS]);
      for (var fe = 0, ce = "", ge = "", pe = null, me = false; fe < ie; ) {
        var Te = T[fe], de = this.content(Te), xe = T[fe + 1];
        switch (Te[d.FIELDS.TYPE]) {
          case g.space:
            if (me = true, this.options.lossy)
              break;
            if (pe) {
              (0, b.ensureObject)(W, "spaces", pe);
              var Je = W.spaces[pe].after || "";
              W.spaces[pe].after = Je + de;
              var Me = (0, b.getProp)(W, "raws", "spaces", pe, "after") || null;
              Me && (W.raws.spaces[pe].after = Me + de);
            } else
              ce = ce + de, ge = ge + de;
            break;
          case g.asterisk:
            if (xe[d.FIELDS.TYPE] === g.equals)
              W.operator = de, pe = "operator";
            else if ((!W.namespace || pe === "namespace" && !me) && xe) {
              ce && ((0, b.ensureObject)(W, "spaces", "attribute"), W.spaces.attribute.before = ce, ce = ""), ge && ((0, b.ensureObject)(W, "raws", "spaces", "attribute"), W.raws.spaces.attribute.before = ce, ge = ""), W.namespace = (W.namespace || "") + de;
              var je = (0, b.getProp)(W, "raws", "namespace") || null;
              je && (W.raws.namespace += de), pe = "namespace";
            }
            me = false;
            break;
          case g.dollar:
            if (pe === "value") {
              var Be = (0, b.getProp)(W, "raws", "value");
              W.value += "$", Be && (W.raws.value = Be + "$");
              break;
            }
          case g.caret:
            xe[d.FIELDS.TYPE] === g.equals && (W.operator = de, pe = "operator"), me = false;
            break;
          case g.combinator:
            if (de === "~" && xe[d.FIELDS.TYPE] === g.equals && (W.operator = de, pe = "operator"), de !== "|") {
              me = false;
              break;
            }
            xe[d.FIELDS.TYPE] === g.equals ? (W.operator = de, pe = "operator") : !W.namespace && !W.attribute && (W.namespace = true), me = false;
            break;
          case g.word:
            if (xe && this.content(xe) === "|" && T[fe + 2] && T[fe + 2][d.FIELDS.TYPE] !== g.equals && !W.operator && !W.namespace)
              W.namespace = de, pe = "namespace";
            else if (!W.attribute || pe === "attribute" && !me) {
              ce && ((0, b.ensureObject)(W, "spaces", "attribute"), W.spaces.attribute.before = ce, ce = ""), ge && ((0, b.ensureObject)(W, "raws", "spaces", "attribute"), W.raws.spaces.attribute.before = ge, ge = ""), W.attribute = (W.attribute || "") + de;
              var Ke = (0, b.getProp)(W, "raws", "attribute") || null;
              Ke && (W.raws.attribute += de), pe = "attribute";
            } else if (!W.value && W.value !== "" || pe === "value" && !me) {
              var qe = (0, b.unesc)(de), pt = (0, b.getProp)(W, "raws", "value") || "", ut = W.value || "";
              W.value = ut + qe, W.quoteMark = null, (qe !== de || pt) && ((0, b.ensureObject)(W, "raws"), W.raws.value = (pt || ut) + de), pe = "value";
            } else {
              var rt = de === "i" || de === "I";
              (W.value || W.value === "") && (W.quoteMark || me) ? (W.insensitive = rt, (!rt || de === "I") && ((0, b.ensureObject)(W, "raws"), W.raws.insensitiveFlag = de), pe = "insensitive", ce && ((0, b.ensureObject)(W, "spaces", "insensitive"), W.spaces.insensitive.before = ce, ce = ""), ge && ((0, b.ensureObject)(W, "raws", "spaces", "insensitive"), W.raws.spaces.insensitive.before = ge, ge = "")) : (W.value || W.value === "") && (pe = "value", W.value += de, W.raws.value && (W.raws.value += de));
            }
            me = false;
            break;
          case g.str:
            if (!W.attribute || !W.operator)
              return this.error("Expected an attribute followed by an operator preceding the string.", { index: Te[d.FIELDS.START_POS] });
            var ze = (0, f.unescapeValue)(de), yt = ze.unescaped, Mt = ze.quoteMark;
            W.value = yt, W.quoteMark = Mt, pe = "value", (0, b.ensureObject)(W, "raws"), W.raws.value = de, me = false;
            break;
          case g.equals:
            if (!W.attribute)
              return this.expected("attribute", Te[d.FIELDS.START_POS], de);
            if (W.value)
              return this.error('Unexpected "=" found; an operator was already defined.', { index: Te[d.FIELDS.START_POS] });
            W.operator = W.operator ? W.operator + de : de, pe = "operator", me = false;
            break;
          case g.comment:
            if (pe)
              if (me || xe && xe[d.FIELDS.TYPE] === g.space || pe === "insensitive") {
                var lt = (0, b.getProp)(W, "spaces", pe, "after") || "", ft = (0, b.getProp)(W, "raws", "spaces", pe, "after") || lt;
                (0, b.ensureObject)(W, "raws", "spaces", pe), W.raws.spaces[pe].after = ft + de;
              } else {
                var Ct = W[pe] || "", ht = (0, b.getProp)(W, "raws", pe) || Ct;
                (0, b.ensureObject)(W, "raws"), W.raws[pe] = ht + de;
              }
            else
              ge = ge + de;
            break;
          default:
            return this.error('Unexpected "' + de + '" found.', { index: Te[d.FIELDS.START_POS] });
        }
        fe++;
      }
      H(W, "attribute"), H(W, "namespace"), this.newNode(new f.default(W)), this.position++;
    }, j.parseWhitespaceEquivalentTokens = function(T) {
      T < 0 && (T = this.tokens.length);
      var $ = this.position, ie = [], W = "", fe = void 0;
      do
        if (N[this.currToken[d.FIELDS.TYPE]])
          this.options.lossy || (W += this.content());
        else if (this.currToken[d.FIELDS.TYPE] === g.comment) {
          var ce = {};
          W && (ce.before = W, W = ""), fe = new a.default({ value: this.content(), source: R(this.currToken), sourceIndex: this.currToken[d.FIELDS.START_POS], spaces: ce }), ie.push(fe);
        }
      while (++this.position < T);
      if (W) {
        if (fe)
          fe.spaces.after = W;
        else if (!this.options.lossy) {
          var ge = this.tokens[$], pe = this.tokens[this.position - 1];
          ie.push(new s.default({ value: "", source: A(ge[d.FIELDS.START_LINE], ge[d.FIELDS.START_COL], pe[d.FIELDS.END_LINE], pe[d.FIELDS.END_COL]), sourceIndex: ge[d.FIELDS.START_POS], spaces: { before: W, after: "" } }));
        }
      }
      return ie;
    }, j.convertWhitespaceNodesToSpace = function(T, $) {
      var ie = this;
      $ === void 0 && ($ = false);
      var W = "", fe = "";
      T.forEach(function(ge) {
        var pe = ie.lossySpace(ge.spaces.before, $), me = ie.lossySpace(ge.rawSpaceBefore, $);
        W += pe + ie.lossySpace(ge.spaces.after, $ && pe.length === 0), fe += pe + ge.value + ie.lossySpace(ge.rawSpaceAfter, $ && me.length === 0);
      }), fe === W && (fe = void 0);
      var ce = { space: W, rawSpace: fe };
      return ce;
    }, j.isNamedCombinator = function(T) {
      return T === void 0 && (T = this.position), this.tokens[T + 0] && this.tokens[T + 0][d.FIELDS.TYPE] === g.slash && this.tokens[T + 1] && this.tokens[T + 1][d.FIELDS.TYPE] === g.word && this.tokens[T + 2] && this.tokens[T + 2][d.FIELDS.TYPE] === g.slash;
    }, j.namedCombinator = function() {
      if (this.isNamedCombinator()) {
        var T = this.content(this.tokens[this.position + 1]), $ = (0, b.unesc)(T).toLowerCase(), ie = {};
        $ !== T && (ie.value = "/" + T + "/");
        var W = new p.default({ value: "/" + $ + "/", source: A(this.currToken[d.FIELDS.START_LINE], this.currToken[d.FIELDS.START_COL], this.tokens[this.position + 2][d.FIELDS.END_LINE], this.tokens[this.position + 2][d.FIELDS.END_COL]), sourceIndex: this.currToken[d.FIELDS.START_POS], raws: ie });
        return this.position = this.position + 3, W;
      } else
        this.unexpected();
    }, j.combinator = function() {
      var T = this;
      if (this.content() === "|")
        return this.namespace();
      var $ = this.locateNextMeaningfulToken(this.position);
      if ($ < 0 || this.tokens[$][d.FIELDS.TYPE] === g.comma) {
        var ie = this.parseWhitespaceEquivalentTokens($);
        if (ie.length > 0) {
          var W = this.current.last;
          if (W) {
            var fe = this.convertWhitespaceNodesToSpace(ie), ce = fe.space, ge = fe.rawSpace;
            ge !== void 0 && (W.rawSpaceAfter += ge), W.spaces.after += ce;
          } else
            ie.forEach(function(pt) {
              return T.newNode(pt);
            });
        }
        return;
      }
      var pe = this.currToken, me = void 0;
      $ > this.position && (me = this.parseWhitespaceEquivalentTokens($));
      var Te;
      if (this.isNamedCombinator() ? Te = this.namedCombinator() : this.currToken[d.FIELDS.TYPE] === g.combinator ? (Te = new p.default({ value: this.content(), source: R(this.currToken), sourceIndex: this.currToken[d.FIELDS.START_POS] }), this.position++) : N[this.currToken[d.FIELDS.TYPE]] || me || this.unexpected(), Te) {
        if (me) {
          var de = this.convertWhitespaceNodesToSpace(me), xe = de.space, Je = de.rawSpace;
          Te.spaces.before = xe, Te.rawSpaceBefore = Je;
        }
      } else {
        var Me = this.convertWhitespaceNodesToSpace(me, true), je = Me.space, Be = Me.rawSpace;
        Be || (Be = je);
        var Ke = {}, qe = { spaces: {} };
        je.endsWith(" ") && Be.endsWith(" ") ? (Ke.before = je.slice(0, je.length - 1), qe.spaces.before = Be.slice(0, Be.length - 1)) : je.startsWith(" ") && Be.startsWith(" ") ? (Ke.after = je.slice(1), qe.spaces.after = Be.slice(1)) : qe.value = Be, Te = new p.default({ value: " ", source: O(pe, this.tokens[this.position - 1]), sourceIndex: pe[d.FIELDS.START_POS], spaces: Ke, raws: qe });
      }
      return this.currToken && this.currToken[d.FIELDS.TYPE] === g.space && (Te.spaces.after = this.optionalSpace(this.content()), this.position++), this.newNode(Te);
    }, j.comma = function() {
      if (this.position === this.tokens.length - 1) {
        this.root.trailingComma = true, this.position++;
        return;
      }
      this.current._inferEndPosition();
      var T = new n.default({ source: { start: Y(this.tokens[this.position + 1]) } });
      this.current.parent.append(T), this.current = T, this.position++;
    }, j.comment = function() {
      var T = this.currToken;
      this.newNode(new a.default({ value: this.content(), source: R(T), sourceIndex: T[d.FIELDS.START_POS] })), this.position++;
    }, j.error = function(T, $) {
      throw this.root.error(T, $);
    }, j.missingBackslash = function() {
      return this.error("Expected a backslash preceding the semicolon.", { index: this.currToken[d.FIELDS.START_POS] });
    }, j.missingParenthesis = function() {
      return this.expected("opening parenthesis", this.currToken[d.FIELDS.START_POS]);
    }, j.missingSquareBracket = function() {
      return this.expected("opening square bracket", this.currToken[d.FIELDS.START_POS]);
    }, j.unexpected = function() {
      return this.error("Unexpected '" + this.content() + "'. Escaping special characters with \\ may help.", this.currToken[d.FIELDS.START_POS]);
    }, j.namespace = function() {
      var T = this.prevToken && this.content(this.prevToken) || true;
      if (this.nextToken[d.FIELDS.TYPE] === g.word)
        return this.position++, this.word(T);
      if (this.nextToken[d.FIELDS.TYPE] === g.asterisk)
        return this.position++, this.universal(T);
    }, j.nesting = function() {
      if (this.nextToken) {
        var T = this.content(this.nextToken);
        if (T === "|") {
          this.position++;
          return;
        }
      }
      var $ = this.currToken;
      this.newNode(new v.default({ value: this.content(), source: R($), sourceIndex: $[d.FIELDS.START_POS] })), this.position++;
    }, j.parentheses = function() {
      var T = this.current.last, $ = 1;
      if (this.position++, T && T.type === y.PSEUDO) {
        var ie = new n.default({ source: { start: Y(this.tokens[this.position - 1]) } }), W = this.current;
        for (T.append(ie), this.current = ie; this.position < this.tokens.length && $; )
          this.currToken[d.FIELDS.TYPE] === g.openParenthesis && $++, this.currToken[d.FIELDS.TYPE] === g.closeParenthesis && $--, $ ? this.parse() : (this.current.source.end = ee(this.currToken), this.current.parent.source.end = ee(this.currToken), this.position++);
        this.current = W;
      } else {
        for (var fe = this.currToken, ce = "(", ge; this.position < this.tokens.length && $; )
          this.currToken[d.FIELDS.TYPE] === g.openParenthesis && $++, this.currToken[d.FIELDS.TYPE] === g.closeParenthesis && $--, ge = this.currToken, ce += this.parseParenthesisToken(this.currToken), this.position++;
        T ? T.appendToPropertyAndEscape("value", ce, ce) : this.newNode(new s.default({ value: ce, source: A(fe[d.FIELDS.START_LINE], fe[d.FIELDS.START_COL], ge[d.FIELDS.END_LINE], ge[d.FIELDS.END_COL]), sourceIndex: fe[d.FIELDS.START_POS] }));
      }
      if ($)
        return this.expected("closing parenthesis", this.currToken[d.FIELDS.START_POS]);
    }, j.pseudo = function() {
      for (var T = this, $ = "", ie = this.currToken; this.currToken && this.currToken[d.FIELDS.TYPE] === g.colon; )
        $ += this.content(), this.position++;
      if (!this.currToken)
        return this.expected(["pseudo-class", "pseudo-element"], this.position - 1);
      if (this.currToken[d.FIELDS.TYPE] === g.word)
        this.splitWord(false, function(W, fe) {
          $ += W, T.newNode(new l.default({ value: $, source: O(ie, T.currToken), sourceIndex: ie[d.FIELDS.START_POS] })), fe > 1 && T.nextToken && T.nextToken[d.FIELDS.TYPE] === g.openParenthesis && T.error("Misplaced parenthesis.", { index: T.nextToken[d.FIELDS.START_POS] });
        });
      else
        return this.expected(["pseudo-class", "pseudo-element"], this.currToken[d.FIELDS.START_POS]);
    }, j.space = function() {
      var T = this.content();
      this.position === 0 || this.prevToken[d.FIELDS.TYPE] === g.comma || this.prevToken[d.FIELDS.TYPE] === g.openParenthesis || this.current.nodes.every(function($) {
        return $.type === "comment";
      }) ? (this.spaces = this.optionalSpace(T), this.position++) : this.position === this.tokens.length - 1 || this.nextToken[d.FIELDS.TYPE] === g.comma || this.nextToken[d.FIELDS.TYPE] === g.closeParenthesis ? (this.current.last.spaces.after = this.optionalSpace(T), this.position++) : this.combinator();
    }, j.string = function() {
      var T = this.currToken;
      this.newNode(new s.default({ value: this.content(), source: R(T), sourceIndex: T[d.FIELDS.START_POS] })), this.position++;
    }, j.universal = function(T) {
      var $ = this.nextToken;
      if ($ && this.content($) === "|")
        return this.position++, this.namespace();
      var ie = this.currToken;
      this.newNode(new c.default({ value: this.content(), source: R(ie), sourceIndex: ie[d.FIELDS.START_POS] }), T), this.position++;
    }, j.splitWord = function(T, $) {
      for (var ie = this, W = this.nextToken, fe = this.content(); W && ~[g.dollar, g.caret, g.equals, g.word].indexOf(W[d.FIELDS.TYPE]); ) {
        this.position++;
        var ce = this.content();
        if (fe += ce, ce.lastIndexOf("\\") === ce.length - 1) {
          var ge = this.nextToken;
          ge && ge[d.FIELDS.TYPE] === g.space && (fe += this.requiredSpace(this.content(ge)), this.position++);
        }
        W = this.nextToken;
      }
      var pe = Z(fe, ".").filter(function(xe) {
        var Je = fe[xe - 1] === "\\", Me = /^\d+\.\d+%$/.test(fe);
        return !Je && !Me;
      }), me = Z(fe, "#").filter(function(xe) {
        return fe[xe - 1] !== "\\";
      }), Te = Z(fe, "#{");
      Te.length && (me = me.filter(function(xe) {
        return !~Te.indexOf(xe);
      }));
      var de = (0, D.default)(te([0].concat(pe, me)));
      de.forEach(function(xe, Je) {
        var Me = de[Je + 1] || fe.length, je = fe.slice(xe, Me);
        if (Je === 0 && $)
          return $.call(ie, je, de.length);
        var Be, Ke = ie.currToken, qe = Ke[d.FIELDS.START_POS] + de[Je], pt = A(Ke[1], Ke[2] + xe, Ke[3], Ke[2] + (Me - 1));
        if (~pe.indexOf(xe)) {
          var ut = { value: je.slice(1), source: pt, sourceIndex: qe };
          Be = new i.default(H(ut, "value"));
        } else if (~me.indexOf(xe)) {
          var rt = { value: je.slice(1), source: pt, sourceIndex: qe };
          Be = new o.default(H(rt, "value"));
        } else {
          var ze = { value: je, source: pt, sourceIndex: qe };
          H(ze, "value"), Be = new u.default(ze);
        }
        ie.newNode(Be, T), T = null;
      }), this.position++;
    }, j.word = function(T) {
      var $ = this.nextToken;
      return $ && this.content($) === "|" ? (this.position++, this.namespace()) : this.splitWord(T);
    }, j.loop = function() {
      for (; this.position < this.tokens.length; )
        this.parse(true);
      return this.current._inferEndPosition(), this.root;
    }, j.parse = function(T) {
      switch (this.currToken[d.FIELDS.TYPE]) {
        case g.space:
          this.space();
          break;
        case g.comment:
          this.comment();
          break;
        case g.openParenthesis:
          this.parentheses();
          break;
        case g.closeParenthesis:
          T && this.missingParenthesis();
          break;
        case g.openSquare:
          this.attribute();
          break;
        case g.dollar:
        case g.caret:
        case g.equals:
        case g.word:
          this.word();
          break;
        case g.colon:
          this.pseudo();
          break;
        case g.comma:
          this.comma();
          break;
        case g.asterisk:
          this.universal();
          break;
        case g.ampersand:
          this.nesting();
          break;
        case g.slash:
        case g.combinator:
          this.combinator();
          break;
        case g.str:
          this.string();
          break;
        case g.closeSquare:
          this.missingSquareBracket();
        case g.semicolon:
          this.missingBackslash();
        default:
          this.unexpected();
      }
    }, j.expected = function(T, $, ie) {
      if (Array.isArray(T)) {
        var W = T.pop();
        T = T.join(", ") + " or " + W;
      }
      var fe = /^[aeiou]/.test(T[0]) ? "an" : "a";
      return ie ? this.error("Expected " + fe + " " + T + ', found "' + ie + '" instead.', { index: $ }) : this.error("Expected " + fe + " " + T + ".", { index: $ });
    }, j.requiredSpace = function(T) {
      return this.options.lossy ? " " : T;
    }, j.optionalSpace = function(T) {
      return this.options.lossy ? "" : T;
    }, j.lossySpace = function(T, $) {
      return this.options.lossy ? $ ? " " : "" : T;
    }, j.parseParenthesisToken = function(T) {
      var $ = this.content(T);
      return T[d.FIELDS.TYPE] === g.space ? this.requiredSpace($) : $;
    }, j.newNode = function(T, $) {
      return $ && (/^ +$/.test($) && (this.options.lossy || (this.spaces = (this.spaces || "") + $), $ = true), T.namespace = $, H(T, "namespace")), this.spaces && (T.spaces.before = this.spaces, this.spaces = ""), this.current.append(T);
    }, j.content = function(T) {
      return T === void 0 && (T = this.currToken), this.css.slice(T[d.FIELDS.START_POS], T[d.FIELDS.END_POS]);
    }, j.locateNextMeaningfulToken = function(T) {
      T === void 0 && (T = this.position + 1);
      for (var $ = T; $ < this.tokens.length; )
        if (X[this.tokens[$][d.FIELDS.TYPE]]) {
          $++;
          continue;
        } else
          return $;
      return -1;
    }, U(B, [{ key: "currToken", get: function() {
      return this.tokens[this.position];
    } }, { key: "nextToken", get: function() {
      return this.tokens[this.position + 1];
    } }, { key: "prevToken", get: function() {
      return this.tokens[this.position - 1];
    } }]), B;
  }();
  e.default = re, t.exports = e.default;
});
var Zv = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = n(Yv());
  function n(a) {
    return a && a.__esModule ? a : { default: a };
  }
  __name(n, "n");
  var i = function() {
    function a(u, s) {
      this.func = u || function() {
      }, this.funcRes = null, this.options = s;
    }
    __name(a, "a");
    var o = a.prototype;
    return o._shouldUpdateSelector = function(u, s) {
      s === void 0 && (s = {});
      var l = Object.assign({}, this.options, s);
      return l.updateSelector === false ? false : typeof u != "string";
    }, o._isLossy = function(u) {
      u === void 0 && (u = {});
      var s = Object.assign({}, this.options, u);
      return s.lossless === false;
    }, o._root = function(u, s) {
      s === void 0 && (s = {});
      var l = new r.default(u, this._parseOptions(s));
      return l.root;
    }, o._parseOptions = function(u) {
      return { lossy: this._isLossy(u) };
    }, o._run = function(u, s) {
      var l = this;
      return s === void 0 && (s = {}), new Promise(function(f, c) {
        try {
          var p = l._root(u, s);
          Promise.resolve(l.func(p)).then(function(v) {
            var D = void 0;
            return l._shouldUpdateSelector(u, s) && (D = p.toString(), u.selector = D), { transform: v, root: p, string: D };
          }).then(f, c);
        } catch (v) {
          c(v);
          return;
        }
      });
    }, o._runSync = function(u, s) {
      s === void 0 && (s = {});
      var l = this._root(u, s), f = this.func(l);
      if (f && typeof f.then == "function")
        throw new Error("Selector processor returned a promise to a synchronous call.");
      var c = void 0;
      return s.updateSelector && typeof u != "string" && (c = l.toString(), u.selector = c), { transform: f, root: l, string: c };
    }, o.ast = function(u, s) {
      return this._run(u, s).then(function(l) {
        return l.root;
      });
    }, o.astSync = function(u, s) {
      return this._runSync(u, s).root;
    }, o.transform = function(u, s) {
      return this._run(u, s).then(function(l) {
        return l.transform;
      });
    }, o.transformSync = function(u, s) {
      return this._runSync(u, s).transform;
    }, o.process = function(u, s) {
      return this._run(u, s).then(function(l) {
        return l.string || l.root.toString();
      });
    }, o.processSync = function(u, s) {
      var l = this._runSync(u, s);
      return l.string || l.root.toString();
    }, a;
  }();
  e.default = i, t.exports = e.default;
});
var Qv = le((e) => {
  "use strict";
  e.__esModule = true, e.universal = e.tag = e.string = e.selector = e.root = e.pseudo = e.nesting = e.id = e.comment = e.combinator = e.className = e.attribute = void 0;
  var t = v(Qu()), r = v(zu()), n = v(Ku()), i = v(Hu()), a = v(Xu()), o = v(el()), u = v(Zu()), s = v(ju()), l = v(Vu()), f = v(Yu()), c = v(qu()), p = v(Ju());
  function v(N) {
    return N && N.__esModule ? N : { default: N };
  }
  __name(v, "v");
  var D = /* @__PURE__ */ __name(function(N) {
    return new t.default(N);
  }, "D");
  e.attribute = D;
  var d = /* @__PURE__ */ __name(function(N) {
    return new r.default(N);
  }, "d");
  e.className = d;
  var g = /* @__PURE__ */ __name(function(N) {
    return new n.default(N);
  }, "g");
  e.combinator = g;
  var y = /* @__PURE__ */ __name(function(N) {
    return new i.default(N);
  }, "y");
  e.comment = y;
  var b = /* @__PURE__ */ __name(function(N) {
    return new a.default(N);
  }, "b");
  e.id = b;
  var S = /* @__PURE__ */ __name(function(N) {
    return new o.default(N);
  }, "S");
  e.nesting = S;
  var k = /* @__PURE__ */ __name(function(N) {
    return new u.default(N);
  }, "k");
  e.pseudo = k;
  var C = /* @__PURE__ */ __name(function(N) {
    return new s.default(N);
  }, "C");
  e.root = C;
  var E = /* @__PURE__ */ __name(function(N) {
    return new l.default(N);
  }, "E");
  e.selector = E;
  var L = /* @__PURE__ */ __name(function(N) {
    return new f.default(N);
  }, "L");
  e.string = L;
  var _ = /* @__PURE__ */ __name(function(N) {
    return new c.default(N);
  }, "_");
  e.tag = _;
  var U = /* @__PURE__ */ __name(function(N) {
    return new p.default(N);
  }, "U");
  e.universal = U;
});
var Jv = le((e) => {
  "use strict";
  e.__esModule = true, e.isNode = i, e.isPseudoElement = b, e.isPseudoClass = S, e.isContainer = k, e.isNamespace = C, e.isUniversal = e.isTag = e.isString = e.isSelector = e.isRoot = e.isPseudo = e.isNesting = e.isIdentifier = e.isComment = e.isCombinator = e.isClassName = e.isAttribute = void 0;
  var t = st(), r, n = (r = {}, r[t.ATTRIBUTE] = true, r[t.CLASS] = true, r[t.COMBINATOR] = true, r[t.COMMENT] = true, r[t.ID] = true, r[t.NESTING] = true, r[t.PSEUDO] = true, r[t.ROOT] = true, r[t.SELECTOR] = true, r[t.STRING] = true, r[t.TAG] = true, r[t.UNIVERSAL] = true, r);
  function i(E) {
    return typeof E == "object" && n[E.type];
  }
  __name(i, "i");
  function a(E, L) {
    return i(L) && L.type === E;
  }
  __name(a, "a");
  var o = a.bind(null, t.ATTRIBUTE);
  e.isAttribute = o;
  var u = a.bind(null, t.CLASS);
  e.isClassName = u;
  var s = a.bind(null, t.COMBINATOR);
  e.isCombinator = s;
  var l = a.bind(null, t.COMMENT);
  e.isComment = l;
  var f = a.bind(null, t.ID);
  e.isIdentifier = f;
  var c = a.bind(null, t.NESTING);
  e.isNesting = c;
  var p = a.bind(null, t.PSEUDO);
  e.isPseudo = p;
  var v = a.bind(null, t.ROOT);
  e.isRoot = v;
  var D = a.bind(null, t.SELECTOR);
  e.isSelector = D;
  var d = a.bind(null, t.STRING);
  e.isString = d;
  var g = a.bind(null, t.TAG);
  e.isTag = g;
  var y = a.bind(null, t.UNIVERSAL);
  e.isUniversal = y;
  function b(E) {
    return p(E) && E.value && (E.value.startsWith("::") || E.value.toLowerCase() === ":before" || E.value.toLowerCase() === ":after" || E.value.toLowerCase() === ":first-letter" || E.value.toLowerCase() === ":first-line");
  }
  __name(b, "b");
  function S(E) {
    return p(E) && !b(E);
  }
  __name(S, "S");
  function k(E) {
    return !!(i(E) && E.walk);
  }
  __name(k, "k");
  function C(E) {
    return o(E) || g(E);
  }
  __name(C, "C");
});
var Kv = le((e) => {
  "use strict";
  e.__esModule = true;
  var t = st();
  Object.keys(t).forEach(function(i) {
    i === "default" || i === "__esModule" || i in e && e[i] === t[i] || (e[i] = t[i]);
  });
  var r = Qv();
  Object.keys(r).forEach(function(i) {
    i === "default" || i === "__esModule" || i in e && e[i] === r[i] || (e[i] = r[i]);
  });
  var n = Jv();
  Object.keys(n).forEach(function(i) {
    i === "default" || i === "__esModule" || i in e && e[i] === n[i] || (e[i] = n[i]);
  });
});
var eg = le((e, t) => {
  "use strict";
  e.__esModule = true, e.default = void 0;
  var r = o(Zv()), n = a(Kv());
  function i() {
    if (typeof WeakMap != "function")
      return null;
    var l = /* @__PURE__ */ new WeakMap();
    return i = /* @__PURE__ */ __name(function() {
      return l;
    }, "i"), l;
  }
  __name(i, "i");
  function a(l) {
    if (l && l.__esModule)
      return l;
    if (l === null || typeof l != "object" && typeof l != "function")
      return { default: l };
    var f = i();
    if (f && f.has(l))
      return f.get(l);
    var c = {}, p = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var v in l)
      if (Object.prototype.hasOwnProperty.call(l, v)) {
        var D = p ? Object.getOwnPropertyDescriptor(l, v) : null;
        D && (D.get || D.set) ? Object.defineProperty(c, v, D) : c[v] = l[v];
      }
    return c.default = l, f && f.set(l, c), c;
  }
  __name(a, "a");
  function o(l) {
    return l && l.__esModule ? l : { default: l };
  }
  __name(o, "o");
  var u = /* @__PURE__ */ __name(function(l) {
    return new r.default(l);
  }, "u");
  Object.assign(u, n), delete u.__esModule;
  var s = u;
  e.default = s, t.exports = e.default;
});
var tg = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "default", { enumerable: true, get: () => t });
  function t(r) {
    return r.replace(/\\,/g, "\\2c ");
  }
  __name(t, "t");
});
var rg = le((e, t) => {
  "use strict";
  t.exports = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] };
});
var rl = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true });
  function t(D, d) {
    for (var g in d)
      Object.defineProperty(D, g, { enumerable: true, get: d[g] });
  }
  __name(t, "t");
  t(e, { parseColor: () => p, formatColor: () => v });
  var r = n(rg());
  function n(D) {
    return D && D.__esModule ? D : { default: D };
  }
  __name(n, "n");
  var i = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i, a = /^#([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i, o = /(?:\d+|\d*\.\d+)%?/, u = /(?:\s*,\s*|\s+)/, s = /\s*[,/]\s*/, l = /var\(--(?:[^ )]*?)\)/, f = new RegExp(`^(rgb)a?\\(\\s*(${o.source}|${l.source})(?:${u.source}(${o.source}|${l.source}))?(?:${u.source}(${o.source}|${l.source}))?(?:${s.source}(${o.source}|${l.source}))?\\s*\\)$`), c = new RegExp(`^(hsl)a?\\(\\s*((?:${o.source})(?:deg|rad|grad|turn)?|${l.source})(?:${u.source}(${o.source}|${l.source}))?(?:${u.source}(${o.source}|${l.source}))?(?:${s.source}(${o.source}|${l.source}))?\\s*\\)$`);
  function p(D, { loose: d = false } = {}) {
    var g, y;
    if (typeof D != "string")
      return null;
    if (D = D.trim(), D === "transparent")
      return { mode: "rgb", color: ["0", "0", "0"], alpha: "0" };
    if (D in r.default)
      return { mode: "rgb", color: r.default[D].map((E) => E.toString()) };
    let b = D.replace(a, (E, L, _, U, N) => ["#", L, L, _, _, U, U, N ? N + N : ""].join("")).match(i);
    if (b !== null)
      return { mode: "rgb", color: [parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16)].map((E) => E.toString()), alpha: b[4] ? (parseInt(b[4], 16) / 255).toString() : void 0 };
    var S;
    let k = (S = D.match(f)) !== null && S !== void 0 ? S : D.match(c);
    if (k === null)
      return null;
    let C = [k[2], k[3], k[4]].filter(Boolean).map((E) => E.toString());
    return !d && C.length !== 3 || C.length < 3 && !C.some((E) => /^var\(.*?\)$/.test(E)) ? null : { mode: k[1], color: C, alpha: (g = k[5]) === null || g === void 0 || (y = g.toString) === null || y === void 0 ? void 0 : y.call(g) };
  }
  __name(p, "p");
  function v({ mode: D, color: d, alpha: g }) {
    let y = g !== void 0;
    return `${D}(${d.join(" ")}${y ? ` / ${g}` : ""})`;
  }
  __name(v, "v");
});
var nl = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true });
  function t(a, o) {
    for (var u in o)
      Object.defineProperty(a, u, { enumerable: true, get: o[u] });
  }
  __name(t, "t");
  t(e, { withAlphaValue: () => n, default: () => i });
  var r = rl();
  function n(a, o, u) {
    if (typeof a == "function")
      return a({ opacityValue: o });
    let s = (0, r.parseColor)(a, { loose: true });
    return s === null ? u : (0, r.formatColor)({ ...s, alpha: o });
  }
  __name(n, "n");
  function i({ color: a, property: o, variable: u }) {
    let s = [].concat(o);
    if (typeof a == "function")
      return { [u]: "1", ...Object.fromEntries(s.map((f) => [f, a({ opacityVariable: u, opacityValue: `var(${u})` })])) };
    let l = (0, r.parseColor)(a);
    return l === null ? Object.fromEntries(s.map((f) => [f, a])) : l.alpha !== void 0 ? Object.fromEntries(s.map((f) => [f, a])) : { [u]: "1", ...Object.fromEntries(s.map((f) => [f, (0, r.formatColor)({ ...l, alpha: `var(${u})` })])) };
  }
  __name(i, "i");
});
var ng = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true });
  function t(p, v) {
    for (var D in v)
      Object.defineProperty(p, D, { enumerable: true, get: v[D] });
  }
  __name(t, "t");
  t(e, { pattern: () => a, withoutCapturing: () => o, any: () => u, optional: () => s, zeroOrMore: () => l, nestedBrackets: () => f, escape: () => c });
  var r = /[\\^$.*+?()[\]{}|]/g, n = RegExp(r.source);
  function i(p) {
    return p = Array.isArray(p) ? p : [p], p = p.map((v) => v instanceof RegExp ? v.source : v), p.join("");
  }
  __name(i, "i");
  function a(p) {
    return new RegExp(i(p), "g");
  }
  __name(a, "a");
  function o(p) {
    return new RegExp(`(?:${i(p)})`, "g");
  }
  __name(o, "o");
  function u(p) {
    return `(?:${p.map(i).join("|")})`;
  }
  __name(u, "u");
  function s(p) {
    return `(?:${i(p)})?`;
  }
  __name(s, "s");
  function l(p) {
    return `(?:${i(p)})*`;
  }
  __name(l, "l");
  function f(p, v, D = 1) {
    return o([c(p), /[^\s]*/, D === 1 ? `[^${c(p)}${c(v)}s]*` : u([`[^${c(p)}${c(v)}s]*`, f(p, v, D - 1)]), /[^\s]*/, c(v)]);
  }
  __name(f, "f");
  function c(p) {
    return p && n.test(p) ? p.replace(r, "\\$&") : p || "";
  }
  __name(c, "c");
});
var ig = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "splitAtTopLevelOnly", { enumerable: true, get: () => i });
  var t = n(ng());
  function r(a) {
    if (typeof WeakMap != "function")
      return null;
    var o = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap();
    return (r = /* @__PURE__ */ __name(function(s) {
      return s ? u : o;
    }, "r"))(a);
  }
  __name(r, "r");
  function n(a, o) {
    if (!o && a && a.__esModule)
      return a;
    if (a === null || typeof a != "object" && typeof a != "function")
      return { default: a };
    var u = r(o);
    if (u && u.has(a))
      return u.get(a);
    var s = {}, l = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var f in a)
      if (f !== "default" && Object.prototype.hasOwnProperty.call(a, f)) {
        var c = l ? Object.getOwnPropertyDescriptor(a, f) : null;
        c && (c.get || c.set) ? Object.defineProperty(s, f, c) : s[f] = a[f];
      }
    return s.default = a, u && u.set(a, s), s;
  }
  __name(n, "n");
  function* i(a, o) {
    let u = new RegExp(`[(){}\\[\\]${t.escape(o)}]`, "g"), s = 0, l = 0, f = false, c = 0, p = 0, v = o.length;
    for (let D of a.matchAll(u)) {
      let d = D[0] === o[c], g = c === v - 1, y = d && g;
      D[0] === "(" && s++, D[0] === ")" && s--, D[0] === "[" && s++, D[0] === "]" && s--, D[0] === "{" && s++, D[0] === "}" && s--, d && s === 0 && (p === 0 && (p = D.index), c++), y && s === 0 && (f = true, yield a.substring(l, p), l = p + v), c === v && (c = 0, p = 0);
    }
    f ? yield a.substring(l) : yield a;
  }
  __name(i, "i");
});
var ag = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true });
  function t(s, l) {
    for (var f in l)
      Object.defineProperty(s, f, { enumerable: true, get: l[f] });
  }
  __name(t, "t");
  t(e, { parseBoxShadowValue: () => o, formatBoxShadowValue: () => u });
  var r = ig(), n = /* @__PURE__ */ new Set(["inset", "inherit", "initial", "revert", "unset"]), i = /\ +(?![^(]*\))/g, a = /^-?(\d+|\.\d+)(.*?)$/g;
  function o(s) {
    return Array.from((0, r.splitAtTopLevelOnly)(s, ",")).map((l) => {
      let f = l.trim(), c = { raw: f }, p = f.split(i), v = /* @__PURE__ */ new Set();
      for (let D of p)
        a.lastIndex = 0, !v.has("KEYWORD") && n.has(D) ? (c.keyword = D, v.add("KEYWORD")) : a.test(D) ? v.has("X") ? v.has("Y") ? v.has("BLUR") ? v.has("SPREAD") || (c.spread = D, v.add("SPREAD")) : (c.blur = D, v.add("BLUR")) : (c.y = D, v.add("Y")) : (c.x = D, v.add("X")) : c.color ? (c.unknown || (c.unknown = []), c.unknown.push(D)) : c.color = D;
      return c.valid = c.x !== void 0 && c.y !== void 0, c;
    });
  }
  __name(o, "o");
  function u(s) {
    return s.map((l) => l.valid ? [l.keyword, l.x, l.y, l.blur, l.spread, l.color].filter(Boolean).join(" ") : l.raw).join(", ");
  }
  __name(u, "u");
});
var og = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true });
  function t(A, R) {
    for (var O in R)
      Object.defineProperty(A, O, { enumerable: true, get: R[O] });
  }
  __name(t, "t");
  t(e, { normalize: () => u, url: () => s, number: () => l, percentage: () => f, length: () => v, lineWidth: () => d, shadow: () => g, color: () => y, image: () => b, gradient: () => k, position: () => E, familyName: () => L, genericName: () => U, absoluteSize: () => X, relativeSize: () => ee });
  var r = rl(), n = ag(), i = ["min", "max", "clamp", "calc"], a = /,(?![^(]*\))/g, o = /_(?![^(]*\))/g;
  function u(A, R = true) {
    return A.includes("url(") ? A.split(/(url\(.*?\))/g).filter(Boolean).map((O) => /^url\(.*?\)$/.test(O) ? O : u(O, false)).join("") : (A = A.replace(/([^\\])_+/g, (O, H) => H + " ".repeat(O.length - 1)).replace(/^_/g, " ").replace(/\\_/g, "_"), R && (A = A.trim()), A = A.replace(/(calc|min|max|clamp)\(.+\)/g, (O) => O.replace(/(-?\d*\.?\d(?!\b-.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, "$1 $2 ")), A);
  }
  __name(u, "u");
  function s(A) {
    return A.startsWith("url(");
  }
  __name(s, "s");
  function l(A) {
    return !isNaN(Number(A)) || i.some((R) => new RegExp(`^${R}\\(.+?`).test(A));
  }
  __name(l, "l");
  function f(A) {
    return A.split(o).every((R) => /%$/g.test(R) || i.some((O) => new RegExp(`^${O}\\(.+?%`).test(R)));
  }
  __name(f, "f");
  var c = ["cm", "mm", "Q", "in", "pc", "pt", "px", "em", "ex", "ch", "rem", "lh", "vw", "vh", "vmin", "vmax"], p = `(?:${c.join("|")})`;
  function v(A) {
    return A.split(o).every((R) => R === "0" || new RegExp(`${p}$`).test(R) || i.some((O) => new RegExp(`^${O}\\(.+?${p}`).test(R)));
  }
  __name(v, "v");
  var D = /* @__PURE__ */ new Set(["thin", "medium", "thick"]);
  function d(A) {
    return D.has(A);
  }
  __name(d, "d");
  function g(A) {
    let R = (0, n.parseBoxShadowValue)(u(A));
    for (let O of R)
      if (!O.valid)
        return false;
    return true;
  }
  __name(g, "g");
  function y(A) {
    let R = 0;
    return A.split(o).every((O) => (O = u(O), O.startsWith("var(") ? true : (0, r.parseColor)(O, { loose: true }) !== null ? (R++, true) : false)) ? R > 0 : false;
  }
  __name(y, "y");
  function b(A) {
    let R = 0;
    return A.split(a).every((O) => (O = u(O), O.startsWith("var(") ? true : s(O) || k(O) || ["element(", "image(", "cross-fade(", "image-set("].some((H) => O.startsWith(H)) ? (R++, true) : false)) ? R > 0 : false;
  }
  __name(b, "b");
  var S = /* @__PURE__ */ new Set(["linear-gradient", "radial-gradient", "repeating-linear-gradient", "repeating-radial-gradient", "conic-gradient"]);
  function k(A) {
    A = u(A);
    for (let R of S)
      if (A.startsWith(`${R}(`))
        return true;
    return false;
  }
  __name(k, "k");
  var C = /* @__PURE__ */ new Set(["center", "top", "right", "bottom", "left"]);
  function E(A) {
    let R = 0;
    return A.split(o).every((O) => (O = u(O), O.startsWith("var(") ? true : C.has(O) || v(O) || f(O) ? (R++, true) : false)) ? R > 0 : false;
  }
  __name(E, "E");
  function L(A) {
    let R = 0;
    return A.split(a).every((O) => (O = u(O), O.startsWith("var(") ? true : O.includes(" ") && !/(['"])([^"']+)\1/g.test(O) || /^\d/g.test(O) ? false : (R++, true))) ? R > 0 : false;
  }
  __name(L, "L");
  var _ = /* @__PURE__ */ new Set(["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui", "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded", "math", "emoji", "fangsong"]);
  function U(A) {
    return _.has(A);
  }
  __name(U, "U");
  var N = /* @__PURE__ */ new Set(["xx-small", "x-small", "small", "medium", "large", "x-large", "x-large", "xxx-large"]);
  function X(A) {
    return N.has(A);
  }
  __name(X, "X");
  var Y = /* @__PURE__ */ new Set(["larger", "smaller"]);
  function ee(A) {
    return Y.has(A);
  }
  __name(ee, "ee");
});
var sg = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true });
  function t(E, L) {
    for (var _ in L)
      Object.defineProperty(E, _, { enumerable: true, get: L[_] });
  }
  __name(t, "t");
  t(e, { updateAllClasses: () => s, asValue: () => c, parseColorFormat: () => D, asColor: () => d, asLookupValue: () => g, coerceValue: () => C });
  var r = u(eg()), n = u(tg()), i = nl(), a = og(), o = u(Mu());
  function u(E) {
    return E && E.__esModule ? E : { default: E };
  }
  __name(u, "u");
  function s(E, L) {
    return (0, r.default)((_) => {
      _.walkClasses((U) => {
        let N = L(U.value);
        U.value = N, U.raws && U.raws.value && (U.raws.value = (0, n.default)(U.raws.value));
      });
    }).processSync(E);
  }
  __name(s, "s");
  function l(E, L) {
    if (!p(E))
      return;
    let _ = E.slice(1, -1);
    if (L(_))
      return (0, a.normalize)(_);
  }
  __name(l, "l");
  function f(E, L = {}, _) {
    let U = L[E];
    if (U !== void 0)
      return (0, o.default)(U);
    if (p(E)) {
      let N = l(E, _);
      return N === void 0 ? void 0 : (0, o.default)(N);
    }
  }
  __name(f, "f");
  function c(E, L = {}, { validate: _ = /* @__PURE__ */ __name(() => true, "_") } = {}) {
    var U;
    let N = (U = L.values) === null || U === void 0 ? void 0 : U[E];
    return N !== void 0 ? N : L.supportsNegativeValues && E.startsWith("-") ? f(E.slice(1), L.values, _) : l(E, _);
  }
  __name(c, "c");
  function p(E) {
    return E.startsWith("[") && E.endsWith("]");
  }
  __name(p, "p");
  function v(E) {
    let L = E.lastIndexOf("/");
    return L === -1 || L === E.length - 1 ? [E] : [E.slice(0, L), E.slice(L + 1)];
  }
  __name(v, "v");
  function D(E) {
    if (typeof E == "string" && E.includes("<alpha-value>")) {
      let L = E;
      return ({ opacityValue: _ = 1 }) => L.replace("<alpha-value>", _);
    }
    return E;
  }
  __name(D, "D");
  function d(E, L = {}, { tailwindConfig: _ = {} } = {}) {
    var U;
    if (((U = L.values) === null || U === void 0 ? void 0 : U[E]) !== void 0) {
      var N;
      return D((N = L.values) === null || N === void 0 ? void 0 : N[E]);
    }
    let [X, Y] = v(E);
    if (Y !== void 0) {
      var ee, A, R, O;
      let H = (O = (ee = L.values) === null || ee === void 0 ? void 0 : ee[X]) !== null && O !== void 0 ? O : p(X) ? X.slice(1, -1) : void 0;
      return H === void 0 ? void 0 : (H = D(H), p(Y) ? (0, i.withAlphaValue)(H, Y.slice(1, -1)) : ((A = _.theme) === null || A === void 0 || (R = A.opacity) === null || R === void 0 ? void 0 : R[Y]) === void 0 ? void 0 : (0, i.withAlphaValue)(H, _.theme.opacity[Y]));
    }
    return c(E, L, { validate: a.color });
  }
  __name(d, "d");
  function g(E, L = {}) {
    var _;
    return (_ = L.values) === null || _ === void 0 ? void 0 : _[E];
  }
  __name(g, "g");
  function y(E) {
    return (L, _) => c(L, _, { validate: E });
  }
  __name(y, "y");
  var b = { any: c, color: d, url: y(a.url), image: y(a.image), length: y(a.length), percentage: y(a.percentage), position: y(a.position), lookup: g, "generic-name": y(a.genericName), "family-name": y(a.familyName), number: y(a.number), "line-width": y(a.lineWidth), "absolute-size": y(a.absoluteSize), "relative-size": y(a.relativeSize), shadow: y(a.shadow) }, S = Object.keys(b);
  function k(E, L) {
    let _ = E.indexOf(L);
    return _ === -1 ? [void 0, E] : [E.slice(0, _), E.slice(_ + 1)];
  }
  __name(k, "k");
  function C(E, L, _, U) {
    if (p(L)) {
      let N = L.slice(1, -1), [X, Y] = k(N, ":");
      if (!/^[\w-_]+$/g.test(X))
        Y = N;
      else if (X !== void 0 && !S.includes(X))
        return [];
      if (Y.length > 0 && S.includes(X))
        return [c(`[${Y}]`, _), X];
    }
    for (let N of [].concat(E)) {
      let X = b[N](L, _, { tailwindConfig: U });
      if (X !== void 0)
        return [X, N];
    }
    return [];
  }
  __name(C, "C");
});
var ug = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "default", { enumerable: true, get: () => t });
  function t(r) {
    return typeof r == "function" ? r({}) : r;
  }
  __name(t, "t");
});
var lg = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "default", { enumerable: true, get: () => ee });
  var t = D(Mu()), r = D(Rv()), n = D(Uv()), i = D(Gu()), a = D(Bv()), o = Nv(), u = Mv(), s = Gv(), l = D(Wv()), f = $v(), c = sg(), p = nl(), v = D(ug());
  function D(A) {
    return A && A.__esModule ? A : { default: A };
  }
  __name(D, "D");
  function d(A) {
    return typeof A == "function";
  }
  __name(d, "d");
  function g(A) {
    return typeof A == "object" && A !== null;
  }
  __name(g, "g");
  function y(A, ...R) {
    let O = R.pop();
    for (let H of R)
      for (let Z in H) {
        let te = O(A[Z], H[Z]);
        te === void 0 ? g(A[Z]) && g(H[Z]) ? A[Z] = y(A[Z], H[Z], O) : A[Z] = H[Z] : A[Z] = te;
      }
    return A;
  }
  __name(y, "y");
  var b = { colors: a.default, negative(A) {
    return Object.keys(A).filter((R) => A[R] !== "0").reduce((R, O) => {
      let H = (0, t.default)(A[O]);
      return H !== void 0 && (R[`-${O}`] = H), R;
    }, {});
  }, breakpoints(A) {
    return Object.keys(A).filter((R) => typeof A[R] == "string").reduce((R, O) => ({ ...R, [`screen-${O}`]: A[O] }), {});
  } };
  function S(A, ...R) {
    return d(A) ? A(...R) : A;
  }
  __name(S, "S");
  function k(A) {
    return A.reduce((R, { extend: O }) => y(R, O, (H, Z) => H === void 0 ? [Z] : Array.isArray(H) ? [Z, ...H] : [Z, H]), {});
  }
  __name(k, "k");
  function C(A) {
    return { ...A.reduce((R, O) => (0, o.defaults)(R, O), {}), extend: k(A) };
  }
  __name(C, "C");
  function E(A, R) {
    if (Array.isArray(A) && g(A[0]))
      return A.concat(R);
    if (Array.isArray(R) && g(R[0]) && g(A))
      return [A, ...R];
    if (Array.isArray(R))
      return R;
  }
  __name(E, "E");
  function L({ extend: A, ...R }) {
    return y(R, A, (O, H) => !d(O) && !H.some(d) ? y({}, O, ...H, E) : (Z, te) => y({}, ...[O, ...H].map((re) => S(re, Z, te)), E));
  }
  __name(L, "L");
  function* _(A) {
    let R = (0, u.toPath)(A);
    if (R.length === 0 || (yield R, Array.isArray(A)))
      return;
    let O = /^(.*?)\s*\/\s*([^/]+)$/, H = A.match(O);
    if (H !== null) {
      let [, Z, te] = H, re = (0, u.toPath)(Z);
      re.alpha = te, yield re;
    }
  }
  __name(_, "_");
  function U(A) {
    let R = /* @__PURE__ */ __name((O, H) => {
      for (let Z of _(O)) {
        let te = 0, re = A;
        for (; re != null && te < Z.length; )
          re = re[Z[te++]], re = d(re) && (Z.alpha === void 0 || te <= Z.length - 1) ? re(R, b) : re;
        if (re !== void 0) {
          if (Z.alpha !== void 0) {
            let B = (0, c.parseColorFormat)(re);
            return (0, p.withAlphaValue)(B, Z.alpha, (0, v.default)(B));
          }
          return (0, l.default)(re) ? (0, f.cloneDeep)(re) : re;
        }
      }
      return H;
    }, "R");
    return Object.assign(R, { theme: R, ...b }), Object.keys(A).reduce((O, H) => (O[H] = d(A[H]) ? A[H](R, b) : A[H], O), {});
  }
  __name(U, "U");
  function N(A) {
    let R = [];
    return A.forEach((O) => {
      R = [...R, O];
      var H;
      let Z = (H = O?.plugins) !== null && H !== void 0 ? H : [];
      Z.length !== 0 && Z.forEach((te) => {
        te.__isOptionsFunction && (te = te());
        var re;
        R = [...R, ...N([(re = te?.config) !== null && re !== void 0 ? re : {}])];
      });
    }), R;
  }
  __name(N, "N");
  function X(A) {
    return [...A].reduceRight((R, O) => d(O) ? O({ corePlugins: R }) : (0, n.default)(O, R), r.default);
  }
  __name(X, "X");
  function Y(A) {
    return [...A].reduceRight((R, O) => [...R, ...O], []);
  }
  __name(Y, "Y");
  function ee(A) {
    let R = [...N(A), { prefix: "", important: false, separator: ":", variantOrder: i.default.variantOrder }];
    var O, H;
    return (0, s.normalizeConfig)((0, o.defaults)({ theme: U(L(C(R.map((Z) => (O = Z?.theme) !== null && O !== void 0 ? O : {})))), corePlugins: X(R.map((Z) => Z.corePlugins)), plugins: Y(A.map((Z) => (H = Z?.plugins) !== null && H !== void 0 ? H : [])) }, ...R));
  }
  __name(ee, "ee");
});
var il = {};
Oa(il, { default: () => al });
var al;
var fg = Aa(() => {
  al = { yellow: (e) => e };
});
var cg = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true });
  function t(c, p) {
    for (var v in p)
      Object.defineProperty(c, v, { enumerable: true, get: p[v] });
  }
  __name(t, "t");
  t(e, { flagEnabled: () => u, issueFlagNotices: () => l, default: () => f });
  var r = i((fg(), Xn(il))), n = i((La(), Xn(Qn)));
  function i(c) {
    return c && c.__esModule ? c : { default: c };
  }
  __name(i, "i");
  var a = { optimizeUniversalDefaults: false }, o = { future: ["hoverOnlyWhenSupported", "respectDefaultRingColorOpacity"], experimental: ["optimizeUniversalDefaults", "matchVariant"] };
  function u(c, p) {
    if (o.future.includes(p)) {
      var v, D, d;
      return c.future === "all" || ((d = (D = c == null || (v = c.future) === null || v === void 0 ? void 0 : v[p]) !== null && D !== void 0 ? D : a[p]) !== null && d !== void 0 ? d : false);
    }
    if (o.experimental.includes(p)) {
      var g, y, b;
      return c.experimental === "all" || ((b = (y = c == null || (g = c.experimental) === null || g === void 0 ? void 0 : g[p]) !== null && y !== void 0 ? y : a[p]) !== null && b !== void 0 ? b : false);
    }
    return false;
  }
  __name(u, "u");
  function s(c) {
    if (c.experimental === "all")
      return o.experimental;
    var p;
    return Object.keys((p = c?.experimental) !== null && p !== void 0 ? p : {}).filter((v) => o.experimental.includes(v) && c.experimental[v]);
  }
  __name(s, "s");
  function l(c) {
    if (process.env.JEST_WORKER_ID === void 0 && s(c).length > 0) {
      let p = s(c).map((v) => r.default.yellow(v)).join(", ");
      n.default.warn("experimental-flags-enabled", [`You have enabled experimental features: ${p}`, "Experimental features in Tailwind CSS are not covered by semver, may introduce breaking changes, and can change at any time."]);
    }
  }
  __name(l, "l");
  var f = o;
});
var pg = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "default", { enumerable: true, get: () => i });
  var t = n(Gu()), r = cg();
  function n(a) {
    return a && a.__esModule ? a : { default: a };
  }
  __name(n, "n");
  function i(a) {
    var o;
    let u = ((o = a?.presets) !== null && o !== void 0 ? o : [t.default]).slice().reverse().flatMap((f) => i(typeof f == "function" ? f() : f)), s = { respectDefaultRingColorOpacity: { theme: { ringColor: { DEFAULT: "#3b82f67f" } } } }, l = Object.keys(s).filter((f) => (0, r.flagEnabled)(a, f)).map((f) => s[f]);
    return [a, ...l, ...u];
  }
  __name(i, "i");
});
var hg = le((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "default", { enumerable: true, get: () => i });
  var t = n(lg()), r = n(pg());
  function n(a) {
    return a && a.__esModule ? a : { default: a };
  }
  __name(n, "n");
  function i(...a) {
    let [, ...o] = (0, r.default)(a[0]);
    return (0, t.default)([...a, ...o]);
  }
  __name(i, "i");
});
var dg = le((e, t) => {
  var r = hg();
  t.exports = (r.__esModule ? r : { default: r }).default;
});
var en;
function ol(e) {
  en = e;
}
__name(ol, "ol");
var Yr = null;
async function Kn() {
  return en || (Yr ? (await Yr, en) : (Yr = Promise.resolve().then(() => (Iv(), Nu)).then((e) => e.getYogaModule()).then((e) => en = e), await Yr, Yr = null, en));
}
__name(Kn, "Kn");
var nn = /* @__PURE__ */ __name((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "nn");
var vg = nn((e, t) => {
  t.exports = ["em", "ex", "ch", "rem", "vh", "vw", "vmin", "vmax", "px", "mm", "cm", "in", "pt", "pc", "mozmm"];
});
var gg = nn((e, t) => {
  t.exports = ["deg", "grad", "rad", "turn"];
});
var mg = nn((e, t) => {
  t.exports = ["dpi", "dpcm", "dppx"];
});
var Dg = nn((e, t) => {
  t.exports = ["Hz", "kHz"];
});
var yg = nn((e, t) => {
  t.exports = ["s", "ms"];
});
var bg = vg();
var sl = gg();
var ul = mg();
var ll = Dg();
var fl = yg();
function Ua(e) {
  if (/\.\D?$/.test(e))
    throw new Error("The dot should be followed by a number");
  if (/^[+-]{2}/.test(e))
    throw new Error("Only one leading +/- is allowed");
  if (xg(e) > 1)
    throw new Error("Only one dot is allowed");
  if (/%$/.test(e)) {
    this.type = "percentage", this.value = ca(e), this.unit = "%";
    return;
  }
  var t = Eg(e);
  if (!t) {
    this.type = "number", this.value = ca(e);
    return;
  }
  this.type = Cg(t), this.value = ca(e.substr(0, e.length - t.length)), this.unit = t;
}
__name(Ua, "Ua");
Ua.prototype.valueOf = function() {
  return this.value;
};
Ua.prototype.toString = function() {
  return this.value + (this.unit || "");
};
function ei(e) {
  return new Ua(e);
}
__name(ei, "ei");
function xg(e) {
  var t = e.match(/\./g);
  return t ? t.length : 0;
}
__name(xg, "xg");
function ca(e) {
  var t = parseFloat(e);
  if (isNaN(t))
    throw new Error("Invalid number: " + e);
  return t;
}
__name(ca, "ca");
var wg = [].concat(sl, ll, bg, ul, fl);
function Eg(e) {
  var t = e.match(/\D+$/), r = t && t[0];
  if (r && wg.indexOf(r) === -1)
    throw new Error("Invalid unit: " + r);
  return r;
}
__name(Eg, "Eg");
var Fg = Object.assign(Pn(sl, "angle"), Pn(ll, "frequency"), Pn(ul, "resolution"), Pn(fl, "time"));
function Pn(e, t) {
  return Object.fromEntries(e.map((r) => [r, t]));
}
__name(Pn, "Pn");
function Cg(e) {
  return Fg[e] || "length";
}
__name(Cg, "Cg");
function jn(e) {
  let t = typeof e;
  return !(t === "number" || t === "bigint" || t === "string" || t === "boolean");
}
__name(jn, "jn");
function Sg(e) {
  return /^class\s/.test(e.toString());
}
__name(Sg, "Sg");
function kg(e) {
  return "dangerouslySetInnerHTML" in e;
}
__name(kg, "kg");
function _g(e) {
  let t = typeof e > "u" ? [] : [].concat(e).flat(1 / 0), r = [];
  for (let n = 0; n < t.length; n++) {
    let i = t[n];
    typeof i > "u" || typeof i == "boolean" || i === null || (typeof i == "number" && (i = String(i)), typeof i == "string" && r.length && typeof r[r.length - 1] == "string" ? r[r.length - 1] += i : r.push(i));
  }
  return r;
}
__name(_g, "_g");
function Ue(e, t, r, n, i = false) {
  if (typeof e == "number")
    return e;
  try {
    if (e = e.trim(), /[ /\(,]/.test(e))
      return;
    if (e === String(+e))
      return +e;
    let a = new ei(e);
    if (a.type === "length")
      switch (a.unit) {
        case "em":
          return a.value * t;
        case "rem":
          return a.value * 16;
        case "vw":
          return ~~(a.value * n._viewportWidth / 100);
        case "vh":
          return ~~(a.value * n._viewportHeight / 100);
        default:
          return a.value;
      }
    else if (a.type === "angle")
      switch (a.unit) {
        case "deg":
          return a.value;
        case "rad":
          return a.value * 180 / Math.PI;
        default:
          return a.value;
      }
    else if (a.type === "percentage" && i)
      return a.value / 100 * r;
  } catch {
  }
}
__name(Ue, "Ue");
function Vn(e, t) {
  return [e[0] * t[0] + e[2] * t[1], e[1] * t[0] + e[3] * t[1], e[0] * t[2] + e[2] * t[3], e[1] * t[2] + e[3] * t[3], e[0] * t[4] + e[2] * t[5] + e[4], e[1] * t[4] + e[3] * t[5] + e[5]];
}
__name(Vn, "Vn");
function Rt(e, t, r, n) {
  let i = t[e];
  if (typeof i > "u") {
    if (n && typeof e < "u")
      throw new Error(`Invalid value for CSS property "${n}". Allowed values: ${Object.keys(t).map((a) => `"${a}"`).join(" | ")}. Received: "${e}".`);
    i = r;
  }
  return i;
}
__name(Rt, "Rt");
var pa;
var ha;
var Tg = [32, 160, 4961, 65792, 65793, 4153, 4241, 10].map((e) => String.fromCodePoint(e));
function Bt(e, t, r) {
  if (!pa || !ha) {
    if (!(typeof Intl < "u" && "Segmenter" in Intl))
      throw new Error("Intl.Segmenter does not exist, please use import a polyfill.");
    pa = new Intl.Segmenter(r, { granularity: "word" }), ha = new Intl.Segmenter(r, { granularity: "grapheme" });
  }
  if (t === "grapheme")
    return [...ha.segment(e)].map((n) => n.segment);
  {
    let n = [...pa.segment(e)].map((o) => o.segment), i = [], a = 0;
    for (; a < n.length; ) {
      let o = n[a];
      if (o == "\xA0") {
        let u = a === 0 ? "" : i.pop(), s = a === n.length - 1 ? "" : n[a + 1];
        i.push(u + "\xA0" + s), a += 2;
      } else
        i.push(o), a++;
    }
    return i;
  }
}
__name(Bt, "Bt");
function ue(e, t, r) {
  let n = "";
  for (let [i, a] of Object.entries(t))
    typeof a < "u" && (n += ` ${i}="${a}"`);
  return r ? `<${e}${n}>${r}</${e}>` : `<${e}${n}/>`;
}
__name(ue, "ue");
function Ag(e = 20) {
  let t = /* @__PURE__ */ new Map();
  function r(a, o) {
    if (t.size >= e) {
      let u = t.keys().next().value;
      t.delete(u);
    }
    t.set(a, o);
  }
  __name(r, "r");
  function n(a) {
    if (!t.has(a))
      return;
    let o = t.get(a);
    return t.delete(a), t.set(a, o), o;
  }
  __name(n, "n");
  function i() {
    t.clear();
  }
  __name(i, "i");
  return { set: r, get: n, clear: i };
}
__name(Ag, "Ag");
function Ba(e) {
  return e ? e.split(/[, ]/).filter(Boolean).map(Number) : null;
}
__name(Ba, "Ba");
function Og(e) {
  return Object.prototype.toString.call(e);
}
__name(Og, "Og");
function cl(e) {
  return typeof e == "string";
}
__name(cl, "cl");
function Lg(e) {
  return typeof e == "number";
}
__name(Lg, "Lg");
function Pg(e) {
  return Og(e) === "[object Undefined]";
}
__name(Pg, "Pg");
function Ig(e, t) {
  if (t === "break-all")
    return { words: Bt(e, "grapheme"), requiredBreaks: [] };
  if (t === "keep-all")
    return { words: Bt(e, "word"), requiredBreaks: [] };
  let r = new Fi(e), n = 0, i = r.nextBreak(), a = [], o = [false];
  for (; i; ) {
    let u = e.slice(n, i.position);
    a.push(u), i.required ? o.push(true) : o.push(false), n = i.position, i = r.nextBreak();
  }
  return { words: a, requiredBreaks: o };
}
__name(Ig, "Ig");
var Rg = /* @__PURE__ */ __name((e) => e.replaceAll(/([A-Z])/g, (t, r) => `-${r.toLowerCase()}`), "Rg");
var Ug = "image/avif";
var Bg = "image/webp";
var ti = "image/apng";
var ri = "image/png";
var ni = "image/jpeg";
var ii = "image/gif";
var Na = "image/svg+xml";
function pl(e) {
  let t = new DataView(e), r = 4, n = t.byteLength;
  for (; r < n; ) {
    let i = t.getUint16(r, false);
    if (i > n)
      throw new TypeError("Invalid JPEG");
    let a = t.getUint8(i + 1 + r);
    if (a === 192 || a === 193 || a === 194)
      return [t.getUint16(i + 7 + r, false), t.getUint16(i + 5 + r, false)];
    r += i + 2;
  }
  throw new TypeError("Invalid JPEG");
}
__name(pl, "pl");
function hl(e) {
  let t = new Uint8Array(e.slice(6, 10));
  return [t[0] | t[1] << 8, t[2] | t[3] << 8];
}
__name(hl, "hl");
function dl(e) {
  let t = new DataView(e);
  return [t.getUint16(18, false), t.getUint16(22, false)];
}
__name(dl, "dl");
var hr = Ag(100);
var da = /* @__PURE__ */ new Map();
var Ng = [ri, ti, ni, ii, Na];
function Mg(e) {
  let t = "", r = new Uint8Array(e);
  for (let n = 0; n < r.byteLength; n++)
    t += String.fromCharCode(r[n]);
  return btoa(t);
}
__name(Mg, "Mg");
function Gg(e) {
  let t = atob(e), r = t.length, n = new Uint8Array(r);
  for (let i = 0; i < r; i++)
    n[i] = t.charCodeAt(i);
  return n.buffer;
}
__name(Gg, "Gg");
function lu(e, t) {
  let r = t.match(/<svg[^>]*>/)[0], n = r.match(/viewBox=['"](.+)['"]/), i = n ? Ba(n[1]) : null, a = r.match(/width=['"](\d*\.\d+|\d+)['"]/), o = r.match(/height=['"](\d*\.\d+|\d+)['"]/);
  if (!i && (!a || !o))
    throw new Error(`Failed to parse SVG from ${e}: missing "viewBox"`);
  let u = i ? [i[2], i[3]] : [+a[1], +o[1]], s = u[0] / u[1];
  return a && o ? [+a[1], +o[1]] : a ? [+a[1], +a[1] / s] : o ? [+o[1] * s, +o[1]] : [u[0], u[1]];
}
__name(lu, "lu");
function fu(e) {
  let t, r = Wg(new Uint8Array(e));
  switch (r) {
    case ri:
    case ti:
      t = dl(e);
      break;
    case ii:
      t = hl(e);
      break;
    case ni:
      t = pl(e);
      break;
  }
  if (!Ng.includes(r))
    throw new Error(`Unsupported image type: ${r || "unknown"}`);
  return [`data:${r};base64,${Mg(e)}`, t];
}
__name(fu, "fu");
async function Ma(e) {
  if (!e)
    throw new Error("Image source is not provided.");
  if (typeof e == "object") {
    let [i, a] = fu(e);
    return [i, ...a];
  }
  if ((e.startsWith('"') && e.endsWith('"') || e.startsWith("'") && e.endsWith("'")) && (e = e.slice(1, -1)), typeof window > "u" && !e.startsWith("http") && !e.startsWith("data:"))
    throw new Error(`Image source must be an absolute URL: ${e}`);
  if (e.startsWith("data:")) {
    let i;
    try {
      i = /data:(?<imageType>[a-z/+]+)(;(charset=)?(?<encodingType>.*))?,(?<dataString>.*)/g.exec(e).groups;
    } catch {
      return console.warn("Image data URI resolved without size:" + e), [e];
    }
    let { imageType: a, encodingType: o, dataString: u } = i;
    if (a === Na) {
      let s = o === "base64" ? atob(u) : decodeURIComponent(u.replace(/ /g, "%20")), l = o === "base64" ? e : `data:image/svg+xml;base64,${btoa(s)}`, f = lu(e, s);
      return hr.set(e, [l, ...f]), [l, ...f];
    } else if (o === "base64") {
      let s, l = Gg(u);
      switch (a) {
        case ri:
        case ti:
          s = dl(l);
          break;
        case ii:
          s = hl(l);
          break;
        case ni:
          s = pl(l);
          break;
      }
      return hr.set(e, [e, ...s]), [e, ...s];
    } else
      return console.warn("Image data URI resolved without size:" + e), hr.set(e, [e]), [e];
  }
  if (!globalThis.fetch)
    throw new Error("`fetch` is required to be polyfilled to load images.");
  if (da.has(e))
    return da.get(e);
  let t = hr.get(e);
  if (t)
    return t;
  let r = e, n = fetch(r).then((i) => {
    let a = i.headers.get("content-type");
    return a === "image/svg+xml" || a === "application/svg+xml" ? i.text() : i.arrayBuffer();
  }).then((i) => {
    if (typeof i == "string")
      try {
        let u = `data:image/svg+xml;base64,${btoa(i)}`, s = lu(r, i);
        return [u, ...s];
      } catch (u) {
        throw new Error(`Failed to parse SVG image: ${u.message}`);
      }
    let [a, o] = fu(i);
    return [a, ...o];
  }).then((i) => (hr.set(r, i), i)).catch((i) => (console.error(`Can't load image ${r}: ` + i.message), hr.set(r, []), []));
  return da.set(r, n), n;
}
__name(Ma, "Ma");
function Wg(e) {
  return [255, 216, 255].every((t, r) => e[r] === t) ? ni : [137, 80, 78, 71, 13, 10, 26, 10].every((t, r) => e[r] === t) ? $g(e) ? ti : ri : [71, 73, 70, 56].every((t, r) => e[r] === t) ? ii : [82, 73, 70, 70, 0, 0, 0, 0, 87, 69, 66, 80].every((t, r) => !t || e[r] === t) ? Bg : [60, 63, 120, 109, 108].every((t, r) => e[r] === t) ? Na : [0, 0, 0, 0, 102, 116, 121, 112, 97, 118, 105, 102].every((t, r) => !t || e[r] === t) ? Ug : null;
}
__name(Wg, "Wg");
function $g(e) {
  let t = new DataView(e.buffer), r, n, i = 8, a = false;
  for (; !a && r !== "IEND" && i < e.length; ) {
    n = t.getUint32(i);
    let o = e.subarray(i + 4, i + 8);
    r = String.fromCharCode(...o), a = r === "acTL", i += 12 + n;
  }
  return a;
}
__name($g, "$g");
var Ea = { accentHeight: "accent-height", alignmentBaseline: "alignment-baseline", arabicForm: "arabic-form", baselineShift: "baseline-shift", capHeight: "cap-height", clipPath: "clip-path", clipRule: "clip-rule", colorInterpolation: "color-interpolation", colorInterpolationFilters: "color-interpolation-filters", colorProfile: "color-profile", colorRendering: "color-rendering", dominantBaseline: "dominant-baseline", enableBackground: "enable-background", fillOpacity: "fill-opacity", fillRule: "fill-rule", floodColor: "flood-color", floodOpacity: "flood-opacity", fontFamily: "font-family", fontSize: "font-size", fontSizeAdjust: "font-size-adjust", fontStretch: "font-stretch", fontStyle: "font-style", fontVariant: "font-variant", fontWeight: "font-weight", glyphName: "glyph-name", glyphOrientationHorizontal: "glyph-orientation-horizontal", glyphOrientationVertical: "glyph-orientation-vertical", horizAdvX: "horiz-adv-x", horizOriginX: "horiz-origin-x", href: "href", imageRendering: "image-rendering", letterSpacing: "letter-spacing", lightingColor: "lighting-color", markerEnd: "marker-end", markerMid: "marker-mid", markerStart: "marker-start", overlinePosition: "overline-position", overlineThickness: "overline-thickness", paintOrder: "paint-order", panose1: "panose-1", pointerEvents: "pointer-events", renderingIntent: "rendering-intent", shapeRendering: "shape-rendering", stopColor: "stop-color", stopOpacity: "stop-opacity", strikethroughPosition: "strikethrough-position", strikethroughThickness: "strikethrough-thickness", strokeDasharray: "stroke-dasharray", strokeDashoffset: "stroke-dashoffset", strokeLinecap: "stroke-linecap", strokeLinejoin: "stroke-linejoin", strokeMiterlimit: "stroke-miterlimit", strokeOpacity: "stroke-opacity", strokeWidth: "stroke-width", textAnchor: "text-anchor", textDecoration: "text-decoration", textRendering: "text-rendering", underlinePosition: "underline-position", underlineThickness: "underline-thickness", unicodeBidi: "unicode-bidi", unicodeRange: "unicode-range", unitsPerEm: "units-per-em", vAlphabetic: "v-alphabetic", vHanging: "v-hanging", vIdeographic: "v-ideographic", vMathematical: "v-mathematical", vectorEffect: "vector-effect", vertAdvY: "vert-adv-y", vertOriginX: "vert-origin-x", vertOriginY: "vert-origin-y", wordSpacing: "word-spacing", writingMode: "writing-mode", xHeight: "x-height", xlinkActuate: "xlink:actuate", xlinkArcrole: "xlink:arcrole", xlinkHref: "xlink:href", xlinkRole: "xlink:role", xlinkShow: "xlink:show", xlinkTitle: "xlink:title", xlinkType: "xlink:type", xmlBase: "xml:base", xmlLang: "xml:lang", xmlSpace: "xml:space", xmlnsXlink: "xmlns:xlink" };
var jg = /[\r\n%#()<>?[\\\]^`{|}"']/g;
function Fa(e, t) {
  if (!e)
    return "";
  if (Array.isArray(e))
    return e.map((l) => Fa(l, t)).join("");
  if (typeof e != "object")
    return String(e);
  let r = e.type;
  if (r === "text")
    throw new Error("<text> nodes are not currently supported, please convert them to <path>");
  let { children: n, style: i, ...a } = e.props || {}, o = i?.color || t, u = `${Object.entries(a).map(([l, f]) => (typeof f == "string" && f.toLowerCase() === "currentcolor" && (f = o), l === "href" && r === "image" ? ` ${Ea[l] || l}="${hr.get(f)[0]}"` : ` ${Ea[l] || l}="${f}"`)).join("")}`, s = i ? ` style="${Object.entries(i).map(([l, f]) => `${Rg(l)}:${f}`).join(";")}"` : "";
  return `<${r}${u}${s}>${Fa(n, o)}</${r}>`;
}
__name(Fa, "Fa");
async function Vg(e) {
  let t = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ __name((n) => {
    if (n && jn(n)) {
      if (Array.isArray(n)) {
        n.forEach((i) => r(i));
        return;
      } else
        typeof n == "object" && (n.type === "image" ? t.has(n.props.href) || t.add(n.props.href) : n.type === "img" && (t.has(n.props.src) || t.add(n.props.src)));
      Array.isArray(n.props.children) ? n.props.children.map((i) => r(i)) : r(n.props.children);
    }
  }, "r");
  return r(e), Promise.all(Array.from(t).map((n) => Ma(n)));
}
__name(Vg, "Vg");
async function zg(e, t) {
  let { viewBox: r, viewbox: n, width: i, height: a, className: o, style: u, children: s, ...l } = e.props || {};
  r ||= n, l.xmlns = "http://www.w3.org/2000/svg";
  let f = u?.color || t, c = Ba(r), p = c ? c[3] / c[2] : null;
  return i = i || p && a ? a / p : null, a = a || p && i ? i * p : null, l.width = i, l.height = a, r && (l.viewBox = r), `data:image/svg+xml;utf8,${`<svg ${Object.entries(l).map(([v, D]) => (typeof D == "string" && D.toLowerCase() === "currentcolor" && (D = f), ` ${Ea[v] || v}="${D}"`)).join("")}>${Fa(s, f)}</svg>`.replace(jg, encodeURIComponent)}`;
}
__name(zg, "zg");
var Et = "flex";
var Hg = { p: { display: Et, marginTop: "1em", marginBottom: "1em" }, div: { display: Et }, blockquote: { display: Et, marginTop: "1em", marginBottom: "1em", marginLeft: 40, marginRight: 40 }, center: { display: Et, textAlign: "center" }, hr: { display: Et, marginTop: "0.5em", marginBottom: "0.5em", marginLeft: "auto", marginRight: "auto", borderWidth: 1, borderStyle: "solid" }, h1: { display: Et, fontSize: "2em", marginTop: "0.67em", marginBottom: "0.67em", marginLeft: 0, marginRight: 0, fontWeight: "bold" }, h2: { display: Et, fontSize: "1.5em", marginTop: "0.83em", marginBottom: "0.83em", marginLeft: 0, marginRight: 0, fontWeight: "bold" }, h3: { display: Et, fontSize: "1.17em", marginTop: "1em", marginBottom: "1em", marginLeft: 0, marginRight: 0, fontWeight: "bold" }, h4: { display: Et, marginTop: "1.33em", marginBottom: "1.33em", marginLeft: 0, marginRight: 0, fontWeight: "bold" }, h5: { display: Et, fontSize: "0.83em", marginTop: "1.67em", marginBottom: "1.67em", marginLeft: 0, marginRight: 0, fontWeight: "bold" }, h6: { display: Et, fontSize: "0.67em", marginTop: "2.33em", marginBottom: "2.33em", marginLeft: 0, marginRight: 0, fontWeight: "bold" }, u: { textDecoration: "underline" }, strong: { fontWeight: "bold" }, b: { fontWeight: "bold" }, i: { fontStyle: "italic" }, em: { fontStyle: "italic" }, code: { fontFamily: "monospace" }, kbd: { fontFamily: "monospace" }, pre: { display: Et, fontFamily: "monospace", whiteSpace: "pre", marginTop: "1em", marginBottom: "1em" }, mark: { backgroundColor: "yellow", color: "black" }, big: { fontSize: "larger" }, small: { fontSize: "smaller" }, s: { textDecoration: "line-through" } };
var Xg = /* @__PURE__ */ new Set(["color", "font", "fontFamily", "fontSize", "fontStyle", "fontWeight", "letterSpacing", "lineHeight", "textAlign", "textTransform", "textShadowOffset", "textShadowColor", "textShadowRadius", "textDecorationLine", "textDecorationStyle", "textDecorationColor", "whiteSpace", "transform", "wordBreak", "tabSize", "opacity", "filter", "_viewportWidth", "_viewportHeight", "_inheritedClipPathId", "_inheritedMaskId", "_inheritedBackgroundClipTextPath"]);
function qg(e) {
  let t = {};
  for (let r in e)
    Xg.has(r) && (t[r] = e[r]);
  return t;
}
__name(qg, "qg");
function Yg(e, t) {
  try {
    let r = new ei(e);
    switch (r.unit) {
      case "px":
        return { absolute: r.value };
      case "em":
        return { absolute: r.value * t };
      case "rem":
        return { absolute: r.value * 16 };
      case "%":
        return { relative: r.value };
      default:
        return {};
    }
  } catch {
    return {};
  }
}
__name(Yg, "Yg");
function va(e, t, r) {
  switch (e) {
    case "top":
      return { yRelative: 0 };
    case "left":
      return { xRelative: 0 };
    case "right":
      return { xRelative: 100 };
    case "bottom":
      return { yRelative: 100 };
    case "center":
      return {};
    default: {
      let n = Yg(e, t);
      return n.absolute ? { [r ? "xAbsolute" : "yAbsolute"]: n.absolute } : n.relative ? { [r ? "xRelative" : "yRelative"]: n.relative } : {};
    }
  }
}
__name(va, "va");
function Zg(e, t) {
  if (typeof e == "number")
    return { xAbsolute: e };
  let r;
  try {
    r = (0, Dl.default)(e).nodes.filter((n) => n.type === "word").map((n) => n.value);
  } catch {
    return {};
  }
  return r.length === 1 ? va(r[0], t, true) : r.length === 2 ? ((r[0] === "top" || r[0] === "bottom" || r[1] === "left" || r[1] === "right") && r.reverse(), { ...va(r[0], t, true), ...va(r[1], t, false) }) : {};
}
__name(Zg, "Zg");
function Zr(e, t) {
  let r = (0, yl.getPropertyName)(`mask-${t}`);
  return e[r] || e[`WebkitM${r.substring(1)}`];
}
__name(Zr, "Zr");
function Qg(e) {
  let t = [], r = 0, n = 0;
  for (let i = 0; i < e.length; i++)
    e[i] === "(" ? n++ : e[i] === ")" && n--, n === 0 && e[i] === "," && (t.push(e.slice(r, i).trim()), r = i + 1);
  return t.push(e.slice(r).trim()), t;
}
__name(Qg, "Qg");
function Jg(e) {
  let t = e.maskImage || e.WebkitMaskImage, r = { position: Zr(e, "position") || "0% 0%", size: Zr(e, "size") || "100% 100%", repeat: Zr(e, "repeat") || "repeat", origin: Zr(e, "origin") || "border-box", clip: Zr(e, "origin") || "border-box" };
  return Qg(t).filter((n) => n && n !== "none").reverse().map((n) => ({ image: n, ...r }));
}
__name(Jg, "Jg");
var Kg = /* @__PURE__ */ new Set(["flex", "flexGrow", "flexShrink", "flexBasis", "fontWeight", "lineHeight", "opacity", "scale", "scaleX", "scaleY"]);
var e1 = /* @__PURE__ */ new Set(["lineHeight"]);
function t1(e, t, r, n) {
  return e === "textDecoration" && !r.includes(t.textDecorationColor) && (t.textDecorationColor = n), t;
}
__name(t1, "t1");
function tn(e, t) {
  return typeof t == "number" ? Kg.has(e) ? e1.has(e) ? t : String(t) : t + "px" : t;
}
__name(tn, "tn");
function r1(e, t, r) {
  if (e === "lineHeight")
    return { lineHeight: tn(e, t) };
  if (e === "fontFamily")
    return { fontFamily: t.split(",").map((n) => n.trim().replace(/(^['"])|(['"]$)/g, "").toLocaleLowerCase()) };
  if (e === "borderRadius") {
    if (typeof t != "string" || !t.includes("/"))
      return;
    let [n, i] = t.split("/"), a = (0, Ut.getStylesForProperty)(e, n, true), o = (0, Ut.getStylesForProperty)(e, i, true);
    for (let u in a)
      o[u] = tn(e, a[u]) + " " + tn(e, o[u]);
    return o;
  }
  if (/^border(Top|Right|Bottom|Left)?$/.test(e)) {
    let n = (0, Ut.getStylesForProperty)("border", t, true);
    n.borderWidth === 1 && !String(t).includes("1px") && (n.borderWidth = 3), n.borderColor === "black" && !String(t).includes("black") && (n.borderColor = r);
    let i = { Width: tn(e + "Width", n.borderWidth), Style: Rt(n.borderStyle, { solid: "solid", dashed: "dashed" }, "solid", e + "Style"), Color: n.borderColor }, a = {};
    for (let o of e === "border" ? ["Top", "Right", "Bottom", "Left"] : [e.slice(6)])
      for (let u in i)
        a["border" + o + u] = i[u];
    return a;
  }
  if (e === "boxShadow") {
    if (!t)
      throw new Error('Invalid `boxShadow` value: "' + t + '".');
    return { [e]: typeof t == "string" ? (0, gl.parse)(t) : t };
  }
  if (e === "transform") {
    if (typeof t != "string")
      throw new Error("Invalid `transform` value.");
    let n = {}, i = t.replace(/(-?[\d.]+%)/g, (o, u) => {
      let s = ~~(Math.random() * 1e9);
      return n[s] = u, s + "px";
    }), a = (0, Ut.getStylesForProperty)("transform", i, true);
    for (let o of a.transform)
      for (let u in o)
        n[o[u]] && (o[u] = n[o[u]]);
    return a;
  }
  if (e === "background")
    return t = t.toString().trim(), /^(linear-gradient|radial-gradient|url)\(/.test(t) ? (0, Ut.getStylesForProperty)("backgroundImage", t, true) : (0, Ut.getStylesForProperty)("background", t, true);
  if (e === "textShadow" && (t = t.toString().trim(), t.includes(","))) {
    let n = n1(t), i = {};
    for (let a of n) {
      let o = (0, Ut.getStylesForProperty)("textShadow", a, true);
      for (let u in o)
        i[u] ? i[u].push(o[u]) : i[u] = [o[u]];
    }
    return i;
  }
}
__name(r1, "r1");
function n1(e) {
  let t = [], r = false, n = 0, i = e.length;
  for (let a = 0; a < i; ++a) {
    let o = e[a];
    o === ")" && (r = false), !r && (o === "(" && (r = true), o === "," && (t.push(e.substring(n, a)), n = a + 1));
  }
  return t.push(e.substring(n, i)), t.map((a) => a.trim());
}
__name(n1, "n1");
function cu(e) {
  return e === "transform" ? " Only absolute lengths such as `10px` are supported." : "";
}
__name(cu, "cu");
var pu = /rgb\((\d+)\s+(\d+)\s+(\d+)\s*\/\s*([\.\d]+)\)/;
function bl(e) {
  if (typeof e == "string" && pu.test(e.trim()))
    return e.trim().replace(pu, (t, r, n, i, a) => `rgba(${r}, ${n}, ${i}, ${a})`);
  if (typeof e == "object" && e !== null) {
    for (let t in e)
      e[t] = bl(e[t]);
    return e;
  }
  return e;
}
__name(bl, "bl");
function hu(e, t) {
  let r = {};
  if (e) {
    let i = a1(e.color, t.color);
    r.color = i;
    for (let a in e) {
      if (a.startsWith("_")) {
        r[a] = e[a];
        continue;
      }
      if (a === "color")
        continue;
      let o = (0, Ut.getPropertyName)(a), u = s1(e[a], i);
      try {
        let s = r1(o, u, i) || t1(o, (0, Ut.getStylesForProperty)(o, tn(o, u), true), u, i);
        Object.assign(r, s);
      } catch (s) {
        throw new Error(s.message + (s.message.includes(u) ? `
  ` + cu(o) : `
  in CSS rule \`${o}: ${u}\`.${cu(o)}`));
      }
    }
  }
  if (r.backgroundImage) {
    let { backgrounds: i } = (0, vl.parseElementStyle)(r);
    r.backgroundImage = i;
  }
  if (r.maskImage || r.WebkitMaskImage) {
    let i = Jg(r);
    r.maskImage = i;
  }
  let n = i1(r.fontSize, t.fontSize);
  typeof r.fontSize < "u" && (r.fontSize = n), r.transformOrigin && (r.transformOrigin = Zg(r.transformOrigin, n));
  for (let i in r) {
    let a = r[i];
    if (i === "lineHeight")
      typeof a == "string" && (a = r[i] = Ue(a, n, n, t, true) / n);
    else {
      if (typeof a == "string") {
        let o = Ue(a, n, n, t);
        typeof o < "u" && (r[i] = o), a = r[i];
      }
      if (typeof a == "string" || typeof a == "object") {
        let o = bl(a);
        o && (r[i] = o), a = r[i];
      }
    }
    if (i === "opacity" && (a = r[i] = a * t.opacity), i === "transform") {
      let o = a;
      for (let u of o) {
        let s = Object.keys(u)[0], l = u[s], f = typeof l == "string" ? Ue(l, n, n, t) ?? l : l;
        u[s] = f;
      }
    }
  }
  return r;
}
__name(hu, "hu");
function i1(e, t) {
  if (typeof e == "number")
    return e;
  try {
    let r = new ei(e);
    switch (r.unit) {
      case "em":
        return r.value * t;
      case "rem":
        return r.value * 16;
    }
  } catch {
    return t;
  }
}
__name(i1, "i1");
function du(e) {
  if (e.startsWith("hsl")) {
    let t = (0, ml.default)(e), [r, n, i] = t.values;
    return `hsl(${[r, `${n}%`, `${i}%`].concat(t.alpha === 1 ? [] : [t.alpha]).join(",")})`;
  }
  return e;
}
__name(du, "du");
function a1(e, t) {
  return e && e.toLowerCase() !== "currentcolor" ? du(e) : du(t);
}
__name(a1, "a1");
function o1(e, t) {
  return e.replace(/currentcolor/gi, t);
}
__name(o1, "o1");
function s1(e, t) {
  return cl(e) && (e = o1(e, t)), e;
}
__name(s1, "s1");
async function u1(e, t, r, n, i) {
  let a = await Kn(), o = { ...r, ...hu(Hg[t], r), ...hu(n, r) };
  if (t === "img") {
    let [u, s, l] = await Ma(i.src);
    if (s === void 0 && l === void 0) {
      if (i.width === void 0 || i.height === void 0)
        throw new Error("Image size cannot be determined. Please provide the width and height of the image.");
      s = parseInt(i.width), l = parseInt(i.height);
    }
    let f = l / s, c = (o.borderLeftWidth || 0) + (o.borderRightWidth || 0) + (o.paddingLeft || 0) + (o.paddingRight || 0), p = (o.borderTopWidth || 0) + (o.borderBottomWidth || 0) + (o.paddingTop || 0) + (o.paddingBottom || 0), v = o.width || i.width, D = o.height || i.height, d = typeof v == "number" && typeof D == "number";
    d && (v -= c, D -= p), v === void 0 && D === void 0 ? (v = "100%", e.setAspectRatio(1 / f)) : v === void 0 ? typeof D == "number" ? v = D / f : e.setAspectRatio(1 / f) : D === void 0 && (typeof v == "number" ? D = v * f : e.setAspectRatio(1 / f)), o.width = d ? v + c : v, o.height = d ? D + p : D, o.__src = u;
  }
  if (t === "svg") {
    let u = i.viewBox || i.viewbox, s = Ba(u), l = s ? s[3] / s[2] : null, { width: f, height: c } = i;
    typeof f > "u" && c ? l == null ? f = 0 : typeof c == "string" && c.endsWith("%") ? f = parseInt(c) / l + "%" : (c = Ue(c, r.fontSize, 1, r), f = c / l) : typeof c > "u" && f ? l == null ? f = 0 : typeof f == "string" && f.endsWith("%") ? c = parseInt(f) * l + "%" : (f = Ue(f, r.fontSize, 1, r), c = f * l) : (typeof f < "u" && (f = Ue(f, r.fontSize, 1, r) || f), typeof c < "u" && (c = Ue(c, r.fontSize, 1, r) || c), f ||= s?.[2], c ||= s?.[3]), !o.width && f && (o.width = f), !o.height && c && (o.height = c);
  }
  return e.setDisplay(Rt(o.display, { flex: a.DISPLAY_FLEX, block: a.DISPLAY_FLEX, none: a.DISPLAY_NONE, "-webkit-box": a.DISPLAY_FLEX }, a.DISPLAY_FLEX, "display")), e.setAlignContent(Rt(o.alignContent, { stretch: a.ALIGN_STRETCH, center: a.ALIGN_CENTER, "flex-start": a.ALIGN_FLEX_START, "flex-end": a.ALIGN_FLEX_END, "space-between": a.ALIGN_SPACE_BETWEEN, "space-around": a.ALIGN_SPACE_AROUND, baseline: a.ALIGN_BASELINE, normal: a.ALIGN_AUTO }, a.ALIGN_AUTO, "alignContent")), e.setAlignItems(Rt(o.alignItems, { stretch: a.ALIGN_STRETCH, center: a.ALIGN_CENTER, "flex-start": a.ALIGN_FLEX_START, "flex-end": a.ALIGN_FLEX_END, baseline: a.ALIGN_BASELINE, normal: a.ALIGN_AUTO }, a.ALIGN_STRETCH, "alignItems")), e.setAlignSelf(Rt(o.alignSelf, { stretch: a.ALIGN_STRETCH, center: a.ALIGN_CENTER, "flex-start": a.ALIGN_FLEX_START, "flex-end": a.ALIGN_FLEX_END, baseline: a.ALIGN_BASELINE, normal: a.ALIGN_AUTO }, a.ALIGN_AUTO, "alignSelf")), e.setJustifyContent(Rt(o.justifyContent, { center: a.JUSTIFY_CENTER, "flex-start": a.JUSTIFY_FLEX_START, "flex-end": a.JUSTIFY_FLEX_END, "space-between": a.JUSTIFY_SPACE_BETWEEN, "space-around": a.JUSTIFY_SPACE_AROUND }, a.JUSTIFY_FLEX_START, "justifyContent")), e.setFlexDirection(Rt(o.flexDirection, { row: a.FLEX_DIRECTION_ROW, column: a.FLEX_DIRECTION_COLUMN, "row-reverse": a.FLEX_DIRECTION_ROW_REVERSE, "column-reverse": a.FLEX_DIRECTION_COLUMN_REVERSE }, a.FLEX_DIRECTION_ROW, "flexDirection")), e.setFlexWrap(Rt(o.flexWrap, { wrap: a.WRAP_WRAP, nowrap: a.WRAP_NO_WRAP, "wrap-reverse": a.WRAP_WRAP_REVERSE }, a.WRAP_NO_WRAP, "flexWrap")), typeof o.gap < "u" && e.setGap(a.GUTTER_ALL, o.gap), typeof o.rowGap < "u" && e.setGap(a.GUTTER_ROW, o.rowGap), typeof o.columnGap < "u" && e.setGap(a.GUTTER_COLUMN, o.columnGap), typeof o.flexBasis < "u" && e.setFlexBasis(o.flexBasis), e.setFlexGrow(typeof o.flexGrow > "u" ? 0 : o.flexGrow), e.setFlexShrink(typeof o.flexShrink > "u" ? 0 : o.flexShrink), typeof o.maxHeight < "u" && e.setMaxHeight(o.maxHeight), typeof o.maxWidth < "u" && e.setMaxWidth(o.maxWidth), typeof o.minHeight < "u" && e.setMinHeight(o.minHeight), typeof o.minWidth < "u" && e.setMinWidth(o.minWidth), e.setOverflow(Rt(o.overflow, { visible: a.OVERFLOW_VISIBLE, hidden: a.OVERFLOW_HIDDEN }, a.OVERFLOW_VISIBLE, "overflow")), e.setMargin(a.EDGE_TOP, o.marginTop || 0), e.setMargin(a.EDGE_BOTTOM, o.marginBottom || 0), e.setMargin(a.EDGE_LEFT, o.marginLeft || 0), e.setMargin(a.EDGE_RIGHT, o.marginRight || 0), e.setBorder(a.EDGE_TOP, o.borderTopWidth || 0), e.setBorder(a.EDGE_BOTTOM, o.borderBottomWidth || 0), e.setBorder(a.EDGE_LEFT, o.borderLeftWidth || 0), e.setBorder(a.EDGE_RIGHT, o.borderRightWidth || 0), e.setPadding(a.EDGE_TOP, o.paddingTop || 0), e.setPadding(a.EDGE_BOTTOM, o.paddingBottom || 0), e.setPadding(a.EDGE_LEFT, o.paddingLeft || 0), e.setPadding(a.EDGE_RIGHT, o.paddingRight || 0), e.setPositionType(Rt(o.position, { absolute: a.POSITION_TYPE_ABSOLUTE, relative: a.POSITION_TYPE_RELATIVE }, a.POSITION_TYPE_RELATIVE, "position")), typeof o.top < "u" && e.setPosition(a.EDGE_TOP, o.top), typeof o.bottom < "u" && e.setPosition(a.EDGE_BOTTOM, o.bottom), typeof o.left < "u" && e.setPosition(a.EDGE_LEFT, o.left), typeof o.right < "u" && e.setPosition(a.EDGE_RIGHT, o.right), typeof o.height < "u" ? e.setHeight(o.height) : e.setHeightAuto(), typeof o.width < "u" ? e.setWidth(o.width) : e.setWidthAuto(), [o, qg(o)];
}
__name(u1, "u1");
var vu = [1, 0, 0, 1, 0, 0];
function l1(e, t, r) {
  let n = [...vu];
  for (let i of e) {
    let a = Object.keys(i)[0], o = i[a];
    if (typeof o == "string")
      if (a === "translateX")
        o = parseFloat(o) / 100 * t, i[a] = o;
      else if (a === "translateY")
        o = parseFloat(o) / 100 * r, i[a] = o;
      else
        throw new Error(`Invalid transform: "${a}: ${o}".`);
    let u = o, s = [...vu];
    switch (a) {
      case "translateX":
        s[4] = u;
        break;
      case "translateY":
        s[5] = u;
        break;
      case "scale":
        s[0] = u, s[3] = u;
        break;
      case "scaleX":
        s[0] = u;
        break;
      case "scaleY":
        s[3] = u;
        break;
      case "rotate": {
        let l = u * Math.PI / 180, f = Math.cos(l), c = Math.sin(l);
        s[0] = f, s[1] = c, s[2] = -c, s[3] = f;
        break;
      }
      case "skewX":
        s[2] = Math.tan(u * Math.PI / 180);
        break;
      case "skewY":
        s[1] = Math.tan(u * Math.PI / 180);
        break;
    }
    n = Vn(s, n);
  }
  e.splice(0, e.length), e.push(...n), e.__resolved = true;
}
__name(l1, "l1");
function xl({ left: e, top: t, width: r, height: n }, i, a, o) {
  let u;
  i.__resolved || l1(i, r, n);
  let s = i;
  if (a)
    u = s;
  else {
    let l = o?.xAbsolute ?? (o?.xRelative ?? 50) * r / 100, f = o?.yAbsolute ?? (o?.yRelative ?? 50) * n / 100, c = e + l, p = t + f;
    u = Vn([1, 0, 0, 1, c, p], Vn(s, [1, 0, 0, 1, -c, -p])), s.__parent && (u = Vn(s.__parent, u)), s.splice(0, 6, ...u);
  }
  return `matrix(${u.map((l) => l.toFixed(2)).join(",")})`;
}
__name(xl, "xl");
function f1({ left: e, top: t, width: r, height: n, isInheritingTransform: i }, a) {
  let o = "", u = 1;
  return a.transform && (o = xl({ left: e, top: t, width: r, height: n }, a.transform, i, a.transformOrigin)), a.opacity !== void 0 && (u = +a.opacity), { matrix: o, opacity: u };
}
__name(f1, "f1");
function c1({ id: e, content: t, filter: r, left: n, top: i, width: a, height: o, matrix: u, opacity: s, image: l, clipPathId: f, debug: c, shape: p, decorationShape: v }, D) {
  let d = "";
  if (c && (d = ue("rect", { x: n, y: i - o, width: a, height: o, fill: "transparent", stroke: "#575eff", "stroke-width": 1, transform: u || void 0, "clip-path": f ? `url(#${f})` : void 0 })), l) {
    let y = { href: l, x: n, y: i, width: a, height: o, transform: u || void 0, "clip-path": f ? `url(#${f})` : void 0, style: D.filter ? `filter:${D.filter}` : void 0 };
    return [(r ? `${r}<g filter="url(#satori_s-${e})">` : "") + ue("image", { ...y, opacity: s !== 1 ? s : void 0 }) + (v || "") + (r ? "</g>" : "") + d, ""];
  }
  let g = { x: n, y: i, width: a, height: o, "font-weight": D.fontWeight, "font-style": D.fontStyle, "font-size": D.fontSize, "font-family": D.fontFamily, "letter-spacing": D.letterSpacing || void 0, transform: u || void 0, "clip-path": f ? `url(#${f})` : void 0, style: D.filter ? `filter:${D.filter}` : void 0 };
  return [(r ? `${r}<g filter="url(#satori_s-${e})">` : "") + ue("text", { ...g, fill: D.color, opacity: s !== 1 ? s : void 0 }, (0, Ca.default)(t)) + (v || "") + (r ? "</g>" : "") + d, p ? ue("text", g, (0, Ca.default)(t)) : ""];
}
__name(c1, "c1");
function p1(e, t, r) {
  return e.replace(/([MA])([0-9.-]+),([0-9.-]+)/g, function(n, i, a, o) {
    return i + (parseFloat(a) + t) + "," + (parseFloat(o) + r);
  });
}
__name(p1, "p1");
var In = 1.1;
function h1({ id: e, width: t, height: r }, n) {
  if (!n.shadowColor || !n.shadowOffset || typeof n.shadowRadius > "u")
    return "";
  let i = n.shadowColor.length, a = "", o = "", u = 0, s = t, l = 0, f = r;
  for (let c = 0; c < i; c++) {
    let p = n.shadowRadius[c] * n.shadowRadius[c] / 4;
    u = Math.min(n.shadowOffset[c].width - p, u), s = Math.max(n.shadowOffset[c].width + p + t, s), l = Math.min(n.shadowOffset[c].height - p, l), f = Math.max(n.shadowOffset[c].height + p + r, f), a += ue("feDropShadow", { dx: n.shadowOffset[c].width, dy: n.shadowOffset[c].height, stdDeviation: n.shadowRadius[c] / 2, "flood-color": n.shadowColor[c], "flood-opacity": 1, ...i > 1 ? { in: "SourceGraphic", result: `satori_s-${e}-result-${c}` } : {} }), i > 1 && (o = ue("feMergeNode", { in: `satori_s-${e}-result-${c}` }) + o);
  }
  return ue("filter", { id: `satori_s-${e}`, x: (u / t * 100 * In).toFixed(2) + "%", y: (l / r * 100 * In).toFixed(2) + "%", width: ((s - u) / t * 100 * In).toFixed(2) + "%", height: ((f - l) / r * 100 * In).toFixed(2) + "%" }, a + (o ? ue("feMerge", {}, o) : ""));
}
__name(h1, "h1");
function d1({ width: e, height: t, shape: r, opacity: n, id: i }, a) {
  if (!a.boxShadow)
    return null;
  let o = "", u = "";
  for (let s = a.boxShadow.length - 1; s >= 0; s--) {
    let l = "", f = a.boxShadow[s];
    f.spreadRadius && f.inset && (f.spreadRadius = -f.spreadRadius);
    let c = f.blurRadius * f.blurRadius / 4 + (f.spreadRadius || 0), p = Math.min(-c - (f.inset ? f.offsetX : 0), 0), v = Math.max(c + e - (f.inset ? f.offsetX : 0), e), D = Math.min(-c - (f.inset ? f.offsetY : 0), 0), d = Math.max(c + t - (f.inset ? f.offsetY : 0), t), g = `satori_s-${i}-${s}`, y = `satori_ms-${i}-${s}`, b = f.spreadRadius ? r.replace('stroke-width="0"', `stroke-width="${f.spreadRadius * 2}"`) : r;
    l += ue("mask", { id: y, maskUnits: "userSpaceOnUse" }, ue("rect", { x: 0, y: 0, width: a._viewportWidth || "100%", height: a._viewportHeight || "100%", fill: f.inset ? "#000" : "#fff" }) + b.replace('fill="#fff"', f.inset ? 'fill="#fff"' : 'fill="#000"').replace('stroke="#fff"', ""));
    let S = b.replace(/d="([^"]+)"/, (k, C) => 'd="' + p1(C, f.offsetX, f.offsetY) + '"').replace(/x="([^"]+)"/, (k, C) => 'x="' + (parseFloat(C) + f.offsetX) + '"').replace(/y="([^"]+)"/, (k, C) => 'y="' + (parseFloat(C) + f.offsetY) + '"');
    f.spreadRadius && f.spreadRadius < 0 && (l += ue("mask", { id: y + "-neg", maskUnits: "userSpaceOnUse" }, S.replace('stroke="#fff"', 'stroke="#000"').replace(/stroke-width="[^"]+"/, `stroke-width="${-f.spreadRadius * 2}"`))), f.spreadRadius && f.spreadRadius < 0 && (S = ue("g", { mask: `url(#${y}-neg)` }, S)), l += ue("defs", {}, ue("filter", { id: g, x: `${p / e * 100}%`, y: `${D / t * 100}%`, width: `${(v - p) / e * 100}%`, height: `${(d - D) / t * 100}%` }, ue("feGaussianBlur", { stdDeviation: f.blurRadius / 2, result: "b" }) + ue("feFlood", { "flood-color": f.color, in: "SourceGraphic", result: "f" }) + ue("feComposite", { in: "f", in2: "b", operator: f.inset ? "out" : "in" }))) + ue("g", { mask: `url(#${y})`, filter: `url(#${g})`, opacity: n }, S), f.inset ? u += l : o += l;
  }
  return [o, u];
}
__name(d1, "d1");
function v1({ width: e, left: t, top: r, ascender: n, clipPathId: i }, a) {
  let { textDecorationColor: o, textDecorationStyle: u, textDecorationLine: s, fontSize: l } = a;
  if (!s || s === "none")
    return "";
  let f = Math.max(1, l * 0.1), c = s === "line-through" ? r + n * 0.5 : s === "underline" ? r + n * 1.1 : r, p = u === "dashed" ? `${f * 1.2} ${f * 2}` : u === "dotted" ? `0 ${f * 2}` : void 0;
  return ue("line", { x1: t, y1: c, x2: t + e, y2: c, stroke: o, "stroke-width": f, "stroke-dasharray": p, "stroke-linecap": u === "dotted" ? "round" : "square", "clip-path": i ? `url(#${i})` : void 0 });
}
__name(v1, "v1");
function Ga(e) {
  return e = e.replace("U+", "0x"), String.fromCodePoint(Number(e));
}
__name(Ga, "Ga");
var qn = Ga("U+0020");
var wl = Ga("U+0009");
var zn = Ga("U+2026");
var g1 = /* @__PURE__ */ new Set([wl]);
function m1(e) {
  return g1.has(e);
}
__name(m1, "m1");
async function* D1(e, t) {
  let r = await Kn(), { parentStyle: n, inheritedStyle: i, parent: a, font: o, id: u, isInheritingTransform: s, debug: l, embedFont: f, graphemeImages: c, locale: p, canLoadAdditionalAssets: v } = t, { textAlign: D, whiteSpace: d, wordBreak: g, lineHeight: y, textTransform: b, textWrap: S, fontSize: k, filter: C, tabSize: E = 8, _inheritedBackgroundClipTextPath: L } = n;
  e = y1(e, b, p);
  let { content: _, shouldCollapseTabsAndSpaces: U, allowSoftWrap: N } = w1(e, d), { words: X, requiredBreaks: Y, allowBreakWord: ee } = x1(_, g), [A, R] = b1(n, N), O = E1(r, D);
  a.insertChild(O, a.getChildCount()), Pg(n.flexShrink) && a.setFlexShrink(1);
  let H = o.getEngine(k, y, n, p), Z = v ? Bt(_, "grapheme").filter((ve) => !m1(ve) && !H.has(ve)) : [];
  yield Z.map((ve) => ({ word: ve, locale: p })), Z.length && (H = o.getEngine(k, y, n, p));
  function te(ve) {
    return !!(c && c[ve]);
  }
  __name(te, "te");
  let re = F1(H, n);
  function B(ve) {
    let we = 0;
    for (let Ee of ve)
      te(Ee) ? we += k : we += re(Ee);
    return we;
  }
  __name(B, "B");
  function j(ve) {
    return B(Bt(ve, "grapheme"));
  }
  __name(j, "j");
  let T = cl(E) ? Ue(E, k, 1, n) : re(qn) * E, $ = /* @__PURE__ */ __name((ve, we) => {
    if (ve.length === 0)
      return { originWidth: 0, endingSpacesWidth: 0, text: ve };
    let { index: Ee, tabCount: Fe } = C1(ve), Re = 0, Ae = "";
    if (Fe > 0) {
      Ae = ve.slice(0, Ee);
      let Ge = ve.slice(Ee + Fe), Le = j(Ae), We = Le + we;
      Re = (T === 0 ? Le : (Math.floor(We / T) + Fe) * T) + j(Ge);
    } else
      Re = j(ve);
    let Pe = ve.trimEnd() === ve ? Re : j(ve.trimEnd());
    return { originWidth: Re, endingSpacesWidth: Re - Pe, text: ve };
  }, "$"), ie = [], W = [], fe = [], ce = [], ge = [];
  function pe(ve) {
    let we = 0, Ee = 0, Fe = -1, Re = 0, Ae = 0, Pe = 0, Ge = 0;
    ie = [], fe = [0], ce = [], ge = [];
    let Le = 0, We = 0;
    for (; Le < X.length && we < A; ) {
      let De = X[Le], xt = Y[Le], it = 0, { originWidth: kt, endingSpacesWidth: Xt, text: _t } = $(De, Ae);
      De = _t, it = kt;
      let Ne = Xt;
      xt && Pe === 0 && (Pe = H.height(De));
      let Ye = ",.!?:-@)>]}%#".indexOf(De[0]) < 0, dt = !Ae, Er = Le && Ye && Ae + it > ve + Ne && N;
      if (ee && it > ve && (!Ae || Er || xt)) {
        let et = Bt(De, "grapheme");
        X.splice(Le, 1, ...et), Ae > 0 && (ie.push(Ae - We), W.push(Ge), we++, Re += Pe, Ae = 0, Pe = 0, Ge = 0, fe.push(1), Fe = -1), We = Ne;
        continue;
      }
      if (xt || Er)
        U && De === " " && (it = 0), ie.push(Ae - We), W.push(Ge), we++, Re += Pe, Ae = it, Pe = it ? H.height(De) : 0, Ge = it ? H.baseline(De) : 0, fe.push(1), Fe = -1, xt || (Ee = Math.max(Ee, ve));
      else {
        Ae += it;
        let et = H.height(De);
        et > Pe && (Pe = et, Ge = H.baseline(De)), dt && fe[fe.length - 1]++;
      }
      dt && Fe++, Ee = Math.max(Ee, Ae);
      let vr = Ae - it;
      if (it === 0)
        ge.push({ y: Re, x: vr, width: 0, line: we, lineIndex: Fe, isImage: false });
      else {
        let et = Bt(De, "word");
        for (let vt = 0; vt < et.length; vt++) {
          let Gt = et[vt], ct = 0, ir = false;
          te(Gt) ? (ct = k, ir = true) : ct = re(Gt), ce.push(Gt), ge.push({ y: Re, x: vr, width: ct, line: we, lineIndex: Fe, isImage: ir }), vr += ct;
        }
      }
      Le++, We = Ne;
    }
    return Ae && (we < A && (Re += Pe), we++, ie.push(Ae), W.push(Ge)), { width: Ee, height: Re };
  }
  __name(pe, "pe");
  let me = { width: 0, height: 0 };
  O.setMeasureFunc((ve) => {
    let { width: we, height: Ee } = pe(ve);
    if (S === "balance") {
      let Fe = we / 2, Re = we, Ae = we;
      for (; Fe + 1 < Re; ) {
        Ae = (Fe + Re) / 2;
        let { height: Pe } = pe(Ae);
        Pe > Ee ? Fe = Ae : Re = Ae;
      }
      return pe(Re), me = { width: Re, height: Ee }, { width: Re, height: Ee };
    }
    return me = { width: we, height: Ee }, { width: we, height: Ee };
  });
  let [Te, de] = yield, xe = "", Je = "", Me = i._inheritedClipPathId, je = i._inheritedMaskId, { left: Be, top: Ke, width: qe, height: pt } = O.getComputedLayout(), ut = a.getComputedWidth() - a.getComputedPadding(r.EDGE_LEFT) - a.getComputedPadding(r.EDGE_RIGHT) - a.getComputedBorder(r.EDGE_LEFT) - a.getComputedBorder(r.EDGE_RIGHT), rt = Te + Be, ze = de + Ke, { matrix: yt, opacity: Mt } = f1({ left: Be, top: Ke, width: qe, height: pt, isInheritingTransform: s }, n), lt = "";
  if (n.textShadowOffset) {
    let { textShadowColor: ve, textShadowOffset: we, textShadowRadius: Ee } = n;
    Array.isArray(n.textShadowOffset) || (ve = [ve], we = [we], Ee = [Ee]), lt = h1({ width: me.width, height: me.height, id: u }, { shadowColor: ve, shadowOffset: we, shadowRadius: Ee }), lt = ue("defs", {}, lt);
  }
  let ft = "", Ct = "", ht = "", Ht = -1, nt = {}, bt = null, St = 0;
  for (let ve = 0; ve < ce.length; ve++) {
    let we = ge[ve], Ee = ge[ve + 1];
    if (!we)
      continue;
    let Fe = ce[ve], Re = null, Ae = false, Pe = c ? c[Fe] : null, Ge = we.y, Le = we.x, We = we.width, De = we.line;
    if (De === Ht)
      continue;
    let xt = false;
    if (ie.length > 1) {
      let Ne = qe - ie[De];
      if (D === "right" || D === "end")
        Le += Ne;
      else if (D === "center")
        Le += Ne / 2;
      else if (D === "justify" && De < ie.length - 1) {
        let Ye = fe[De], dt = Ye > 1 ? Ne / (Ye - 1) : 0;
        Le += dt * we.lineIndex, xt = true;
      }
    }
    if (nt[De] || (nt[De] = [Le, xt ? qe : ie[De]]), A !== 1 / 0) {
      let Ne = /* @__PURE__ */ __name(function(et, vt) {
        let Gt = Bt(vt, "grapheme", p), ct = "", ir = 0;
        for (let pn of Gt) {
          let Lr = et + B([ct + pn]);
          if (ct && Lr + dt > ut)
            break;
          ct += pn, ir = Lr;
        }
        return { subset: ct, resolvedWidth: ir };
      }, "Ne"), Ye = R, dt = re(R);
      dt > ut && (Ye = zn, dt = re(Ye));
      let Er = re(qn), vr = De < ie.length - 1;
      if (De + 1 === A && (vr || ie[De] > ut)) {
        if (Le + We + dt + Er > ut) {
          let { subset: et, resolvedWidth: vt } = Ne(Le, Fe);
          Fe = et + Ye, Ht = De, nt[De][1] = vt, Ae = true;
        } else if (Ee && Ee.line !== De)
          if (D === "center") {
            let { subset: et, resolvedWidth: vt } = Ne(Le, Fe);
            Fe = et + Ye, Ht = De, nt[De][1] = vt, Ae = true;
          } else {
            let et = ce[ve + 1], { subset: vt, resolvedWidth: Gt } = Ne(We + Le, et);
            Fe = Fe + vt + Ye, Ht = De, nt[De][1] = Gt, Ae = true;
          }
      }
    }
    let it = W[De], kt = H.baseline(Fe), Xt = H.height(Fe), _t = it - kt;
    if (Pe)
      Ge += 0;
    else if (f) {
      if (!Fe.includes(wl) && !Tg.includes(Fe) && ce[ve + 1] && Ee && !Ee.isImage && Ge === Ee.y && !Ae) {
        bt === null && (St = Le), bt = bt === null ? Fe : bt + Fe;
        continue;
      }
      let Ne = bt === null ? Fe : bt + Fe, Ye = bt === null ? Le : St, dt = we.width + Le - Ye;
      Re = H.getSVG(Ne.replace(/(\t)+/g, ""), { ...n, left: rt + Ye, top: ze + Ge + kt + _t, letterSpacing: n.letterSpacing }), bt = null, l && (ht += ue("rect", { x: rt + Ye, y: ze + Ge + _t, width: dt, height: Xt, fill: "transparent", stroke: "#575eff", "stroke-width": 1, transform: yt || void 0, "clip-path": Me ? `url(#${Me})` : void 0 }) + ue("line", { x1: rt + Le, x2: rt + Le + we.width, y1: ze + Ge + _t + kt, y2: ze + Ge + _t + kt, stroke: "#14c000", "stroke-width": 1, transform: yt || void 0, "clip-path": Me ? `url(#${Me})` : void 0 }));
    } else
      Ge += kt + _t;
    if (n.textDecorationLine && (De !== Ee?.line || Ht === De)) {
      let Ne = nt[De];
      Ne && !Ne[2] && (ft += v1({ left: rt + Ne[0], top: ze + Xt * +De, width: Ne[1], ascender: H.baseline(Fe), clipPathId: Me }, n), Ne[2] = 1);
    }
    if (Re !== null)
      Ct += Re + " ";
    else {
      let [Ne, Ye] = c1({ content: Fe, filter: lt, id: u, left: rt + Le, top: ze + Ge, width: We, height: Xt, matrix: yt, opacity: Mt, image: Pe, clipPathId: Me, debug: l, shape: !!L, decorationShape: ft }, n);
      xe += Ne, Je += Ye, ft = "";
    }
    if (Ae)
      break;
  }
  if (Ct) {
    let ve = n.color !== "transparent" && Mt !== 0 ? ue("path", { fill: n.color, d: Ct, transform: yt || void 0, opacity: Mt !== 1 ? Mt : void 0, "clip-path": Me ? `url(#${Me})` : void 0, mask: je ? `url(#${je})` : void 0, style: C ? `filter:${C}` : void 0 }) : "";
    L && (Je = ue("path", { d: Ct, transform: yt || void 0 })), xe += (lt ? lt + ue("g", { filter: `url(#satori_s-${u})` }, ve + ft) : ve + ft) + ht;
  }
  return Je && (n._inheritedBackgroundClipTextPath.value += Je), xe;
}
__name(D1, "D1");
function y1(e, t, r) {
  return t === "uppercase" ? e = e.toLocaleUpperCase(r) : t === "lowercase" ? e = e.toLocaleLowerCase(r) : t === "capitalize" && (e = Bt(e, "word", r).map((n) => Bt(n, "grapheme", r).map((i, a) => a === 0 ? i.toLocaleUpperCase(r) : i).join("")).join("")), e;
}
__name(y1, "y1");
function b1(e, t) {
  let { textOverflow: r, lineClamp: n, WebkitLineClamp: i, WebkitBoxOrient: a, overflow: o, display: u } = e;
  if (u === "block" && n) {
    let [s, l = zn] = S1(n);
    if (s)
      return [s, l];
  }
  return r === "ellipsis" && u === "-webkit-box" && a === "vertical" && Lg(i) && i > 0 ? [i, zn] : r === "ellipsis" && o === "hidden" && !t ? [1, zn] : [1 / 0];
}
__name(b1, "b1");
function x1(e, t) {
  let r = ["break-all", "break-word"].includes(t), { words: n, requiredBreaks: i } = Ig(e, t);
  return { words: n, requiredBreaks: i, allowBreakWord: r };
}
__name(x1, "x1");
function w1(e, t) {
  let r = ["pre", "pre-wrap", "pre-line"].includes(t), n = ["normal", "nowrap", "pre-line"].includes(t), i = !["pre", "nowrap"].includes(t);
  return r || (e = e.replace(/\n/g, qn)), n && (e = e.replace(/([ ]|\t)+/g, qn).trim()), { content: e, shouldCollapseTabsAndSpaces: n, allowSoftWrap: i };
}
__name(w1, "w1");
function E1(e, t) {
  let r = e.Node.create();
  return r.setAlignItems(e.ALIGN_BASELINE), r.setJustifyContent(Rt(t, { left: e.JUSTIFY_FLEX_START, right: e.JUSTIFY_FLEX_END, center: e.JUSTIFY_CENTER, justify: e.JUSTIFY_SPACE_BETWEEN, start: e.JUSTIFY_FLEX_START, end: e.JUSTIFY_FLEX_END }, e.JUSTIFY_FLEX_START, "textAlign")), r;
}
__name(E1, "E1");
function F1(e, t) {
  let r = /* @__PURE__ */ new Map();
  return function(n) {
    if (r.has(n))
      return r.get(n);
    let i = e.measure(n, t);
    return r.set(n, i), i;
  };
}
__name(F1, "F1");
function C1(e) {
  let t = /(\t)+/.exec(e);
  return t ? { index: t.index, tabCount: t[0].length } : { index: null, tabCount: 0 };
}
__name(C1, "C1");
function S1(e) {
  if (typeof e == "number")
    return [e];
  let t = /^(\d+)\s*"(.*)"$/, r = /^(\d+)\s*'(.*)'$/, n = t.exec(e), i = r.exec(e);
  if (n) {
    let a = +n[1], o = n[2];
    return [a, o];
  } else if (i) {
    let a = +i[1], o = i[2];
    return [a, o];
  }
  return [];
}
__name(S1, "S1");
var Wa = Wa || {};
var gu = { type: "directional", value: "bottom" };
Wa.parse = function() {
  var e = { linearGradient: /^(\-(webkit|o|ms|moz)\-)?(linear\-gradient)/i, repeatingLinearGradient: /^(\-(webkit|o|ms|moz)\-)?(repeating\-linear\-gradient)/i, radialGradient: /^(\-(webkit|o|ms|moz)\-)?(radial\-gradient)/i, repeatingRadialGradient: /^(\-(webkit|o|ms|moz)\-)?(repeating\-radial\-gradient)/i, sideOrCorner: /^to (left (top|bottom)|right (top|bottom)|top (left|right)|bottom (left|right)|left|right|top|bottom)/i, extentKeywords: /^(closest\-side|closest\-corner|farthest\-side|farthest\-corner|contain|cover)/, positionKeywords: /^(left|center|right|top|bottom)/i, pixelValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))px/, percentageValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))\%/, emLikeValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))(r?em|vw|vh)/, angleValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))deg/, zeroValue: /[0]/, startCall: /^\(/, endCall: /^\)/, comma: /^,/, hexColor: /^\#([0-9a-fA-F]+)/, literalColor: /^([a-zA-Z]+)/, rgbColor: /^rgb/i, rgbaColor: /^rgba/i, number: /^(([0-9]*\.[0-9]+)|([0-9]+\.?))/ }, t = "";
  function r(B) {
    var j = new Error(t + ": " + B);
    throw j.source = t, j;
  }
  __name(r, "r");
  function n() {
    var B = i();
    return t.length > 0 && r("Invalid input not EOF"), B;
  }
  __name(n, "n");
  function i() {
    return E(a);
  }
  __name(i, "i");
  function a() {
    return u("linear-gradient", e.linearGradient, l, gu) || u("repeating-linear-gradient", e.repeatingLinearGradient, l, gu) || u("radial-gradient", e.radialGradient, v) || u("repeating-radial-gradient", e.repeatingRadialGradient, v);
  }
  __name(a, "a");
  function o(B = {}) {
    var j, T, $, ie;
    let W = { ...B };
    return Object.assign(W, { style: (W.style || []).length > 0 ? W.style : [{ type: "extent-keyword", value: "farthest-corner" }], at: { type: "position", value: { x: { type: "position-keyword", value: "center", ...((T = (j = W.at) == null ? void 0 : j.value) == null ? void 0 : T.x) || {} }, y: { type: "position-keyword", value: "center", ...((ie = ($ = W.at) == null ? void 0 : $.value) == null ? void 0 : ie.y) || {} } } } }), B.value || Object.assign(W, { type: "shape", value: W.style.some((fe) => ["%", "extent-keyword"].includes(fe.type)) ? "ellipse" : "circle" }), W;
  }
  __name(o, "o");
  function u(B, j, T, $) {
    return s(j, function(ie) {
      var W = T();
      return W ? te(e.comma) || r("Missing comma before color stops") : W = $, { type: B, orientation: B.endsWith("radial-gradient") ? W?.map((fe) => o(fe)) ?? [o()] : W, colorStops: E(L) };
    });
  }
  __name(u, "u");
  function s(B, j) {
    var T = te(B);
    if (T) {
      te(e.startCall) || r("Missing (");
      var $ = j(T);
      return te(e.endCall) || r("Missing )"), $;
    }
  }
  __name(s, "s");
  function l() {
    return f() || c() || p();
  }
  __name(l, "l");
  function f() {
    return Z("directional", e.sideOrCorner, 1);
  }
  __name(f, "f");
  function c() {
    return Z("angular", e.angleValue, 1);
  }
  __name(c, "c");
  function p() {
    return Z("directional", e.zeroValue, 0);
  }
  __name(p, "p");
  function v() {
    var B, j = D(), T;
    return j && (B = [], B.push(j), T = t, te(e.comma) && (j = D(), j ? B.push(j) : t = T)), B;
  }
  __name(v, "v");
  function D() {
    let B = d(), j = S();
    if (!(!B && !j))
      return { ...B, at: j };
  }
  __name(D, "D");
  function d() {
    let B = g() || y(), j = b() || O() || A(), T = Z("%", e.percentageValue, 1);
    if (B)
      return { ...B, style: [j, T].filter(($) => $) };
    if (j)
      return { style: [j, T].filter(($) => $), ...g() || y() };
  }
  __name(d, "d");
  function g() {
    return Z("shape", /^(circle)/i, 0);
  }
  __name(g, "g");
  function y() {
    return Z("shape", /^(ellipse)/i, 0);
  }
  __name(y, "y");
  function b() {
    return Z("extent-keyword", e.extentKeywords, 1);
  }
  __name(b, "b");
  function S() {
    if (Z("position", /^at/, 0)) {
      var B = k();
      return B || r("Missing positioning value"), B;
    }
  }
  __name(S, "S");
  function k() {
    var B = C();
    if (B.x || B.y)
      return { type: "position", value: B };
  }
  __name(k, "k");
  function C() {
    return { x: A(), y: A() };
  }
  __name(C, "C");
  function E(B) {
    var j = B(), T = [];
    if (j)
      for (T.push(j); te(e.comma); )
        j = B(), j ? T.push(j) : r("One extra comma");
    return T;
  }
  __name(E, "E");
  function L() {
    var B = _();
    return B || r("Expected color definition"), B.length = A(), B;
  }
  __name(L, "L");
  function _() {
    return N() || Y() || X() || U();
  }
  __name(_, "_");
  function U() {
    return Z("literal", e.literalColor, 0);
  }
  __name(U, "U");
  function N() {
    return Z("hex", e.hexColor, 1);
  }
  __name(N, "N");
  function X() {
    return s(e.rgbColor, function() {
      return { type: "rgb", value: E(ee) };
    });
  }
  __name(X, "X");
  function Y() {
    return s(e.rgbaColor, function() {
      return { type: "rgba", value: E(ee) };
    });
  }
  __name(Y, "Y");
  function ee() {
    return te(e.number)[1];
  }
  __name(ee, "ee");
  function A() {
    return Z("%", e.percentageValue, 1) || R() || O();
  }
  __name(A, "A");
  function R() {
    return Z("position-keyword", e.positionKeywords, 1);
  }
  __name(R, "R");
  function O() {
    return Z("px", e.pixelValue, 1) || H(e.emLikeValue, 1);
  }
  __name(O, "O");
  function H(B, j) {
    var T = te(B);
    if (T)
      return { type: T[5], value: T[j] };
  }
  __name(H, "H");
  function Z(B, j, T) {
    var $ = te(j);
    if ($)
      return { type: B, value: $[T] };
  }
  __name(Z, "Z");
  function te(B) {
    var j, T;
    return T = /^[\n\r\t\s]+/.exec(t), T && re(T[0].length), j = B.exec(t), j && re(j[0].length), j;
  }
  __name(te, "te");
  function re(B) {
    t = t.substr(B);
  }
  __name(re, "re");
  return function(B) {
    return t = B.toString(), n();
  };
}();
var mu = Wa;
function k1(e) {
  return e.type === "literal" ? e.value : e.type === "hex" ? `#${e.value}` : e.type === "rgb" ? `rgb(${e.value.join(",")})` : e.type === "rgba" ? `rgba(${e.value.join(",")})` : "transparent";
}
__name(k1, "k1");
function _1(e) {
  let t = 0, r = 0, n = 0, i = 0;
  return e.includes("top") ? r = 1 : e.includes("bottom") && (i = 1), e.includes("left") ? t = 1 : e.includes("right") && (n = 1), !t && !n && !r && !i && (r = 1), [t, r, n, i];
}
__name(_1, "_1");
function T1(e, t) {
  return typeof e == "string" && e.endsWith("%") ? t * parseFloat(e) / 100 : +e;
}
__name(T1, "T1");
function ga(e, { x: t, y: r, defaultX: n, defaultY: i }) {
  return (e ? e.split(" ").map((a) => {
    try {
      let o = new ei(a);
      return o.type === "length" || o.type === "number" ? o.value : o.value + o.unit;
    } catch {
      return null;
    }
  }).filter((a) => a !== null) : [n, i]).map((a, o) => T1(a, [t, r][o]));
}
__name(ga, "ga");
function Du(e, t, r) {
  let n = [];
  for (let u of t) {
    let s = k1(u);
    if (!n.length && (n.push({ offset: 0, color: s }), typeof u.length > "u" || u.length.value === "0"))
      continue;
    let l = typeof u.length > "u" ? void 0 : u.length.type === "%" ? u.length.value / 100 : u.length.value / e;
    n.push({ offset: l, color: s });
  }
  n.length || n.push({ offset: 0, color: "transparent" });
  let i = n[n.length - 1];
  i.offset !== 1 && (typeof i.offset > "u" ? i.offset = 1 : n.push({ offset: 1, color: i.color }));
  let a = 0, o = 1;
  for (let u = 0; u < n.length; u++)
    if (typeof n[u].offset > "u") {
      for (o < u && (o = u); typeof n[o].offset > "u"; )
        o++;
      n[u].offset = (n[o].offset - n[a].offset) / (o - a) * (u - a) + n[a].offset;
    } else
      a = u;
  return r === "mask" ? n.map((u) => {
    let s = (0, El.default)(u.color);
    return s.alpha === 0 ? { ...u, color: "rgba(0, 0, 0, 1)" } : { ...u, color: `rgba(255, 255, 255, ${s.alpha})` };
  }) : n;
}
__name(Du, "Du");
async function Fl({ id: e, width: t, height: r, left: n, top: i }, { image: a, size: o, position: u, repeat: s }, l, f) {
  s = s || "repeat", f = f || "background";
  let c = s === "repeat-x" || s === "repeat", p = s === "repeat-y" || s === "repeat", v = ga(o, { x: t, y: r, defaultX: t, defaultY: r }), D = ga(u, { x: t, y: r, defaultX: 0, defaultY: 0 });
  if (a.startsWith("linear-gradient(")) {
    let d = mu.parse(a)[0], [g, y] = v, b, S, k, C, E;
    if (d.orientation.type === "directional")
      [b, S, k, C] = _1(d.orientation.value), E = Math.sqrt(Math.pow((k - b) * g, 2) + Math.pow((C - S) * y, 2));
    else if (d.orientation.type === "angular") {
      let X = /* @__PURE__ */ __name(function(ee) {
        if (ee = (ee % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2), Math.abs(ee - Math.PI / 2) < 1e-6) {
          b = 0, S = 0, k = 1, C = 0, E = g;
          return;
        } else if (Math.abs(ee) < 1e-6) {
          b = 0, S = 1, k = 0, C = 0, E = y;
          return;
        }
        if (ee >= Math.PI / 2 && ee < Math.PI) {
          X(Math.PI - ee), S = 1 - S, C = 1 - C;
          return;
        } else if (ee >= Math.PI) {
          X(ee - Math.PI);
          let B = b;
          b = k, k = B, B = S, S = C, C = B;
          return;
        }
        let A = Math.tan(ee), R = A * Y, O = Math.atan(R), H = Math.sqrt(2) * Math.cos(Math.PI / 4 - O);
        b = 0, S = 1, k = Math.sin(O) * H, C = 1 - Math.cos(O) * H;
        let Z = 1, te = 1 / A, re = Math.abs((Z * Y + te) / Math.sqrt(Z * Z + te * te) / Math.sqrt(Y * Y + 1));
        E = Math.sqrt(g * g + y * y) * re;
      }, "X"), Y = g / y;
      X(+d.orientation.value / 180 * Math.PI);
    }
    let L = Du(E, d.colorStops, f), _ = `satori_bi${e}`, U = `satori_pattern_${e}`, N = ue("pattern", { id: U, x: D[0] / t, y: D[1] / r, width: c ? g / t : "1", height: p ? y / r : "1", patternUnits: "objectBoundingBox" }, ue("linearGradient", { id: _, x1: b, y1: S, x2: k, y2: C }, L.map((X) => ue("stop", { offset: X.offset * 100 + "%", "stop-color": X.color })).join("")) + ue("rect", { x: 0, y: 0, width: g, height: y, fill: `url(#${_})` }));
    return [U, N];
  }
  if (a.startsWith("radial-gradient(")) {
    let d = mu.parse(a)[0], g = d.orientation[0], [y, b] = v, S = "circle", k = y / 2, C = b / 2;
    if (g.type === "shape") {
      if (S = g.value, g.at)
        if (g.at.type === "position") {
          let Y = A1(g.at.value.x, g.at.value.y, y, b, l.fontSize, l);
          k = Y.x, C = Y.y;
        } else
          throw new Error("orientation.at.type not implemented: " + g.at.type);
    } else
      throw new Error("orientation.type not implemented: " + g.type);
    let E = Du(t, d.colorStops, f), L = `satori_radial_${e}`, _ = `satori_pattern_${e}`, U = `satori_mask_${e}`, N = O1(S, g.style, l.fontSize, { x: k, y: C }, [y, b], l), X = ue("pattern", { id: _, x: D[0] / t, y: D[1] / r, width: c ? y / t : "1", height: p ? b / r : "1", patternUnits: "objectBoundingBox" }, ue("radialGradient", { id: L }, E.map((Y) => ue("stop", { offset: Y.offset, "stop-color": Y.color })).join("")) + ue("mask", { id: U }, ue("rect", { x: 0, y: 0, width: y, height: b, fill: "#fff" })) + ue("rect", { x: 0, y: 0, width: y, height: b, fill: E.at(-1).color }) + ue(S, { cx: k, cy: C, width: y, height: b, ...N, fill: `url(#${L})`, mask: `url(#${U})` }));
    return [_, X];
  }
  if (a.startsWith("url(")) {
    let d = ga(o, { x: t, y: r, defaultX: 0, defaultY: 0 }), [g, y, b] = await Ma(a.slice(4, -1)), S = f === "mask" ? y || d[0] : d[0] || y, k = f === "mask" ? b || d[1] : d[1] || b;
    return [`satori_bi${e}`, ue("pattern", { id: `satori_bi${e}`, patternContentUnits: "userSpaceOnUse", patternUnits: "userSpaceOnUse", x: D[0] + n, y: D[1] + i, width: c ? S : "100%", height: p ? k : "100%" }, ue("image", { x: 0, y: 0, width: S, height: k, preserveAspectRatio: "none", href: g }))];
  }
  throw new Error(`Invalid background image: "${a}"`);
}
__name(Fl, "Fl");
function A1(e, t, r, n, i, a) {
  let o = { x: r / 2, y: n / 2 };
  return e.type === "position-keyword" ? Object.assign(o, yu(e.value, r, n, "x")) : o.x = Ue(`${e.value}${e.type}`, i, r, a, true), t.type === "position-keyword" ? Object.assign(o, yu(t.value, r, n, "y")) : o.y = Ue(`${t.value}${t.type}`, i, n, a, true), o;
}
__name(A1, "A1");
function yu(e, t, r, n) {
  switch (e) {
    case "center":
      return { [n]: n === "x" ? t / 2 : r / 2 };
    case "left":
      return { x: 0 };
    case "top":
      return { y: 0 };
    case "right":
      return { x: t };
    case "bottom":
      return { y: r };
  }
}
__name(yu, "yu");
function O1(e, t, r, n, i, a) {
  let [o, u] = i, { x: s, y: l } = n, f = {}, c = 0, p = 0;
  if (!t.some((v) => v.type === "extent-keyword")) {
    if (t.some((v) => v.value.startsWith("-")))
      throw new Error("disallow setting negative values to the size of the shape. Check https://w3c.github.io/csswg-drafts/css-images/#valdef-rg-size-length-0");
    return e === "circle" ? { r: Ue(`${t[0].value}${t[0].type}`, r, o, a, true) } : { rx: Ue(`${t[0].value}${t[0].type}`, r, o, a, true), ry: Ue(`${t[1].value}${t[1].type}`, r, u, a, true) };
  }
  switch (t[0].value) {
    case "farthest-corner":
      c = Math.max(Math.abs(o - s), Math.abs(s)), p = Math.max(Math.abs(u - l), Math.abs(l));
      break;
    case "closest-corner":
      c = Math.min(Math.abs(o - s), Math.abs(s)), p = Math.min(Math.abs(u - l), Math.abs(l));
      break;
    case "farthest-side":
      return e === "circle" ? f.r = Math.max(Math.abs(o - s), Math.abs(s), Math.abs(u - l), Math.abs(l)) : (f.rx = Math.max(Math.abs(o - s), Math.abs(s)), f.ry = Math.max(Math.abs(u - l), Math.abs(l))), f;
    case "closest-side":
      return e === "circle" ? f.r = Math.min(Math.abs(o - s), Math.abs(s), Math.abs(u - l), Math.abs(l)) : (f.rx = Math.min(Math.abs(o - s), Math.abs(s)), f.ry = Math.min(Math.abs(u - l), Math.abs(l))), f;
  }
  if (e === "circle")
    f.r = Math.sqrt(c * c + p * p);
  else {
    let v = p !== 0 ? c / p : 1;
    c === 0 ? (f.rx = 0, f.ry = 0) : (f.ry = Math.sqrt(c * c + p * p * v * v) / v, f.rx = f.ry * v);
  }
  return f;
}
__name(O1, "O1");
function L1([e, t]) {
  return Math.round(e * 1e3) === 0 && Math.round(t * 1e3) === 0 ? 0 : Math.round(e * t / Math.sqrt(e * e + t * t) * 1e3) / 1e3;
}
__name(L1, "L1");
function Rn(e, t, r) {
  return r < e + t && (r / 2 < e && r / 2 < t ? e = t = r / 2 : r / 2 < e ? e = r - t : r / 2 < t && (t = r - e)), [e, t];
}
__name(Rn, "Rn");
function Un(e) {
  e[0] = e[1] = Math.min(e[0], e[1]);
}
__name(Un, "Un");
function Bn(e, t, r, n, i) {
  if (typeof e == "string") {
    let a = e.split(" ").map((u) => u.trim()), o = !a[1] && !a[0].endsWith("%");
    return a[1] = a[1] || a[0], [o, [Math.min(Ue(a[0], n, t, i, true), t), Math.min(Ue(a[1], n, r, i, true), r)]];
  }
  return typeof e == "number" ? [true, [Math.min(e, t), Math.min(e, r)]] : [true, void 0];
}
__name(Bn, "Bn");
var Nn = /* @__PURE__ */ __name((e) => e && e[0] !== 0 && e[1] !== 0, "Nn");
function Yn({ left: e, top: t, width: r, height: n }, i, a) {
  let { borderTopLeftRadius: o, borderTopRightRadius: u, borderBottomLeftRadius: s, borderBottomRightRadius: l, fontSize: f } = i, c, p, v, D;
  if ([c, o] = Bn(o, r, n, f, i), [p, u] = Bn(u, r, n, f, i), [v, s] = Bn(s, r, n, f, i), [D, l] = Bn(l, r, n, f, i), !a && !Nn(o) && !Nn(u) && !Nn(s) && !Nn(l))
    return "";
  o ||= [0, 0], u ||= [0, 0], s ||= [0, 0], l ||= [0, 0], [o[0], u[0]] = Rn(o[0], u[0], r), [s[0], l[0]] = Rn(s[0], l[0], r), [o[1], s[1]] = Rn(o[1], s[1], n), [u[1], l[1]] = Rn(u[1], l[1], n), c && Un(o), p && Un(u), v && Un(s), D && Un(l);
  let d = [];
  d[0] = [u, u], d[1] = [l, [-l[0], l[1]]], d[2] = [s, [-s[0], -s[1]]], d[3] = [o, [o[0], -o[1]]];
  let g = `h${r - o[0] - u[0]} a${d[0][0]} 0 0 1 ${d[0][1]}`, y = `v${n - u[1] - l[1]} a${d[1][0]} 0 0 1 ${d[1][1]}`, b = `h${l[0] + s[0] - r} a${d[2][0]} 0 0 1 ${d[2][1]}`, S = `v${s[1] + o[1] - n} a${d[3][0]} 0 0 1 ${d[3][1]}`;
  if (a) {
    let k = /* @__PURE__ */ __name(function(Y) {
      let ee = L1([o, u, l, s][Y]);
      return Y === 0 ? [[e + o[0] - ee, t + o[1] - ee], [e + o[0], t]] : Y === 1 ? [[e + r - u[0] + ee, t + u[1] - ee], [e + r, t + u[1]]] : Y === 2 ? [[e + r - l[0] + ee, t + n - l[1] + ee], [e + r - l[0], t + n]] : [[e + s[0] - ee, t + n - s[1] + ee], [e, t + n - s[1]]];
    }, "k"), C = a.indexOf(false);
    if (!a.includes(true))
      throw new Error("Invalid `partialSides`.");
    if (C === -1)
      C = 0;
    else
      for (; !a[C]; )
        C = (C + 1) % 4;
    let E = "", L = k(C), _ = `M${L[0]} A${d[(C + 3) % 4][0]} 0 0 1 ${L[1]}`, U = 0;
    for (; U < 4 && a[(C + U) % 4]; U++)
      E += _ + " ", _ = [g, y, b, S][(C + U) % 4];
    let N = (C + U) % 4;
    E += _.split(" ")[0];
    let X = k(N);
    return E += ` A${d[(N + 3) % 4][0]} 0 0 1 ${X[0]}`, E;
  }
  return `M${e + o[0]},${t} ${g} ${y} ${b} ${S}`;
}
__name(Yn, "Yn");
function bu(e, t, r) {
  return r[e + "Width"] === r[t + "Width"] && r[e + "Style"] === r[t + "Style"] && r[e + "Color"] === r[t + "Color"];
}
__name(bu, "bu");
function P1({ id: e, currentClipPathId: t, borderPath: r, borderType: n, left: i, top: a, width: o, height: u }, s) {
  if (!(s.borderTopWidth || s.borderRightWidth || s.borderBottomWidth || s.borderLeftWidth))
    return null;
  let l = `satori_bc-${e}`;
  return [ue("clipPath", { id: l, "clip-path": t ? `url(#${t})` : void 0 }, ue(n, { x: i, y: a, width: o, height: u, d: r || void 0 })), l];
}
__name(P1, "P1");
function Cl({ left: e, top: t, width: r, height: n, props: i, asContentMask: a, maskBorderOnly: o }, u) {
  let s = ["borderTop", "borderRight", "borderBottom", "borderLeft"];
  if (!a && !s.some((v) => u[v + "Width"]))
    return "";
  let l = "", f = 0;
  for (; f > 0 && bu(s[f], s[(f + 3) % 4], u); )
    f = (f + 3) % 4;
  let c = [false, false, false, false], p = [];
  for (let v = 0; v < 4; v++) {
    let D = (f + v) % 4, d = (f + v + 1) % 4, g = s[D], y = s[d];
    if (c[D] = true, p = [u[g + "Width"], u[g + "Style"], u[g + "Color"], g], !bu(g, y, u)) {
      let b = (p[0] || 0) + (a && !o && u[g.replace("border", "padding")] || 0);
      b && (l += ue("path", { width: r, height: n, ...i, fill: "none", stroke: a ? "#000" : p[2], "stroke-width": b * 2, "stroke-dasharray": !a && p[1] === "dashed" ? b * 2 + " " + b : void 0, d: Yn({ left: e, top: t, width: r, height: n }, u, c) })), c = [false, false, false, false];
    }
  }
  if (c.some(Boolean)) {
    let v = (p[0] || 0) + (a && !o && u[p[3].replace("border", "padding")] || 0);
    v && (l += ue("path", { width: r, height: n, ...i, fill: "none", stroke: a ? "#000" : p[2], "stroke-width": v * 2, "stroke-dasharray": !a && p[1] === "dashed" ? v * 2 + " " + v : void 0, d: Yn({ left: e, top: t, width: r, height: n }, u, c) }));
  }
  return l;
}
__name(Cl, "Cl");
function I1({ id: e, left: t, top: r, width: n, height: i, matrix: a, borderOnly: o }, u) {
  let s = (u.borderLeftWidth || 0) + (o ? 0 : u.paddingLeft || 0), l = (u.borderTopWidth || 0) + (o ? 0 : u.paddingTop || 0), f = (u.borderRightWidth || 0) + (o ? 0 : u.paddingRight || 0), c = (u.borderBottomWidth || 0) + (o ? 0 : u.paddingBottom || 0), p = { x: t + s, y: r + l, width: n - s - f, height: i - l - c };
  return ue("mask", { id: e }, ue("rect", { ...p, fill: "#fff", mask: u._inheritedMaskId ? `url(#${u._inheritedMaskId})` : void 0 }) + Cl({ left: t, top: r, width: n, height: i, props: { transform: a || void 0 }, asContentMask: true, maskBorderOnly: o }, u));
}
__name(I1, "I1");
var Qr = { circle: /circle\((.+)\)/, ellipse: /ellipse\((.+)\)/, path: /path\((.+)\)/, polygon: /polygon\((.+)\)/, inset: /inset\((.+)\)/ };
function R1({ width: e, height: t }, r, n) {
  function i(l) {
    let f = l.match(Qr.circle);
    if (!f)
      return null;
    let [, c] = f, [p, v = ""] = c.split("at").map((g) => g.trim()), { x: D, y: d } = wu(v, e, t);
    return { type: "circle", r: Ue(p, n.fontSize, Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2)) / Math.sqrt(2), n, true), cx: Ue(D, n.fontSize, e, n, true), cy: Ue(d, n.fontSize, t, n, true) };
  }
  __name(i, "i");
  function a(l) {
    let f = l.match(Qr.ellipse);
    if (!f)
      return null;
    let [, c] = f, [p, v = ""] = c.split("at").map((b) => b.trim()), [D, d] = p.split(" "), { x: g, y } = wu(v, e, t);
    return { type: "ellipse", rx: Ue(D || "50%", n.fontSize, e, n, true), ry: Ue(d || "50%", n.fontSize, t, n, true), cx: Ue(g, n.fontSize, e, n, true), cy: Ue(y, n.fontSize, t, n, true) };
  }
  __name(a, "a");
  function o(l) {
    let f = l.match(Qr.path);
    if (!f)
      return null;
    let [c, p] = xu(f[1]);
    return { type: "path", d: p, "fill-rule": c };
  }
  __name(o, "o");
  function u(l) {
    let f = l.match(Qr.polygon);
    if (!f)
      return null;
    let [c, p] = xu(f[1]);
    return { type: "polygon", "fill-rule": c, points: p.split(",").map((v) => v.split(" ").map((D, d) => Ue(D, n.fontSize, d === 0 ? e : t, n, true)).join(" ")).join(",") };
  }
  __name(u, "u");
  function s(l) {
    let f = l.match(Qr.inset);
    if (!f)
      return null;
    let [c, p] = (f[1].includes("round") ? f[1] : `${f[1].trim()} round 0`).split("round"), v = (0, Sa.getStylesForProperty)("borderRadius", p, true), D = Object.values(v).map((k) => String(k)).map((k, C) => Ue(k, n.fontSize, C === 0 || C === 2 ? t : e, n, true) || 0), d = Object.values((0, Sa.getStylesForProperty)("margin", c, true)).map((k) => String(k)).map((k, C) => Ue(k, n.fontSize, C === 0 || C === 2 ? t : e, n, true) || 0), g = d[3], y = d[0], b = e - (d[1] + d[3]), S = t - (d[0] + d[2]);
    return D.some((k) => k > 0) ? { type: "path", d: Yn({ left: g, top: y, width: b, height: S }, { ...r, ...v }) } : { type: "rect", x: g, y, width: b, height: S };
  }
  __name(s, "s");
  return { parseCircle: i, parseEllipse: a, parsePath: o, parsePolygon: u, parseInset: s };
}
__name(R1, "R1");
function xu(e) {
  let [, t = "nonzero", r] = e.replace(/('|")/g, "").match(/^(nonzero|evenodd)?,?(.+)/) || [];
  return [t, r];
}
__name(xu, "xu");
function wu(e, t, r) {
  let n = e.split(" "), i = { x: n[0] || "50%", y: n[1] || "50%" };
  return n.forEach((a) => {
    a === "top" ? i.y = 0 : a === "bottom" ? i.y = r : a === "left" ? i.x = 0 : a === "right" ? i.x = t : a === "center" && (i.x = t / 2, i.y = r / 2);
  }), i;
}
__name(wu, "wu");
function $a(e) {
  return `satori_cp-${e}`;
}
__name($a, "$a");
function U1(e) {
  return `url(#${$a(e)})`;
}
__name(U1, "U1");
function B1(e, t, r) {
  if (t.clipPath === "none")
    return "";
  let n = R1(e, t, r), i = t.clipPath, a = { type: "" };
  for (let o of Object.keys(n))
    if (a = n[o](i), a)
      break;
  if (a) {
    let { type: o, ...u } = a;
    return ue("clipPath", { id: $a(e.id), "clip-path": e.currentClipPath, transform: `translate(${e.left}, ${e.top})` }, ue(o, u));
  }
  return "";
}
__name(B1, "B1");
function N1({ left: e, top: t, width: r, height: n, path: i, matrix: a, id: o, currentClipPath: u, src: s }, l, f) {
  let c = "", p = l.clipPath && l.clipPath !== "none" ? B1({ left: e, top: t, width: r, height: n, path: i, id: o, matrix: a, currentClipPath: u, src: s }, l, f) : "";
  if (l.overflow !== "hidden" && !s)
    c = "";
  else {
    let D = p ? `satori_ocp-${o}` : $a(o);
    c = ue("clipPath", { id: D, "clip-path": u }, ue(i ? "path" : "rect", { x: e, y: t, width: r, height: n, d: i || void 0 }));
  }
  let v = I1({ id: `satori_om-${o}`, left: e, top: t, width: r, height: n, matrix: a, borderOnly: !s }, l);
  return p + c + v;
}
__name(N1, "N1");
var M1 = /* @__PURE__ */ __name((e) => `satori_mi-${e}`, "M1");
async function G1(e, t, r) {
  if (!t.maskImage)
    return ["", ""];
  let { left: n, top: i, width: a, height: o, id: u } = e, s = t.maskImage, l = s.length;
  if (!l)
    return ["", ""];
  let f = M1(u), c = "";
  for (let p = 0; p < l; p++) {
    let v = s[p], [D, d] = await Fl({ id: `${f}-${p}`, left: n, top: i, width: a, height: o }, v, r, "mask");
    c += d + ue("rect", { x: 0, y: 0, width: a, height: o, fill: `url(#${D})` });
  }
  return c = ue("mask", { id: f }, c), [f, c];
}
__name(G1, "G1");
async function ma({ id: e, left: t, top: r, width: n, height: i, isInheritingTransform: a, src: o, debug: u }, s, l) {
  if (s.display === "none")
    return "";
  let f = !!o, c = "rect", p = "", v = "", D = [], d = 1, g = "";
  s.backgroundColor && D.push(s.backgroundColor), s.opacity !== void 0 && (d = +s.opacity), s.transform && (p = xl({ left: t, top: r, width: n, height: i }, s.transform, a, s.transformOrigin));
  let y = "";
  if (s.backgroundImage) {
    let A = [];
    for (let R = 0; R < s.backgroundImage.length; R++) {
      let O = s.backgroundImage[R], H = await Fl({ id: e + "_" + R, width: n, height: i, left: t, top: r }, O, l);
      H && A.unshift(H);
    }
    for (let R of A)
      D.push(`url(#${R[0]})`), v += R[1], R[2] && (y += R[2]);
  }
  let [b, S] = await G1({ id: e, left: t, top: r, width: n, height: i }, s, l);
  v += S;
  let k = b ? `url(#${b})` : s._inheritedMaskId ? `url(#${s._inheritedMaskId})` : void 0, C = Yn({ left: t, top: r, width: n, height: i }, s);
  C && (c = "path");
  let E = s._inheritedClipPathId;
  u && (g = ue("rect", { x: t, y: r, width: n, height: i, fill: "transparent", stroke: "#ff5757", "stroke-width": 1, transform: p || void 0, "clip-path": E ? `url(#${E})` : void 0 }));
  let { backgroundClip: L, filter: _ } = s, U = L === "text" ? `url(#satori_bct-${e})` : E ? `url(#${E})` : s.clipPath ? U1(e) : void 0, N = N1({ left: t, top: r, width: n, height: i, path: C, id: e, matrix: p, currentClipPath: U, src: o }, s, l), X = D.map((A) => ue(c, { x: t, y: r, width: n, height: i, fill: A, d: C || void 0, transform: p || void 0, "clip-path": U, style: _ ? `filter:${_}` : void 0, mask: k })).join(""), Y = P1({ id: e, left: t, top: r, width: n, height: i, currentClipPathId: E, borderPath: C, borderType: c }, s);
  if (f) {
    let A = (s.borderLeftWidth || 0) + (s.paddingLeft || 0), R = (s.borderTopWidth || 0) + (s.paddingTop || 0), O = (s.borderRightWidth || 0) + (s.paddingRight || 0), H = (s.borderBottomWidth || 0) + (s.paddingBottom || 0), Z = s.objectFit === "contain" ? "xMidYMid" : s.objectFit === "cover" ? "xMidYMid slice" : "none";
    X += ue("image", { x: t + A, y: r + R, width: n - A - O, height: i - R - H, href: o, preserveAspectRatio: Z, transform: p || void 0, style: _ ? `filter:${_}` : void 0, "clip-path": `url(#satori_cp-${e})`, mask: b ? `url(#${b})` : `url(#satori_om-${e})` });
  }
  if (Y) {
    v += Y[0];
    let A = Y[1];
    X += Cl({ left: t, top: r, width: n, height: i, props: { transform: p || void 0, "clip-path": `url(#${A})` } }, s);
  }
  let ee = d1({ width: n, height: i, id: e, opacity: d, shape: ue(c, { x: t, y: r, width: n, height: i, fill: "#fff", stroke: "#fff", "stroke-width": 0, d: C || void 0, transform: p || void 0, "clip-path": U, mask: k }) }, s);
  return (v ? ue("defs", {}, v) : "") + (ee ? ee[0] : "") + N + (d !== 1 ? `<g opacity="${d}">` : "") + (y || X) + (d !== 1 ? "</g>" : "") + (ee ? ee[1] : "") + g;
}
__name(ma, "ma");
var W1 = /* @__PURE__ */ __name(() => /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26F9(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC3\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC08\uDC26](?:\u200D\u2B1B)?|[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC2\uDECE-\uDEDB\uDEE0-\uDEE8]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g, "W1");
var $1 = new RegExp(W1(), "");
var ka = { emoji: $1, symbol: /\p{Symbol}/u, math: /\p{Math}/u };
var _a = { "ja-JP": /\p{scx=Hira}|\p{scx=Kana}|\p{scx=Han}|[\u3000]|[\uFF00-\uFFEF]/u, "ko-KR": /\p{scx=Hangul}/u, "zh-CN": /\p{scx=Han}/u, "zh-TW": /\p{scx=Han}/u, "zh-HK": /\p{scx=Han}/u, "th-TH": /\p{scx=Thai}/u, "bn-IN": /\p{scx=Bengali}/u, "ar-AR": /\p{scx=Arabic}/u, "ta-IN": /\p{scx=Tamil}/u, "ml-IN": /\p{scx=Malayalam}/u, "he-IL": /\p{scx=Hebrew}/u, "te-IN": /\p{scx=Telugu}/u, devanagari: /\p{scx=Devanagari}/u, kannada: /\p{scx=Kannada}/u };
var ja = Object.keys({ ..._a, ...ka });
function j1(e) {
  return ja.includes(e);
}
__name(j1, "j1");
function V1(e, t) {
  for (let n of Object.keys(ka))
    if (ka[n].test(e))
      return [n];
  let r = Object.keys(_a).filter((n) => _a[n].test(e));
  if (r.length === 0)
    return ["unknown"];
  if (t) {
    let n = r.findIndex((i) => i === t);
    n !== -1 && (r.splice(n, 1), r.unshift(t));
  }
  return r;
}
__name(V1, "V1");
function z1(e) {
  if (e)
    return ja.find((t) => t.toLowerCase().startsWith(e.toLowerCase()));
}
__name(z1, "z1");
async function* Ta(e, t) {
  var r;
  let n = await Kn(), { id: i, inheritedStyle: a, parent: o, font: u, debug: s, locale: l, embedFont: f = true, graphemeImages: c, canLoadAdditionalAssets: p, getTwStyles: v } = t;
  if (e === null || typeof e > "u")
    return yield, yield, "";
  if (!jn(e) || typeof e.type == "function") {
    let $;
    if (!jn(e))
      $ = D1(String(e), t), yield (await $.next()).value;
    else {
      if (Sg(e.type))
        throw new Error("Class component is not supported.");
      $ = Ta(e.type(e.props), t), yield (await $.next()).value;
    }
    await $.next();
    let ie = yield;
    return (await $.next(ie)).value;
  }
  let { type: D, props: d } = e;
  if (d && kg(d))
    throw new Error("dangerouslySetInnerHTML property is not supported. See documentation for more information https://github.com/vercel/satori#jsx.");
  let { style: g, children: y, tw: b, lang: S = l } = d || {}, k = z1(S);
  if (b) {
    let $ = v(b, g);
    g = Object.assign($, g);
  }
  let C = n.Node.create();
  o.insertChild(C, o.getChildCount());
  let [E, L] = await u1(C, D, a, g, d), _ = E.transform === a.transform;
  if (_ || (E.transform.__parent = a.transform), (E.overflow === "hidden" || E.clipPath && E.clipPath !== "none") && (L._inheritedClipPathId = `satori_cp-${i}`, L._inheritedMaskId = `satori_om-${i}`), E.maskImage && (L._inheritedMaskId = `satori_mi-${i}`), E.backgroundClip === "text") {
    let $ = { value: "" };
    L._inheritedBackgroundClipTextPath = $, E._inheritedBackgroundClipTextPath = $;
  }
  let U = _g(y), N = [], X = 0, Y = [];
  for (let $ of U) {
    let ie = Ta($, { id: i + "-" + X++, parentStyle: E, inheritedStyle: L, isInheritingTransform: true, parent: C, font: u, embedFont: f, debug: s, graphemeImages: c, canLoadAdditionalAssets: p, locale: k, getTwStyles: v, onNodeDetected: t.onNodeDetected });
    p ? Y.push(...(await ie.next()).value || []) : await ie.next(), N.push(ie);
  }
  yield Y;
  for (let $ of N)
    await $.next();
  let [ee, A] = yield, { left: R, top: O, width: H, height: Z } = C.getComputedLayout();
  R += ee, O += A;
  let te = "", re = "", B = "", { children: j, ...T } = d;
  if ((r = t.onNodeDetected) == null || r.call(t, { left: R, top: O, width: H, height: Z, type: D, props: T, key: e.key, textContent: jn(j) ? void 0 : j }), D === "img") {
    let $ = E.__src;
    re = await ma({ id: i, left: R, top: O, width: H, height: Z, src: $, isInheritingTransform: _, debug: s }, E, L);
  } else if (D === "svg") {
    let $ = E.color, ie = await zg(e, $);
    re = await ma({ id: i, left: R, top: O, width: H, height: Z, src: ie, isInheritingTransform: _, debug: s }, E, L);
  } else {
    let $ = g?.display;
    if (D === "div" && y && typeof y != "string" && $ !== "flex" && $ !== "none")
      throw new Error('Expected <div> to have explicit "display: flex" or "display: none" if it has more than one child node.');
    re = await ma({ id: i, left: R, top: O, width: H, height: Z, isInheritingTransform: _, debug: s }, E, L);
  }
  for (let $ of N)
    te += (await $.next([R, O])).value;
  return E._inheritedBackgroundClipTextPath && (B += ue("clipPath", { id: `satori_bct-${i}`, "clip-path": E._inheritedClipPathId ? `url(#${E._inheritedClipPathId})` : void 0 }, E._inheritedBackgroundClipTextPath.value)), B + re + te;
}
__name(Ta, "Ta");
var Sl = "unknown";
function H1(e, t, [r, n], [i, a]) {
  if (r !== i)
    return r ? !i || r === e ? -1 : i === e ? 1 : e === 400 && r === 500 || e === 500 && r === 400 ? -1 : e === 400 && i === 500 || e === 500 && i === 400 ? 1 : e < 400 ? r < e && i < e ? i - r : r < e ? -1 : i < e ? 1 : r - i : e < r && e < i ? r - i : e < r ? -1 : e < i ? 1 : i - r : 1;
  if (n !== a) {
    if (n === t)
      return -1;
    if (a === t)
      return 1;
  }
  return -1;
}
__name(H1, "H1");
var X1 = /* @__PURE__ */ __name(class {
  defaultFont;
  fonts = /* @__PURE__ */ new Map();
  constructor(e) {
    this.addFonts(e);
  }
  get({ name: e, weight: t, style: r }) {
    if (!this.fonts.has(e))
      return null;
    t === "normal" && (t = 400), t === "bold" && (t = 700), typeof t == "string" && (t = Number.parseInt(t, 10));
    let n = [...this.fonts.get(e)], i = n[0];
    for (let a = 1; a < n.length; a++) {
      let [, o, u] = i, [, s, l] = n[a];
      H1(t, r, [o, u], [s, l]) > 0 && (i = n[a]);
    }
    return i[0];
  }
  addFonts(e) {
    for (let t of e) {
      let { name: r, data: n, lang: i } = t;
      if (i && !j1(i))
        throw new Error(`Invalid value for props \`lang\`: "${i}". The value must be one of the following: ${ja.join(", ")}.`);
      let a = i ?? Sl, o = Ln.parse("buffer" in n ? n.buffer.slice(n.byteOffset, n.byteOffset + n.byteLength) : n, { lowMemory: true }), u = o.charToGlyphIndex;
      o.charToGlyphIndex = (l) => {
        let f = u.call(o, l);
        return f === 0 && o._trackBrokenChars && o._trackBrokenChars.push(l), f;
      }, this.defaultFont || (this.defaultFont = o);
      let s = `${r.toLowerCase()}_${a}`;
      this.fonts.has(s) || this.fonts.set(s, []), this.fonts.get(s).push([o, t.weight, t.style]);
    }
  }
  getEngine(e = 16, t = 1.2, { fontFamily: r = "sans-serif", fontWeight: n = 400, fontStyle: i = "normal" }, a) {
    if (!this.fonts.size)
      throw new Error("No fonts are loaded. At least one font is required to calculate the layout.");
    r = (Array.isArray(r) ? r : [r]).map((y) => y.toLowerCase());
    let o = [];
    r.forEach((y) => {
      let b = this.get({ name: y, weight: n, style: i });
      if (b) {
        o.push(b);
        return;
      }
      let S = this.get({ name: y + "_unknown", weight: n, style: i });
      if (S) {
        o.push(S);
        return;
      }
    });
    let u = Array.from(this.fonts.keys()), s = [], l = [], f = [];
    for (let y of u)
      if (!r.includes(y))
        if (a) {
          let b = q1(y);
          b ? b === a ? s.push(this.get({ name: y, weight: n, style: i })) : l.push(this.get({ name: y, weight: n, style: i })) : f.push(this.get({ name: y, weight: n, style: i }));
        } else
          f.push(this.get({ name: y, weight: n, style: i }));
    let c = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ __name((y, b = true) => {
      let S = [...o, ...f, ...s, ...b ? l : []];
      if (typeof y > "u")
        return b ? S[S.length - 1] : void 0;
      let k = y.charCodeAt(0);
      if (c.has(k))
        return c.get(k);
      let C = S.find((E, L) => !!E.charToGlyphIndex(y) || b && L === S.length - 1);
      return C && c.set(k, C), C;
    }, "p"), v = /* @__PURE__ */ __name((y, b = false) => {
      var S, k;
      return ((b ? (k = (S = y.tables) == null ? void 0 : S.os2) == null ? void 0 : k.sTypoAscender : 0) || y.ascender) / y.unitsPerEm * e;
    }, "v"), D = /* @__PURE__ */ __name((y, b = false) => {
      var S, k;
      return ((b ? (k = (S = y.tables) == null ? void 0 : S.os2) == null ? void 0 : k.sTypoDescender : 0) || y.descender) / y.unitsPerEm * e;
    }, "D"), d = /* @__PURE__ */ __name((y) => p(y, false), "d"), g = { has: (y) => {
      if (y === `
`)
        return true;
      let b = d(y);
      return b ? (b._trackBrokenChars = [], b.stringToGlyphs(y), b._trackBrokenChars.length ? (b._trackBrokenChars = void 0, false) : true) : false;
    }, baseline: (y, b = typeof y > "u" ? o[0] : p(y)) => {
      let S = v(b, true), k = D(b, true), C = g.height(y, b), { yMax: E, yMin: L } = b.tables.head, _ = S - k, U = (E / (E - L) - 1) * _;
      return C * ((1.2 / t + 1) / 2) + U;
    }, height: (y, b = typeof y > "u" ? o[0] : p(y)) => (v(b) - D(b)) * (t / 1.2), measure: (y, b) => this.measure(p, y, b), getSVG: (y, b) => this.getSVG(p, y, b) };
    return g;
  }
  patchFontFallbackResolver(e, t) {
    let r = [];
    e._trackBrokenChars = r;
    let n = e.stringToGlyphs;
    return e.stringToGlyphs = (i, ...a) => {
      let o = n.call(e, i, ...a);
      for (let u = 0; u < o.length; u++)
        if (o[u].unicode === void 0) {
          let s = r.shift(), l = t(s);
          if (l !== e) {
            let f = l.charToGlyph(s), c = e.unitsPerEm / l.unitsPerEm, p = new Ln.Path();
            p.unitsPerEm = e.unitsPerEm, p.commands = f.path.commands.map((D) => {
              let d = { ...D };
              for (let g in d)
                typeof d[g] == "number" && (d[g] *= c);
              return d;
            });
            let v = new Ln.Glyph({ ...f, advanceWidth: f.advanceWidth * c, xMin: f.xMin * c, xMax: f.xMax * c, yMin: f.yMin * c, yMax: f.yMax * c, path: p });
            o[u] = v;
          }
        }
      return o;
    }, () => {
      e.stringToGlyphs = n, e._trackBrokenChars = void 0;
    };
  }
  measure(e, t, { fontSize: r, letterSpacing: n = 0 }) {
    let i = e(t), a = this.patchFontFallbackResolver(i, e);
    try {
      return i.getAdvanceWidth(t, r, { letterSpacing: n / r });
    } finally {
      a();
    }
  }
  getSVG(e, t, { fontSize: r, top: n, left: i, letterSpacing: a = 0 }) {
    let o = e(t), u = this.patchFontFallbackResolver(o, e);
    try {
      return r === 0 ? "" : o.getPath(t.replace(/\n/g, ""), i, n, r, { letterSpacing: a / r }).toPathData(1);
    } finally {
      u();
    }
  }
}, "X1");
function q1(e) {
  let t = e.split("_"), r = t[t.length - 1];
  return r === Sl ? void 0 : r;
}
__name(q1, "q1");
function Y1({ width: e, height: t, content: r }) {
  return ue("svg", { width: e, height: t, viewBox: `0 0 ${e} ${t}`, xmlns: "http://www.w3.org/2000/svg" }, r);
}
__name(Y1, "Y1");
var Z1 = Lv(dg());
var Q1 = ["ios", "android", "windows", "macos", "web"];
function J1(e) {
  return Q1.includes(e);
}
__name(J1, "J1");
var K1 = ["portrait", "landscape"];
function em(e) {
  return K1.includes(e);
}
__name(em, "em");
var Eu;
(function(e) {
  e.fontSize = "fontSize", e.lineHeight = "lineHeight";
})(Eu || (Eu = {}));
var Ie;
(function(e) {
  e.rem = "rem", e.em = "em", e.px = "px", e.percent = "%", e.vw = "vw", e.vh = "vh", e.none = "<no-css-unit>";
})(Ie || (Ie = {}));
function Fu(e) {
  return typeof e == "string";
}
__name(Fu, "Fu");
function Cu(e) {
  return typeof e == "object";
}
__name(Cu, "Cu");
var Da;
function z(e) {
  return { kind: "complete", style: e };
}
__name(z, "z");
function Ft(e, t = {}) {
  let { fractions: r } = t;
  if (r && e.includes("/")) {
    let [a = "", o = ""] = e.split("/", 2), u = Ft(a), s = Ft(o);
    return !u || !s ? null : [u[0] / s[0], s[1]];
  }
  let n = parseFloat(e);
  if (Number.isNaN(n))
    return null;
  let i = e.match(/(([a-z]{2,}|%))$/);
  if (!i)
    return [n, Ie.none];
  switch (i?.[1]) {
    case "rem":
      return [n, Ie.rem];
    case "px":
      return [n, Ie.px];
    case "em":
      return [n, Ie.em];
    case "%":
      return [n, Ie.percent];
    case "vw":
      return [n, Ie.vw];
    case "vh":
      return [n, Ie.vh];
    default:
      return null;
  }
}
__name(Ft, "Ft");
function an(e, t, r = {}) {
  let n = xr(t, r);
  return n === null ? null : z({ [e]: n });
}
__name(an, "an");
function ya(e, t, r) {
  let n = xr(t);
  return n !== null && (r[e] = n), r;
}
__name(ya, "ya");
function tm(e, t) {
  let r = xr(t);
  return r === null ? null : { [e]: r };
}
__name(tm, "tm");
function xr(e, t = {}) {
  if (e === void 0)
    return null;
  let r = Ft(String(e), t);
  return r ? on2(...r, t) : null;
}
__name(xr, "xr");
function on2(e, t, r = {}) {
  let { isNegative: n, device: i } = r;
  switch (t) {
    case Ie.rem:
      return e * 16 * (n ? -1 : 1);
    case Ie.px:
      return e * (n ? -1 : 1);
    case Ie.percent:
      return `${n ? "-" : ""}${e}%`;
    case Ie.none:
      return e * (n ? -1 : 1);
    case Ie.vw:
      return i != null && i.windowDimensions ? i.windowDimensions.width * (e / 100) : (er("`vw` CSS unit requires configuration with `useDeviceContext()`"), null);
    case Ie.vh:
      return i != null && i.windowDimensions ? i.windowDimensions.height * (e / 100) : (er("`vh` CSS unit requires configuration with `useDeviceContext()`"), null);
    default:
      return null;
  }
}
__name(on2, "on");
function Su(e) {
  let t = Ft(e);
  if (!t)
    return null;
  let [r, n] = t;
  switch (n) {
    case Ie.rem:
      return r * 16;
    case Ie.px:
      return r;
    default:
      return null;
  }
}
__name(Su, "Su");
var rm = { t: "Top", tr: "TopRight", tl: "TopLeft", b: "Bottom", br: "BottomRight", bl: "BottomLeft", l: "Left", r: "Right", x: "Horizontal", y: "Vertical" };
function kl(e) {
  return rm[e ?? ""] || "All";
}
__name(kl, "kl");
function _l(e) {
  let t = "All";
  return [e.replace(/^-(t|b|r|l|tr|tl|br|bl)(-|$)/, (r, n) => (t = kl(n), "")), t];
}
__name(_l, "_l");
function ai(e, t = {}) {
  if (e.includes("/")) {
    let r = ku(e, { ...t, fractions: true });
    if (r)
      return r;
  }
  return e[0] === "[" && (e = e.slice(1, -1)), ku(e, t);
}
__name(ai, "ai");
function wr(e, t, r = {}) {
  let n = ai(t, r);
  return n === null ? null : z({ [e]: n });
}
__name(wr, "wr");
function ku(e, t = {}) {
  if (e === "px")
    return 1;
  let r = Ft(e, t);
  if (!r)
    return null;
  let [n, i] = r;
  return t.fractions && (i = Ie.percent, n *= 100), i === Ie.none && (n = n / 4, i = Ie.rem), on2(n, i, t);
}
__name(ku, "ku");
function nm(...e) {
  console.warn(...e);
}
__name(nm, "nm");
function im(...e) {
}
__name(im, "im");
var er = typeof process > "u" || ((Da = process == null ? void 0 : process.env) === null || Da === void 0 ? void 0 : Da.JEST_WORKER_ID) === void 0 ? nm : im;
var am = [["aspect-square", z({ aspectRatio: 1 })], ["aspect-video", z({ aspectRatio: 16 / 9 })], ["items-center", z({ alignItems: "center" })], ["items-start", z({ alignItems: "flex-start" })], ["items-end", z({ alignItems: "flex-end" })], ["items-baseline", z({ alignItems: "baseline" })], ["items-stretch", z({ alignItems: "stretch" })], ["justify-start", z({ justifyContent: "flex-start" })], ["justify-end", z({ justifyContent: "flex-end" })], ["justify-center", z({ justifyContent: "center" })], ["justify-between", z({ justifyContent: "space-between" })], ["justify-around", z({ justifyContent: "space-around" })], ["justify-evenly", z({ justifyContent: "space-evenly" })], ["content-start", z({ alignContent: "flex-start" })], ["content-end", z({ alignContent: "flex-end" })], ["content-between", z({ alignContent: "space-between" })], ["content-around", z({ alignContent: "space-around" })], ["content-stretch", z({ alignContent: "stretch" })], ["content-center", z({ alignContent: "center" })], ["self-auto", z({ alignSelf: "auto" })], ["self-start", z({ alignSelf: "flex-start" })], ["self-end", z({ alignSelf: "flex-end" })], ["self-center", z({ alignSelf: "center" })], ["self-stretch", z({ alignSelf: "stretch" })], ["self-baseline", z({ alignSelf: "baseline" })], ["direction-inherit", z({ direction: "inherit" })], ["direction-ltr", z({ direction: "ltr" })], ["direction-rtl", z({ direction: "rtl" })], ["hidden", z({ display: "none" })], ["flex", z({ display: "flex" })], ["flex-row", z({ flexDirection: "row" })], ["flex-row-reverse", z({ flexDirection: "row-reverse" })], ["flex-col", z({ flexDirection: "column" })], ["flex-col-reverse", z({ flexDirection: "column-reverse" })], ["flex-wrap", z({ flexWrap: "wrap" })], ["flex-wrap-reverse", z({ flexWrap: "wrap-reverse" })], ["flex-nowrap", z({ flexWrap: "nowrap" })], ["flex-auto", z({ flexGrow: 1, flexShrink: 1, flexBasis: "auto" })], ["flex-initial", z({ flexGrow: 0, flexShrink: 1, flexBasis: "auto" })], ["flex-none", z({ flexGrow: 0, flexShrink: 0, flexBasis: "auto" })], ["overflow-hidden", z({ overflow: "hidden" })], ["overflow-visible", z({ overflow: "visible" })], ["overflow-scroll", z({ overflow: "scroll" })], ["absolute", z({ position: "absolute" })], ["relative", z({ position: "relative" })], ["italic", z({ fontStyle: "italic" })], ["not-italic", z({ fontStyle: "normal" })], ["oldstyle-nums", Jr("oldstyle-nums")], ["small-caps", Jr("small-caps")], ["lining-nums", Jr("lining-nums")], ["tabular-nums", Jr("tabular-nums")], ["proportional-nums", Jr("proportional-nums")], ["font-thin", z({ fontWeight: "100" })], ["font-100", z({ fontWeight: "100" })], ["font-extralight", z({ fontWeight: "200" })], ["font-200", z({ fontWeight: "200" })], ["font-light", z({ fontWeight: "300" })], ["font-300", z({ fontWeight: "300" })], ["font-normal", z({ fontWeight: "normal" })], ["font-400", z({ fontWeight: "400" })], ["font-medium", z({ fontWeight: "500" })], ["font-500", z({ fontWeight: "500" })], ["font-semibold", z({ fontWeight: "600" })], ["font-600", z({ fontWeight: "600" })], ["font-bold", z({ fontWeight: "bold" })], ["font-700", z({ fontWeight: "700" })], ["font-extrabold", z({ fontWeight: "800" })], ["font-800", z({ fontWeight: "800" })], ["font-black", z({ fontWeight: "900" })], ["font-900", z({ fontWeight: "900" })], ["include-font-padding", z({ includeFontPadding: true })], ["remove-font-padding", z({ includeFontPadding: false })], ["max-w-none", z({ maxWidth: "99999%" })], ["text-left", z({ textAlign: "left" })], ["text-center", z({ textAlign: "center" })], ["text-right", z({ textAlign: "right" })], ["text-justify", z({ textAlign: "justify" })], ["text-auto", z({ textAlign: "auto" })], ["underline", z({ textDecorationLine: "underline" })], ["line-through", z({ textDecorationLine: "line-through" })], ["no-underline", z({ textDecorationLine: "none" })], ["uppercase", z({ textTransform: "uppercase" })], ["lowercase", z({ textTransform: "lowercase" })], ["capitalize", z({ textTransform: "capitalize" })], ["normal-case", z({ textTransform: "none" })], ["w-auto", z({ width: "auto" })], ["h-auto", z({ height: "auto" })], ["shadow-sm", z({ shadowOffset: { width: 1, height: 1 }, shadowColor: "#000", shadowRadius: 1, shadowOpacity: 0.025, elevation: 1 })], ["shadow", z({ shadowOffset: { width: 1, height: 1 }, shadowColor: "#000", shadowRadius: 1, shadowOpacity: 0.075, elevation: 2 })], ["shadow-md", z({ shadowOffset: { width: 1, height: 1 }, shadowColor: "#000", shadowRadius: 3, shadowOpacity: 0.125, elevation: 3 })], ["shadow-lg", z({ shadowOffset: { width: 1, height: 1 }, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 8, elevation: 8 })], ["shadow-xl", z({ shadowOffset: { width: 1, height: 1 }, shadowColor: "#000", shadowOpacity: 0.19, shadowRadius: 20, elevation: 12 })], ["shadow-2xl", z({ shadowOffset: { width: 1, height: 1 }, shadowColor: "#000", shadowOpacity: 0.25, shadowRadius: 30, elevation: 16 })], ["shadow-none", z({ shadowOffset: { width: 0, height: 0 }, shadowColor: "#000", shadowRadius: 0, shadowOpacity: 0, elevation: 0 })]];
var _u = am;
function Jr(e) {
  return { kind: "dependent", complete(t) {
    (!t.fontVariant || !Array.isArray(t.fontVariant)) && (t.fontVariant = []), t.fontVariant.push(e);
  } };
}
__name(Jr, "Jr");
var om = /* @__PURE__ */ __name(class {
  constructor(e) {
    this.ir = new Map(_u), this.styles = /* @__PURE__ */ new Map(), this.prefixes = /* @__PURE__ */ new Map(), this.ir = new Map([..._u, ...e ?? []]);
  }
  getStyle(e) {
    return this.styles.get(e);
  }
  setStyle(e, t) {
    this.styles.set(e, t);
  }
  getIr(e) {
    return this.ir.get(e);
  }
  setIr(e, t) {
    this.ir.set(e, t);
  }
  getPrefixMatch(e) {
    return this.prefixes.get(e);
  }
  setPrefixMatch(e, t) {
    this.prefixes.set(e, t);
  }
}, "om");
function sm(e, t, r = {}) {
  let n = t?.[e];
  if (!n)
    return wr("fontSize", e, r);
  if (typeof n == "string")
    return an("fontSize", n);
  let i = {}, [a, o] = n, u = tm("fontSize", a);
  if (u && (i = u), typeof o == "string")
    return z(ya("lineHeight", Tu(o, i), i));
  let { lineHeight: s, letterSpacing: l } = o;
  return s && ya("lineHeight", Tu(s, i), i), l && ya("letterSpacing", l, i), z(i);
}
__name(sm, "sm");
function Tu(e, t) {
  let r = Ft(e);
  if (r) {
    let [n, i] = r;
    if ((i === Ie.none || i === Ie.em) && typeof t.fontSize == "number")
      return t.fontSize * n;
  }
  return e;
}
__name(Tu, "Tu");
function um(e, t) {
  var r;
  let n = (r = t?.[e]) !== null && r !== void 0 ? r : e.startsWith("[") ? e.slice(1, -1) : e, i = Ft(n);
  if (!i)
    return null;
  let [a, o] = i;
  if (o === Ie.none)
    return { kind: "dependent", complete(s) {
      if (typeof s.fontSize != "number")
        return "relative line-height utilities require that font-size be set";
      s.lineHeight = s.fontSize * a;
    } };
  let u = on2(a, o);
  return u !== null ? z({ lineHeight: u }) : null;
}
__name(um, "um");
function lm(e, t, r, n, i) {
  let a = "";
  if (n[0] === "[")
    a = n.slice(1, -1);
  else {
    let l = i?.[n];
    if (l)
      a = l;
    else {
      let f = ai(n);
      return f && typeof f == "number" ? Au(f, Ie.px, t, e) : null;
    }
  }
  if (a === "auto")
    return Tl(t, e, "auto");
  let o = Ft(a);
  if (!o)
    return null;
  let [u, s] = o;
  return r && (u = -u), Au(u, s, t, e);
}
__name(lm, "lm");
function Au(e, t, r, n) {
  let i = on2(e, t);
  return i === null ? null : Tl(r, n, i);
}
__name(Au, "Au");
function Tl(e, t, r) {
  switch (e) {
    case "All":
      return { kind: "complete", style: { [`${t}Top`]: r, [`${t}Right`]: r, [`${t}Bottom`]: r, [`${t}Left`]: r } };
    case "Bottom":
    case "Top":
    case "Left":
    case "Right":
      return { kind: "complete", style: { [`${t}${e}`]: r } };
    case "Vertical":
      return { kind: "complete", style: { [`${t}Top`]: r, [`${t}Bottom`]: r } };
    case "Horizontal":
      return { kind: "complete", style: { [`${t}Left`]: r, [`${t}Right`]: r } };
    default:
      return null;
  }
}
__name(Tl, "Tl");
function fm(e) {
  if (!e)
    return {};
  let t = Object.entries(e).reduce((i, [a, o]) => {
    let u = [0, 1 / 0, 0], s = typeof o == "string" ? { min: o } : o, l = s.min ? Su(s.min) : 0;
    l === null ? er(`invalid screen config value: ${a}->min: ${s.min}`) : u[0] = l;
    let f = s.max ? Su(s.max) : 1 / 0;
    return f === null ? er(`invalid screen config value: ${a}->max: ${s.max}`) : u[1] = f, i[a] = u, i;
  }, {}), r = Object.values(t);
  r.sort((i, a) => {
    let [o, u] = i, [s, l] = a;
    return u === 1 / 0 || l === 1 / 0 ? o - s : u - l;
  });
  let n = 0;
  return r.forEach((i) => i[2] = n++), t;
}
__name(fm, "fm");
function cm(e, t) {
  let r = t?.[e];
  if (!r)
    return null;
  if (typeof r == "string")
    return z({ fontFamily: r });
  let n = r[0];
  return n ? z({ fontFamily: n }) : null;
}
__name(cm, "cm");
function rn(e, t, r) {
  if (!r)
    return null;
  let n;
  t.includes("/") && ([t = "", n] = t.split("/", 2));
  let i = "";
  if (t.startsWith("[#") || t.startsWith("[rgb") ? i = t.slice(1, -1) : i = Al(t, r), !i)
    return null;
  if (n) {
    let a = Number(n);
    if (!Number.isNaN(a))
      return i = Ou(i, a / 100), z({ [Hn[e].color]: i });
  }
  return { kind: "dependent", complete(a) {
    let o = Hn[e].opacity, u = a[o];
    typeof u == "number" && (i = Ou(i, u)), a[Hn[e].color] = i;
  } };
}
__name(rn, "rn");
function Mn(e, t) {
  let r = parseInt(t, 10);
  if (Number.isNaN(r))
    return null;
  let n = r / 100;
  return { kind: "complete", style: { [Hn[e].opacity]: n } };
}
__name(Mn, "Mn");
function Ou(e, t) {
  return e.startsWith("#") ? e = hm(e) : e.startsWith("rgb(") && (e = e.replace(/^rgb\(/, "rgba(").replace(/\)$/, ", 1)")), e.replace(/, ?\d*\.?(\d+)\)$/, `, ${t})`);
}
__name(Ou, "Ou");
function pm(e) {
  for (let t in e)
    t.startsWith("__opacity_") && delete e[t];
}
__name(pm, "pm");
var Hn = { bg: { opacity: "__opacity_bg", color: "backgroundColor" }, text: { opacity: "__opacity_text", color: "color" }, border: { opacity: "__opacity_border", color: "borderColor" }, borderTop: { opacity: "__opacity_border", color: "borderTopColor" }, borderBottom: { opacity: "__opacity_border", color: "borderBottomColor" }, borderLeft: { opacity: "__opacity_border", color: "borderLeftColor" }, borderRight: { opacity: "__opacity_border", color: "borderRightColor" }, shadow: { opacity: "__opacity_shadow", color: "shadowColor" }, tint: { opacity: "__opacity_tint", color: "tintColor" } };
function hm(e) {
  let t = e;
  e = e.replace(dm, (o, u, s, l) => u + u + s + s + l + l);
  let r = vm.exec(e);
  if (!r)
    return er(`invalid config hex color value: ${t}`), "rgba(0, 0, 0, 1)";
  let n = parseInt(r[1], 16), i = parseInt(r[2], 16), a = parseInt(r[3], 16);
  return `rgba(${n}, ${i}, ${a}, 1)`;
}
__name(hm, "hm");
function Al(e, t) {
  let r = t[e];
  if (Fu(r))
    return r;
  if (Cu(r) && Fu(r.DEFAULT))
    return r.DEFAULT;
  let [n = "", ...i] = e.split("-");
  for (; n !== e; ) {
    let a = t[n];
    if (Cu(a))
      return Al(i.join("-"), a);
    if (i.length === 0)
      return "";
    n = `${n}-${i.shift()}`;
  }
  return "";
}
__name(Al, "Al");
var dm = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
var vm = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
function gm(e, t) {
  let [r, n] = _l(e);
  if (r.match(/^(-?(\d)+)?$/))
    return mm(r, n, t?.borderWidth);
  if (r = r.replace(/^-/, ""), ["dashed", "solid", "dotted"].includes(r))
    return z({ borderStyle: r });
  let i = "border";
  switch (n) {
    case "Bottom":
      i = "borderBottom";
      break;
    case "Top":
      i = "borderTop";
      break;
    case "Left":
      i = "borderLeft";
      break;
    case "Right":
      i = "borderRight";
      break;
  }
  let a = rn(i, r, t?.borderColor);
  if (a)
    return a;
  let o = `border${n === "All" ? "" : n}Width`;
  r = r.replace(/^-/, "");
  let u = r.slice(1, -1), s = wr(o, u);
  return typeof s?.style[o] != "number" ? null : s;
}
__name(gm, "gm");
function mm(e, t, r) {
  if (!r)
    return null;
  e = e.replace(/^-/, "");
  let n = r[e === "" ? "DEFAULT" : e];
  if (n === void 0)
    return null;
  let i = `border${t === "All" ? "" : t}Width`;
  return an(i, n);
}
__name(mm, "mm");
function Dm(e, t) {
  if (!t)
    return null;
  let [r, n] = _l(e);
  r = r.replace(/^-/, ""), r === "" && (r = "DEFAULT");
  let i = `border${n === "All" ? "" : n}Radius`, a = t[r];
  if (a)
    return Lu(an(i, a));
  let o = wr(i, r);
  return typeof o?.style[i] != "number" ? null : Lu(o);
}
__name(Dm, "Dm");
function Lu(e) {
  if (e?.kind !== "complete")
    return e;
  let t = e.style.borderTopRadius;
  t !== void 0 && (e.style.borderTopLeftRadius = t, e.style.borderTopRightRadius = t, delete e.style.borderTopRadius);
  let r = e.style.borderBottomRadius;
  r !== void 0 && (e.style.borderBottomLeftRadius = r, e.style.borderBottomRightRadius = r, delete e.style.borderBottomRadius);
  let n = e.style.borderLeftRadius;
  n !== void 0 && (e.style.borderBottomLeftRadius = n, e.style.borderTopLeftRadius = n, delete e.style.borderLeftRadius);
  let i = e.style.borderRightRadius;
  return i !== void 0 && (e.style.borderBottomRightRadius = i, e.style.borderTopRightRadius = i, delete e.style.borderRightRadius), e;
}
__name(Lu, "Lu");
function Kr(e, t, r, n) {
  let i = null;
  e === "inset" && (t = t.replace(/^(x|y)-/, (u, s) => (i = s === "x" ? "x" : "y", "")));
  let a = n?.[t];
  if (a) {
    let u = xr(a, { isNegative: r });
    if (u !== null)
      return Pu(e, i, u);
  }
  let o = ai(t, { isNegative: r });
  return o !== null ? Pu(e, i, o) : null;
}
__name(Kr, "Kr");
function Pu(e, t, r) {
  if (e !== "inset")
    return z({ [e]: r });
  switch (t) {
    case null:
      return z({ top: r, left: r, right: r, bottom: r });
    case "y":
      return z({ top: r, bottom: r });
    case "x":
      return z({ left: r, right: r });
  }
}
__name(Pu, "Pu");
function Gn(e, t, r) {
  var n;
  t = t.replace(/^-/, "");
  let i = t === "" ? "DEFAULT" : t, a = Number((n = r?.[i]) !== null && n !== void 0 ? n : t);
  return Number.isNaN(a) ? null : z({ [`flex${e}`]: a });
}
__name(Gn, "Gn");
function ym(e, t) {
  var r, n;
  if (e = t?.[e] || e, ["min-content", "revert", "unset"].includes(e))
    return null;
  if (e.match(/^\d+(\.\d+)?$/))
    return z({ flexGrow: Number(e), flexBasis: "0%" });
  let i = e.match(/^(\d+)\s+(\d+)$/);
  if (i)
    return z({ flexGrow: Number(i[1]), flexShrink: Number(i[2]) });
  if (i = e.match(/^(\d+)\s+([^ ]+)$/), i) {
    let a = xr((r = i[2]) !== null && r !== void 0 ? r : "");
    return a ? z({ flexGrow: Number(i[1]), flexBasis: a }) : null;
  }
  if (i = e.match(/^(\d+)\s+(\d+)\s+(.+)$/), i) {
    let a = xr((n = i[3]) !== null && n !== void 0 ? n : "");
    return a ? z({ flexGrow: Number(i[1]), flexShrink: Number(i[2]), flexBasis: a }) : null;
  }
  return null;
}
__name(ym, "ym");
function Iu(e, t, r = {}, n) {
  let i = n?.[t];
  return i !== void 0 ? an(e, i, r) : wr(e, t, r);
}
__name(Iu, "Iu");
function Wn(e, t, r = {}, n) {
  let i = xr(n?.[t], r);
  return i ? z({ [e]: i }) : (t === "screen" && (t = e.includes("Width") ? "100vw" : "100vh"), wr(e, t, r));
}
__name(Wn, "Wn");
function bm(e, t, r) {
  let n = r?.[e];
  if (n) {
    let i = Ft(n, { isNegative: t });
    if (!i)
      return null;
    let [a, o] = i;
    if (o === Ie.em)
      return xm(a);
    if (o === Ie.percent)
      return er("percentage-based letter-spacing configuration currently unsupported, switch to `em`s, or open an issue if you'd like to see support added."), null;
    let u = on2(a, o, { isNegative: t });
    return u !== null ? z({ letterSpacing: u }) : null;
  }
  return wr("letterSpacing", e, { isNegative: t });
}
__name(bm, "bm");
function xm(e) {
  return { kind: "dependent", complete(t) {
    let r = t.fontSize;
    if (typeof r != "number" || Number.isNaN(r))
      return "tracking-X relative letter spacing classes require font-size to be set";
    t.letterSpacing = Math.round((e * r + Number.EPSILON) * 100) / 100;
  } };
}
__name(xm, "xm");
function wm(e, t) {
  let r = t?.[e];
  if (r) {
    let i = Ft(String(r));
    if (i)
      return z({ opacity: i[0] });
  }
  let n = Ft(e);
  return n ? z({ opacity: n[0] / 100 }) : null;
}
__name(wm, "wm");
function Em(e) {
  let t = parseInt(e, 10);
  return Number.isNaN(t) ? null : { kind: "complete", style: { shadowOpacity: t / 100 } };
}
__name(Em, "Em");
function Fm(e) {
  if (e.includes("/")) {
    let [r = "", n = ""] = e.split("/", 2), i = ba(r), a = ba(n);
    return i === null || a === null ? null : { kind: "complete", style: { shadowOffset: { width: i, height: a } } };
  }
  let t = ba(e);
  return t === null ? null : { kind: "complete", style: { shadowOffset: { width: t, height: t } } };
}
__name(Fm, "Fm");
function ba(e) {
  let t = ai(e);
  return typeof t == "number" ? t : null;
}
__name(ba, "ba");
var Ru = /* @__PURE__ */ __name(class {
  constructor(e, t = {}, r, n, i) {
    var a, o, u, s, l, f;
    this.config = t, this.cache = r, this.position = 0, this.isNull = false, this.isNegative = false, this.context = {}, this.context.device = n;
    let c = e.trim().split(":"), p = [];
    c.length === 1 ? this.string = e : (this.string = (a = c.pop()) !== null && a !== void 0 ? a : "", p = c), this.char = this.string[0];
    let v = fm((o = this.config.theme) === null || o === void 0 ? void 0 : o.screens);
    for (let D of p)
      if (v[D]) {
        let d = (u = v[D]) === null || u === void 0 ? void 0 : u[2];
        d !== void 0 && (this.order = ((s = this.order) !== null && s !== void 0 ? s : 0) + d);
        let g = (l = n.windowDimensions) === null || l === void 0 ? void 0 : l.width;
        if (g) {
          let [y, b] = (f = v[D]) !== null && f !== void 0 ? f : [0, 0];
          (g <= y || g > b) && (this.isNull = true);
        } else
          this.isNull = true;
      } else
        J1(D) ? this.isNull = D !== i : em(D) ? n.windowDimensions ? (n.windowDimensions.width > n.windowDimensions.height ? "landscape" : "portrait") !== D ? this.isNull = true : this.incrementOrder() : this.isNull = true : D === "retina" ? n.pixelDensity === 2 ? this.incrementOrder() : this.isNull = true : D === "dark" ? n.colorScheme !== "dark" ? this.isNull = true : this.incrementOrder() : this.handlePossibleArbitraryBreakpointPrefix(D) || (this.isNull = true);
  }
  parse() {
    if (this.isNull)
      return { kind: "null" };
    let e = this.cache.getIr(this.rest);
    if (e)
      return e;
    this.parseIsNegative();
    let t = this.parseUtility();
    return t ? this.order !== void 0 ? { kind: "ordered", order: this.order, styleIr: t } : t : { kind: "null" };
  }
  parseUtility() {
    var e, t, r, n, i;
    let a = this.config.theme, o = null;
    switch (this.char) {
      case "m":
      case "p": {
        let u = this.peekSlice(1, 3).match(/^(t|b|r|l|x|y)?-/);
        if (u) {
          let s = this.char === "m" ? "margin" : "padding";
          this.advance(((t = (e = u[0]) === null || e === void 0 ? void 0 : e.length) !== null && t !== void 0 ? t : 0) + 1);
          let l = kl(u[1]), f = lm(s, l, this.isNegative, this.rest, (r = this.config.theme) === null || r === void 0 ? void 0 : r[s]);
          if (f)
            return f;
        }
      }
    }
    if (this.consumePeeked("h-") && (o = Iu("height", this.rest, this.context, a?.height), o) || this.consumePeeked("w-") && (o = Iu("width", this.rest, this.context, a?.width), o) || this.consumePeeked("min-w-") && (o = Wn("minWidth", this.rest, this.context, a?.minWidth), o) || this.consumePeeked("min-h-") && (o = Wn("minHeight", this.rest, this.context, a?.minHeight), o) || this.consumePeeked("max-w-") && (o = Wn("maxWidth", this.rest, this.context, a?.maxWidth), o) || this.consumePeeked("max-h-") && (o = Wn("maxHeight", this.rest, this.context, a?.maxHeight), o) || this.consumePeeked("leading-") && (o = um(this.rest, a?.lineHeight), o) || this.consumePeeked("text-") && (o = sm(this.rest, a?.fontSize, this.context), o || (o = rn("text", this.rest, a?.textColor), o) || this.consumePeeked("opacity-") && (o = Mn("text", this.rest), o)) || this.consumePeeked("font-") && (o = cm(this.rest, a?.fontFamily), o) || this.consumePeeked("aspect-") && (this.consumePeeked("ratio-") && er("`aspect-ratio-{ratio}` is deprecated, use `aspect-{ratio}` instead"), o = an("aspectRatio", this.rest, { fractions: true }), o) || this.consumePeeked("tint-") && (o = rn("tint", this.rest, a?.colors), o) || this.consumePeeked("bg-") && (o = rn("bg", this.rest, a?.backgroundColor), o || this.consumePeeked("opacity-") && (o = Mn("bg", this.rest), o)) || this.consumePeeked("border") && (o = gm(this.rest, a), o || this.consumePeeked("-opacity-") && (o = Mn("border", this.rest), o)) || this.consumePeeked("rounded") && (o = Dm(this.rest, a?.borderRadius), o) || this.consumePeeked("bottom-") && (o = Kr("bottom", this.rest, this.isNegative, a?.inset), o) || this.consumePeeked("top-") && (o = Kr("top", this.rest, this.isNegative, a?.inset), o) || this.consumePeeked("left-") && (o = Kr("left", this.rest, this.isNegative, a?.inset), o) || this.consumePeeked("right-") && (o = Kr("right", this.rest, this.isNegative, a?.inset), o) || this.consumePeeked("inset-") && (o = Kr("inset", this.rest, this.isNegative, a?.inset), o) || this.consumePeeked("flex-") && (this.consumePeeked("grow") ? o = Gn("Grow", this.rest, a?.flexGrow) : this.consumePeeked("shrink") ? o = Gn("Shrink", this.rest, a?.flexShrink) : o = ym(this.rest, a?.flex), o) || this.consumePeeked("grow") && (o = Gn("Grow", this.rest, a?.flexGrow), o) || this.consumePeeked("shrink") && (o = Gn("Shrink", this.rest, a?.flexShrink), o) || this.consumePeeked("shadow-color-opacity-") && (o = Mn("shadow", this.rest), o) || this.consumePeeked("shadow-opacity-") && (o = Em(this.rest), o) || this.consumePeeked("shadow-offset-") && (o = Fm(this.rest), o) || this.consumePeeked("shadow-radius-") && (o = wr("shadowRadius", this.rest), o) || this.consumePeeked("shadow-") && (o = rn("shadow", this.rest, a?.colors), o))
      return o;
    if (this.consumePeeked("elevation-")) {
      let u = parseInt(this.rest, 10);
      if (!Number.isNaN(u))
        return z({ elevation: u });
    }
    if (this.consumePeeked("opacity-") && (o = wm(this.rest, a?.opacity), o) || this.consumePeeked("tracking-") && (o = bm(this.rest, this.isNegative, a?.letterSpacing), o))
      return o;
    if (this.consumePeeked("z-")) {
      let u = Number((i = (n = a?.zIndex) === null || n === void 0 ? void 0 : n[this.rest]) !== null && i !== void 0 ? i : this.rest);
      if (!Number.isNaN(u))
        return z({ zIndex: u });
    }
    return er(`\`${this.rest}\` unknown or invalid utility`), null;
  }
  handlePossibleArbitraryBreakpointPrefix(e) {
    var t;
    if (e[0] !== "m")
      return false;
    let r = e.match(/^(min|max)-(w|h)-\[([^\]]+)\]$/);
    if (!r)
      return false;
    if (!(!((t = this.context.device) === null || t === void 0) && t.windowDimensions))
      return this.isNull = true, true;
    let n = this.context.device.windowDimensions, [, i = "", a = "", o = ""] = r, u = a === "w" ? n.width : n.height, s = Ft(o, this.context);
    if (s === null)
      return this.isNull = true, true;
    let [l, f] = s;
    return f !== "px" && (this.isNull = true), (i === "min" ? u >= l : u <= l) ? this.incrementOrder() : this.isNull = true, true;
  }
  advance(e = 1) {
    this.position += e, this.char = this.string[this.position];
  }
  get rest() {
    return this.peekSlice(0, this.string.length);
  }
  peekSlice(e, t) {
    return this.string.slice(this.position + e, this.position + t);
  }
  consumePeeked(e) {
    return this.peekSlice(0, e.length) === e ? (this.advance(e.length), true) : false;
  }
  parseIsNegative() {
    this.char === "-" && (this.advance(), this.isNegative = true, this.context.isNegative = true);
  }
  incrementOrder() {
    var e;
    this.order = ((e = this.order) !== null && e !== void 0 ? e : 0) + 1;
  }
}, "Ru");
function Cm(e) {
  let t = [], r = null;
  return e.forEach((n) => {
    if (typeof n == "string")
      t = [...t, ...xa(n)];
    else if (Array.isArray(n))
      t = [...t, ...n.flatMap(xa)];
    else if (typeof n == "object" && n !== null)
      for (let [i, a] of Object.entries(n))
        typeof a == "boolean" ? t = [...t, ...a ? xa(i) : []] : r ? r[i] = a : r = { [i]: a };
  }), [t.filter(Boolean).filter(Sm), r];
}
__name(Cm, "Cm");
function xa(e) {
  return e.trim().split(/\s+/);
}
__name(xa, "xa");
function Sm(e, t, r) {
  return r.indexOf(e) === t;
}
__name(Sm, "Sm");
function km(e) {
  var t;
  return (t = e?.reduce((r, n) => ({ ...r, ..._m(n.handler) }), {})) !== null && t !== void 0 ? t : {};
}
__name(km, "km");
function _m(e) {
  let t = {};
  return e({ addUtilities: (r) => {
    t = r;
  }, ...Tm }), t;
}
__name(_m, "_m");
function zt(e) {
  throw new Error(`tailwindcss plugin function argument object prop "${e}" not implemented`);
}
__name(zt, "zt");
var Tm = { addComponents: zt, addBase: zt, addVariant: zt, e: zt, prefix: zt, theme: zt, variants: zt, config: zt, corePlugins: zt, matchUtilities: zt, postcss: null };
function Am(e, t) {
  let r = (0, Z1.default)(Om(e)), n = {}, i = km(r.plugins), a = {}, o = Object.entries(i).map(([D, d]) => typeof d == "string" ? (a[D] = d, [D, { kind: "null" }]) : [D, z(d)]).filter(([, D]) => D.kind !== "null");
  function u() {
    return [n.windowDimensions ? `w${n.windowDimensions.width}` : false, n.windowDimensions ? `h${n.windowDimensions.height}` : false, n.fontScale ? `fs${n.fontScale}` : false, n.colorScheme === "dark" ? "dark" : false, n.pixelDensity === 2 ? "retina" : false].filter(Boolean).join("--") || "default";
  }
  __name(u, "u");
  let s = u(), l = {};
  function f() {
    let D = l[s];
    if (D)
      return D;
    let d = new om(o);
    return l[s] = d, d;
  }
  __name(f, "f");
  function c(...D) {
    let d = f(), g = {}, y = [], b = [], [S, k] = Cm(D), C = S.join(" "), E = d.getStyle(C);
    if (E)
      return { ...E, ...k || {} };
    for (let L of S) {
      let _ = d.getIr(L);
      if (!_ && L in a) {
        let U = c(a[L]);
        d.setIr(L, z(U)), g = { ...g, ...U };
        continue;
      }
      switch (_ = new Ru(L, r, d, n, t).parse(), _.kind) {
        case "complete":
          g = { ...g, ..._.style }, d.setIr(L, _);
          break;
        case "dependent":
          y.push(_);
          break;
        case "ordered":
          b.push(_);
          break;
        case "null":
          d.setIr(L, _);
          break;
      }
    }
    if (b.length > 0) {
      b.sort((L, _) => L.order - _.order);
      for (let L of b)
        switch (L.styleIr.kind) {
          case "complete":
            g = { ...g, ...L.styleIr.style };
            break;
          case "dependent":
            y.push(L.styleIr);
            break;
        }
    }
    if (y.length > 0) {
      for (let L of y) {
        let _ = L.complete(g);
        _ && er(_);
      }
      pm(g);
    }
    return C !== "" && d.setStyle(C, g), k && (g = { ...g, ...k }), g;
  }
  __name(c, "c");
  function p(D) {
    let d = c(D.split(/\s+/g).map((g) => g.replace(/^(bg|text|border)-/, "")).map((g) => `bg-${g}`).join(" "));
    return typeof d.backgroundColor == "string" ? d.backgroundColor : void 0;
  }
  __name(p, "p");
  let v = /* @__PURE__ */ __name((D, ...d) => {
    let g = "";
    return D.forEach((y, b) => {
      var S;
      g += y + ((S = d[b]) !== null && S !== void 0 ? S : "");
    }), c(g);
  }, "v");
  return v.style = c, v.color = p, v.prefixMatch = (...D) => {
    let d = D.sort().join(":"), g = f(), y = g.getPrefixMatch(d);
    if (y !== void 0)
      return y;
    let b = new Ru(`${d}:flex`, r, g, n, t).parse().kind !== "null";
    return g.setPrefixMatch(d, b), b;
  }, v.setWindowDimensions = (D) => {
    n.windowDimensions = D, s = u();
  }, v.setFontScale = (D) => {
    n.fontScale = D, s = u();
  }, v.setPixelDensity = (D) => {
    n.pixelDensity = D, s = u();
  }, v.setColorScheme = (D) => {
    n.colorScheme = D, s = u();
  }, v;
}
__name(Am, "Am");
function Om(e) {
  return { ...e, content: ["_no_warnings_please"] };
}
__name(Om, "Om");
var Lm = { handler: ({ addUtilities: e }) => {
  e({ "shadow-sm": { boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" }, shadow: { boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" }, "shadow-md": { boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }, "shadow-lg": { boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" }, "shadow-xl": { boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }, "shadow-2xl": { boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)" }, "shadow-inner": { boxShadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)" }, "shadow-none": { boxShadow: "0 0 #0000" } });
} };
function Pm(e) {
  return Am({ ...e, plugins: [...e?.plugins ?? [], Lm] }, "web");
}
__name(Pm, "Pm");
var $n;
function Im({ width: e, height: t, config: r }) {
  return $n || ($n = Pm(r)), $n.setWindowDimensions({ width: +e, height: +t }), $n;
}
__name(Im, "Im");
var wa = /* @__PURE__ */ new WeakMap();
async function Ol(e, t) {
  let r = await Kn();
  if (!r || !r.Node)
    throw new Error("Satori is not initialized: expect `yoga` to be loaded, got " + r);
  t.fonts = t.fonts || [];
  let n;
  wa.has(t.fonts) ? n = wa.get(t.fonts) : wa.set(t.fonts, n = new X1(t.fonts));
  let i = "width" in t ? t.width : void 0, a = "height" in t ? t.height : void 0, o = r.Node.create();
  i && o.setWidth(i), a && o.setHeight(a), o.setFlexDirection(r.FLEX_DIRECTION_ROW), o.setFlexWrap(r.WRAP_WRAP), o.setAlignContent(r.ALIGN_AUTO), o.setAlignItems(r.ALIGN_FLEX_START), o.setJustifyContent(r.JUSTIFY_FLEX_START), o.setOverflow(r.OVERFLOW_HIDDEN);
  let u = { ...t.graphemeImages }, s = /* @__PURE__ */ new Set();
  hr.clear(), await Vg(e);
  let l = Ta(e, { id: "id", parentStyle: {}, inheritedStyle: { fontSize: 16, fontWeight: "normal", fontFamily: "serif", fontStyle: "normal", lineHeight: 1.2, color: "black", opacity: 1, whiteSpace: "normal", _viewportWidth: i, _viewportHeight: a }, parent: o, font: n, embedFont: t.embedFont, debug: t.debug, graphemeImages: u, canLoadAdditionalAssets: !!t.loadAdditionalAsset, onNodeDetected: t.onNodeDetected, getTwStyles: (D, d) => {
    let g = { ...Im({ width: i, height: a, config: t.tailwindConfig })([D]) };
    return typeof g.lineHeight == "number" && (g.lineHeight = g.lineHeight / (+g.fontSize || d.fontSize || 16)), g.shadowColor && g.boxShadow && (g.boxShadow = g.boxShadow.replace(/rgba?\([^)]+\)/, g.shadowColor)), g;
  } }), f = (await l.next()).value;
  if (t.loadAdditionalAsset && f.length) {
    let D = Rm(f), d = [], g = {};
    await Promise.all(Object.entries(D).flatMap(([y, b]) => b.map((S) => {
      let k = `${y}_${S}`;
      return s.has(k) ? null : (s.add(k), t.loadAdditionalAsset(y, S).then((C) => {
        typeof C == "string" ? g[S] = C : C && (Array.isArray(C) ? d.push(...C) : d.push(C));
      }));
    }))), n.addFonts(d), Object.assign(u, g);
  }
  await l.next(), o.calculateLayout(i, a, r.DIRECTION_LTR);
  let c = (await l.next([0, 0])).value, p = o.getComputedWidth(), v = o.getComputedHeight();
  return o.freeRecursive(), Y1({ width: p, height: v, content: c });
}
__name(Ol, "Ol");
function Rm(e) {
  let t = {}, r = {};
  for (let { word: n, locale: i } of e) {
    let a = V1(n, i).join("|");
    r[a] = r[a] || "", r[a] += n;
  }
  return Object.keys(r).forEach((n) => {
    t[n] = t[n] || [], n === "emoji" ? t[n].push(...Uu(Bt(r[n], "grapheme"))) : (t[n][0] = t[n][0] || "", t[n][0] += Uu(Bt(r[n], "grapheme", n === "unknown" ? void 0 : n)).join(""));
  }), t;
}
__name(Rm, "Rm");
function Uu(e) {
  return Array.from(new Set(e));
}
__name(Uu, "Uu");
var ae = {};
var Um = ae.ALIGN_AUTO = 0;
var Bm = ae.ALIGN_FLEX_START = 1;
var Nm = ae.ALIGN_CENTER = 2;
var Mm = ae.ALIGN_FLEX_END = 3;
var Gm = ae.ALIGN_STRETCH = 4;
var Wm = ae.ALIGN_BASELINE = 5;
var $m = ae.ALIGN_SPACE_BETWEEN = 6;
var jm = ae.ALIGN_SPACE_AROUND = 7;
var Vm = ae.DIMENSION_WIDTH = 0;
var zm = ae.DIMENSION_HEIGHT = 1;
var Hm = ae.DIRECTION_INHERIT = 0;
var Xm = ae.DIRECTION_LTR = 1;
var qm = ae.DIRECTION_RTL = 2;
var Ym = ae.DISPLAY_FLEX = 0;
var Zm = ae.DISPLAY_NONE = 1;
var Qm = ae.EDGE_LEFT = 0;
var Jm = ae.EDGE_TOP = 1;
var Km = ae.EDGE_RIGHT = 2;
var eD = ae.EDGE_BOTTOM = 3;
var tD = ae.EDGE_START = 4;
var rD = ae.EDGE_END = 5;
var nD = ae.EDGE_HORIZONTAL = 6;
var iD = ae.EDGE_VERTICAL = 7;
var aD = ae.EDGE_ALL = 8;
var oD = ae.EXPERIMENTAL_FEATURE_WEB_FLEX_BASIS = 0;
var sD = ae.EXPERIMENTAL_FEATURE_ABSOLUTE_PERCENTAGE_AGAINST_PADDING_EDGE = 1;
var uD = ae.EXPERIMENTAL_FEATURE_FIX_ABSOLUTE_TRAILING_COLUMN_MARGIN = 2;
var lD = ae.FLEX_DIRECTION_COLUMN = 0;
var fD = ae.FLEX_DIRECTION_COLUMN_REVERSE = 1;
var cD = ae.FLEX_DIRECTION_ROW = 2;
var pD = ae.FLEX_DIRECTION_ROW_REVERSE = 3;
var hD = ae.GUTTER_COLUMN = 0;
var dD = ae.GUTTER_ROW = 1;
var vD = ae.GUTTER_ALL = 2;
var gD = ae.JUSTIFY_FLEX_START = 0;
var mD = ae.JUSTIFY_CENTER = 1;
var DD = ae.JUSTIFY_FLEX_END = 2;
var yD = ae.JUSTIFY_SPACE_BETWEEN = 3;
var bD = ae.JUSTIFY_SPACE_AROUND = 4;
var xD = ae.JUSTIFY_SPACE_EVENLY = 5;
var wD = ae.LOG_LEVEL_ERROR = 0;
var ED = ae.LOG_LEVEL_WARN = 1;
var FD = ae.LOG_LEVEL_INFO = 2;
var CD = ae.LOG_LEVEL_DEBUG = 3;
var SD = ae.LOG_LEVEL_VERBOSE = 4;
var kD = ae.LOG_LEVEL_FATAL = 5;
var _D = ae.MEASURE_MODE_UNDEFINED = 0;
var TD = ae.MEASURE_MODE_EXACTLY = 1;
var AD = ae.MEASURE_MODE_AT_MOST = 2;
var OD = ae.NODE_TYPE_DEFAULT = 0;
var LD = ae.NODE_TYPE_TEXT = 1;
var PD = ae.OVERFLOW_VISIBLE = 0;
var ID = ae.OVERFLOW_HIDDEN = 1;
var RD = ae.OVERFLOW_SCROLL = 2;
var UD = ae.POSITION_TYPE_STATIC = 0;
var BD = ae.POSITION_TYPE_RELATIVE = 1;
var ND = ae.POSITION_TYPE_ABSOLUTE = 2;
var MD = ae.PRINT_OPTIONS_LAYOUT = 1;
var GD = ae.PRINT_OPTIONS_STYLE = 2;
var WD = ae.PRINT_OPTIONS_CHILDREN = 4;
var $D = ae.UNIT_UNDEFINED = 0;
var jD = ae.UNIT_POINT = 1;
var VD = ae.UNIT_PERCENT = 2;
var zD = ae.UNIT_AUTO = 3;
var HD = ae.WRAP_NO_WRAP = 0;
var XD = ae.WRAP_WRAP = 1;
var qD = ae.WRAP_WRAP_REVERSE = 2;
var Ll = /* @__PURE__ */ __name((e) => {
  function t(i, a, o) {
    let u = i[a];
    i[a] = function(...s) {
      return o.call(this, u, ...s);
    };
  }
  __name(t, "t");
  for (let i of ["setPosition", "setMargin", "setFlexBasis", "setWidth", "setHeight", "setMinWidth", "setMinHeight", "setMaxWidth", "setMaxHeight", "setPadding"]) {
    let a = { [ae.UNIT_POINT]: e.Node.prototype[i], [ae.UNIT_PERCENT]: e.Node.prototype[`${i}Percent`], [ae.UNIT_AUTO]: e.Node.prototype[`${i}Auto`] };
    t(e.Node.prototype, i, function(o, ...u) {
      let s, l, f = u.pop();
      if (f === "auto")
        s = ae.UNIT_AUTO, l = void 0;
      else if (typeof f == "object")
        s = f.unit, l = f.valueOf();
      else if (s = typeof f == "string" && f.endsWith("%") ? ae.UNIT_PERCENT : ae.UNIT_POINT, l = parseFloat(f), !Number.isNaN(f) && Number.isNaN(l))
        throw Error(`Invalid value ${f} for ${i}`);
      if (!a[s])
        throw Error(`Failed to execute "${i}": Unsupported unit '${f}'`);
      return l !== void 0 ? a[s].call(this, ...u, l) : a[s].call(this, ...u);
    });
  }
  function r(i) {
    return e.MeasureCallback.implement({ measure: (...a) => {
      let { width: o, height: u } = i(...a);
      return { width: o ?? NaN, height: u ?? NaN };
    } });
  }
  __name(r, "r");
  function n(i) {
    return e.DirtiedCallback.implement({ dirtied: i });
  }
  __name(n, "n");
  return t(e.Node.prototype, "setMeasureFunc", function(i, a) {
    return a ? i.call(this, r(a)) : this.unsetMeasureFunc();
  }), t(e.Node.prototype, "setDirtiedFunc", function(i, a) {
    i.call(this, n(a));
  }), t(e.Config.prototype, "free", function() {
    e.Config.destroy(this);
  }), t(e.Node, "create", (i, a) => a ? e.Node.createWithConfig(a) : e.Node.createDefault()), t(e.Node.prototype, "free", function() {
    e.Node.destroy(this);
  }), t(e.Node.prototype, "freeRecursive", function() {
    for (let i = 0, a = this.getChildCount(); i < a; ++i)
      this.getChild(0).freeRecursive();
    this.free();
  }), t(e.Node.prototype, "calculateLayout", function(i, a = NaN, o = NaN, u = ae.DIRECTION_LTR) {
    return i.call(this, a, o, u);
  }), { Config: e.Config, Node: e.Node, ...ae };
}, "Ll");
var YD = (() => {
  var e = typeof document < "u" && document.currentScript ? document.currentScript.src : void 0;
  return function(t = {}) {
    s || (s = t !== void 0 ? t : {}), s.ready = new Promise(function(w, x) {
      l = w, f = x;
    });
    var r, n, i = Object.assign({}, s), a = "";
    typeof document < "u" && document.currentScript && (a = document.currentScript.src), e && (a = e), a = a.indexOf("blob:") !== 0 ? a.substr(0, a.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "";
    var o = console.log.bind(console), u = console.warn.bind(console);
    Object.assign(s, i), i = null, typeof WebAssembly != "object" && ee("no native wasm support detected");
    var s, l, f, c, p = false;
    function v(w, x, P) {
      P = x + P;
      for (var M = ""; !(x >= P); ) {
        var I = w[x++];
        if (!I)
          break;
        if (128 & I) {
          var V = 63 & w[x++];
          if ((224 & I) == 192)
            M += String.fromCharCode((31 & I) << 6 | V);
          else {
            var J = 63 & w[x++];
            65536 > (I = (240 & I) == 224 ? (15 & I) << 12 | V << 6 | J : (7 & I) << 18 | V << 12 | J << 6 | 63 & w[x++]) ? M += String.fromCharCode(I) : (I -= 65536, M += String.fromCharCode(55296 | I >> 10, 56320 | 1023 & I));
          }
        } else
          M += String.fromCharCode(I);
      }
      return M;
    }
    __name(v, "v");
    function D() {
      var w = c.buffer;
      s.HEAP8 = d = new Int8Array(w), s.HEAP16 = y = new Int16Array(w), s.HEAP32 = S = new Int32Array(w), s.HEAPU8 = g = new Uint8Array(w), s.HEAPU16 = b = new Uint16Array(w), s.HEAPU32 = k = new Uint32Array(w), s.HEAPF32 = C = new Float32Array(w), s.HEAPF64 = E = new Float64Array(w);
    }
    __name(D, "D");
    var d, g, y, b, S, k, C, E, L, _ = [], U = [], N = [], X = 0, Y = null;
    function ee(w) {
      throw u(w = "Aborted(" + w + ")"), p = true, f(w = new WebAssembly.RuntimeError(w + ". Build with -sASSERTIONS for more info.")), w;
    }
    __name(ee, "ee");
    function A() {
      return r.startsWith("data:application/octet-stream;base64,");
    }
    __name(A, "A");
    function R() {
      try {
        throw "both async and sync fetching of the wasm failed";
      } catch (w) {
        ee(w);
      }
    }
    __name(R, "R");
    function O(w) {
      for (; 0 < w.length; )
        w.shift()(s);
    }
    __name(O, "O");
    function H(w) {
      if (w === void 0)
        return "_unknown";
      var x = (w = w.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(0);
      return 48 <= x && 57 >= x ? "_" + w : w;
    }
    __name(H, "H");
    function Z(w, x) {
      return w = H(w), function() {
        return x.apply(this, arguments);
      };
    }
    __name(Z, "Z");
    r = "yoga.wasm", A() || (r = a + r);
    var te = [{}, { value: void 0 }, { value: null }, { value: true }, { value: false }], re = [];
    function B(w) {
      var x = Error, P = Z(w, function(M) {
        this.name = w, this.message = M, (M = Error(M).stack) !== void 0 && (this.stack = this.toString() + `
` + M.replace(/^Error(:[^\n]*)?\n/, ""));
      });
      return P.prototype = Object.create(x.prototype), P.prototype.constructor = P, P.prototype.toString = function() {
        return this.message === void 0 ? this.name : this.name + ": " + this.message;
      }, P;
    }
    __name(B, "B");
    var j = void 0;
    function T(w) {
      throw new j(w);
    }
    __name(T, "T");
    var $ = /* @__PURE__ */ __name((w) => (w || T("Cannot use deleted val. handle = " + w), te[w].value), "$"), ie = /* @__PURE__ */ __name((w) => {
      switch (w) {
        case void 0:
          return 1;
        case null:
          return 2;
        case true:
          return 3;
        case false:
          return 4;
        default:
          var x = re.length ? re.pop() : te.length;
          return te[x] = { fa: 1, value: w }, x;
      }
    }, "ie"), W = void 0, fe = void 0;
    function ce(w) {
      for (var x = ""; g[w]; )
        x += fe[g[w++]];
      return x;
    }
    __name(ce, "ce");
    var ge = [];
    function pe() {
      for (; ge.length; ) {
        var w = ge.pop();
        w.L.Z = false, w.delete();
      }
    }
    __name(pe, "pe");
    var me = void 0, Te = {};
    function de(w, x) {
      for (x === void 0 && T("ptr should not be undefined"); w.P; )
        x = w.aa(x), w = w.P;
      return x;
    }
    __name(de, "de");
    var xe = {};
    function Je(w) {
      var x = ce(w = qa(w));
      return qt(w), x;
    }
    __name(Je, "Je");
    function Me(w, x) {
      var P = xe[w];
      return P === void 0 && T(x + " has unknown type " + Je(w)), P;
    }
    __name(Me, "Me");
    function je() {
    }
    __name(je, "je");
    var Be = false;
    function Ke(w) {
      --w.count.value, w.count.value === 0 && (w.S ? w.T.V(w.S) : w.O.M.V(w.N));
    }
    __name(Ke, "Ke");
    var qe = {}, pt = void 0;
    function ut(w) {
      throw new pt(w);
    }
    __name(ut, "ut");
    function rt(w, x) {
      return x.O && x.N || ut("makeClassHandle requires ptr and ptrType"), !!x.T != !!x.S && ut("Both smartPtrType and smartPtr must be specified"), x.count = { value: 1 }, ze(Object.create(w, { L: { value: x } }));
    }
    __name(rt, "rt");
    function ze(w) {
      return typeof FinalizationRegistry > "u" ? (ze = /* @__PURE__ */ __name((x) => x, "ze"), w) : (Be = new FinalizationRegistry((x) => {
        Ke(x.L);
      }), ze = /* @__PURE__ */ __name((x) => {
        var P = x.L;
        return P.S && Be.register(x, { L: P }, x), x;
      }, "ze"), je = /* @__PURE__ */ __name((x) => {
        Be.unregister(x);
      }, "je"), ze(w));
    }
    __name(ze, "ze");
    var yt = {};
    function Mt(w) {
      for (; w.length; ) {
        var x = w.pop();
        w.pop()(x);
      }
    }
    __name(Mt, "Mt");
    function lt(w) {
      return this.fromWireType(S[w >> 2]);
    }
    __name(lt, "lt");
    var ft = {}, Ct = {};
    function ht(w, x, P) {
      function M(q) {
        (q = P(q)).length !== w.length && ut("Mismatched type converter count");
        for (var K = 0; K < w.length; ++K)
          nt(w[K], q[K]);
      }
      __name(M, "M");
      w.forEach(function(q) {
        Ct[q] = x;
      });
      var I = Array(x.length), V = [], J = 0;
      x.forEach((q, K) => {
        xe.hasOwnProperty(q) ? I[K] = xe[q] : (V.push(q), ft.hasOwnProperty(q) || (ft[q] = []), ft[q].push(() => {
          I[K] = xe[q], ++J === V.length && M(I);
        }));
      }), V.length === 0 && M(I);
    }
    __name(ht, "ht");
    function Ht(w) {
      switch (w) {
        case 1:
          return 0;
        case 2:
          return 1;
        case 4:
          return 2;
        case 8:
          return 3;
        default:
          throw TypeError("Unknown type size: " + w);
      }
    }
    __name(Ht, "Ht");
    function nt(w, x, P = {}) {
      if (!("argPackAdvance" in x))
        throw TypeError("registerType registeredInstance requires argPackAdvance");
      var M = x.name;
      if (w || T('type "' + M + '" must have a positive integer typeid pointer'), xe.hasOwnProperty(w)) {
        if (P.ta)
          return;
        T("Cannot register type '" + M + "' twice");
      }
      xe[w] = x, delete Ct[w], ft.hasOwnProperty(w) && (x = ft[w], delete ft[w], x.forEach((I) => I()));
    }
    __name(nt, "nt");
    function bt(w) {
      T(w.L.O.M.name + " instance already deleted");
    }
    __name(bt, "bt");
    function St() {
    }
    __name(St, "St");
    function ve(w, x, P) {
      if (w[x].R === void 0) {
        var M = w[x];
        w[x] = function() {
          return w[x].R.hasOwnProperty(arguments.length) || T("Function '" + P + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + w[x].R + ")!"), w[x].R[arguments.length].apply(this, arguments);
        }, w[x].R = [], w[x].R[M.Y] = M;
      }
    }
    __name(ve, "ve");
    function we(w, x, P, M, I, V, J, q) {
      this.name = w, this.constructor = x, this.W = P, this.V = M, this.P = I, this.oa = V, this.aa = J, this.ma = q, this.ia = [];
    }
    __name(we, "we");
    function Ee(w, x, P) {
      for (; x !== P; )
        x.aa || T("Expected null or instance of " + P.name + ", got an instance of " + x.name), w = x.aa(w), x = x.P;
      return w;
    }
    __name(Ee, "Ee");
    function Fe(w, x) {
      return x === null ? (this.da && T("null is not a valid " + this.name), 0) : (x.L || T('Cannot pass "' + _t(x) + '" as a ' + this.name), x.L.N || T("Cannot pass deleted object as a pointer of type " + this.name), Ee(x.L.N, x.L.O.M, this.M));
    }
    __name(Fe, "Fe");
    function Re(w, x) {
      if (x === null) {
        if (this.da && T("null is not a valid " + this.name), this.ca) {
          var P = this.ea();
          return w !== null && w.push(this.V, P), P;
        }
        return 0;
      }
      if (x.L || T('Cannot pass "' + _t(x) + '" as a ' + this.name), x.L.N || T("Cannot pass deleted object as a pointer of type " + this.name), !this.ba && x.L.O.ba && T("Cannot convert argument of type " + (x.L.T ? x.L.T.name : x.L.O.name) + " to parameter type " + this.name), P = Ee(x.L.N, x.L.O.M, this.M), this.ca)
        switch (x.L.S === void 0 && T("Passing raw pointer to smart pointer is illegal"), this.Aa) {
          case 0:
            x.L.T === this ? P = x.L.S : T("Cannot convert argument of type " + (x.L.T ? x.L.T.name : x.L.O.name) + " to parameter type " + this.name);
            break;
          case 1:
            P = x.L.S;
            break;
          case 2:
            if (x.L.T === this)
              P = x.L.S;
            else {
              var M = x.clone();
              P = this.wa(P, ie(function() {
                M.delete();
              })), w !== null && w.push(this.V, P);
            }
            break;
          default:
            T("Unsupporting sharing policy");
        }
      return P;
    }
    __name(Re, "Re");
    function Ae(w, x) {
      return x === null ? (this.da && T("null is not a valid " + this.name), 0) : (x.L || T('Cannot pass "' + _t(x) + '" as a ' + this.name), x.L.N || T("Cannot pass deleted object as a pointer of type " + this.name), x.L.O.ba && T("Cannot convert argument of type " + x.L.O.name + " to parameter type " + this.name), Ee(x.L.N, x.L.O.M, this.M));
    }
    __name(Ae, "Ae");
    function Pe(w, x, P, M) {
      this.name = w, this.M = x, this.da = P, this.ba = M, this.ca = false, this.V = this.wa = this.ea = this.ja = this.Aa = this.va = void 0, x.P !== void 0 ? this.toWireType = Re : (this.toWireType = M ? Fe : Ae, this.U = null);
    }
    __name(Pe, "Pe");
    var Ge = [];
    function Le(w) {
      var x = Ge[w];
      return x || (w >= Ge.length && (Ge.length = w + 1), Ge[w] = x = L.get(w)), x;
    }
    __name(Le, "Le");
    function We(w, x) {
      var P, M, I = (w = ce(w)).includes("j") ? (P = w, M = [], function() {
        if (M.length = 0, Object.assign(M, arguments), P.includes("j")) {
          var V = s["dynCall_" + P];
          V = M && M.length ? V.apply(null, [x].concat(M)) : V.call(null, x);
        } else
          V = Le(x).apply(null, M);
        return V;
      }) : Le(x);
      return typeof I != "function" && T("unknown function pointer with signature " + w + ": " + x), I;
    }
    __name(We, "We");
    var De = void 0;
    function xt(w, x) {
      var P = [], M = {};
      throw x.forEach(/* @__PURE__ */ __name(function I(V) {
        M[V] || xe[V] || (Ct[V] ? Ct[V].forEach(I) : (P.push(V), M[V] = true));
      }, "I")), new De(w + ": " + P.map(Je).join([", "]));
    }
    __name(xt, "xt");
    function it(w, x, P, M, I) {
      var V = x.length;
      2 > V && T("argTypes array size mismatch! Must at least get return value and 'this' types!");
      var J = x[1] !== null && P !== null, q = false;
      for (P = 1; P < x.length; ++P)
        if (x[P] !== null && x[P].U === void 0) {
          q = true;
          break;
        }
      var K = x[0].name !== "void", Q = V - 2, ne = Array(Q), ye = [], be = [];
      return function() {
        if (arguments.length !== Q && T("function " + w + " called with " + arguments.length + " arguments, expected " + Q + " args!"), be.length = 0, ye.length = J ? 2 : 1, ye[0] = I, J) {
          var Oe = x[1].toWireType(be, this);
          ye[1] = Oe;
        }
        for (var Se = 0; Se < Q; ++Se)
          ne[Se] = x[Se + 2].toWireType(be, arguments[Se]), ye.push(ne[Se]);
        if (Se = M.apply(null, ye), q)
          Mt(be);
        else
          for (var He = J ? 1 : 2; He < x.length; He++) {
            var Fr = He === 1 ? Oe : ne[He - 2];
            x[He].U !== null && x[He].U(Fr);
          }
        return K ? x[0].fromWireType(Se) : void 0;
      };
    }
    __name(it, "it");
    function kt(w, x) {
      for (var P = [], M = 0; M < w; M++)
        P.push(k[x + 4 * M >> 2]);
      return P;
    }
    __name(kt, "kt");
    function Xt(w) {
      4 < w && --te[w].fa == 0 && (te[w] = void 0, re.push(w));
    }
    __name(Xt, "Xt");
    function _t(w) {
      if (w === null)
        return "null";
      var x = typeof w;
      return x === "object" || x === "array" || x === "function" ? w.toString() : "" + w;
    }
    __name(_t, "_t");
    function Ne(w, x) {
      for (var P = "", M = 0; !(M >= x / 2); ++M) {
        var I = y[w + 2 * M >> 1];
        if (I == 0)
          break;
        P += String.fromCharCode(I);
      }
      return P;
    }
    __name(Ne, "Ne");
    function Ye(w, x, P) {
      if (P === void 0 && (P = 2147483647), 2 > P)
        return 0;
      P -= 2;
      var M = x;
      P = P < 2 * w.length ? P / 2 : w.length;
      for (var I = 0; I < P; ++I)
        y[x >> 1] = w.charCodeAt(I), x += 2;
      return y[x >> 1] = 0, x - M;
    }
    __name(Ye, "Ye");
    function dt(w) {
      return 2 * w.length;
    }
    __name(dt, "dt");
    function Er(w, x) {
      for (var P = 0, M = ""; !(P >= x / 4); ) {
        var I = S[w + 4 * P >> 2];
        if (I == 0)
          break;
        ++P, 65536 <= I ? (I -= 65536, M += String.fromCharCode(55296 | I >> 10, 56320 | 1023 & I)) : M += String.fromCharCode(I);
      }
      return M;
    }
    __name(Er, "Er");
    function vr(w, x, P) {
      if (P === void 0 && (P = 2147483647), 4 > P)
        return 0;
      var M = x;
      P = M + P - 4;
      for (var I = 0; I < w.length; ++I) {
        var V = w.charCodeAt(I);
        if (55296 <= V && 57343 >= V && (V = 65536 + ((1023 & V) << 10) | 1023 & w.charCodeAt(++I)), S[x >> 2] = V, (x += 4) + 4 > P)
          break;
      }
      return S[x >> 2] = 0, x - M;
    }
    __name(vr, "vr");
    function et(w) {
      for (var x = 0, P = 0; P < w.length; ++P) {
        var M = w.charCodeAt(P);
        55296 <= M && 57343 >= M && ++P, x += 4;
      }
      return x;
    }
    __name(et, "et");
    var vt = {};
    function Gt(w) {
      var x = vt[w];
      return x === void 0 ? ce(w) : x;
    }
    __name(Gt, "Gt");
    var ct = [], ir = [], pn = [null, [], []];
    j = s.BindingError = B("BindingError"), s.count_emval_handles = function() {
      for (var w = 0, x = 5; x < te.length; ++x)
        te[x] !== void 0 && ++w;
      return w;
    }, s.get_first_emval = function() {
      for (var w = 5; w < te.length; ++w)
        if (te[w] !== void 0)
          return te[w];
      return null;
    }, W = s.PureVirtualError = B("PureVirtualError");
    for (var Lr = Array(256), hn = 0; 256 > hn; ++hn)
      Lr[hn] = String.fromCharCode(hn);
    fe = Lr, s.getInheritedInstanceCount = function() {
      return Object.keys(Te).length;
    }, s.getLiveInheritedInstances = function() {
      var w, x = [];
      for (w in Te)
        Te.hasOwnProperty(w) && x.push(Te[w]);
      return x;
    }, s.flushPendingDeletes = pe, s.setDelayFunction = function(w) {
      me = w, ge.length && me && me(pe);
    }, pt = s.InternalError = B("InternalError"), St.prototype.isAliasOf = function(w) {
      if (!(this instanceof St && w instanceof St))
        return false;
      var x = this.L.O.M, P = this.L.N, M = w.L.O.M;
      for (w = w.L.N; x.P; )
        P = x.aa(P), x = x.P;
      for (; M.P; )
        w = M.aa(w), M = M.P;
      return x === M && P === w;
    }, St.prototype.clone = function() {
      if (this.L.N || bt(this), this.L.$)
        return this.L.count.value += 1, this;
      var w = ze, x = Object, P = x.create, M = Object.getPrototypeOf(this), I = this.L;
      return w = w(P.call(x, M, { L: { value: { count: I.count, Z: I.Z, $: I.$, N: I.N, O: I.O, S: I.S, T: I.T } } })), w.L.count.value += 1, w.L.Z = false, w;
    }, St.prototype.delete = function() {
      this.L.N || bt(this), this.L.Z && !this.L.$ && T("Object already scheduled for deletion"), je(this), Ke(this.L), this.L.$ || (this.L.S = void 0, this.L.N = void 0);
    }, St.prototype.isDeleted = function() {
      return !this.L.N;
    }, St.prototype.deleteLater = function() {
      return this.L.N || bt(this), this.L.Z && !this.L.$ && T("Object already scheduled for deletion"), ge.push(this), ge.length === 1 && me && me(pe), this.L.Z = true, this;
    }, Pe.prototype.pa = function(w) {
      return this.ja && (w = this.ja(w)), w;
    }, Pe.prototype.ga = function(w) {
      this.V && this.V(w);
    }, Pe.prototype.argPackAdvance = 8, Pe.prototype.readValueFromPointer = lt, Pe.prototype.deleteObject = function(w) {
      w !== null && w.delete();
    }, Pe.prototype.fromWireType = function(w) {
      function x() {
        return this.ca ? rt(this.M.W, { O: this.va, N: M, T: this, S: w }) : rt(this.M.W, { O: this, N: w });
      }
      __name(x, "x");
      var P, M = this.pa(w);
      if (!M)
        return this.ga(w), null;
      var I = Te[de(this.M, M)];
      if (I !== void 0)
        return I.L.count.value === 0 ? (I.L.N = M, I.L.S = w, I.clone()) : (I = I.clone(), this.ga(w), I);
      if (!(I = qe[I = this.M.oa(M)]))
        return x.call(this);
      I = this.ba ? I.ka : I.pointerType;
      var V = (/* @__PURE__ */ __name(function J(q, K, Q) {
        return K === Q ? q : Q.P === void 0 || (q = J(q, K, Q.P)) === null ? null : Q.ma(q);
      }, "J"))(M, this.M, I.M);
      return V === null ? x.call(this) : this.ca ? rt(I.M.W, { O: I, N: V, T: this, S: w }) : rt(I.M.W, { O: I, N: V });
    }, De = s.UnboundTypeError = B("UnboundTypeError");
    var zl = { q: function(w, x, P) {
      w = ce(w), x = Me(x, "wrapper"), P = $(P);
      var M = [].slice, I = x.M, V = I.W, J = I.P.W, q = I.P.constructor;
      for (var K in w = Z(w, function() {
        I.P.ia.forEach(function(Q) {
          if (this[Q] === J[Q])
            throw new W("Pure virtual function " + Q + " must be implemented in JavaScript");
        }.bind(this)), Object.defineProperty(this, "__parent", { value: V }), this.__construct.apply(this, M.call(arguments));
      }), V.__construct = function() {
        this === V && T("Pass correct 'this' to __construct");
        var Q = q.implement.apply(void 0, [this].concat(M.call(arguments)));
        je(Q);
        var ne = Q.L;
        Q.notifyOnDestruction(), ne.$ = true, Object.defineProperties(this, { L: { value: ne } }), ze(this), Q = de(I, Q = ne.N), Te.hasOwnProperty(Q) ? T("Tried to register registered instance: " + Q) : Te[Q] = this;
      }, V.__destruct = function() {
        this === V && T("Pass correct 'this' to __destruct"), je(this);
        var Q = this.L.N;
        Q = de(I, Q), Te.hasOwnProperty(Q) ? delete Te[Q] : T("Tried to unregister unregistered instance: " + Q);
      }, w.prototype = Object.create(V), P)
        w.prototype[K] = P[K];
      return ie(w);
    }, l: function(w) {
      var x = yt[w];
      delete yt[w];
      var P = x.ea, M = x.V, I = x.ha;
      ht([w], I.map((V) => V.sa).concat(I.map((V) => V.ya)), (V) => {
        var J = {};
        return I.forEach((q, K) => {
          var Q = V[K], ne = q.qa, ye = q.ra, be = V[K + I.length], Oe = q.xa, Se = q.za;
          J[q.na] = { read: (He) => Q.fromWireType(ne(ye, He)), write: (He, Fr) => {
            var gr = [];
            Oe(Se, He, be.toWireType(gr, Fr)), Mt(gr);
          } };
        }), [{ name: x.name, fromWireType: function(q) {
          var K, Q = {};
          for (K in J)
            Q[K] = J[K].read(q);
          return M(q), Q;
        }, toWireType: function(q, K) {
          for (var Q in J)
            if (!(Q in K))
              throw TypeError('Missing field:  "' + Q + '"');
          var ne = P();
          for (Q in J)
            J[Q].write(ne, K[Q]);
          return q !== null && q.push(M, ne), ne;
        }, argPackAdvance: 8, readValueFromPointer: lt, U: M }];
      });
    }, v: function() {
    }, B: function(w, x, P, M, I) {
      var V = Ht(P);
      nt(w, { name: x = ce(x), fromWireType: function(J) {
        return !!J;
      }, toWireType: function(J, q) {
        return q ? M : I;
      }, argPackAdvance: 8, readValueFromPointer: function(J) {
        if (P === 1)
          var q = d;
        else if (P === 2)
          q = y;
        else if (P === 4)
          q = S;
        else
          throw TypeError("Unknown boolean type size: " + x);
        return this.fromWireType(q[J >> V]);
      }, U: null });
    }, h: function(w, x, P, M, I, V, J, q, K, Q, ne, ye, be) {
      ne = ce(ne), V = We(I, V), q && (q = We(J, q)), Q && (Q = We(K, Q)), be = We(ye, be);
      var Oe, Se = H(ne);
      Oe = /* @__PURE__ */ __name(function() {
        xt("Cannot construct " + ne + " due to unbound types", [M]);
      }, "Oe"), s.hasOwnProperty(Se) ? (T("Cannot register public name '" + Se + "' twice"), ve(s, Se, Se), s.hasOwnProperty(void 0) && T("Cannot register multiple overloads of a function with the same number of arguments (undefined)!"), s[Se].R[void 0] = Oe) : s[Se] = Oe, ht([w, x, P], M ? [M] : [], function(He) {
        if (He = He[0], M)
          var Fr, gr = He.M, Pr = gr.W;
        else
          Pr = St.prototype;
        He = Z(Se, function() {
          if (Object.getPrototypeOf(this) !== pi)
            throw new j("Use 'new' to construct " + ne);
          if (Cr.X === void 0)
            throw new j(ne + " has no accessible constructor");
          var Qa = Cr.X[arguments.length];
          if (Qa === void 0)
            throw new j("Tried to invoke ctor of " + ne + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(Cr.X).toString() + ") parameters instead!");
          return Qa.apply(this, arguments);
        });
        var pi = Object.create(Pr, { constructor: { value: He } });
        He.prototype = pi;
        var Cr = new we(ne, He, pi, be, gr, V, q, Q);
        gr = new Pe(ne, Cr, true, false), Pr = new Pe(ne + "*", Cr, false, false);
        var Za = new Pe(ne + " const*", Cr, false, true);
        return qe[w] = { pointerType: Pr, ka: Za }, Fr = He, s.hasOwnProperty(Se) || ut("Replacing nonexistant public symbol"), s[Se] = Fr, s[Se].Y = void 0, [gr, Pr, Za];
      });
    }, d: function(w, x, P, M, I, V, J) {
      var q = kt(P, M);
      x = ce(x), V = We(I, V), ht([], [w], function(K) {
        function Q() {
          xt("Cannot call " + ne + " due to unbound types", q);
        }
        __name(Q, "Q");
        var ne = (K = K[0]).name + "." + x;
        x.startsWith("@@") && (x = Symbol[x.substring(2)]);
        var ye = K.M.constructor;
        return ye[x] === void 0 ? (Q.Y = P - 1, ye[x] = Q) : (ve(ye, x, ne), ye[x].R[P - 1] = Q), ht([], q, function(be) {
          return be = it(ne, [be[0], null].concat(be.slice(1)), null, V, J), ye[x].R === void 0 ? (be.Y = P - 1, ye[x] = be) : ye[x].R[P - 1] = be, [];
        }), [];
      });
    }, p: function(w, x, P, M, I, V) {
      0 < x || ee();
      var J = kt(x, P);
      I = We(M, I), ht([], [w], function(q) {
        var K = "constructor " + (q = q[0]).name;
        if (q.M.X === void 0 && (q.M.X = []), q.M.X[x - 1] !== void 0)
          throw new j("Cannot register multiple constructors with identical number of parameters (" + (x - 1) + ") for class '" + q.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
        return q.M.X[x - 1] = () => {
          xt("Cannot construct " + q.name + " due to unbound types", J);
        }, ht([], J, function(Q) {
          return Q.splice(1, 0, null), q.M.X[x - 1] = it(K, Q, null, I, V), [];
        }), [];
      });
    }, a: function(w, x, P, M, I, V, J, q) {
      var K = kt(P, M);
      x = ce(x), V = We(I, V), ht([], [w], function(Q) {
        function ne() {
          xt("Cannot call " + ye + " due to unbound types", K);
        }
        __name(ne, "ne");
        var ye = (Q = Q[0]).name + "." + x;
        x.startsWith("@@") && (x = Symbol[x.substring(2)]), q && Q.M.ia.push(x);
        var be = Q.M.W, Oe = be[x];
        return Oe === void 0 || Oe.R === void 0 && Oe.className !== Q.name && Oe.Y === P - 2 ? (ne.Y = P - 2, ne.className = Q.name, be[x] = ne) : (ve(be, x, ye), be[x].R[P - 2] = ne), ht([], K, function(Se) {
          return Se = it(ye, Se, Q, V, J), be[x].R === void 0 ? (Se.Y = P - 2, be[x] = Se) : be[x].R[P - 2] = Se, [];
        }), [];
      });
    }, A: function(w, x) {
      nt(w, { name: x = ce(x), fromWireType: function(P) {
        var M = $(P);
        return Xt(P), M;
      }, toWireType: function(P, M) {
        return ie(M);
      }, argPackAdvance: 8, readValueFromPointer: lt, U: null });
    }, n: function(w, x, P) {
      P = Ht(P), nt(w, { name: x = ce(x), fromWireType: function(M) {
        return M;
      }, toWireType: function(M, I) {
        return I;
      }, argPackAdvance: 8, readValueFromPointer: function(M, I) {
        switch (I) {
          case 2:
            return function(V) {
              return this.fromWireType(C[V >> 2]);
            };
          case 3:
            return function(V) {
              return this.fromWireType(E[V >> 3]);
            };
          default:
            throw TypeError("Unknown float type: " + M);
        }
      }(x, P), U: null });
    }, e: function(w, x, P, M, I) {
      x = ce(x), I === -1 && (I = 4294967295), I = Ht(P);
      var V = /* @__PURE__ */ __name((q) => q, "V");
      if (M === 0) {
        var J = 32 - 8 * P;
        V = /* @__PURE__ */ __name((q) => q << J >>> J, "V");
      }
      P = x.includes("unsigned") ? function(q, K) {
        return K >>> 0;
      } : function(q, K) {
        return K;
      }, nt(w, { name: x, fromWireType: V, toWireType: P, argPackAdvance: 8, readValueFromPointer: function(q, K, Q) {
        switch (K) {
          case 0:
            return Q ? function(ne) {
              return d[ne];
            } : function(ne) {
              return g[ne];
            };
          case 1:
            return Q ? function(ne) {
              return y[ne >> 1];
            } : function(ne) {
              return b[ne >> 1];
            };
          case 2:
            return Q ? function(ne) {
              return S[ne >> 2];
            } : function(ne) {
              return k[ne >> 2];
            };
          default:
            throw TypeError("Unknown integer type: " + q);
        }
      }(x, I, M !== 0), U: null });
    }, b: function(w, x, P) {
      function M(V) {
        V >>= 2;
        var J = k;
        return new I(J.buffer, J[V + 1], J[V]);
      }
      __name(M, "M");
      var I = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][x];
      nt(w, { name: P = ce(P), fromWireType: M, argPackAdvance: 8, readValueFromPointer: M }, { ta: true });
    }, o: function(w, x) {
      var P = (x = ce(x)) === "std::string";
      nt(w, { name: x, fromWireType: function(M) {
        var I = k[M >> 2], V = M + 4;
        if (P)
          for (var J = V, q = 0; q <= I; ++q) {
            var K = V + q;
            if (q == I || g[K] == 0) {
              if (J = J ? v(g, J, K - J) : "", Q === void 0)
                var Q = J;
              else
                Q += "\0" + J;
              J = K + 1;
            }
          }
        else {
          for (q = 0, Q = Array(I); q < I; ++q)
            Q[q] = String.fromCharCode(g[V + q]);
          Q = Q.join("");
        }
        return qt(M), Q;
      }, toWireType: function(M, I) {
        I instanceof ArrayBuffer && (I = new Uint8Array(I));
        var V, J = typeof I == "string";
        if (J || I instanceof Uint8Array || I instanceof Uint8ClampedArray || I instanceof Int8Array || T("Cannot pass non-string to std::string"), P && J) {
          var q = 0;
          for (V = 0; V < I.length; ++V) {
            var K = I.charCodeAt(V);
            127 >= K ? q++ : 2047 >= K ? q += 2 : 55296 <= K && 57343 >= K ? (q += 4, ++V) : q += 3;
          }
          V = q;
        } else
          V = I.length;
        if (K = (q = ci(4 + V + 1)) + 4, k[q >> 2] = V, P && J) {
          if (J = K, K = V + 1, V = g, 0 < K) {
            K = J + K - 1;
            for (var Q = 0; Q < I.length; ++Q) {
              var ne = I.charCodeAt(Q);
              if (55296 <= ne && 57343 >= ne && (ne = 65536 + ((1023 & ne) << 10) | 1023 & I.charCodeAt(++Q)), 127 >= ne) {
                if (J >= K)
                  break;
                V[J++] = ne;
              } else {
                if (2047 >= ne) {
                  if (J + 1 >= K)
                    break;
                  V[J++] = 192 | ne >> 6;
                } else {
                  if (65535 >= ne) {
                    if (J + 2 >= K)
                      break;
                    V[J++] = 224 | ne >> 12;
                  } else {
                    if (J + 3 >= K)
                      break;
                    V[J++] = 240 | ne >> 18, V[J++] = 128 | ne >> 12 & 63;
                  }
                  V[J++] = 128 | ne >> 6 & 63;
                }
                V[J++] = 128 | 63 & ne;
              }
            }
            V[J] = 0;
          }
        } else if (J)
          for (J = 0; J < V; ++J)
            255 < (Q = I.charCodeAt(J)) && (qt(K), T("String has UTF-16 code units that do not fit in 8 bits")), g[K + J] = Q;
        else
          for (J = 0; J < V; ++J)
            g[K + J] = I[J];
        return M !== null && M.push(qt, q), q;
      }, argPackAdvance: 8, readValueFromPointer: lt, U: function(M) {
        qt(M);
      } });
    }, k: function(w, x, P) {
      if (P = ce(P), x === 2)
        var M = Ne, I = Ye, V = dt, J = /* @__PURE__ */ __name(() => b, "J"), q = 1;
      else
        x === 4 && (M = Er, I = vr, V = et, J = /* @__PURE__ */ __name(() => k, "J"), q = 2);
      nt(w, { name: P, fromWireType: function(K) {
        for (var Q, ne = k[K >> 2], ye = J(), be = K + 4, Oe = 0; Oe <= ne; ++Oe) {
          var Se = K + 4 + Oe * x;
          (Oe == ne || ye[Se >> q] == 0) && (be = M(be, Se - be), Q === void 0 ? Q = be : Q += "\0" + be, be = Se + x);
        }
        return qt(K), Q;
      }, toWireType: function(K, Q) {
        typeof Q != "string" && T("Cannot pass non-string to C++ string type " + P);
        var ne = V(Q), ye = ci(4 + ne + x);
        return k[ye >> 2] = ne >> q, I(Q, ye + 4, ne + x), K !== null && K.push(qt, ye), ye;
      }, argPackAdvance: 8, readValueFromPointer: lt, U: function(K) {
        qt(K);
      } });
    }, m: function(w, x, P, M, I, V) {
      yt[w] = { name: ce(x), ea: We(P, M), V: We(I, V), ha: [] };
    }, c: function(w, x, P, M, I, V, J, q, K, Q) {
      yt[w].ha.push({ na: ce(x), sa: P, qa: We(M, I), ra: V, ya: J, xa: We(q, K), za: Q });
    }, C: function(w, x) {
      nt(w, { ua: true, name: x = ce(x), argPackAdvance: 0, fromWireType: function() {
      }, toWireType: function() {
      } });
    }, t: function(w, x, P, M, I) {
      w = ct[w], x = $(x), P = Gt(P);
      var V = [];
      return k[M >> 2] = ie(V), w(x, P, V, I);
    }, j: function(w, x, P, M) {
      w = ct[w], w(x = $(x), P = Gt(P), null, M);
    }, f: Xt, g: function(w, x) {
      var P, M, I = function(K, Q) {
        for (var ne = Array(K), ye = 0; ye < K; ++ye)
          ne[ye] = Me(k[Q + 4 * ye >> 2], "parameter " + ye);
        return ne;
      }(w, x), V = I[0], J = ir[x = V.name + "_$" + I.slice(1).map(function(K) {
        return K.name;
      }).join("_") + "$"];
      if (J !== void 0)
        return J;
      var q = Array(w - 1);
      return P = /* @__PURE__ */ __name((K, Q, ne, ye) => {
        for (var be = 0, Oe = 0; Oe < w - 1; ++Oe)
          q[Oe] = I[Oe + 1].readValueFromPointer(ye + be), be += I[Oe + 1].argPackAdvance;
        for (Oe = 0, K = K[Q].apply(K, q); Oe < w - 1; ++Oe)
          I[Oe + 1].la && I[Oe + 1].la(q[Oe]);
        if (!V.ua)
          return V.toWireType(ne, K);
      }, "P"), M = ct.length, ct.push(P), J = M, ir[x] = J;
    }, r: function(w) {
      4 < w && (te[w].fa += 1);
    }, s: function(w) {
      Mt($(w)), Xt(w);
    }, i: function() {
      ee("");
    }, x: function(w, x, P) {
      g.copyWithin(w, x, x + P);
    }, w: function(w) {
      var x = g.length;
      if (2147483648 < (w >>>= 0))
        return false;
      for (var P = 1; 4 >= P; P *= 2) {
        var M = x * (1 + 0.2 / P);
        M = Math.min(M, w + 100663296);
        var I = Math, V = I.min;
        M = Math.max(w, M), M += (65536 - M % 65536) % 65536;
        e: {
          var J = c.buffer;
          try {
            c.grow(V.call(I, 2147483648, M) - J.byteLength + 65535 >>> 16), D();
            var q = 1;
            break e;
          } catch {
          }
          q = void 0;
        }
        if (q)
          return true;
      }
      return false;
    }, z: function() {
      return 52;
    }, u: function() {
      return 70;
    }, y: function(w, x, P, M) {
      for (var I = 0, V = 0; V < P; V++) {
        var J = k[x >> 2], q = k[x + 4 >> 2];
        x += 8;
        for (var K = 0; K < q; K++) {
          var Q = g[J + K], ne = pn[w];
          Q === 0 || Q === 10 ? ((w === 1 ? o : u)(v(ne, 0)), ne.length = 0) : ne.push(Q);
        }
        I += q;
      }
      return k[M >> 2] = I, 0;
    } };
    (function() {
      function w(I) {
        s.asm = I.exports, c = s.asm.D, D(), L = s.asm.I, U.unshift(s.asm.E), --X == 0 && Y && (I = Y, Y = null, I());
      }
      __name(w, "w");
      function x(I) {
        w(I.instance);
      }
      __name(x, "x");
      function P(I) {
        return (typeof fetch == "function" ? fetch(r, { credentials: "same-origin" }).then(function(V) {
          if (!V.ok)
            throw "failed to load wasm binary file at '" + r + "'";
          return V.arrayBuffer();
        }).catch(function() {
          return R();
        }) : Promise.resolve().then(function() {
          return R();
        })).then(function(V) {
          return WebAssembly.instantiate(V, M);
        }).then(function(V) {
          return V;
        }).then(I, function(V) {
          u("failed to asynchronously prepare wasm: " + V), ee(V);
        });
      }
      __name(P, "P");
      var M = { a: zl };
      if (X++, s.instantiateWasm)
        try {
          return s.instantiateWasm(M, w);
        } catch (I) {
          u("Module.instantiateWasm callback failed with error: " + I), f(I);
        }
      (typeof WebAssembly.instantiateStreaming != "function" || A() || typeof fetch != "function" ? P(x) : fetch(r, { credentials: "same-origin" }).then(function(I) {
        return WebAssembly.instantiateStreaming(I, M).then(x, function(V) {
          return u("wasm streaming compile failed: " + V), u("falling back to ArrayBuffer instantiation"), P(x);
        });
      })).catch(f);
    })();
    var qa = s.___getTypeName = function() {
      return (qa = s.___getTypeName = s.asm.F).apply(null, arguments);
    };
    function ci() {
      return (ci = s.asm.H).apply(null, arguments);
    }
    __name(ci, "ci");
    function qt() {
      return (qt = s.asm.J).apply(null, arguments);
    }
    __name(qt, "qt");
    function Ya() {
      0 < X || (O(_), 0 < X || n || (n = true, s.calledRun = true, p || (O(U), l(s), O(N))));
    }
    __name(Ya, "Ya");
    return s.__embind_initialize_bindings = function() {
      return (s.__embind_initialize_bindings = s.asm.G).apply(null, arguments);
    }, s.dynCall_jiji = function() {
      return (s.dynCall_jiji = s.asm.K).apply(null, arguments);
    }, Y = /* @__PURE__ */ __name(function w() {
      n || Ya(), n || (Y = w);
    }, "w"), Ya(), t.ready;
  };
})();
async function Pl(e) {
  let t = await YD({ instantiateWasm(r, n) {
    WebAssembly.instantiate(e, r).then((i) => {
      i instanceof WebAssembly.Instance ? n(i) : n(i.instance);
    });
  } });
  return Ll(t);
}
__name(Pl, "Pl");
var he;
var rr = new Array(128).fill(void 0);
rr.push(void 0, null, true, false);
var ln = rr.length;
function tr(e) {
  ln === rr.length && rr.push(rr.length + 1);
  let t = ln;
  return ln = rr[t], rr[t] = e, t;
}
__name(tr, "tr");
function Nt(e) {
  return rr[e];
}
__name(Nt, "Nt");
function ZD(e) {
  e < 132 || (rr[e] = ln, ln = e);
}
__name(ZD, "ZD");
function nr(e) {
  let t = Nt(e);
  return ZD(e), t;
}
__name(nr, "nr");
var fn = 0;
var sn = null;
function oi() {
  return (sn === null || sn.byteLength === 0) && (sn = new Uint8Array(he.memory.buffer)), sn;
}
__name(oi, "oi");
var si = new TextEncoder("utf-8");
var QD = typeof si.encodeInto == "function" ? function(e, t) {
  return si.encodeInto(e, t);
} : function(e, t) {
  let r = si.encode(e);
  return t.set(r), { read: e.length, written: r.length };
};
function Va(e, t, r) {
  if (r === void 0) {
    let u = si.encode(e), s = t(u.length);
    return oi().subarray(s, s + u.length).set(u), fn = u.length, s;
  }
  let n = e.length, i = t(n), a = oi(), o = 0;
  for (; o < n; o++) {
    let u = e.charCodeAt(o);
    if (u > 127)
      break;
    a[i + o] = u;
  }
  if (o !== n) {
    o !== 0 && (e = e.slice(o)), i = r(i, n, n = o + e.length * 3);
    let u = oi().subarray(i + o, i + n), s = QD(e, u);
    o += s.written;
  }
  return fn = o, i;
}
__name(Va, "Va");
function Il(e) {
  return e == null;
}
__name(Il, "Il");
var un = null;
function Qe() {
  return (un === null || un.byteLength === 0) && (un = new Int32Array(he.memory.buffer)), un;
}
__name(Qe, "Qe");
var Rl = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
Rl.decode();
function ui(e, t) {
  return Rl.decode(oi().subarray(e, e + t));
}
__name(ui, "ui");
function JD(e, t) {
  if (!(e instanceof t))
    throw new Error(`expected instance of ${t.name}`);
  return e.ptr;
}
__name(JD, "JD");
var li = /* @__PURE__ */ __name(class {
  static __wrap(e) {
    let t = Object.create(li.prototype);
    return t.ptr = e, t;
  }
  __destroy_into_raw() {
    let e = this.ptr;
    return this.ptr = 0, e;
  }
  free() {
    let e = this.__destroy_into_raw();
    he.__wbg_bbox_free(e);
  }
  get x() {
    return he.__wbg_get_bbox_x(this.ptr);
  }
  set x(e) {
    he.__wbg_set_bbox_x(this.ptr, e);
  }
  get y() {
    return he.__wbg_get_bbox_y(this.ptr);
  }
  set y(e) {
    he.__wbg_set_bbox_y(this.ptr, e);
  }
  get width() {
    return he.__wbg_get_bbox_width(this.ptr);
  }
  set width(e) {
    he.__wbg_set_bbox_width(this.ptr, e);
  }
  get height() {
    return he.__wbg_get_bbox_height(this.ptr);
  }
  set height(e) {
    he.__wbg_set_bbox_height(this.ptr, e);
  }
}, "li");
var Ul = /* @__PURE__ */ __name(class {
  static __wrap(e) {
    let t = Object.create(Ul.prototype);
    return t.ptr = e, t;
  }
  __destroy_into_raw() {
    let e = this.ptr;
    return this.ptr = 0, e;
  }
  free() {
    let e = this.__destroy_into_raw();
    he.__wbg_renderedimage_free(e);
  }
  get width() {
    return he.renderedimage_width(this.ptr) >>> 0;
  }
  get height() {
    return he.renderedimage_height(this.ptr) >>> 0;
  }
  asPng() {
    try {
      let n = he.__wbindgen_add_to_stack_pointer(-16);
      he.renderedimage_asPng(n, this.ptr);
      var e = Qe()[n / 4 + 0], t = Qe()[n / 4 + 1], r = Qe()[n / 4 + 2];
      if (r)
        throw nr(t);
      return nr(e);
    } finally {
      he.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get pixels() {
    let e = he.renderedimage_pixels(this.ptr);
    return nr(e);
  }
}, "Ul");
var za = /* @__PURE__ */ __name(class {
  static __wrap(e) {
    let t = Object.create(za.prototype);
    return t.ptr = e, t;
  }
  __destroy_into_raw() {
    let e = this.ptr;
    return this.ptr = 0, e;
  }
  free() {
    let e = this.__destroy_into_raw();
    he.__wbg_resvg_free(e);
  }
  constructor(e, t) {
    try {
      let u = he.__wbindgen_add_to_stack_pointer(-16);
      var r = Il(t) ? 0 : Va(t, he.__wbindgen_malloc, he.__wbindgen_realloc), n = fn;
      he.resvg_new(u, tr(e), r, n);
      var i = Qe()[u / 4 + 0], a = Qe()[u / 4 + 1], o = Qe()[u / 4 + 2];
      if (o)
        throw nr(a);
      return za.__wrap(i);
    } finally {
      he.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get width() {
    return he.resvg_width(this.ptr);
  }
  get height() {
    return he.resvg_height(this.ptr);
  }
  render() {
    try {
      let n = he.__wbindgen_add_to_stack_pointer(-16);
      he.resvg_render(n, this.ptr);
      var e = Qe()[n / 4 + 0], t = Qe()[n / 4 + 1], r = Qe()[n / 4 + 2];
      if (r)
        throw nr(t);
      return Ul.__wrap(e);
    } finally {
      he.__wbindgen_add_to_stack_pointer(16);
    }
  }
  toString() {
    try {
      let r = he.__wbindgen_add_to_stack_pointer(-16);
      he.resvg_toString(r, this.ptr);
      var e = Qe()[r / 4 + 0], t = Qe()[r / 4 + 1];
      return ui(e, t);
    } finally {
      he.__wbindgen_add_to_stack_pointer(16), he.__wbindgen_free(e, t);
    }
  }
  innerBBox() {
    let e = he.resvg_innerBBox(this.ptr);
    return e === 0 ? void 0 : li.__wrap(e);
  }
  getBBox() {
    let e = he.resvg_getBBox(this.ptr);
    return e === 0 ? void 0 : li.__wrap(e);
  }
  cropByBBox(e) {
    JD(e, li), he.resvg_cropByBBox(this.ptr, e.ptr);
  }
  imagesToResolve() {
    try {
      let n = he.__wbindgen_add_to_stack_pointer(-16);
      he.resvg_imagesToResolve(n, this.ptr);
      var e = Qe()[n / 4 + 0], t = Qe()[n / 4 + 1], r = Qe()[n / 4 + 2];
      if (r)
        throw nr(t);
      return nr(e);
    } finally {
      he.__wbindgen_add_to_stack_pointer(16);
    }
  }
  resolveImage(e, t) {
    try {
      let i = he.__wbindgen_add_to_stack_pointer(-16), a = Va(e, he.__wbindgen_malloc, he.__wbindgen_realloc), o = fn;
      he.resvg_resolveImage(i, this.ptr, a, o, tr(t));
      var r = Qe()[i / 4 + 0], n = Qe()[i / 4 + 1];
      if (n)
        throw nr(r);
    } finally {
      he.__wbindgen_add_to_stack_pointer(16);
    }
  }
}, "za");
async function KD(e, t) {
  if (typeof Response == "function" && e instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function")
      try {
        return await WebAssembly.instantiateStreaming(e, t);
      } catch (n) {
        if (e.headers.get("Content-Type") != "application/wasm")
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", n);
        else
          throw n;
      }
    let r = await e.arrayBuffer();
    return await WebAssembly.instantiate(r, t);
  } else {
    let r = await WebAssembly.instantiate(e, t);
    return r instanceof WebAssembly.Instance ? { instance: r, module: e } : r;
  }
}
__name(KD, "KD");
function ey() {
  let e = {};
  return e.wbg = {}, e.wbg.__wbg_new_15d3966e9981a196 = function(t, r) {
    let n = new Error(ui(t, r));
    return tr(n);
  }, e.wbg.__wbindgen_memory = function() {
    let t = he.memory;
    return tr(t);
  }, e.wbg.__wbg_buffer_cf65c07de34b9a08 = function(t) {
    let r = Nt(t).buffer;
    return tr(r);
  }, e.wbg.__wbg_newwithbyteoffsetandlength_9fb2f11355ecadf5 = function(t, r, n) {
    let i = new Uint8Array(Nt(t), r >>> 0, n >>> 0);
    return tr(i);
  }, e.wbg.__wbindgen_object_drop_ref = function(t) {
    nr(t);
  }, e.wbg.__wbg_new_537b7341ce90bb31 = function(t) {
    let r = new Uint8Array(Nt(t));
    return tr(r);
  }, e.wbg.__wbg_instanceof_Uint8Array_01cebe79ca606cca = function(t) {
    let r;
    try {
      r = Nt(t) instanceof Uint8Array;
    } catch {
      r = false;
    }
    return r;
  }, e.wbg.__wbindgen_string_get = function(t, r) {
    let n = Nt(r), i = typeof n == "string" ? n : void 0;
    var a = Il(i) ? 0 : Va(i, he.__wbindgen_malloc, he.__wbindgen_realloc), o = fn;
    Qe()[t / 4 + 1] = o, Qe()[t / 4 + 0] = a;
  }, e.wbg.__wbg_new_b525de17f44a8943 = function() {
    let t = new Array();
    return tr(t);
  }, e.wbg.__wbindgen_string_new = function(t, r) {
    let n = ui(t, r);
    return tr(n);
  }, e.wbg.__wbg_push_49c286f04dd3bf59 = function(t, r) {
    return Nt(t).push(Nt(r));
  }, e.wbg.__wbg_length_27a2afe8ab42b09f = function(t) {
    return Nt(t).length;
  }, e.wbg.__wbg_set_17499e8aa4003ebd = function(t, r, n) {
    Nt(t).set(Nt(r), n >>> 0);
  }, e.wbg.__wbindgen_throw = function(t, r) {
    throw new Error(ui(t, r));
  }, e;
}
__name(ey, "ey");
function ty(e, t) {
  return he = e.exports, Bl.__wbindgen_wasm_module = t, un = null, sn = null, he;
}
__name(ty, "ty");
async function Bl(e) {
  typeof e > "u" && (e = new URL("index_bg.wasm", void 0));
  let t = ey();
  (typeof e == "string" || typeof Request == "function" && e instanceof Request || typeof URL == "function" && e instanceof URL) && (e = fetch(e));
  let { instance: r, module: n } = await KD(await e, t);
  return ty(r, n);
}
__name(Bl, "Bl");
var ry = Bl;
var Ha = false;
var Nl = /* @__PURE__ */ __name(async (e) => {
  if (Ha)
    throw new Error("Already initialized. The `initWasm()` function can be used only once.");
  await ry(await e), Ha = true;
}, "Nl");
var Ml = /* @__PURE__ */ __name(class extends za {
  constructor(e, t) {
    if (!Ha)
      throw new Error("Wasm has not been initialized. Call `initWasm()` function.");
    super(e, JSON.stringify(t));
  }
}, "Ml");
var Gl = sy;
var ny = /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/;
var iy = /^[a-z\u00E0-\u00FCA-Z\u00C0-\u00DC][\d|a-z\u00E0-\u00FCA-Z\u00C0-\u00DC]*$/;
var ay = /([A-Z\u00C0-\u00DC]{4,})/g;
var oy = /^[A-Z\u00C0-\u00DC]+$/;
function sy(e) {
  for (var t = e.split(ny), r = t.length, n = new Array(r), i = 0; i < r; i++) {
    var a = t[i];
    if (a !== "") {
      var o = iy.test(a) && !oy.test(a);
      o && (a = a.replace(ay, function(s, l, f) {
        return uy(s, a.length - f - s.length == 0);
      }));
      var u = a[0];
      u = i > 0 ? u.toUpperCase() : u.toLowerCase(), n[i] = u + (o ? a.slice(1) : a.slice(1).toLowerCase());
    }
  }
  return n.join("");
}
__name(sy, "sy");
function uy(e, t) {
  var r = e.split(""), n = r.shift().toUpperCase(), i = t ? r.pop().toLowerCase() : r.pop();
  return n + r.join("").toLowerCase() + i;
}
__name(uy, "uy");
var cn = /* @__PURE__ */ __name((e) => e.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\f/g, "\\f").replace(/"/g, '\\"').replace(/\&/g, "\\&"), "cn");
var Wl = /* @__PURE__ */ __name((e) => {
  let t = "", r = e.getAttribute("style");
  if (r) {
    let a = r.replace(/\n/g, "").replace(/\s\s+/g, " ").split(";").reduce((o, u) => {
      let [s, l] = u.split(":");
      return s && l && (o += `"${Gl(s.trim())}": "${cn(l.trim())}",`), o;
    }, "");
    a.endsWith(",") && (a = a.slice(0, -1)), a && (t += `"style":{${a}},`);
  }
  let n = e.getAttribute("src");
  if (n) {
    let i = e.getAttribute("width"), a = e.getAttribute("height");
    i && a ? t += `"src":"${cn(n)}", "width":"${i}", "height":"${a}",` : (console.warn("Image missing width or height attribute as required by Satori"), t += `"src":"${cn(n)}",`);
  }
  return t;
}, "Wl");
var fi = /* @__PURE__ */ __name((e) => e.endsWith(",") ? e.slice(0, -1) : e, "fi");
async function $l(e) {
  let t = "";
  await new HTMLRewriter().on("*", { element(n) {
    let i = Wl(n);
    t += `{"type":"${n.tagName}", "props":{${i}"children": [`;
    try {
      n.onEndTag(() => {
        t = fi(t), t += "]}},";
      });
    } catch {
      t = fi(t), t += "]}},";
    }
  }, text(n) {
    if (n.text) {
      let i = cn(n.text);
      i && (t += `"${i}",`);
    }
  } }).transform(new Response(`<div style="display: flex; flex-direction: column;">${e}</div>`)).text(), t = fi(t);
  try {
    return JSON.parse(t);
  } catch (n) {
    return console.error(n), null;
  }
}
__name($l, "$l");
async function jl({ family: e, weight: t, text: r }) {
  let n = { family: `${encodeURIComponent(e)}${t ? `:wght@${t}` : ""}` };
  r ? n.text = r : n.subset = "latin";
  let i = `https://fonts.googleapis.com/css2?${Object.keys(n).map((f) => `${f}=${n[f]}`).join("&")}`, a = caches.default, o = i, u = await a.match(o);
  u || (u = await fetch(`${i}`, { headers: { "User-Agent": "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1" } }), u = new Response(u.body, u), u.headers.append("Cache-Control", "s-maxage=3600"), await a.put(o, u.clone()));
  let l = (await u.text()).match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!l)
    throw new Error("Could not find font URL");
  return fetch(l).then((f) => f.arrayBuffer());
}
__name(jl, "jl");
var cy = /* @__PURE__ */ __name(async () => {
  try {
    await Nl(fy);
  } catch {
  }
}, "cy");
var py = /* @__PURE__ */ __name(async () => {
  try {
    let e = await Pl(ly);
    await ol(e);
  } catch (e) {
    console.error(e);
  }
}, "py");
var Vl = /* @__PURE__ */ __name(async ({ element: e, options: t }) => {
  await Promise.allSettled([cy(), py()]);
  let r = typeof e == "string" ? await $l(e) : e, n = await Ol(r, { width: t.width || 1200, height: t.height || 630, fonts: t.fonts?.length ? t.fonts : [{ name: "Bitter", data: await jl({ family: "Bitter", weight: 600 }), weight: 500, style: "normal" }] });
  if ((t.format || "png") === "svg")
    return n;
  let a = { fitTo: { mode: "width", value: t.width || 1200 }, font: { loadSystemFonts: false } };
  return new Ml(n, a).render().asPng();
}, "Vl");
var Xa = /* @__PURE__ */ __name(class extends Response {
  constructor(t, r = {}) {
    if (super(), r.format === "svg")
      return (async () => {
        let n = await Vl({ element: t, options: r });
        return new Response(n, { headers: { "Content-Type": "image/svg+xml", "Cache-Control": r.debug ? "no-cache, no-store" : "public, immutable, no-transform, max-age=31536000", ...r.headers }, status: r.status || 200, statusText: r.statusText });
      })();
    {
      let n = new ReadableStream({ async start(i) {
        let a = await Vl({ element: t, options: r });
        i.enqueue(a), i.close();
      } });
      return new Response(n, { headers: { "Content-Type": "image/png", "Cache-Control": r.debug ? "no-cache, no-store" : "public, immutable, no-transform, max-age=31536000", ...r.headers }, status: r.status || 200, statusText: r.statusText });
    }
  }
}, "Xa");

// src/og/templates.ts
function AccentBar(color) {
  return {
    type: "div",
    props: {
      style: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "6px",
        height: "100%",
        backgroundColor: color
      },
      children: null
    }
  };
}
__name(AccentBar, "AccentBar");
function Header(domain2, tag, accent, surface, primary) {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "48px",
        width: "100%"
      },
      children: [
        domain2 ? {
          type: "div",
          props: {
            style: {
              fontSize: "18px",
              color: accent,
              fontFamily: "monospace",
              letterSpacing: "0.06em",
              textTransform: "uppercase"
            },
            children: domain2
          }
        } : { type: "div", props: { style: { width: "1px" }, children: null } },
        tag ? {
          type: "div",
          props: {
            style: {
              fontSize: "13px",
              color: primary,
              backgroundColor: surface,
              padding: "6px 16px",
              borderRadius: "100px",
              fontFamily: "monospace",
              letterSpacing: "0.04em"
            },
            children: tag
          }
        } : { type: "div", props: { style: { width: "1px" }, children: null } }
      ]
    }
  };
}
__name(Header, "Header");
function Footer(author, watermark, secondary) {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "48px",
        width: "100%"
      },
      children: [
        author ? {
          type: "div",
          props: {
            style: {
              fontSize: "18px",
              color: secondary,
              fontFamily: "monospace"
            },
            children: `\u2014 ${author}`
          }
        } : { type: "div", props: { style: { width: "1px" }, children: null } },
        watermark ? {
          type: "div",
          props: {
            style: {
              fontSize: "14px",
              color: secondary,
              fontFamily: "monospace",
              opacity: "0.55",
              letterSpacing: "0.06em"
            },
            children: "snapog.dev"
          }
        } : { type: "div", props: { style: { width: "1px" }, children: null } }
      ]
    }
  };
}
__name(Footer, "Footer");
function defaultTemplate(params, watermark) {
  const { title: title2, description, domain: domain2, author, tag, theme = "dark" } = params;
  const isDark = theme === "dark";
  const bg2 = isDark ? "#0A0A0A" : "#FAFAFA";
  const primary = isDark ? "#F5F5F5" : "#0A0A0A";
  const secondary = isDark ? "#737373" : "#737373";
  const accent = "#F59E0B";
  const surface = isDark ? "#1A1A1A" : "#E8E8E8";
  const fontSize = title2.length > 60 ? "42px" : title2.length > 40 ? "52px" : "62px";
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: bg2,
        padding: "64px 72px 64px 84px",
        position: "relative",
        fontFamily: '"Noto Sans", sans-serif'
      },
      children: [
        AccentBar(accent),
        Header(domain2, tag, accent, surface, primary),
        // Title
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flex: "1",
              fontSize,
              fontWeight: "700",
              color: primary,
              lineHeight: "1.2",
              letterSpacing: "-0.02em"
            },
            children: title2
          }
        },
        // Description
        ...description ? [
          {
            type: "div",
            props: {
              style: {
                fontSize: "22px",
                color: secondary,
                marginTop: "24px",
                lineHeight: "1.5",
                maxWidth: "900px"
              },
              children: description
            }
          }
        ] : [],
        Footer(author, watermark, secondary)
      ]
    }
  };
}
__name(defaultTemplate, "defaultTemplate");
function blogTemplate(params, watermark) {
  const { title: title2, description, domain: domain2, author, tag, theme = "dark" } = params;
  const isDark = theme === "dark";
  const bg2 = isDark ? "#0D0D0D" : "#FFFFFF";
  const primary = isDark ? "#FAFAFA" : "#111111";
  const secondary = isDark ? "#6B7280" : "#6B7280";
  const accent = "#F59E0B";
  const surface = isDark ? "#1F1F1F" : "#F3F4F6";
  const fontSize = title2.length > 55 ? "44px" : title2.length > 35 ? "54px" : "64px";
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: bg2,
        padding: "72px 80px",
        position: "relative",
        fontFamily: '"Noto Serif", serif'
      },
      children: [
        // Top band
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              height: "4px",
              backgroundColor: accent
            },
            children: null
          }
        },
        // Site label + tag
        Header(domain2, tag, accent, surface, primary),
        // Title
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flex: "1",
              fontSize,
              fontWeight: "700",
              color: primary,
              lineHeight: "1.2",
              letterSpacing: "-0.01em"
            },
            children: title2
          }
        },
        // Description
        ...description ? [
          {
            type: "div",
            props: {
              style: {
                fontSize: "21px",
                color: secondary,
                marginTop: "28px",
                lineHeight: "1.6",
                fontStyle: "italic"
              },
              children: description
            }
          }
        ] : [],
        Footer(author, watermark, secondary)
      ]
    }
  };
}
__name(blogTemplate, "blogTemplate");
function articleTemplate(params, watermark) {
  const { title: title2, description, domain: domain2, author, tag, theme = "dark" } = params;
  const isDark = theme === "dark";
  const bg2 = isDark ? "#111111" : "#F8F8F8";
  const primary = isDark ? "#FFFFFF" : "#111111";
  const secondary = isDark ? "#9CA3AF" : "#4B5563";
  const accent = "#F59E0B";
  const _surface = isDark ? "#222222" : "#E5E7EB";
  const divider = isDark ? "#2A2A2A" : "#D1D5DB";
  const fontSize = title2.length > 60 ? "40px" : title2.length > 40 ? "50px" : "60px";
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: bg2,
        padding: "60px 72px",
        position: "relative",
        fontFamily: '"Noto Sans", sans-serif'
      },
      children: [
        // Category row
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "32px"
            },
            children: [
              tag ? {
                type: "div",
                props: {
                  style: {
                    fontSize: "12px",
                    fontWeight: "700",
                    color: accent,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontFamily: "monospace"
                  },
                  children: tag
                }
              } : { type: "div", props: { style: { width: "1px" }, children: null } },
              domain2 ? {
                type: "div",
                props: {
                  style: {
                    fontSize: "12px",
                    color: secondary,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontFamily: "monospace"
                  },
                  children: `\u2022 ${domain2}`
                }
              } : { type: "div", props: { style: { width: "1px" }, children: null } }
            ]
          }
        },
        // Divider
        {
          type: "div",
          props: {
            style: {
              width: "48px",
              height: "3px",
              backgroundColor: accent,
              marginBottom: "32px"
            },
            children: null
          }
        },
        // Title
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flex: "1",
              fontSize,
              fontWeight: "800",
              color: primary,
              lineHeight: "1.15",
              letterSpacing: "-0.025em"
            },
            children: title2
          }
        },
        ...description ? [
          {
            type: "div",
            props: {
              style: {
                fontSize: "20px",
                color: secondary,
                marginTop: "20px",
                lineHeight: "1.5",
                maxWidth: "850px"
              },
              children: description
            }
          }
        ] : [],
        // Footer divider + meta
        {
          type: "div",
          props: {
            style: {
              width: "100%",
              height: "1px",
              backgroundColor: divider,
              marginTop: "36px"
            },
            children: null
          }
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "16px",
              fontFamily: "monospace"
            },
            children: [
              author ? {
                type: "div",
                props: {
                  style: { fontSize: "16px", color: secondary },
                  children: author
                }
              } : { type: "div", props: { style: { width: "1px" }, children: null } },
              watermark ? {
                type: "div",
                props: {
                  style: {
                    fontSize: "13px",
                    color: secondary,
                    opacity: "0.5",
                    letterSpacing: "0.06em"
                  },
                  children: "snapog.dev"
                }
              } : { type: "div", props: { style: { width: "1px" }, children: null } }
            ]
          }
        }
      ]
    }
  };
}
__name(articleTemplate, "articleTemplate");
function buildElement(params, watermark) {
  switch (params.template) {
    case "blog":
      return blogTemplate(params, watermark);
    case "article":
      return articleTemplate(params, watermark);
    default:
      return defaultTemplate(params, watermark);
  }
}
__name(buildElement, "buildElement");

// src/og/render.ts
var OG_WIDTH = 1200;
var OG_HEIGHT = 630;
async function generateOGImage(params, watermark) {
  const element = buildElement(params, watermark);
  const response = new Xa(element, {
    width: OG_WIDTH,
    height: OG_HEIGHT
  });
  return response;
}
__name(generateOGImage, "generateOGImage");
async function buildCacheKey(params, watermark) {
  const sorted = JSON.stringify(
    Object.fromEntries(
      Object.entries({ ...params, watermark }).sort(([a], [b]) => a.localeCompare(b))
    )
  );
  const encoder = new TextEncoder();
  const data = encoder.encode(sorted);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(buildCacheKey, "buildCacheKey");

// src/dashboard/pages.ts
var CSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:      #0A0A0A;
    --surface: #141414;
    --border:  #1F1F1F;
    --divider: #2A2A2A;
    --text-1:  #F5F5F5;
    --text-2:  #A3A3A3;
    --text-3:  #525252;
    --accent:  #F59E0B;
    --accent-dim: #92400E;
    --teal:    #14B8A6;
    --red:     #EF4444;
    --font-mono: 'JetBrains Mono', 'Consolas', monospace;
    --font-sans: 'DM Sans', system-ui, sans-serif;
    --r: 6px;
    --r-lg: 12px;
    --shadow: 0 0 0 1px var(--border);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text-1);
    font-family: var(--font-sans);
    font-size: 16px;
    line-height: 1.6;
    min-height: 100vh;
    /* Dot-grid background */
    background-image: radial-gradient(circle, #1F1F1F 1px, transparent 1px);
    background-size: 32px 32px;
  }

  a { color: var(--accent); text-decoration: none; }
  a:hover { text-decoration: underline; }

  /* Nav */
  .nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 32px;
    background: rgba(10,10,10,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 18px;
    color: var(--text-1);
    letter-spacing: -0.02em;
  }
  .nav-logo span { color: var(--accent); }
  .nav-links { display: flex; gap: 24px; align-items: center; }
  .nav-links a { color: var(--text-2); font-size: 14px; }
  .nav-links a:hover { color: var(--text-1); text-decoration: none; }
  .btn {
    display: inline-flex; align-items: center; justify-content: center;
    font-family: var(--font-mono); font-size: 13px; font-weight: 500;
    padding: 8px 20px; border-radius: var(--r);
    border: none; cursor: pointer; transition: all 0.15s;
    text-decoration: none;
  }
  .btn-primary { background: var(--accent); color: #000; }
  .btn-primary:hover { background: #FBBF24; text-decoration: none; }
  .btn-ghost { background: transparent; color: var(--text-2); border: 1px solid var(--border); }
  .btn-ghost:hover { border-color: var(--accent); color: var(--accent); text-decoration: none; }

  /* Container */
  .container { max-width: 900px; margin: 0 auto; padding: 0 24px; }
  .container-wide { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

  /* Hero */
  .hero { padding: 100px 0 72px; text-align: center; position: relative; }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--font-mono); font-size: 12px; color: var(--accent);
    letter-spacing: 0.1em; text-transform: uppercase;
    border: 1px solid var(--accent-dim); border-radius: 100px;
    padding: 4px 14px; margin-bottom: 28px;
  }
  .hero-eyebrow::before {
    content: ''; width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent); animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
  }
  .hero h1 {
    font-size: clamp(42px, 6vw, 72px);
    font-weight: 700; letter-spacing: -0.04em;
    line-height: 1.05;
    background: linear-gradient(135deg, #F5F5F5 0%, #A3A3A3 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 24px;
  }
  .hero h1 em {
    font-style: normal;
    background: linear-gradient(135deg, var(--accent), #FCD34D);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-sub {
    font-size: 18px; color: var(--text-2); max-width: 560px; margin: 0 auto 40px;
    line-height: 1.65;
  }
  .hero-cta { display: flex; gap: 12px; justify-content: center; }

  /* OG Preview */
  .og-preview-wrap {
    position: relative; margin: 72px auto 0; max-width: 720px;
    border-radius: var(--r-lg); overflow: hidden;
    box-shadow: 0 0 0 1px var(--border), 0 40px 80px rgba(0,0,0,0.6);
  }
  .og-preview-wrap img {
    width: 100%; display: block;
    border-radius: var(--r-lg);
  }
  .og-preview-label {
    position: absolute; top: 12px; left: 12px;
    font-family: var(--font-mono); font-size: 11px; color: var(--text-3);
    background: var(--surface); border: 1px solid var(--border);
    padding: 4px 10px; border-radius: var(--r);
  }

  /* Section */
  .section { padding: 80px 0; }
  .section-title {
    font-family: var(--font-mono); font-size: 11px; font-weight: 500;
    color: var(--accent); letter-spacing: 0.12em; text-transform: uppercase;
    margin-bottom: 12px;
  }
  .section-h2 {
    font-size: 36px; font-weight: 700; letter-spacing: -0.025em;
    margin-bottom: 16px; line-height: 1.15;
  }
  .section-sub { font-size: 17px; color: var(--text-2); max-width: 480px; line-height: 1.6; }

  /* Code block */
  .code-block {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--r-lg); overflow: hidden; margin-top: 32px;
  }
  .code-block-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 20px; border-bottom: 1px solid var(--border);
  }
  .code-block-lang {
    font-family: var(--font-mono); font-size: 12px; color: var(--text-3);
    letter-spacing: 0.06em;
  }
  .code-block-dots { display: flex; gap: 6px; }
  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .dot-red { background: #FF5F57; }
  .dot-yellow { background: #FEBC2E; }
  .dot-green { background: #28C840; }
  .code-block pre {
    padding: 24px 20px; font-family: var(--font-mono); font-size: 13px;
    line-height: 1.7; color: var(--text-1); overflow-x: auto;
    white-space: pre;
  }
  .c-comment { color: var(--text-3); }
  .c-key { color: var(--teal); }
  .c-val { color: #86EFAC; }
  .c-str { color: #FCD34D; }
  .c-url { color: var(--accent); }

  /* API params table */
  .params-table { width: 100%; border-collapse: collapse; margin-top: 24px; }
  .params-table th, .params-table td {
    padding: 12px 16px; text-align: left;
    border-bottom: 1px solid var(--border); font-size: 14px;
  }
  .params-table th {
    font-family: var(--font-mono); font-size: 11px; color: var(--text-3);
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .params-table td:first-child { font-family: var(--font-mono); color: var(--teal); }
  .params-table .required {
    font-family: var(--font-mono); font-size: 10px; color: var(--accent);
    border: 1px solid var(--accent-dim); border-radius: 3px; padding: 1px 6px;
  }
  .params-table .optional {
    font-family: var(--font-mono); font-size: 10px; color: var(--text-3);
    border: 1px solid var(--border); border-radius: 3px; padding: 1px 6px;
  }

  /* Pricing */
  .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 48px; }
  .pricing-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--r-lg); padding: 32px;
    display: flex; flex-direction: column;
    transition: border-color 0.2s;
  }
  .pricing-card:hover { border-color: var(--accent); }
  .pricing-card.featured {
    border-color: var(--accent);
    background: linear-gradient(180deg, #1C1400 0%, var(--surface) 100%);
  }
  .pricing-tier {
    font-family: var(--font-mono); font-size: 11px; color: var(--text-3);
    letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px;
  }
  .pricing-tier-featured { color: var(--accent); }
  .pricing-price {
    font-size: 40px; font-weight: 700; letter-spacing: -0.03em;
    margin-bottom: 4px; line-height: 1;
  }
  .pricing-period { font-size: 14px; color: var(--text-2); margin-bottom: 24px; }
  .pricing-limit {
    font-family: var(--font-mono); font-size: 13px; color: var(--text-2);
    margin-bottom: 20px; padding-bottom: 20px;
    border-bottom: 1px solid var(--border);
  }
  .pricing-features { list-style: none; flex: 1; }
  .pricing-features li {
    font-size: 14px; color: var(--text-2); padding: 6px 0;
    display: flex; gap: 8px; align-items: flex-start;
  }
  .pricing-features li::before { content: '\u2192'; color: var(--accent); flex-shrink: 0; }
  .pricing-features li.dim::before { color: var(--text-3); }
  .pricing-features li.dim { color: var(--text-3); }
  .pricing-cta { margin-top: 28px; }

  /* Features grid */
  .features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 48px; }
  .feature-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--r-lg); padding: 28px;
  }
  .feature-icon {
    font-family: var(--font-mono); font-size: 20px; color: var(--accent);
    margin-bottom: 16px; display: block;
  }
  .feature-card h3 { font-size: 17px; font-weight: 600; margin-bottom: 8px; }
  .feature-card p { font-size: 14px; color: var(--text-2); line-height: 1.6; }

  /* Dashboard */
  .dash-layout { padding: 40px 0 80px; }
  .dash-header { margin-bottom: 40px; }
  .dash-header h1 { font-size: 26px; font-weight: 700; margin-bottom: 4px; letter-spacing: -0.02em; }
  .dash-header p { font-size: 14px; color: var(--text-2); }

  .dash-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
  .dash-grid-full { grid-column: 1 / -1; }

  .card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--r-lg); padding: 28px;
  }
  .card-title {
    font-family: var(--font-mono); font-size: 11px; font-weight: 500;
    color: var(--text-3); letter-spacing: 0.1em; text-transform: uppercase;
    margin-bottom: 20px;
  }

  /* API key display */
  .api-key-display {
    display: flex; align-items: center; gap: 8px;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r); padding: 12px 16px;
    font-family: var(--font-mono); font-size: 13px; color: var(--text-2);
    flex: 1;
  }
  .api-key-display .key-val { flex: 1; word-break: break-all; }
  .api-key-row { display: flex; gap: 8px; align-items: stretch; }

  /* Usage meter */
  .usage-bar-wrap {
    background: var(--bg); border-radius: 100px;
    height: 6px; margin: 12px 0 8px; overflow: hidden;
  }
  .usage-bar {
    height: 100%; border-radius: 100px;
    background: var(--accent);
    transition: width 0.6s ease;
  }
  .usage-bar.warn { background: #F97316; }
  .usage-bar.full { background: var(--red); }
  .usage-meta { display: flex; justify-content: space-between; font-size: 13px; }
  .usage-count { font-family: var(--font-mono); font-size: 28px; font-weight: 700; }
  .usage-limit { font-size: 13px; color: var(--text-3); }

  /* Tier badge */
  .tier-badge {
    display: inline-flex; align-items: center;
    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em;
    text-transform: uppercase; padding: 3px 10px; border-radius: 100px;
  }
  .tier-free { background: #1C1C1C; color: var(--text-3); border: 1px solid var(--border); }
  .tier-pro { background: #1C1400; color: var(--accent); border: 1px solid var(--accent-dim); }
  .tier-business { background: #0A2A2A; color: var(--teal); border: 1px solid #115E59; }

  /* Register form */
  .form-group { margin-bottom: 20px; }
  .form-label { display: block; font-family: var(--font-mono); font-size: 12px; color: var(--text-2); margin-bottom: 8px; letter-spacing: 0.06em; }
  .form-input {
    width: 100%; padding: 12px 16px;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r); font-family: var(--font-mono);
    font-size: 14px; color: var(--text-1);
    outline: none; transition: border-color 0.15s;
  }
  .form-input:focus { border-color: var(--accent); }
  .form-hint { font-size: 12px; color: var(--text-3); margin-top: 6px; }

  /* Alert */
  .alert { padding: 14px 18px; border-radius: var(--r); font-size: 14px; margin-bottom: 20px; }
  .alert-error { background: #1C0A0A; border: 1px solid #7F1D1D; color: #FCA5A5; }
  .alert-success { background: #052E16; border: 1px solid #14532D; color: #86EFAC; }

  /* Footer */
  .footer {
    border-top: 1px solid var(--border); padding: 32px 0;
    text-align: center; font-size: 13px; color: var(--text-3);
    font-family: var(--font-mono);
  }

  @media (max-width: 768px) {
    .pricing-grid { grid-template-columns: 1fr; }
    .features-grid { grid-template-columns: 1fr; }
    .dash-grid { grid-template-columns: 1fr; }
    .hero h1 { font-size: 36px; }
  }
`;
function layout(title2, body, extraHead = "") {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title2} \u2014 SnapOG</title>
  <meta name="description" content="Generate stunning Open Graph images via API. Hosted on Cloudflare edge, cached globally, delivered in milliseconds." />
  <style>${CSS}</style>
  ${extraHead}
</head>
<body>
  ${body}
</body>
</html>`;
}
__name(layout, "layout");
function nav(_activePath = "/") {
  return `
  <nav class="nav">
    <a class="nav-logo" href="/">Snap<span>OG</span></a>
    <div class="nav-links">
      <a href="/#how-it-works">Docs</a>
      <a href="/#pricing">Pricing</a>
      <a href="/register" class="btn btn-primary">Get API Key \u2192</a>
    </div>
  </nav>`;
}
__name(nav, "nav");
function footer() {
  return `
  <footer class="footer">
    <div class="container">
      snapog.dev \u2014 OG images at the edge. Built with \u2665 on Cloudflare Workers.
    </div>
  </footer>`;
}
__name(footer, "footer");
function landingPage(host) {
  const body = `
  ${nav("/")}

  <!-- Hero -->
  <section class="hero">
    <div class="container">
      <div class="hero-eyebrow">Open Graph Images API</div>
      <h1>OG images for every URL,<br/><em>delivered at the edge</em></h1>
      <p class="hero-sub">
        One API call. Instant PNG. Cached globally on Cloudflare CDN.
        Stop hand-coding OG templates \u2014 let SnapOG generate them dynamically.
      </p>
      <div class="hero-cta">
        <a href="/register" class="btn btn-primary" style="font-size:15px;padding:12px 28px;">Get Free API Key</a>
        <a href="/#how-it-works" class="btn btn-ghost" style="font-size:15px;padding:12px 28px;">View Docs</a>
      </div>

      <!-- Live OG preview -->
      <div class="og-preview-wrap" style="margin-top:56px;">
        <div class="og-preview-label">1200 \xD7 630 PNG \u2014 rendered live</div>
        <img
          src="/og?title=How%20to%20Build%20a%20Billion-Dollar%20API&description=A%20deep%20dive%20into%20developer%20tools%20that%20compound%20%E2%80%94%20and%20the%20pricing%20that%20makes%20them%20survive&domain=myblog.dev&theme=dark&template=default"
          alt="Live OG image example"
          style="width:100%;border-radius:8px;"
        />
      </div>
    </div>
  </section>

  <!-- How it works -->
  <section class="section" id="how-it-works">
    <div class="container">
      <p class="section-title">API Reference</p>
      <h2 class="section-h2">One endpoint, infinite images</h2>
      <p class="section-sub">
        Send a GET request. Get a PNG back. Cache it in your CDN. Done.
      </p>

      <div class="code-block" style="margin-top:36px;">
        <div class="code-block-header">
          <div class="code-block-dots">
            <div class="dot dot-red"></div>
            <div class="dot dot-yellow"></div>
            <div class="dot dot-green"></div>
          </div>
          <span class="code-block-lang">HTTP GET</span>
        </div>
        <pre><span class="c-url">GET https://${host}/og</span>
  <span class="c-comment">  ?title=</span><span class="c-str">Your Page Title Here</span>
  <span class="c-comment">  &amp;description=</span><span class="c-str">Optional subtitle or excerpt</span>
  <span class="c-comment">  &amp;domain=</span><span class="c-str">yourdomain.com</span>
  <span class="c-comment">  &amp;author=</span><span class="c-str">Jane Doe</span>
  <span class="c-comment">  &amp;template=</span><span class="c-str">default</span>  <span class="c-comment"># default | blog | article</span>
  <span class="c-comment">  &amp;theme=</span><span class="c-str">dark</span>      <span class="c-comment"># dark | light</span>
  <span class="c-comment">  &amp;tag=</span><span class="c-str">Tutorial</span>
  <span class="c-comment">  &amp;key=</span><span class="c-str">sk_your_api_key</span>

<span class="c-comment">\u2190 200 OK  Content-Type: image/png  X-Cache: MISS</span></pre>
      </div>

      <h3 style="font-size:18px;font-weight:600;margin:48px 0 0;letter-spacing:-0.01em;">Parameters</h3>
      <table class="params-table">
        <thead>
          <tr>
            <th>Param</th><th>Type</th><th>Required</th><th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>title</td><td>string</td><td><span class="required">required</span></td><td>Page title \u2014 the main headline (max 120 chars)</td></tr>
          <tr><td>key</td><td>string</td><td><span class="required">required</span></td><td>Your API key (free tier = 100 images/month)</td></tr>
          <tr><td>description</td><td>string</td><td><span class="optional">optional</span></td><td>Subtitle or page excerpt (max 200 chars)</td></tr>
          <tr><td>domain</td><td>string</td><td><span class="optional">optional</span></td><td>Your domain shown as source label</td></tr>
          <tr><td>author</td><td>string</td><td><span class="optional">optional</span></td><td>Author name shown in footer</td></tr>
          <tr><td>template</td><td>enum</td><td><span class="optional">optional</span></td><td><code>default</code> | <code>blog</code> | <code>article</code></td></tr>
          <tr><td>theme</td><td>enum</td><td><span class="optional">optional</span></td><td><code>dark</code> (default) | <code>light</code></td></tr>
          <tr><td>tag</td><td>string</td><td><span class="optional">optional</span></td><td>Category label shown as pill (e.g. "Tutorial")</td></tr>
        </tbody>
      </table>

      <h3 style="font-size:18px;font-weight:600;margin:48px 0 20px;letter-spacing:-0.01em;">Use in HTML</h3>
      <div class="code-block">
        <div class="code-block-header">
          <div class="code-block-dots">
            <div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div>
          </div>
          <span class="code-block-lang">HTML meta tags</span>
        </div>
        <pre><span class="c-comment">&lt;!-- Drop in &lt;head&gt; --&gt;</span>
<span class="c-key">&lt;meta</span> <span class="c-val">property=</span><span class="c-str">"og:image"</span>
      <span class="c-val">content=</span><span class="c-str">"https://${host}/og?title=My+Post+Title&amp;key=YOUR_KEY"</span> <span class="c-key">/&gt;</span>
<span class="c-key">&lt;meta</span> <span class="c-val">property=</span><span class="c-str">"og:image:width"</span>  <span class="c-val">content=</span><span class="c-str">"1200"</span> <span class="c-key">/&gt;</span>
<span class="c-key">&lt;meta</span> <span class="c-val">property=</span><span class="c-str">"og:image:height"</span> <span class="c-val">content=</span><span class="c-str">"630"</span>  <span class="c-key">/&gt;</span>
<span class="c-key">&lt;meta</span> <span class="c-val">name=</span><span class="c-str">"twitter:card"</span>    <span class="c-val">content=</span><span class="c-str">"summary_large_image"</span> <span class="c-key">/&gt;</span>
<span class="c-key">&lt;meta</span> <span class="c-val">name=</span><span class="c-str">"twitter:image"</span>   <span class="c-val">content=</span><span class="c-str">"https://${host}/og?title=My+Post+Title&amp;key=YOUR_KEY"</span> <span class="c-key">/&gt;</span></pre>
      </div>
    </div>
  </section>

  <!-- Features -->
  <section class="section" style="padding-top:0;">
    <div class="container">
      <p class="section-title">Why SnapOG</p>
      <h2 class="section-h2">Built for production, priced for teams</h2>
      <div class="features-grid">
        <div class="feature-card">
          <span class="feature-icon">\u26A1</span>
          <h3>Edge-cached globally</h3>
          <p>Images are generated once and stored on Cloudflare R2. Subsequent requests hit the cache in under 50ms worldwide.</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">\u{1F3A8}</span>
          <h3>3 templates out of the box</h3>
          <p>Default, Blog, and Article templates \u2014 dark and light variants. No design work needed.</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">\u{1F511}</span>
          <h3>Instant API key</h3>
          <p>Sign up with email, get a key immediately. 100 images free, no credit card required.</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">\u{1F4CA}</span>
          <h3>Usage dashboard</h3>
          <p>Track how many images you've generated, reset date, and tier status in a clean developer dashboard.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing -->
  <section class="section" id="pricing">
    <div class="container">
      <p class="section-title">Pricing</p>
      <h2 class="section-h2">Start free. Scale as you publish.</h2>
      <div class="pricing-grid">

        <div class="pricing-card">
          <p class="pricing-tier">Free</p>
          <p class="pricing-price">$0</p>
          <p class="pricing-period">forever</p>
          <p class="pricing-limit">100 images / month</p>
          <ul class="pricing-features">
            <li>3 templates (dark + light)</li>
            <li>R2 global cache</li>
            <li>API key + dashboard</li>
            <li class="dim">SnapOG watermark</li>
            <li class="dim">No custom fonts</li>
          </ul>
          <div class="pricing-cta">
            <a href="/register" class="btn btn-ghost" style="width:100%;">Get started \u2192</a>
          </div>
        </div>

        <div class="pricing-card featured">
          <p class="pricing-tier pricing-tier-featured">\u26A1 Pro \u2014 most popular</p>
          <p class="pricing-price" style="color:var(--accent);">$19</p>
          <p class="pricing-period">per month</p>
          <p class="pricing-limit" style="color:var(--accent);">10,000 images / month</p>
          <ul class="pricing-features">
            <li>Everything in Free</li>
            <li>No watermark</li>
            <li>Custom font upload</li>
            <li>Usage analytics</li>
            <li>Priority support</li>
          </ul>
          <div class="pricing-cta">
            <a href="/register?tier=pro" class="btn btn-primary" style="width:100%;">Start Pro \u2192</a>
          </div>
        </div>

        <div class="pricing-card">
          <p class="pricing-tier">Business</p>
          <p class="pricing-price">$49</p>
          <p class="pricing-period">per month</p>
          <p class="pricing-limit">100,000 images / month</p>
          <ul class="pricing-features">
            <li>Everything in Pro</li>
            <li>Custom domain (CNAME)</li>
            <li>Team access (3 seats)</li>
            <li>White-label (no branding)</li>
            <li>SLA + priority queue</li>
          </ul>
          <div class="pricing-cta">
            <a href="mailto:hello@snapog.dev" class="btn btn-ghost" style="width:100%;">Contact us \u2192</a>
          </div>
        </div>

      </div>
    </div>
  </section>

  ${footer()}

  <script>
    // Copy to clipboard helper
    document.querySelectorAll('[data-copy]').forEach(btn => {
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(btn.dataset.copy || '');
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = orig; }, 1500);
      });
    });
  <\/script>`;
  return layout("Generate OG images at the edge", body);
}
__name(landingPage, "landingPage");
function registerPage(error3, tier) {
  const body = `
  ${nav()}
  <section class="section">
    <div class="container" style="max-width:480px;">
      <p class="section-title">Get API Key</p>
      <h1 class="section-h2">Start generating</h1>
      <p class="section-sub" style="margin-bottom:32px;">Enter your email to receive your API key instantly. No password. No credit card for free tier.</p>

      ${error3 ? `<div class="alert alert-error">${error3}</div>` : ""}

      <div class="card">
        <form method="POST" action="/register">
          <input type="hidden" name="tier" value="${tier ?? "free"}" />
          <div class="form-group">
            <label class="form-label" for="email">EMAIL ADDRESS</label>
            <input class="form-input" type="email" name="email" id="email" placeholder="you@example.com" required autocomplete="email" />
            <p class="form-hint">Your API key will be displayed immediately after registration.</p>
          </div>
          <div class="form-group">
            <label class="form-label" for="keyname">KEY NAME (optional)</label>
            <input class="form-input" type="text" name="keyname" id="keyname" placeholder="production" />
            <p class="form-hint">Give this key a label to identify it later.</p>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%;padding:14px;font-size:15px;">
            Create API Key \u2192
          </button>
        </form>
      </div>

      <p style="font-size:13px;color:var(--text-3);margin-top:20px;text-align:center;">
        Already have a key? <a href="/dashboard">View your dashboard</a>
      </p>
    </div>
  </section>
  ${footer()}`;
  return layout("Get API Key", body);
}
__name(registerPage, "registerPage");
function keyCreatedPage(rawKey, email, tier) {
  const body = `
  ${nav()}
  <section class="section">
    <div class="container" style="max-width:600px;">
      <div class="alert alert-success">
        \u2713 API key created for ${email}
      </div>
      <p class="section-title">Your API Key</p>
      <h1 class="section-h2">Save this key now</h1>
      <p class="section-sub" style="margin-bottom:32px;">
        This is the only time you'll see the full key. Copy it and store it securely.
      </p>

      <div class="card">
        <p class="card-title">API KEY \u2014 ${tier.toUpperCase()}</p>
        <div class="api-key-row">
          <div class="api-key-display">
            <span class="key-val" id="api-key">${rawKey}</span>
          </div>
          <button class="btn btn-primary" data-copy="${rawKey}" style="white-space:nowrap;">Copy</button>
        </div>
        <p style="font-size:12px;color:var(--text-3);margin-top:12px;font-family:var(--font-mono);">
          Free tier: 100 images/month \xB7 Resets monthly \xB7 ${tier === "pro" ? "10,000 images" : "upgrade anytime"}
        </p>
      </div>

      <div class="code-block" style="margin-top:32px;">
        <div class="code-block-header">
          <div class="code-block-dots">
            <div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div>
          </div>
          <span class="code-block-lang">Quick start</span>
        </div>
        <pre><span class="c-comment"># Test your key</span>
<span class="c-key">curl</span> <span class="c-str">"https://snapog.dev/og?title=Hello+World&amp;key=${rawKey}"</span>   <span class="c-val">--output</span> og.png && <span class="c-key">open</span> og.png</pre>
      </div>

      <div style="margin-top:32px;display:flex;gap:12px;">
        <a href="/dashboard?key=${rawKey}" class="btn btn-primary">Open Dashboard \u2192</a>
        <a href="/#how-it-works" class="btn btn-ghost">Read the docs</a>
      </div>
    </div>
  </section>
  ${footer()}
  <script>
    document.querySelectorAll('[data-copy]').forEach(btn => {
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(btn.dataset.copy || '');
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = orig; }, 1500);
      });
    });
  <\/script>`;
  return layout("API Key Created", body);
}
__name(keyCreatedPage, "keyCreatedPage");
function dashboardPage(key, recentCount) {
  const pct = Math.round(key.usage_count / key.monthly_limit * 100);
  const barClass = pct >= 100 ? "full" : pct >= 80 ? "warn" : "";
  const resetDate = new Date(key.usage_reset_at);
  const nextReset = new Date(resetDate.getFullYear(), resetDate.getMonth() + 1, 1).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const tierBadge = `<span class="tier-badge tier-${key.tier}">${key.tier}</span>`;
  const body = `
  ${nav()}
  <div class="container">
    <div class="dash-layout">
      <div class="dash-header">
        <h1>Dashboard ${tierBadge}</h1>
        <p>API key: <code style="font-family:var(--font-mono);font-size:13px;color:var(--text-2);">${key.key_prefix}\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022</code></p>
      </div>

      <div class="dash-grid">

        <!-- Usage card -->
        <div class="card">
          <p class="card-title">Usage This Month</p>
          <div class="usage-count">${key.usage_count.toLocaleString()}</div>
          <p class="usage-limit">of ${key.monthly_limit.toLocaleString()} images</p>
          <div class="usage-bar-wrap">
            <div class="usage-bar ${barClass}" style="width:${Math.min(pct, 100)}%"></div>
          </div>
          <div class="usage-meta">
            <span style="color:var(--text-3);font-size:13px;">${pct}% used</span>
            <span style="color:var(--text-3);font-size:13px;">Resets ${nextReset}</span>
          </div>
          ${key.tier === "free" ? `<div style="margin-top:20px;padding-top:20px;border-top:1px solid var(--border);">
                   <p style="font-size:13px;color:var(--text-2);">Need more?</p>
                   <a href="/register?tier=pro" class="btn btn-primary" style="margin-top:10px;">Upgrade to Pro \u2014 $19/mo \u2192</a>
                 </div>` : ""}
        </div>

        <!-- Stats sidebar -->
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div class="card">
            <p class="card-title">Recent Generations</p>
            <p style="font-size:32px;font-weight:700;font-family:var(--font-mono);">${recentCount}</p>
            <p style="font-size:13px;color:var(--text-3);margin-top:4px;">in last 24h</p>
          </div>
          <div class="card">
            <p class="card-title">Cache Hit Rate</p>
            <p style="font-size:32px;font-weight:700;font-family:var(--font-mono);color:var(--teal);">\u2014</p>
            <p style="font-size:13px;color:var(--text-3);margin-top:4px;">available in Pro</p>
          </div>
        </div>

        <!-- Quick start code -->
        <div class="card dash-grid-full">
          <p class="card-title">Quick Start</p>
          <div class="code-block">
            <div class="code-block-header">
              <div class="code-block-dots">
                <div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div>
              </div>
              <span class="code-block-lang">HTML / meta tags</span>
            </div>
            <pre><span class="c-key">&lt;meta</span> <span class="c-val">property=</span><span class="c-str">"og:image"</span>
      <span class="c-val">content=</span><span class="c-str">"https://snapog.dev/og?title=YOUR_TITLE&amp;key=${key.key_prefix}..."</span> <span class="c-key">/&gt;</span></pre>
          </div>
          <div class="code-block" style="margin-top:12px;">
            <div class="code-block-header">
              <div class="code-block-dots">
                <div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div>
              </div>
              <span class="code-block-lang">cURL test</span>
            </div>
            <pre><span class="c-key">curl</span> <span class="c-str">"https://snapog.dev/og?title=My+Blog+Post&amp;domain=myblog.com&amp;key=${key.key_prefix}..."</span>   <span class="c-val">--output</span> og.png && <span class="c-key">open</span> og.png</pre>
          </div>
        </div>

      </div>
    </div>
  </div>
  ${footer()}`;
  return layout("Dashboard", body);
}
__name(dashboardPage, "dashboardPage");
function errorPage(code, message) {
  const body = `
  ${nav()}
  <section class="section">
    <div class="container" style="text-align:center;max-width:480px;">
      <p style="font-family:var(--font-mono);font-size:80px;font-weight:700;color:var(--border);line-height:1;">${code}</p>
      <h1 style="font-size:24px;margin:16px 0 12px;">${message}</h1>
      <p style="color:var(--text-2);margin-bottom:32px;">Something went wrong. Try again or check the docs.</p>
      <a href="/" class="btn btn-ghost">\u2190 Back to home</a>
    </div>
  </section>
  ${footer()}`;
  return layout(`${code} Error`, body);
}
__name(errorPage, "errorPage");

// src/types.ts
var TIER_LIMITS = {
  free: 100,
  pro: 1e4,
  business: 1e5
};

// src/index.ts
var app = new Hono2();
async function sha256(text) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text)
  );
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(sha256, "sha256");
function generateRawKey() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return "sk_" + Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(generateRawKey, "generateRawKey");
function htmlResponse(html, status = 200) {
  return new Response(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}
__name(htmlResponse, "htmlResponse");
async function resolveApiKey(db, rawKey) {
  if (!rawKey)
    return null;
  const hash = await sha256(rawKey);
  const row = await db.prepare("SELECT * FROM api_keys WHERE key_hash = ?").bind(hash).first();
  return row ?? null;
}
__name(resolveApiKey, "resolveApiKey");
async function maybeResetUsage(db, key) {
  const resetAt = new Date(key.usage_reset_at);
  const now = /* @__PURE__ */ new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  if (resetAt < thisMonth) {
    const newResetAt = thisMonth.toISOString();
    await db.prepare(
      "UPDATE api_keys SET usage_count = 0, usage_reset_at = ? WHERE id = ?"
    ).bind(newResetAt, key.id).run();
    return { ...key, usage_count: 0, usage_reset_at: newResetAt };
  }
  return key;
}
__name(maybeResetUsage, "maybeResetUsage");
async function recordUsage(db, key, template, cacheHit) {
  const eventId = crypto.randomUUID();
  await db.batch([
    db.prepare("UPDATE api_keys SET usage_count = usage_count + 1 WHERE id = ?").bind(key.id),
    db.prepare(
      "INSERT INTO usage_events (id, api_key_id, template, cache_hit) VALUES (?, ?, ?, ?)"
    ).bind(eventId, key.id, template, cacheHit ? 1 : 0)
  ]);
}
__name(recordUsage, "recordUsage");
app.get("/", (c) => {
  const host = new URL(c.req.url).host;
  return htmlResponse(landingPage(host));
});
app.get("/og", async (c) => {
  const q = c.req.query();
  const rawKey = q["key"] ?? null;
  const title2 = (q["title"] ?? "").trim().slice(0, 120);
  if (!title2) {
    return c.json({ error: "title parameter is required" }, 400);
  }
  if (!rawKey) {
    return c.json({ error: "key parameter is required. Get a free key at /register" }, 401);
  }
  let apiKey = await resolveApiKey(c.env.DB, rawKey);
  if (!apiKey) {
    return c.json({ error: "Invalid API key" }, 401);
  }
  apiKey = await maybeResetUsage(c.env.DB, apiKey);
  if (apiKey.usage_count >= apiKey.monthly_limit) {
    return c.json(
      {
        error: "Monthly image limit reached",
        tier: apiKey.tier,
        limit: apiKey.monthly_limit,
        upgrade_url: "/register?tier=pro"
      },
      429
    );
  }
  const params = {
    title: title2,
    description: (q["description"] ?? "").trim().slice(0, 200) || void 0,
    domain: (q["domain"] ?? "").trim().slice(0, 100) || void 0,
    author: (q["author"] ?? "").trim().slice(0, 80) || void 0,
    tag: (q["tag"] ?? "").trim().slice(0, 40) || void 0,
    theme: q["theme"] === "light" ? "light" : "dark",
    template: ["blog", "article"].includes(q["template"] ?? "") ? q["template"] : "default"
  };
  const watermark = apiKey.tier === "free";
  const cacheKey = await buildCacheKey(params, watermark);
  const r2Key = `og/${cacheKey}.png`;
  const cached = await c.env.OG_CACHE.get(r2Key);
  if (cached) {
    await recordUsage(c.env.DB, apiKey, params.template ?? "default", true);
    const imageData = await cached.arrayBuffer();
    return new Response(imageData, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, s-maxage=604800",
        "X-Cache": "HIT",
        "X-SnapOG-Tier": apiKey.tier
      }
    });
  }
  const imageResponse = await generateOGImage(params, watermark);
  const imageBuffer = await imageResponse.arrayBuffer();
  c.executionCtx.waitUntil(
    c.env.OG_CACHE.put(r2Key, imageBuffer.slice(0), {
      httpMetadata: { contentType: "image/png" },
      customMetadata: { tier: apiKey.tier, template: params.template ?? "default" }
    })
  );
  c.executionCtx.waitUntil(
    recordUsage(c.env.DB, apiKey, params.template ?? "default", false)
  );
  return new Response(imageBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, s-maxage=604800",
      "X-Cache": "MISS",
      "X-SnapOG-Tier": apiKey.tier
    }
  });
});
app.get("/register", (c) => {
  const tier = c.req.query("tier");
  return htmlResponse(registerPage(void 0, tier));
});
app.post("/register", async (c) => {
  let email, keyname, tier;
  try {
    const form = await c.req.formData();
    email = (form.get("email") ?? "").trim().toLowerCase();
    keyname = (form.get("keyname") ?? "").trim() || "default";
    tier = (form.get("tier") ?? "free").trim();
  } catch {
    return htmlResponse(registerPage("Invalid form data"), 400);
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return htmlResponse(registerPage("Please enter a valid email address", tier), 400);
  }
  const validTiers = ["free", "pro", "business"];
  const safeTier = validTiers.includes(tier) ? tier : "free";
  const userId = crypto.randomUUID();
  await c.env.DB.prepare(
    "INSERT INTO users (id, email) VALUES (?, ?) ON CONFLICT(email) DO NOTHING"
  ).bind(userId, email).run();
  const user = await c.env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
  if (!user) {
    return htmlResponse(registerPage("Database error \u2014 please try again"), 500);
  }
  const rawKey = generateRawKey();
  const keyHash = await sha256(rawKey);
  const keyPrefix = rawKey.slice(0, 12);
  const keyId = crypto.randomUUID();
  const resetAt = new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth(), 1).toISOString();
  const monthlyLimit = TIER_LIMITS[safeTier];
  await c.env.DB.prepare(
    `INSERT INTO api_keys
         (id, user_id, name, key_prefix, key_hash, tier, monthly_limit, usage_reset_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(keyId, user.id, keyname, keyPrefix, keyHash, safeTier, monthlyLimit, resetAt).run();
  return htmlResponse(keyCreatedPage(rawKey, email, safeTier));
});
app.get("/dashboard", async (c) => {
  const rawKey = c.req.query("key");
  if (!rawKey) {
    return htmlResponse(registerPage("Enter your API key or create a new one below"), 400);
  }
  const apiKey = await resolveApiKey(c.env.DB, rawKey);
  if (!apiKey) {
    return htmlResponse(errorPage(404, "API key not found"), 404);
  }
  const refreshed = await maybeResetUsage(c.env.DB, apiKey);
  const yesterday = new Date(Date.now() - 864e5).toISOString();
  const recent = await c.env.DB.prepare(
    "SELECT COUNT(*) as cnt FROM usage_events WHERE api_key_id = ? AND generated_at > ?"
  ).bind(refreshed.id, yesterday).first();
  return htmlResponse(dashboardPage(refreshed, recent?.cnt ?? 0));
});
app.get("/health", (c) => c.json({ ok: true, ts: (/* @__PURE__ */ new Date()).toISOString() }));
app.notFound((_c) => htmlResponse(errorPage(404, "Page not found"), 404));
app.onError((err, _c) => {
  console.error("Unhandled error:", err);
  return htmlResponse(errorPage(500, "Internal server error"), 500);
});
var src_default = app;

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error3 = reduceError(e);
    return Response.json(error3, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-qCMhKL/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-qCMhKL/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
/*! Bundled license information:

workers-og/dist/index.js:
  (*! Bundled license information:
  
  css-background-parser/index.js:
    (*!
     * https://github.com/gilmoreorless/css-background-parser
     * Copyright © 2015 Gilmore Davidson under the MIT license: http://gilmoreorless.mit-license.org/
     *)
  
  parse-css-color/dist/index.umd.js:
    (**
    	 * parse-css-color
    	 * @version v0.2.1
    	 * @link http://github.com/noeldelgado/parse-css-color/
    	 * @license MIT
    	 *)
  
  escape-html/index.js:
    (*!
     * escape-html
     * Copyright(c) 2012-2013 TJ Holowaychuk
     * Copyright(c) 2015 Andreas Lubbe
     * Copyright(c) 2015 Tiancheng "Timothy" Gu
     * MIT Licensed
     *)
  *)
*/
//# sourceMappingURL=index.js.map
