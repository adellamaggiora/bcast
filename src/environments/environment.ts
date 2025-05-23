// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const supabaseProjectId = 'olsjmghqbfsiwkymryeh'

export const environment = {
  production: false,
  authKey: `sb-${supabaseProjectId}-auth-token`,
  supabaseUrl: `https://${supabaseProjectId}.supabase.co`,
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sc2ptZ2hxYmZzaXdreW1yeWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzkzNjYsImV4cCI6MjA2MzUxNTM2Nn0.iuIi2corzpHFnc-j0M9cwnWkws_llK5St47Tt5cnaMY'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
