## Airtable API

### Getting Started

- Under the Airtable account you wish to add, navigate to airtable.com/create/tokens
- Create a new "Personal access token"
- For "Scopes", add the following:
  - data.records:read
  - data.recordComments:read
  - schema.bases:read
- For "Access", select "Add all resources", unless you have a reason to limit access to particular base
- Click "Create Token"
- Paste your token into the module setting "API Key" field
- Open the Base you want to control, and click the Help button and navigate to "API Documentation"
- On the API page, there should be a line that says "The ID of this base is appXXXXXXX." Copy this value and paste it in the base "Base ID" field.
