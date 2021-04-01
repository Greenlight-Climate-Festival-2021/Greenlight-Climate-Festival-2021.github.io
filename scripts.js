'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var internals = {};
/** @param {number} ms */

internals.timeout = function (ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
};
/** @param {number} seconds */


internals.formatTime = function (seconds) {
  var pad = function pad(number) {
    return "".concat(number).padStart(2, 0);
  };

  var minute = Math.floor(seconds / 60);
  var second = Math.round(seconds % 60);

  if (minute > 60) {
    var hour = Math.floor(minute / 60);
    minute = Math.floor(minute % 60);
    return "".concat(hour, ":").concat(pad(minute), ":").concat(pad(second));
  }

  return "".concat(minute, ":").concat(pad(second));
};

var Timer = /*#__PURE__*/function () {
  /** @param {HTMLElement} element */
  function Timer() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.querySelector('[data-countdown-date]');

    _classCallCheck(this, Timer);

    this.element = element;
    this.endTime = new Date(element.dataset.countdownDate);
    this.isCancelled = false;
    this.cancel = this.cancel.bind(this);
    this.run = this.run.bind(this);
  }

  _createClass(Timer, [{
    key: "cancel",
    value: function cancel() {
      console.log("[Timer] Cancelling ".concat(this.length, " minute timer"));
      this.isCancelled = true;
    }
  }, {
    key: "run",
    value: function () {
      var _run = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var finishTime, seconds;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("[Timer] Starting ".concat(this.length, " minute timer"));
                finishTime = this.endTime.getTime();

              case 2:
                if (!(Date.now() < finishTime)) {
                  _context.next = 9;
                  break;
                }

                seconds = Math.round((finishTime - Date.now()) / 1000);
                this.element.textContent = internals.formatTime(seconds);
                _context.next = 7;
                return internals.timeout(1000);

              case 7:
                _context.next = 2;
                break;

              case 9:
                this.element.textContent = '0:00';

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run() {
        return _run.apply(this, arguments);
      }

      return run;
    }()
  }]);

  return Timer;
}();

var init = function init() {
  console.log('Initializing');
  var element = document.querySelector('[data-countdown-date]');

  if (element) {
    var timer = new Timer(element);
    timer.run();
  }
};

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('keypress', function (e) {
  console.log(e.key);
});