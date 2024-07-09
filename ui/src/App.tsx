import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Dashboard, Governance } from "@/pages";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
function App() {
  const wallets = [new PetraWallet()];
  return (
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/governance" element={<Governance />} />
        </Routes>
      </Router>
    </ThemeProvider>
    </AptosWalletAdapterProvider>
  );
}

export default App;
