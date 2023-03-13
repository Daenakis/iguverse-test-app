
import { SplashScreen, Stack } from 'expo-router';
export { ErrorBoundary } from 'expo-router';


export default function RootLayout() {
 

  return (
    <>
      {<RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
