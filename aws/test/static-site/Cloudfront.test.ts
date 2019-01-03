import { Stack } from '@aws-cdk/cdk';
import * as yaml from '../utils/Yaml';
import { Cloudfront } from '../../src/static-site/Cloudfront';
import { Bucket } from '@aws-cdk/aws-s3';
import { OriginAccessIdentity } from '../../src/static-site/OriginAccessIdentity';

describe('Cloudfront', () => {
    it('should match the template snapshot', () => {
        // Given
        
        const cloudfrontStack = new Stack();
        const siteBucket = new Bucket(cloudfrontStack, 'MySiteBucket');
        const originAccessIdentity = new OriginAccessIdentity(cloudfrontStack);
        
        // When
        new Cloudfront({
            stack: cloudfrontStack,
            logicalName: 'MyCloudfront',
            siteBucket,
            originAccessIdentity: originAccessIdentity.getResource()
        });

        // Then
        expect(yaml.toYamlString(cloudfrontStack.toCloudFormation())).toMatchSnapshot();
    })
})