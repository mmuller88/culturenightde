import * as core from 'aws-cdk-lib';

import { Construct } from 'constructs';
import { StaticWebsite } from './construcs/static-website';

interface LandingPageStackProps extends core.StackProps {
  domainName: string;
}

export class LandingPageStack extends core.Stack {
  constructor(scope: Construct, id: string, props: LandingPageStackProps) {
    super(scope, id, props);

    const landingPage = new StaticWebsite(this, 'landingPage', {
      build: '../landingpage/build',
      domainName: props.domainName,
      recordName: '',
      alternativeRecordName: 'www',
    });

    new core.CfnOutput(this, 'BucketWebsiteUrl', {
      value: landingPage.bucketWebsiteUrl,
    });

    new core.CfnOutput(this, 'CustomDomainWebsiteUrl', {
      value: `https://${landingPage.recordDomainName}`,
    });

    new core.CfnOutput(this, 'WebsiteCloudfrontDomainName', {
      value: landingPage.distributionDomainName,
    });

    new core.CfnOutput(this, 'AlternativeWebsiteCloudfrontDomainName', {
      value: landingPage.alternativeRecordDomainName || '',
    });
  }
}
