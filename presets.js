const constants = require('./constants')
const { combineRgb } = require('@companion-module/base')
const feedbacks = require('./feedbacks')

module.exports = function (self) {

    const style = {
        size: 14,
        bgcolor: combineRgb(0, 0, 0),
        color: combineRgb(255, 255, 255),
    }

    let presets = {}

    for (var i in constants.SIMPLE_SIGNALS) {
        presets[constants.SIMPLE_SIGNALS[i].id] = {
            type: 'button',
            category: 'Signals',
            name: constants.SIMPLE_SIGNALS[i].buttonText,
            style: {
                ...style,
                text: constants.SIMPLE_SIGNALS[i].buttonText,
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'send_signal',
                            options: {
                                signal: constants.SIMPLE_SIGNALS[i].id
                            }
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: []
        }
    }

    for (var i in constants.LANGUAGES) {
        presets[constants.LANGUAGES[i].id] = {
            type: 'button',
            category: 'Languages',
            name: constants.LANGUAGES[i].label,
            style: {
                ...style,
                text: constants.LANGUAGES[i].label,
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'language_select',
                            options: {
                                language: constants.LANGUAGES[i].id
                            }
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: []
        }
    }

    // presets['start_streaming'] = {
    //     type: 'button',
    //     category: 'Signals',
    //     name: 'Start streaming',
    //     style: {
    //         ...style,
    //         text: 'Start streaming',
    //     },
    //     steps: [
    //         {
    //             down: [
    //                 {
    //                     actionId: 'send_signal',
    //                     options: {
    //                         signal: 'captions:stream:start'
    //                     }
    //                 }
    //             ],
    //             up: []
    //         }
    //     ],
    //     feedbacks: []
    // }
    self.setPresetDefinitions(presets)
}