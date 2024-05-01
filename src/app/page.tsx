"use client";
import NoteForm from "@/components/NoteForm";
import { useEffect } from "react";
import { useNotes } from "@/context/NoteContext";

function HomePage() {
  /* const { notes, loadNotes } = useContext(NoteContext); */
  const { notes, loadNotes } = useNotes(); /* Importa o context */

  useEffect(() => {
    loadNotes(); /* Carrega os posts ao atualizar. Dentro de context */
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <NoteForm /> {/* Component */}
        {/* Faz um map em notes e exibe pro usuário */}
        {notes.map((note: any) => (
          <div key={note.id} className="bg-slate-400 p-4 my-2">
            <h1>{note.title}</h1>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
