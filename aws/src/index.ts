import { App } from '@aws-cdk/cdk';
import { StaticSiteStack } from './static-site/StaticSiteStack';
import { DevToolsStack } from './dev-tools/DevToolsStack';

const projectName = 'TechRadar';

const app = new App();
new StaticSiteStack(app, `${projectName}StaticSiteStack`);
new DevToolsStack(app, `${projectName}DevToolsStack`);

app.run();