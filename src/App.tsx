import NoteDisplay from "./Components/NoteDisplay";

function App() {
  return <NoteDisplay onChange={(note) => console.log(note)} />;
}

export default App;
