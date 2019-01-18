import { Stack, Output } from '@aws-cdk/cdk';
import {
  PublicHostedZone,
  AliasRecord,
  IAliasRecordTarget
} from '@aws-cdk/aws-route53';

export interface HostedZoneProps {
  stack: Stack;
  fullyQualifiedDomainName: string;
}

export class HostedZone {
  hostedZone: PublicHostedZone;
  alias: IAliasRecordTarget;

  constructor(private props: HostedZoneProps, alias: IAliasRecordTarget) {
    this.alias = alias;
    this.create();
    this.publishOutputs();
  }

  create(): void {
    this.hostedZone = new PublicHostedZone(this.props.stack, 'HostedZone', {
      zoneName: this.props.fullyQualifiedDomainName,
      comment: `Hosted zone for domain: ${this.props.fullyQualifiedDomainName}`
    });
    new AliasRecord(this.props.stack, 'CloudFrontAlias', {
      zone: this.hostedZone,
      recordName: this.props.fullyQualifiedDomainName,
      target: this.alias
    });
  }

  publishOutputs(): void {
    new Output(this.props.stack, 'HostedZoneId', {
      value: this.hostedZone.hostedZoneId
    });
  }
}
