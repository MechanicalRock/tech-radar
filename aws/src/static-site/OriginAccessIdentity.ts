import { Stack } from '@aws-cdk/cdk';
import { CfnCloudFrontOriginAccessIdentity } from '@aws-cdk/aws-cloudfront';

export class OriginAccessIdentity {
  private originAccessIdentity: CfnCloudFrontOriginAccessIdentity;
  constructor(private stack: Stack) {
    this.originAccessIdentity = this.create();
  }

  getResource(): CfnCloudFrontOriginAccessIdentity {
    return this.originAccessIdentity;
  }

  private create(): CfnCloudFrontOriginAccessIdentity {
    return new CfnCloudFrontOriginAccessIdentity(
      this.stack,
      'OriginAccessIdentity',
      {
        cloudFrontOriginAccessIdentityConfig: {
          comment:
            'Cloud front user which will be allowed to access the site s3 bucket'
        }
      }
    );
  }
}
