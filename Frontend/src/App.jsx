import Login from "./pages/Login";
import EventDetails from "./pages/EventDetails";

function App() {
  return (
    <div>
      {/* <Login /> */}
      {/* Change the id to 1, 2, or 3 */}
      <EventDetails id={3} />  

    </div>
  );
}

export default App;
