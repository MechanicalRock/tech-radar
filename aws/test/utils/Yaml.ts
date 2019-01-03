// tslint:disable:no-any
import { safeDump, safeLoad } from 'js-yaml';
import { readFileSync } from 'fs-extra';

export const toYamlString = (object: any) => {
    return safeDump(object);
};

export const yamlFromFile = (path: string): any => {
    return safeLoad(readFileSync(path, 'utf8'));
};