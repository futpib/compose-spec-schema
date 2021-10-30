import * as path from 'node:path';
import * as fs from 'node:fs/promises';

import invariant from 'invariant';
import getPackageDirectory from 'pkg-dir';
import { compileFromFile } from 'json-schema-to-typescript';

const bannerComment = '/* eslint-disable */\n';

const jsonToTypeScriptHeader = 'export default ';
const jsonToTypeScriptFooter = ' as const;\n';

async function main() {
	const packageDirectory = await getPackageDirectory();

	invariant(packageDirectory, 'Could not find the package root directory');

	const schemaJsonFilePath = path.join(packageDirectory, 'src', 'schema.json');

	await fs.copyFile(
		path.join(packageDirectory, 'src', 'compose-spec', 'schema', 'compose-spec.json'),
		schemaJsonFilePath,
	);

	const composeSchemaJson = await fs.readFile(schemaJsonFilePath, 'utf-8');

	const composeSchemaTypeScript = [
		bannerComment,
		jsonToTypeScriptHeader,
		composeSchemaJson.trim(),
		jsonToTypeScriptFooter,
	].join('');

	await fs.writeFile(path.join(packageDirectory, 'src', 'schema.ts'), composeSchemaTypeScript);

	const composeTypeTypeScript = await compileFromFile(schemaJsonFilePath, {
		bannerComment,
	});

	await fs.writeFile(path.join(packageDirectory, 'src', 'type.ts'), composeTypeTypeScript);
}

void main();
