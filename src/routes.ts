import { ServerRoute } from "@hapi/hapi";
import { CreateNoteHandler, GetNotesHandler, GetNoteHandler, EditNoteHandler, DeleteNoteHandler } from './handler';

export const routes: ServerRoute[] = [
   {
     method: 'POST',
     path: '/notes',
     handler: CreateNoteHandler
   },
   {
     method: 'GET',
     path: '/notes',
     handler: GetNotesHandler
   },
   {
     method: 'GET',
     path: '/notes/{noteId}',
     handler: GetNoteHandler
   },
   {
     method: 'PUT',
     path: '/notes/{noteId}',
     handler: EditNoteHandler
   },
   {
     method: 'DELETE',
     path: '/notes/{noteId}',
     handler: DeleteNoteHandler
   }
];
