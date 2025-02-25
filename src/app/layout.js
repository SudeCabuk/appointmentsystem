import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";

export default function RootLayout({ children }) {
  return (
    <PrimeReactProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </PrimeReactProvider>
  );
}
