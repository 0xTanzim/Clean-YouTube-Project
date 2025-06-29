import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { isValidPlaylistId, parsePlaylistId } from '../../lib/utils';
import type { PlayListFormProps } from '../../types';

const PlayListForm = ({
  open,
  handleClose,
  handleSubmit,
}: PlayListFormProps) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleFormSubmit = () => {
    if (!input.trim()) {
      setError('Please enter a valid URL or ID.');
      return;
    }

    const playlistId = parsePlaylistId(input.trim());

    if (!playlistId || !isValidPlaylistId(playlistId)) {
      setError('Please enter a valid YouTube playlist URL or ID.');
      return;
    }

    handleSubmit(playlistId);
    setInput('');
    setError('');
    handleClose();
  };

  const handleDialogClose = () => {
    setInput('');
    setError('');
    handleClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleFormSubmit();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="add-playlist-dialog-title"
    >
      <DialogTitle id="add-playlist-dialog-title">Add Playlist</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a new playlist, please enter the playlist URL or ID below.
          Please make sure the URL is correct. Otherwise, it will not work.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="playlist-input"
          label="Playlist URL or ID"
          type="text"
          fullWidth
          variant="outlined"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          error={!!error}
          helperText={error}
          placeholder="https://www.youtube.com/playlist?list=... or PLrAXtmRdnE..."
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleDialogClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleFormSubmit}
          variant="contained"
          color="primary"
          disabled={!input.trim()}
        >
          Add Playlist
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlayListForm;
