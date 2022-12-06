import { AuthProvider } from "../src/contexts/AuthContext";
import { BoardProvider } from "../src/contexts/BoardContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <BoardProvider>
        <main>
          <Component {...pageProps} />
        </main>
      </BoardProvider>
    </AuthProvider>
  );
}

export default MyApp;
