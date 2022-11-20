import * as core from 'aws-cdk-lib';
import { LandingPageStack } from './landingpage-stack';

const devEnv = {
  account: '981237193288',
  region: 'eu-central-1',
};

const app = new core.App();

new LandingPageStack(app, 'LandingPageStack', {env: devEnv, domainName: 'culturenight.de' });

app.synth();
