**Input** — dark text field with a gold focus ring.

```jsx
<Input label="Work email" type="email" placeholder="you@company.com"
       icon={<Icon name="mail" size={16} />} />
<Input label="Company" error="Required" />
```

Supports `label`, leading `icon`, `helper`, and `error` (turns the field red). Passes through all native input props (`type`, `placeholder`, `value`, `onChange`, …).
