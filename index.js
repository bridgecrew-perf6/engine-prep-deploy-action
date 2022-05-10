const core = require('@actions/core');
const github = require('@actions/github');

try {
	let environmentName = 'local';
	let deployEnvironmentName = null;
	if (github.context.ref == 'refs/heads/main') {
		environmentName = 'dev';
		deployEnvironmentName = 'dev-cb';
	} else if (github.context.ref == 'refs/heads/innovate') {
		environmentName = 'innovate';
		deployEnvironmentName = 'innovate';
	} else if (github.context.ref.startsWith('refs/heads/release/')) {
		environmentName = 'stage';
		deployEnvironmentName = 'stage';
	} else if (github.context.ref.startsWith('refs/tags/')) {
		environmentName = 'prod';
		deployEnvironmentName = 'prod';
	}

	let shouldDeploy = false;
	if (deployEnvironmentName != null && github.eventName == 'push') {
		shouldDeploy = true;
	}

	core.setOutput('shouldDeploy', shouldDeploy.toString());
	core.setOutput('deployEnvironmentName', deployEnvironmentName);
	core.setOutput('environmentName', environmentName);
} catch (error) {
	core.setFailed(error.message);
}
