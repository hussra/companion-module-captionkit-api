const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const UpdatePresets = require('./presets')

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config

		this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
		this.updatePresets() // export presets
	}
	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.config = config
	}

	// Return config fields for web config
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				label: 'Configuration Help',
				value: `<p>Start by setting up a CaptionKit API Key.This is your way to keep your API requests safe and secure.</p>
					<p>In CaptionKit, navigate to <strong>⚙️ Account settings</strong> and scroll down to <strong>API Keys</strong>,
					then click <strong>Create a new key</strong>.</p>
					<p>Give your API a label then confirm.</p>
					<p>In future CaptionKit will support multiple API keys, so make sure to use a descriptive label.</p>
					<p>API keys are unique to your account and should be kept secret.If you believe your API key has been compromised,
						you can delete it and create a new one at any time.</p>
					<p>Once done, enter your API key below.</p>`,
				width: 12
			},
			{
				type: 'textinput',
				id: 'key',
				label: 'CaptionKit API Key',
				width: 12
			},
		]
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}

	updatePresets() {
		UpdatePresets(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
