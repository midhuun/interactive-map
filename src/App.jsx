import './App.css';
import SimpleMap from './components/NetworkMap';
function App() {
  return (
    <>
      <div className="w-full bg-black text-white py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-tight mb-6">
            Interactive Data Usage Map
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Explore global data usage trends interactively. Click on any region to see detailed
            usage statistics. Stay informed about network usage across the world in real time.
          </p>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <SimpleMap />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
