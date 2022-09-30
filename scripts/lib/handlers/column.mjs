import { h } from 'hastscript';

export function column(block, parent) {
  const node = h('div', []);
  parent.children.push(node);

  if (block.has_children) {
    return block.children.map((n) => [n, node]);
  }
  return null;
}

export function column_list(block, parent) {
  const node = h('div', { class: 'col-list' }, []);
  parent.children.push(node);

  if (block.has_children) {
    return block.children.map((n) => [n, node]);
  }
  return null;
}
