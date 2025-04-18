# eslint-plugin-react-microstore

ESLint rules for [`react-microstore`](https://npmjs.com/package/react-microstore).

## Included Rules

### ✅ `react-microstore/no-unused-selector-keys`

Warns when you select keys in `useStoreSelector` but don’t destructure or use them.

```ts
// ❌ This will trigger the rule
const { a } = useStoreSelector(store, ['a', 'b']); // 'b' is unused

// ✅ This is fine
const { a, b } = useStoreSelector(store, ['a', 'b']);
