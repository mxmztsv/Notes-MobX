import {makeAutoObservable} from "mobx";

class Notes {
	notesList = [];
	draft = {
		title: "",
		text: ""
	};

	constructor() {
		makeAutoObservable(this);
	};

	saveNewNote() {
		let newNote = {
			title: this.draft.title,
			text: this.draft.text,
			id: Math.floor(Math.random() * (9999 - 1 + 1) + 1),
			createdAt: new Date()
		};
		console.log('new note: ', newNote);
		this.notesList.push(newNote);
	};

	updateDraftTitle(text) {
		this.draft.title = text;
	};

	updateDraftText(text) {
		this.draft.text = text;
	};

	removeNote(id) {
		this.notesList = this.notesList.filter(note => note.id !== id);
	};

	loadNotesFromServer() {
		fetch('https://636d4aff91576e19e3252902.mockapi.io/api/v1/notes')
			.then((response) => response.json())
			.then((json) => {
				console.log(json)
				this.notesList = [...this.notesList, ...json];
			});
	};

	get totalNotesLength() {
		let count = 0;
		if (this.notesList.length) {
			for (let i in this.notesList) {
				count += this.notesList[i].text.length
			};
		};
		return count
	};

};

export default new Notes();
