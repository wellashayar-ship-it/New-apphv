import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.freedomprotocol.mentor',
  appName: 'Mentor: Freedom Protocol',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
