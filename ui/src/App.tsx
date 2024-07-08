import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <p>Hello</p>
    </ThemeProvider>
  );
}

export default App;
