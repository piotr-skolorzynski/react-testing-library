import Cards from './components/Cards/Cards';
import cats from "./mocks/cats.json";

function App() {
  return (
    <Cards cats={cats} />
  );
}

export default App;
