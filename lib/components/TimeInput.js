'use strict';

var _index = require('/Users/matt/Projects/time-input/node_modules/babel-preset-react-hmre/node_modules/redbox-react/lib/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('/Users/matt/Projects/time-input/node_modules/babel-preset-react-hmre/node_modules/react-transform-catch-errors/lib/index.js');

var _index4 = _interopRequireDefault(_index3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _index5 = require('/Users/matt/Projects/time-input/node_modules/babel-preset-react-hmre/node_modules/react-transform-hmr/lib/index.js');

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _UsersMattProjectsTimeInputNode_modulesBabelPresetReactHmreNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
  filename: 'src/components/TimeInput.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersMattProjectsTimeInputNode_modulesBabelPresetReactHmreNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'src/components/TimeInput.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _UsersMattProjectsTimeInputNode_modulesBabelPresetReactHmreNode_modulesReactTransformHmrLibIndexJs2(_UsersMattProjectsTimeInputNode_modulesBabelPresetReactHmreNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}

var React = require('react');
var isTwelveHourTime = require('../is-twelve-hour-time');
var replaceCharAt = require('../replace-char-at');
var getGroupId = require('../get-group-id');
var getGroups = require('../get-groups');
var adder = require('../time-string-adder');
var caret = require('../caret');
var validate = require('../validate');

var TimeInput = _wrapComponent('_component')(React.createClass({
  displayName: 'TimeInput',
  getInitialState: function getInitialState() {
    return {};
  },
  getDefaultProps: function getDefaultProps() {
    return {
      value: '12:00:00:000 AM',
      defaultValue: '12:00:00:000 AM',
      twelveHourTime: true
    };
  },

  propTypes: {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    twelveHourTime: React.PropTypes.bool,
    defaultValue: React.PropTypes.string
  },
  render: function render() {
    var _this = this;

    return React.createElement(
      'div',
      { className: 'TimeInput' },
      React.createElement('input', {
        className: 'TimeInput-input',
        ref: function ref(input) {
          _this.input = input;
        },
        type: 'text',
        size: this.props.value.length - 1,
        value: this.format(this.props.value),
        onChange: this.handleChange,
        onBlur: this.handleBlur,
        onKeyDown: this.handleKeyDown
      })
    );
  },
  format: function format(val) {
    if (isTwelveHourTime(val)) val = val.replace(/^00/, '12');
    return val.toUpperCase();
  },
  componentDidUpdate: function componentDidUpdate() {
    var index = this.state.caretIndex;
    if (index || index === 0) caret.set(this.input, index);
  },
  handleBlur: function handleBlur() {
    if (this.isMounted()) this.setState({ caretIndex: null });
  },
  handleTab: function handleTab(event) {
    var start = caret.start(this.input);
    var value = this.props.value;
    var groups = getGroups(value);
    var groupId = getGroupId(start);
    if (event.shiftKey) {
      if (!groupId) return;
      groupId--;
    } else {
      if (groupId >= groups.length - 1) return;
      groupId++;
    }
    event.preventDefault();
    var index = groupId * 3;
    if (this.props.value.charAt(index) === ' ') index++;
    if (this.isMounted()) this.setState({ caretIndex: index });
  },
  handleArrows: function handleArrows(event) {
    event.preventDefault();
    var start = caret.start(this.input);
    var value = this.props.value;
    var amount = event.which === 38 ? 1 : -1;
    if (event.shiftKey) {
      amount *= 10;
      if (event.metaKey) amount *= 10;
    }
    value = adder(value, getGroupId(start), amount);
    this.onChange(value, start);
  },
  handleBackspace: function handleBackspace(event) {
    event.preventDefault();
    var defaultValue = this.props.defaultValue;
    var start = caret.start(this.input);
    var value = this.props.value;
    var end = caret.end(this.input);
    var diff = end - start;
    if (!diff) {
      if (value[start - 1] === ':') start--;
      value = replaceCharAt(value, start - 1, defaultValue.charAt(start - 1));
      start--;
    } else {
      while (diff--) {
        if (value[end - 1] !== ':') {
          value = replaceCharAt(value, end - 1, defaultValue.charAt(end - 1));
        }
        end--;
      }
    }
    this.onChange(value, start);
  },
  handleForwardspace: function handleForwardspace(event) {
    event.preventDefault();
    var defaultValue = this.props.defaultValue;
    var start = caret.start(this.input);
    var value = this.props.value;
    var end = caret.end(this.input);
    var diff = end - start;
    if (!diff) {
      if (value[start] === ':') start++;
      value = replaceCharAt(value, start, defaultValue.charAt(start));
      start++;
    } else {
      while (diff--) {
        if (value[end - 1] !== ':') {
          value = replaceCharAt(value, start, defaultValue.charAt(start));
        }
        start++;
      }
    }
    this.onChange(value, start);
  },
  handleKeyDown: function handleKeyDown(event) {
    if (event.which === 9) return this.handleTab(event);
    if (event.which === 38 || event.which === 40) return this.handleArrows(event);
    if (event.which === 8) return this.handleBackspace(event);
    if (event.which === 46) return this.handleForwardspace(event);
  },
  isSeparator: function isSeparator(char) {
    return (/[:\s]/.test(char)
    );
  },
  handleChange: function handleChange(event) {
    var newValue = this.input.value;
    var value = this.props.value;
    var diff = newValue.length - value.length;
    var end = caret.start(this.input);
    var insertion;
    event.preventDefault();
    if (diff > 0) {
      var start = end - diff;
      insertion = newValue.slice(end - diff, end);
      while (diff--) {
        var oldChar = value.charAt(start);
        var newChar = insertion.charAt(0);
        if (this.isSeparator(oldChar)) {
          if (this.isSeparator(newChar)) {
            insertion = insertion.slice(1);
            start++;
          } else {
            start++;
            diff++;
            end++;
          }
        } else {
          value = replaceCharAt(value, start, newChar);
          insertion = insertion.slice(1);
          start++;
        }
      }
      newValue = value;
    }
    if (validate(newValue)) {
      this.onChange(newValue, end);
    } else {
      var caretIndex = this.props.value.length - (newValue.length - end);
      if (this.isMounted()) this.setState({ caretIndex: caretIndex });
    }
  },

  onChange: function onChange(str, caretIndex) {
    if (this.props.onChange) this.props.onChange(this.format(str));
    if (this.isMounted() && typeof caretIndex === 'number') this.setState({ caretIndex: caretIndex });
  }
}));

module.exports = TimeInput;