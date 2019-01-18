import { Stack } from '@aws-cdk/cdk';
import { OriginAccessIdentity } from '../../src/static-site/OriginAccessIdentity';
import * as yaml from '../utils/Yaml';

describe('OriginAccessIdentity', () => {
    it('should match the template snapshot', () => {
        // Given
        const stack = new Stack();

        // When
        new OriginAccessIdentity(stack);

        // Then
        expect(yaml.toYamlString(stack.toCloudFormation())).toMatchSnapshot();
    })
})