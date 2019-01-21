import { Stack } from '@aws-cdk/cdk';
import {
  AliasRecord,
  IAliasRecordTarget,
  HostedZone
} from '@aws-cdk/aws-route53';

export interface HostedZoneProps {
  stack: Stack;
  fullyQualifiedDomainName: string;
}

export class HostedZoneAlias {
  hostedZone: HostedZone;
  alias: IAliasRecordTarget;

  constructor(private props: HostedZoneProps, alias: IAliasRecordTarget) {
    this.alias = alias;
    this.create();
  }

  create(): void {
    this.hostedZone = new HostedZone(this.props.stack, 'HostedZone', {
      zoneName: this.props.fullyQualifiedDomainName,
      comment: `Hosted zone for domain: ${this.props.fullyQualifiedDomainName}`
    });

    new AliasRecord(this.props.stack, 'CloudFrontAlias', {
      zone: this.hostedZone,
      recordName: this.props.fullyQualifiedDomainName,
      target: this.alias
    });
  }
}
