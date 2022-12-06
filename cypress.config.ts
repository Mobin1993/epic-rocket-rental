import { defineConfig } from 'cypress'

export default defineConfig({

	e2e: {
		env: {
			// This is the project ID from the Cypress Dashboard
			// https://dashboard.cypress.io/projects/4g6oks/settings
			// It is used to record test results
			CYPRESS_RECORD_KEY: '9b672414-e3bc-410a-9af6-6e1a2853f5a5',
			projectId: '4g6oks',
		},
		setupNodeEvents: (on, config) => {
			const isDev = config.watchForFileChanges
			const port = process.env.PORT ?? (isDev ? '3000' : '8811')
			const configOverrides: Partial<Cypress.PluginConfigOptions> = {
				baseUrl: `http://localhost:${port}`,
				video: !process.env.CI,
				screenshotOnRunFailure: !process.env.CI,
			}

			// To use this:
			// cy.task('log', whateverYouWantInTheTerminal)
			on('task', {
				log: message => {
					console.log(message)

					return null
				},
			})

			return { ...config, ...configOverrides }
		},
	},
})
