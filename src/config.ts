import { type SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig {
	key: string
	baseId: string
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'textinput',
			id: 'key',
			label: 'API Key',
			width: 8,
		},
		{
			type: 'textinput',
			id: 'baseId',
			label: 'Base ID',
			width: 8,
		},
	]
}
