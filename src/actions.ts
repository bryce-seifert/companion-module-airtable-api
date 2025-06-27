import type { AirtableInstance } from './main.js'

export function UpdateActions(self: AirtableInstance): void {
	self.setActionDefinitions({
		sample_action: {
			name: 'Create Record',
			options: [
				{
					id: 'tableName',
					type: 'textinput',
					label: 'Table Name',
					default: 'Table 1', // Default table name
					useVariables: true, // Allow custom table names
				},
				{
					id: 'fields',
					type: 'textinput',
					label: 'Record Fields (JSON Formatted)',
					default: '{"Name": "New Record"}',
					useVariables: true,
				},
			],
			callback: async (action, context) => {
				if (typeof action.options.tableName !== 'string') {
					self.log('error', 'Invalid table name')
					return
				}

				const tableName = await context.parseVariablesInString(action.options.tableName)

				if (typeof action.options.fields !== 'string') {
					self.log('error', 'Invalid record info')
					return
				}

				let fields = await context.parseVariablesInString(action.options.fields)
				fields = JSON.parse(fields)

				void self.api.createRecord(tableName, fields)
			},
		},
	})
}
