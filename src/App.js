import './App.css';
import {observer} from "mobx-react-lite";
import notes from "./store/notes";
import {useEffect} from "react";

const App = observer(() => {

	useEffect(() => {
		notes.loadNotesFromServer();
	}, []);

	return (
		<div className="App">
			<div className="notes">
				<h2>Total notes length: {notes.totalNotesLength}</h2>
				{
					notes.notesList.map((note) => {
						return (
							<div className="note" key={note.id}>
								<h3>{note.title}</h3>
								<p>{note.text}</p>
								<button onClick={() => {
									notes.removeNote(note.id);
								}}>delete
								</button>
							</div>
						)
					})
				}
			</div>
			<div className="form">
				<h2>Add new note</h2>
				<input type="text" value={notes.draft.title} placeholder="title" onInput={(e) => {
					notes.updateDraftTitle(e.target.value);
				}}/>
				<textarea type="text" value={notes.draft.text} placeholder="text" onInput={(e) => {
					notes.updateDraftText(e.target.value);
				}}/>
				<button onClick={() => {
					notes.saveNewNote();
				}}>Save
				</button>
			</div>
		</div>
	);
});

export default App;
