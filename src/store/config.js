import global from '@/store/global';
import modules from '@/store/modules';

const modulesNamespaced = Object.keys(modules).reduce((obj, module) => {
  const newObj = obj;
  newObj[module] = { namespaced: true, ...modules[module] };
  return newObj;
}, {});

export default {
  modules: modulesNamespaced,
  ...global,
};
