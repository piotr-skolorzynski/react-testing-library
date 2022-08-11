import Card from './components/Card/Card';

const cardProps = {
    name: "Sydney",
    phone: "111-111-111", 
    email: "laith@hotmail.com", 
    image: {
        url: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        alt: "cute cat"
    },
    favoured: false
}

function App() {
  return (
    <div>
      <Card {...cardProps} />
    </div>
  );
}

export default App;
