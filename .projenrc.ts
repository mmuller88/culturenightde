import * as pj from 'projen';
import { TrailingComma } from 'projen/lib/javascript';

/**
 * The following are some better comments helper (https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
 * * That is so important
 * ! Deprecated stuff
 * ? being used as a question
 * TODO: aha
 * @param myParam The parameter for this method
 */
const project = new pj.typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'culturenightde',
  projenrcTs: true,
  eslint: true,
  prettier: true,
  prettierOptions: {
    settings: {
      singleQuote: true,
      trailingComma: TrailingComma.ALL,
    },
  },
  release: true,
});
project.prettier?.addIgnorePattern('.eslintrc.json');
project.prettier?.addIgnorePattern('tsconfig.dev.json');
project.prettier?.addIgnorePattern('tsconfig.json');
project.prettier?.addIgnorePattern('backend/cdk.json');

project.tsconfigDev?.addInclude('backend/**/*.ts');

project.setScript(
  'buildReactApps',
  'cd landingpage && yarn build',
);

project.setScript(
  'deploy',
  'cd backend && yarn cdk deploy',
);

project.setScript(
  'dev',
  'cd landingpage && yarn dev',
);

project.synth();

const landingpage = new pj.web.ReactTypeScriptProject({
  defaultReleaseBranch: 'main',
  outdir: 'landingpage',
  parent: project,
  name: 'landingpage',
  // deps: [
  //   'react-router-dom',
  //   'react-scripts',
  //   'react-responsive',
  //   'react-localization',
  // ],
  // devDeps: [
  //   '@types/react-responsive',
  //   '@types/react-router-dom',
  // ],
  release: false,
});

landingpage.synth();

const cdkVersion = '2.51.1';
const backend = new pj.awscdk.AwsCdkTypeScriptApp({
  defaultReleaseBranch: 'main',
  outdir: 'backend',
  parent: project,
  name: 'backend',
  cdkVersion,
  devDeps: ['@types/aws-lambda', 'aws-sdk'],
  release: true,
});

backend.setScript('cdk', 'cdk');
backend.setScript('tsc', 'tsc');

backend.synth();