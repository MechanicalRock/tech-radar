import { Stack, App } from '@aws-cdk/cdk';
import { CodePipeline } from './CodePipeline';

export class DevToolsStack extends Stack {
  constructor(app: App, stackName: string) {
    super(app, stackName);
    this.create();
  }

  create() {
    // Create a code pipeline
    new CodePipeline({
      stack: this,
      logicalName: 'CodePipeline',
      pipelineName: 'code-pipeline'
    });
  }
}
