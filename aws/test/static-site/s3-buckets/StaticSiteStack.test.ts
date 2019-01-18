import * as yaml from '../../utils/Yaml';
import { StaticSiteStack } from '../../../src/static-site/StaticSiteStack';
import { App } from '@aws-cdk/cdk';

describe('StaticSiteStack', () => {
  it('should match the template snapshot', () => {
    const app = new App();

    // When
    const staticSiteStack = new StaticSiteStack(app, 'MyStaticSiteStack');

    // Then
    expect(
      yaml.toYamlString(staticSiteStack.toCloudFormation())
    ).toMatchSnapshot();
  });
});
