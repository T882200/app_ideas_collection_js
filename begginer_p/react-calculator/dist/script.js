const ee = new EventEmitter();
const App = React.createClass({ displayName: "App",
  render() {
    return (
      React.createElement("main", { className: "react-calculator" },
      React.createElement(InputField, null),
      React.createElement(TotalRecall, null),
      React.createElement(ButtonSetNumbers, null),
      React.createElement(ButtonSetFunctions, null),
      React.createElement(ButtonSetEquations, null)));


  } });

const Button = React.createClass({ displayName: "Button",
  _handleClick() {
    let text = this.props.text,
    cb = this.props.clickHandler;

    if (cb) {
      cb.call(null, text);
    }
  },

  render() {
    return (
      React.createElement("button", { className: this.props.klass, onClick: this._handleClick },
      React.createElement("span", { className: "title" }, this.props.text)));


  } });

const ContentEditable = React.createClass({ displayName: "ContentEditable",
  _handleClick() {
    const cb = this.props.clickHandler;

    if (cb) {
      cb.call(this);
    }
  },

  render() {
    return (
      React.createElement("div", { className: "editable-field", contentEditable: this.props.initEdit, spellcheck: this.props.spellCheck, onClick: this._handleClick },
      this.props.text));


  } });


const InputField = React.createClass({ displayName: "InputField",
  _updateField(newStr) {
    newStr = newStr.split ? newStr.split(' ').reverse().join(' ') : newStr;
    return this.setState({ text: newStr });
  },

  getInitialState() {
    this.props.text = this.props.text || '0';

    return { text: this.props.text };
  },

  componentWillMount() {
    ee.addListener('numberCruncher', this._updateField);
  },

  render() {
    return React.createElement(ContentEditable, { text: this.state.text, initEdit: "false", spellcheck: "false", clickHandler: this._clickBait });
  } });

const TotalRecall = React.createClass({ displayName: "TotalRecall",
  _toggleMemories() {
    this.setState({ show: !this.state.show });
  },

  _recallMemory(memory) {
    store.newInput = memory;
    ee.emitEvent('toggle-memories');
  },

  getInitialState() {
    return { show: false };
  },

  componentWillMount() {
    ee.addListener('toggle-memories', this._toggleMemories);
  },

  render() {
    let classNames = `memory-bank ${this.state.show ? 'visible' : ''}`;

    return (
      React.createElement("section", { className: classNames },
      React.createElement(Button, { text: "+", clickHandler: this._toggleMemories, klass: "toggle-close" }),
      store.curMemories.map(mem => {
        return (
          React.createElement(Button, { klass: "block memory transparent", text: mem, clickHandler: this._recallMemory }));

      })));


  } });

const ButtonSetFunctions = React.createClass({ displayName: "ButtonSetFunctions",
  _showMemoryBank() {
    ee.emitEvent('toggle-memories');
  },

  _clear() {
    store.newInput = 0;
  },

  _contentClear() {
    let curInput = String(store.curInput),
    lessOne = curInput.substring(0, curInput.length - 1);

    return store.newInput = lessOne === '' ? 0 : lessOne;
  },

  render() {
    return (
      React.createElement("section", { className: "button-set--functions" },
      React.createElement(Button, { klass: "long-text", text: "recall", clickHandler: this._showMemoryBank }),
      React.createElement(Button, { klass: "long-text", text: "clear", clickHandler: this._clear }),
      React.createElement(Button, { text: "\u2190", clickHandler: this._contentClear })));


  } });

const ButtonSetEquations = React.createClass({ displayName: "ButtonSetEquations",
  _eq(type) {
    store.newInput = `${store.curInput} ${type} `;
  },

  _equate() {
    store.newInput = eval(store.curInput);
  },

  render() {
    return (
      React.createElement("section", { className: "button-set--equations" },
      React.createElement(Button, { text: "+", clickHandler: this._eq }),
      React.createElement(Button, { text: "-", clickHandler: this._eq }),
      React.createElement(Button, { text: "*", clickHandler: this._eq }),
      React.createElement(Button, { text: "/", clickHandler: this._eq }),
      React.createElement(Button, { text: "=", clickHandler: this._equate })));


  } });

const ButtonSetNumbers = React.createClass({ displayName: "ButtonSetNumbers",
  _number(num) {
    if (!store.curInput) {
      return store.newInput = num;
    }

    return store.newInput = `${store.curInput}${num}`;
  },

  render() {
    return (
      React.createElement("section", { className: "button-set--numbers" },
      React.createElement(Button, { text: "1", clickHandler: this._number }),
      React.createElement(Button, { text: "2", clickHandler: this._number }),
      React.createElement(Button, { text: "3", clickHandler: this._number }),
      React.createElement(Button, { text: "4", clickHandler: this._number }),
      React.createElement(Button, { text: "5", clickHandler: this._number }),
      React.createElement(Button, { text: "6", clickHandler: this._number }),
      React.createElement(Button, { text: "7", clickHandler: this._number }),
      React.createElement(Button, { text: "8", clickHandler: this._number }),
      React.createElement(Button, { text: "9", clickHandler: this._number }),
      React.createElement(Button, { text: "0", clickHandler: this._number })));


  } });


let store = {
  input: 0,
  memory: [],
  get curInput() {
    return this.input;
  },

  get curMemories() {
    return this.memory.filter(m => m !== undefined);
  },

  set commitMemory(input) {
    this.memory.push(input);
  },

  set newInput(str) {
    let curInput = str,
    oldInput = this.curInput;

    if (this.curMemories.indexOf(oldInput) === -1) {
      this.commitMemory = oldInput;
    }

    this.input = curInput;
    ee.emitEvent('numberCruncher', [this.curInput]);
  } };


React.render(
React.createElement(App, null),
document.querySelector('body'));