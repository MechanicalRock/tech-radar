import { Stack } from '@aws-cdk/cdk';
import { StaticSiteBucket } from '../../../src/static-site/StaticSiteBucket';
import * as yaml from '../../utils/Yaml';
import { OriginAccessIdentity } from '../../../src/static-site/OriginAccessIdentity';

describe('StaticSiteBucket', () => {
    it('should match expected template snapshot', () => {
        const stack = new Stack();
        const originAccessIdentity = new OriginAccessIdentity(stack);

        // When
        new StaticSiteBucket({
            stack,
            logicalName: 'MyStaticSiteBucket',
            originAccessIdentityCanonicalId: originAccessIdentity.getResource().cloudFrontOriginAccessIdentityS3CanonicalUserId
        });

        // Then
        expect(yaml.toYamlString(stack.toCloudFormation())).toMatchSnapshot();
    })
})