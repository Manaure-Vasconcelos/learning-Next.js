"use client";
import { createContext, useContext, useState } from "react";

interface Children {
  children: React.ReactNode;
}

interface Note {
  title: string;
  content?: string;
}
/* Cria o contexto e anexa as funções adjuntas. */
export const NoteContext = createContext<{
  notes: Note[];
  loadNotes: () => Promise<void>;
  createNote: (note: Note) => Promise<void>;
}>({
  notes: [],
  loadNotes: async () => {},
  createNote: async (note: Note) => {},
});
/* Devolve o context ja instanciado */
export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
/*
- Funciona como uma class e seus métodos
- Exporta funções para usar em home
*/
export const NotesProvider = ({ children }: Children) => {
  const [notes, setNotes] = useState<any>([]);

  async function loadNotes() {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  }

  async function createNote(note: Note) {
    if (!note.title.trim() || !note.content?.trim()) 
      throw new Error("O título e o conteúdo da nota não podem estar vazios.");

    const res = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: { "Content-Type": "application/json" },
    });

    const newNote = await res.json();
    setNotes([...notes, newNote]);
  }

  return (
    <NoteContext.Provider value={{ notes, loadNotes, createNote }}>
      {children}
    </NoteContext.Provider>
  );
};
