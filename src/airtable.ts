import Airtable, { Base } from 'airtable'
import { InstanceStatus } from '@companion-module/base'

import type { AirtableInstance } from './main.js'

export class api {
	airtable!: Airtable | null // Airtable instance
	instance: AirtableInstance // Instance of the main module

	constructor(instance: AirtableInstance) {
		this.instance = instance
		//this.airtable = new Airtable({ apiKey: this.instance.config.key });
		//	this.base = this.airtable.base(this.instance.config.baseId);
	}

	testConnection(): boolean {
		try {
			void fetch(`https://api.airtable.com/v0/meta/bases/${this.instance.config.key}/tables`, {
				headers: {
					Authorization: `Bearer ${this.instance.config.key}`,
				},
			})
			this.instance.updateStatus(InstanceStatus.Ok)
			this.instance.log('info', 'Airtable connection successful')
			this.airtable = new Airtable({ apiKey: this.instance.config.key })

			return true // Connection successful
		} catch (error) {
			this.instance.updateStatus(
				InstanceStatus.ConnectionFailure,
				error instanceof Error ? error.message : String(error),
			)
			this.instance.log(
				'error',
				`Airtable connection failed: ${error instanceof Error ? error.message : String(error)}`,
			)
			return false // Connection failed
		}
	}

	public createRecord = async (tableName: string, recordInfo: string): Promise<any> => {
		if (!this.airtable) {
			this.instance.log('error', 'Unable to connect to Airtable')
			return
		}
		const base: Base = this.airtable.base(this.instance.config.baseId)
		const table = base.table(tableName)

		return table
			.create(recordInfo)
			.then((createdRecords) => {
				this.instance.log('debug', `Record created with ID ${createdRecords.id}`)
				return createdRecords
			})
			.catch((error) => {
				this.instance.log('error', `Error creating record: ${error instanceof Error ? error.message : String(error)}`)
			})
	}

	public getRecords = async (): Promise<any> => {
		if (!this.airtable) {
			this.instance.log('error', 'Unable to connect to Airtable')
			return
		}
		const base: Base = this.airtable.base(this.instance.config.baseId)
		const table = base.table('Table 1')

		return table
			.select()
			.all()
			.then((records) => {
				console.log('Retrieved records')
				console.log('debug', `Retrieved ${records.length} records`)
				records.forEach((record) => {
					console.log(`Record ID: ${record.id}, Fields: ${JSON.stringify(record.fields)}`)
				})
				// Optionally, you can return the records or process them further
				//console.log(records)
				return records
			})
			.catch((error) => {
				this.instance.log(
					'error',
					`Error retrieving records: ${error instanceof Error ? error.message : String(error)}`,
				)
			})
	}

	checkConnection(): boolean {
		if (this.airtable) {
			return true
		} else {
			this.instance.log('error', 'Airtable instance not initialized')
			return false
		}
	}
}
