import { nanoid } from 'nanoid';
import { Lifecycle } from "@hapi/hapi";

let notes: Note[] = [];

export const CreateNoteHandler: Lifecycle.Method = (request, h) => {
  const { title, tags, body }: Note = request.payload as Note;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  notes.push({
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt
  });

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil di tambahkan',
      data: {
        noteId: id
      }
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal di tambahkan'
  });
  response.code(500)
  return response;
}

export const GetNotesHandler: Lifecycle.Method = (request, h) => {
  const response = h.response({
    status: 'success',
    data: {
      notes
    }
  });
  response.code(200);
  return response;
}

export const GetNoteHandler: Lifecycle.Method = (request, h) => {
  const { noteId } = request.params;
  const note = notes.filter((note) => note.id === noteId)[0];

  if (note !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        note
      }
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'not found',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
}

export const EditNoteHandler: Lifecycle.Method = (request, h) => {
  const { noteId } = request.params;
  const { title, tags, body }: Note = request.payload as Note;
  const updatedAt = new Date().toISOString();
  const idx = notes.findIndex((note) => note.id === noteId);

  if (idx !== -1) {
    notes[idx] = {
      ...notes[idx],
      title,
      tags,
      body,
      updatedAt
    }
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui'
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak di temukan'
  });
  response.code(404);
  return response;
}

export const DeleteNoteHandler: Lifecycle.Method = (request, h) => {
  const { noteId } = request.params;
  const idx = notes.findIndex((note) => note.id === noteId);

  if (idx !== -1) {
    notes.splice(idx, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil di hapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal di hapus. Id tidak di temukan'
  });
  response.code(404);
  return response;
}
