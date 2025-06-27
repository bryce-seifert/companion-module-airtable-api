import type { AirtableInstance } from './main.js'

export function UpdateFeedbacks(self: AirtableInstance): void {
	self.setFeedbackDefinitions({
		/* recordFieldMatch: {
			name: 'Record Field Match',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
			{
					id: 'tableName',
					type: 'textinput',
					label: 'Table Name',
					default: 'Table 1', // Default table name
					useVariables: true, // Allow custom table names
				},
				{
					id: 'recordURL',
					type: 'textinput',
					label: 'Record URL',
					default: '', // Default record URL
					useVariables: true, // Allow custom record URLs
				},
			],
			callback: (feedback) => {
				if (Number(feedback.options.num) > 5) {
					return true
				} else {
					return false
				}
			},
		}, */
	})
}
