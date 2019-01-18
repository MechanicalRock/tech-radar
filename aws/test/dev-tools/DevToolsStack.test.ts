import { App } from '@aws-cdk/cdk';
import { DevToolsStack } from '../../src/dev-tools/DevToolsStack';
import * as yaml from '../utils/Yaml';

describe('DevToolsStack', () => {
    it('should match the template snapshot', () => {
        // Given
        const app = new App();

        // When
        const stack = new DevToolsStack(app, 'MyDevToolsStack');

        // Then
        expect(yaml.toYamlString(stack.toCloudFormation())).toMatchSnapshot();
    })
})