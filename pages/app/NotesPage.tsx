
import React, { useState, useEffect } from 'react';
import { PencilSquareIcon } from '../../components/icons/PencilSquareIcon';
import { PlusIcon } from '../../components/icons/PlusIcon';
import { TrashIcon } from '../../components/icons/TrashIcon';
import type { Note } from '../../types';

interface NotesPageProps {
    notes: Note[];
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

export const NotesPage: React.FC<NotesPageProps> = ({ notes, setNotes }) => {
    const [selectedNoteId, setSelectedNoteId] = useState<number | null>(notes[0]?.id || null);
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

    useEffect(() => {
        const noteToEdit = notes.find(n => n.id === selectedNoteId);
        setEditingNote(noteToEdit || null);
    }, [selectedNoteId, notes]);

    const handleSelectNote = (id: number) => {
        const currentSelectedNote = notes.find(n => n.id === editingNote?.id);
        if (editingNote && currentSelectedNote && (currentSelectedNote.content !== editingNote.content || currentSelectedNote.title !== editingNote.title)) {
            if(window.confirm('You have unsaved changes. Do you want to discard them?')) {
                setSelectedNoteId(id);
            }
        } else {
            setSelectedNoteId(id);
        }
    }

    const handleAddNote = () => {
        const newNote: Note = {
            id: Date.now(),
            title: 'New Note',
            content: '',
            lastModified: 'Just now'
        };
        setNotes([newNote, ...notes]);
        setSelectedNoteId(newNote.id);
    };

    const handleDeleteNote = (id: number) => {
        setNotes(notes.filter(note => note.id !== id));
        if (selectedNoteId === id) {
            const remainingNotes = notes.filter(note => note.id !== id);
            setSelectedNoteId(remainingNotes[0]?.id || null);
        }
    };
    
    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (!editingNote) return;
        setEditingNote({ ...editingNote, [e.target.name]: e.target.value });
        setSaveStatus('idle');
    };

    const handleSaveNote = () => {
        if (!editingNote) return;
        setSaveStatus('saving');
        const updatedNote = { ...editingNote, lastModified: 'Just now' };
        setNotes(notes.map(n => n.id === editingNote.id ? updatedNote : n));
        setTimeout(() => {
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        }, 500);
    };

    return (
        <div className="flex h-[calc(100vh-10rem)] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            {/* Notes List */}
            <div className="w-72 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <PencilSquareIcon className="w-6 h-6 text-indigo-500"/>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">All Notes</h2>
                    </div>
                    <button onClick={handleAddNote} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <PlusIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                </div>
                <div className="overflow-y-auto">
                    {notes.map(note => (
                        <button 
                            key={note.id} 
                            onClick={() => handleSelectNote(note.id)}
                            className={`w-full text-left p-4 border-b dark:border-gray-700/50 group ${selectedNoteId === note.id ? 'bg-indigo-50 dark:bg-indigo-900/30' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
                        >
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-gray-800 dark:text-gray-100 truncate pr-2">{note.title}</h3>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleDeleteNote(note.id); }} 
                                    className="p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 flex-shrink-0"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                             <div className="flex items-center justify-between mt-1">
                                <p className="text-xs text-gray-500 dark:text-gray-400">{note.lastModified}</p>
                                {note.stockSymbol && <span className="text-xs font-semibold bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 px-2 py-0.5 rounded-full">{note.stockSymbol}</span>}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Note Editor */}
            <div className="flex-1 flex flex-col">
                {editingNote ? (
                    <>
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 flex justify-between items-center gap-4">
                            <input
                                name="title"
                                type="text"
                                value={editingNote.title}
                                onChange={handleNoteChange}
                                className="w-full text-xl font-bold bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder-gray-500"
                                placeholder="Note Title"
                            />
                            <div className="flex items-center gap-2">
                                 {saveStatus === 'saved' && <span className="text-sm text-green-600 dark:text-green-400">Saved!</span>}
                                <button onClick={handleSaveNote} disabled={saveStatus !== 'idle'} className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 transition-colors">
                                    {saveStatus === 'saving' ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </div>
                        <textarea
                            name="content"
                            value={editingNote.content}
                            onChange={handleNoteChange}
                            className="flex-1 w-full p-6 bg-transparent focus:outline-none text-gray-700 dark:text-gray-300 leading-relaxed resize-none"
                            placeholder="Start writing..."
                        />
                    </>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                        <PencilSquareIcon className="w-12 h-12 mb-4" />
                        <h3 className="text-lg font-semibold">Select a note to view or create a new one.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};
