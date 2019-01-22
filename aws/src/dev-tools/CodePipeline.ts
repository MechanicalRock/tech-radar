import { Pipeline, GitHubSourceAction } from '@aws-cdk/aws-codepipeline';
import {
  PipelineBuildAction,
  PipelineProject,
  LinuxBuildImage,
  PipelineBuildActionProps
} from '@aws-cdk/aws-codebuild';
import { Stack, SecretParameter } from '@aws-cdk/cdk';
import { Role, ServicePrincipal } from '@aws-cdk/aws-iam';

export interface CodePipelineProps {
  stack: Stack;
  logicalName: string;
  pipelineName: string;
}

export class CodePipeline {
  private pipeline: Pipeline;
  private codeBuildRole: Role;

  constructor(private props: CodePipelineProps) {
    this.create();
  }

  create() {
    // Create the pipeline
    this.pipeline = new Pipeline(this.props.stack, this.props.logicalName, {
      pipelineName: this.props.pipelineName,
      restartExecutionOnUpdate: true
    });

    this.createCodeBuildRole();
    this.createSourceStage();
    this.createInfraStage();
    this.createDevStage();
    this.createProdStage();
  }

  private createCodeBuildRole(): void {
    this.codeBuildRole = new Role(this.props.stack, 'CodeBuildRole', {
      assumedBy: new ServicePrincipal('codebuild.amazonaws.com')
    });
    this.codeBuildRole.attachManagedPolicy(
      'arn:aws:iam::aws:policy/AdministratorAccess'
    );
  }

  private createProdStage(): void {
    // Prod stage and build & test action
    const stage = this.pipeline.addStage('ProdStage');
    const project = this.createCodeBuildProject('DeployToProd');

    this.createCodeBuildAction('prodDeployAction', {
      project,
      stage
    });
  }

  private createInfraStage(): void {
    // Deploy Infra
    const stage = this.pipeline.addStage('InfraStage');
    const project = this.createCodeBuildProject(
      'DeployInfra',
      'infra_buildspec.yml'
    );

    this.createCodeBuildAction('DeployInfraAction', {
      project,
      stage
    });
  }

  private createDevStage(): void {
    // Dev stage and build & test action
    const stage = this.pipeline.addStage('DevStage');
    const project = this.createCodeBuildProject(
      'BuildAndTest',
      'app_buildspec.yml'
    );

    this.createCodeBuildAction('BuildAndTestAction', {
      project,
      stage
    });
  }

  private createCodeBuildProject(
    logicalName: string,
    buildSpec?: string
  ): PipelineProject {
    return new PipelineProject(this.props.stack, logicalName, {
      environment: {
        buildImage: LinuxBuildImage.UBUNTU_14_04_NODEJS_10_1_0
      },
      role: this.codeBuildRole,
      buildSpec
    });
  }

  private createCodeBuildAction(
    actionName: string,
    props: PipelineBuildActionProps
  ): void {
    new PipelineBuildAction(this.props.stack, actionName, props);
  }

  private createSourceStage(): void {
    const stage = this.pipeline.addStage('SourceStage');

    const { value: oauthToken } = new SecretParameter(
      this.props.stack,
      'GitHubOAuthToken',
      { ssmParameter: 'github-oauth-token' }
    );

    new GitHubSourceAction(this.props.stack, 'GitHub_Source', {
      stage,
      owner: 'MechanicalRock',
      repo: 'tech-radar',
      oauthToken
    });
  }
}
