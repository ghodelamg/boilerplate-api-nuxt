import { isPermission } from './permission-filters';

const hasPermission = {
  bind(el, { name, value }, vnode) {
    if (name == 'canAccess') {
      name = 'show';
    }
    // eslint-disable-next-line max-len
    const hasInitialPermission = isPermission(vnode.context.$store.state.permission.userPermissions, value, name);
    if (!hasInitialPermission) {
      el.style.display = 'none';
    }
  },
  update(el, { name, value }, vnode) {
    if (name == 'canAccess') {
      name = 'show';
    }
    // eslint-disable-next-line max-len
    const hasUpdatedPermission = isPermission(vnode.context.$store.state.permission.userPermissions, value, name);
    if (!hasUpdatedPermission) {
      el.style.display = 'none';
    } else if (el.localName == 'span' || el.localName == 'button' || el.localName == 'i') {
      el.style.display = 'inline-block';
    } else if (el.localName == 'a') {
      el.style.display = 'inline';
    } else {
      el.style.display = 'block';
    }
  },
};

export default hasPermission;
