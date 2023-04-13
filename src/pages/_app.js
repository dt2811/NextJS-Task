import '@/styles/globals.css'
import { ApolloProvider } from "@apollo/client";
import client from '../../apollo-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomHead from '@/components/Head'
import CustomNavbar from '@/components/Navbar'
function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <CustomHead />
      <CustomNavbar />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default App;