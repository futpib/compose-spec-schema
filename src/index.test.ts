import test from 'ava';

import type { Compose } from '.';
import { composeSchema } from '.';

test('Compose', t => {
	const compose: Compose = {
		version: '3.9',
		// @ts-expect-error 2322
		services: [],
	};

	t.truthy(compose);
});

test('composeSchema', async t => {
	const composeSchema_: Compose = composeSchema;
	t.deepEqual(composeSchema_, (await import('./compose-spec/schema/compose-spec.json')).default);
	t.deepEqual((await import('./schema.json')).default, (await (import('./compose-spec/schema/compose-spec.json'))).default);
});
