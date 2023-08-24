import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'bcast',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
	Keyboard: {
		resize: KeyboardResize.Native,
		resizeOnFullScreen: true,
		style: KeyboardStyle.Default 
	}
  }
};

export default config;