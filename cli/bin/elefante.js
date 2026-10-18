#!/usr/bin/env node

import { main } from '../src/index.js';

try {
  const result = main();
  if (result && typeof result.then === 'function') {
    result.catch((err) => {
      console.error(err?.message ?? err);
      process.exit(1);
    });
  }
} catch (err) {
  console.error(err?.message ?? err);
  process.exit(1);
}
