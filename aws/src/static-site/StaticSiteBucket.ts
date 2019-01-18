import { Stack, Parameter } from '@aws-cdk/cdk';
import * as s3 from '@aws-cdk/aws-s3';
import { PolicyStatement, CanonicalUserPrincipal } from '@aws-cdk/aws-iam';

export interface StaticSiteBucketProps {
  stack: Stack;
  logicalName: string;
  originAccessIdentityCanonicalId: string;
}

export class StaticSiteBucket {
  bucketParam: Parameter;
  bucket: s3.Bucket;

  constructor(private props: StaticSiteBucketProps) {
    this.bucket = this.create();
  }

  private create() {
    const bucket = new s3.Bucket(this.props.stack, this.props.logicalName, {
      encryption: s3.BucketEncryption.S3Managed
    });

    const statement = new PolicyStatement();
    statement.addPrincipal(
      new CanonicalUserPrincipal(this.props.originAccessIdentityCanonicalId)
    );
    statement.addAction('s3:GetObject');
    statement.addResource(bucket.bucketArn + '/*');
    bucket.addToResourcePolicy(statement);
    return bucket;
  }
}
