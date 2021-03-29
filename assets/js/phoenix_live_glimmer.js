import Component from '@glimmerx/component';
import { renderComponent } from '@glimmerx/core';
const render = function(el, target, componentClass, additionalArgs = {}, previousArgs = {}) {
  let args = el.dataset.liveGlimmerArgs ? JSON.parse(el.dataset.liveGlimmerArgs) : {};
  if (el.dataset.liveGlimmerMerge) {
    args = {...previousArgs, ...args, ...additionalArgs}
  } else {
    args = {...args, ...additionalArgs}
  }
  renderComponent(componentClass, {element: target, args})
  return args;
}

const initLiveGlimmerElement = function(el, additionalArgs) {
  const target = el.nextElementSibling;
  const componentClass = eval(el.dataset.liveGlimmerClass);
  return {target: target, componentClass: componentClass};
}

const LiveGlimmer = {
  mounted() {
    const { el } = this;
    const pushEvent = this.pushEvent.bind(this);
    const pushEventTo = this.pushEventTo && this.pushEventTo.bind(this);
    const handleEvent = this.handleEvent && this.handleEvent.bind(this);
    const { target, componentClass } = initLiveGlimmerElement(el, { pushEvent });
    const args = render(el, target, componentClass, { pushEvent, pushEventTo, handleEvent });
    if (el.dataset.liveGlimmerMerge) this.args = args
    Object.assign(this, { target, componentClass });
  },

  updated() {
    const { el, target, componentClass } = this;
    const pushEvent = this.pushEvent.bind(this);
    const pushEventTo = this.pushEventTo && this.pushEventTo.bind(this);
    const handleEvent = this.handleEvent;
    const previousArgs = this.args;
    const args = render(el, target, componentClass, { pushEvent, pushEventTo }, previousArgs);
    if (el.dataset.liveGlimmerMerge) this.args = args
  },

//  destroyed() {
//    const { target } = this;
//    ReactDOM.unmountComponentAtNode(target);
//  }
}

const LiveGlimmerComponent = class LiveGlimmerComponent extends Component {
  constructor() {
    super(...arguments)
    this.pushEvent = this.args.pushEvent;
    this.pushEventTo = this.args.pushEventTo;
    this.handleEvent = this.args.handleEvent;
  }

}
export { LiveGlimmer as default, initLiveGlimmerElement, LiveGlimmerComponent };
