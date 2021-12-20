# docker-compose

> TypeScript types for `docker-compose.yml`. Generated from [compose-spec](https://github.com/compose-spec/compose-spec).

[![npm](https://shields.io/npm/v/compose-spec-schema)](https://www.npmjs.com/package/compose-spec-schema) [![Coverage Status](https://coveralls.io/repos/github/futpib/compose-spec-schema/badge.svg?branch=master)](https://coveralls.io/github/futpib/compose-spec-schema?branch=master)

## Usage

```typescript
import { Compose, composeSchema } from 'compose-spec-schema';

const compose: Compose = {
	file: {
		version: '3.9',
		services: [], // TS error: should be an object
	},
};

console.log(composeSchema); // JSON schema for `docker-compose.yml`
```
