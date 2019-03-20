import global from './global';
import modules from './modules';

const modulesNamespaced = Object.keys(modules).reduce((obj, module) => {
  const newObj = obj;
  newObj[module] = { namespaced: true, ...modules[module] };
  return newObj;
}, {});

export default {
  modules: modulesNamespaced,
  ...global,
};
