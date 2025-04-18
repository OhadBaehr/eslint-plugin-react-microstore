module.exports = {
    meta: {
      type: 'problem',
      docs: {
        description: 'Disallow unused keys in useStoreSelector from react-microstore',
        recommended: false
      },
      schema: []
    },
  
    create(context) {
      return {
        VariableDeclarator(node) {
          // Match: const { x, y } = useStoreSelector(store, [ ... ]);
          if (
            node.id.type !== 'ObjectPattern' ||
            node.init?.type !== 'CallExpression' ||
            node.init.callee.name !== 'useStoreSelector'
          ) {
            return;
          }
  
          const destructuredKeys = new Set(
            node.id.properties.map(p => p.key?.name ?? '')
          );
  
          const selectorArg = node.init.arguments[1];
  
          if (
            selectorArg?.type === 'ArrayExpression' &&
            selectorArg.elements.every(
              el =>
                el.type === 'Literal' && typeof el.value === 'string'
            )
          ) {
            for (const el of selectorArg.elements) {
              const key = el.value;
              if (!destructuredKeys.has(key)) {
                context.report({
                  node: el,
                  message: `'${key}' is selected in useStoreSelector but not destructured or used.`,
                });
              }
            }
          }
        }
      };
    }
  };
  