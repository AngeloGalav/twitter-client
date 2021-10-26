

function App() {
  return (
    <div className="h-full">
      <div className="flex h-full gap-3 flex-col justify-center items-center">
      <h1 className="text-2xl">Hello Twitter!</h1>
      <button
      onClick={() => document.body.parentNode.getAttribute("data-theme") === "light" || !document.body.parentNode.getAttribute("data-theme")  ? document.body.parentNode.setAttribute("data-theme", "dark") : document.body.parentNode.setAttribute("data-theme", "light")} 
      className="btn">Cambia tema!</button> 

      </div>
      
    </div>
  );
}

export default App;
