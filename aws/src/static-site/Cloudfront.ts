import * as s3 from '@aws-cdk/aws-s3';
import { Stack } from '@aws-cdk/cdk';
import {
  CloudFrontWebDistribution,
  CloudFrontWebDistributionProps,
  CfnCloudFrontOriginAccessIdentity,
  PriceClass,
  CloudFrontAllowedMethods,
  CloudFrontAllowedCachedMethods
} from '@aws-cdk/aws-cloudfront';
import { Bucket } from '@aws-cdk/aws-s3';
import { Output } from '@aws-cdk/cdk';

export interface CloudfrontProps {
  stack: Stack;
  logicalName: string;
  siteBucket: s3.Bucket;
  originAccessIdentity: CfnCloudFrontOriginAccessIdentity;
}

export class Cloudfront {
  distribution: CloudFrontWebDistribution;

  constructor(private props: CloudfrontProps) {
    this.distribution = this.create();
    this.createOutputs();
  }

  private create(): CloudFrontWebDistribution {
    const distributionProps: CloudFrontWebDistributionProps = {
      comment: 'Cloud front distribution for static website',
      aliasConfiguration: {
        acmCertRef:
          'arn:aws:acm:us-east-1:598112752826:certificate/da98edf4-7dc7-4ee8-95d6-82d96bc1a13b',
        names: ['techradar.cloud', 'www.techradar.cloud']
      },
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: this.props.siteBucket,
            originAccessIdentity: this.props.originAccessIdentity
          },
          behaviors: [
            {
              isDefaultBehavior: true,
              compress: true,
              allowedMethods: CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
              cachedMethods: CloudFrontAllowedCachedMethods.GET_HEAD_OPTIONS,
              minTtlSeconds: 3600
            }
          ]
        }
      ],
      errorConfigurations: [
        {
          errorCode: 404,
          responseCode: 200,
          responsePagePath: '/'
        }
      ],
      loggingConfig: {
        bucket: this.createLoggingBucket()
      },
      priceClass: PriceClass.PriceClassAll
    };
    return new CloudFrontWebDistribution(
      this.props.stack,
      this.props.logicalName,
      distributionProps
    );
  }

  private createOutputs() {
    new Output(this.props.stack, 'DistributionDomainName', {
      value: this.distribution.domainName,
      disableExport: true
    });
  }

  private createLoggingBucket(): Bucket {
    return new Bucket(this.props.stack, 'LogsBucket', {
      encryption: s3.BucketEncryption.S3Managed
    });
  }
}
