const { InstanceStatus } = require('@companion-module/base')
const constants = require('./constants')

module.exports = function (self) {
	self.setActionDefinitions({
		send_signal: {
			name: 'Send Signal',
			options: [
				{
					id: 'signal',
					type: 'dropdown',
					label: 'Signal type',
					choices: constants.SIMPLE_SIGNALS,
					default: 'captions:stream:start'
				},
			],
			callback: async (event) => {
				const response = await fetch(`https://api.captionkit.io/v2/signal?key=${self.config.key}`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(
							{ event: event.options.signal }
						)
					}
				)
				if (response.status == 200) {
					self.updateStatus(InstanceStatus.Ok)
				} else {
					self.updateStatus(InstanceStatus.ConnectionFailure)
				}
			}
		},

		language_select: {
			name: 'Set transcription language',
			options: [
				{
					id: 'language',
					type: 'dropdown',
					label: 'Language',
					choices: constants.LANGUAGES,
					default: 'en'
				}
			],
			callback: async (event) => {
				const response = await fetch(`https://api.captionkit.io/v2/signal?key=${self.config.key}`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(
							{
								event: 'language:select',
								value: event.options.language
							}
						)
					}
				)
				if (response.status == 200) {
					self.updateStatus(InstanceStatus.Ok)
				} else {
					self.updateStatus(InstanceStatus.ConnectionFailure)
				}
			}
		}
	})
}
