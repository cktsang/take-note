export const getAllNotes = (req, res) => {
  res.status(200).json({ message: "You just fetched the notes" });
};

export const createNote = (req, res) => {
  res.status(201).json({ message: "Note created succesfully" });
};

export const updateNote = (req, res) => {
  res.status(201).json({ message: "Note updated succesfully" });
};

export const deleteNote = (req, res) => {
  res.status(201).json({ message: "Note deleted succesfully" });
};
