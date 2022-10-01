import { h } from 'hastscript';

export function equation(block, parent) {
  const node = h('div', { dataType: 'equation' }, block.equation.expression);
  parent.children.push(node);

  return null;
}
