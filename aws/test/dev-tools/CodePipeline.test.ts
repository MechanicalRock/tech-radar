import { Stack } from '@aws-cdk/cdk';
import * as yaml from '../utils/Yaml';
import { CodePipeline } from '../../src/dev-tools/CodePipeline';

describe('CodePipeline', () => {
    it('should match the template snapshot', () => {
        // Given
        const stack = new Stack();

        // When
        new CodePipeline({
            stack,
            logicalName: 'CodePipeline',
            pipelineName: 'code-pipeline',
        });

        // Then
        expect(yaml.toYamlString(stack.toCloudFormation())).toMatchSnapshot();
    })
})