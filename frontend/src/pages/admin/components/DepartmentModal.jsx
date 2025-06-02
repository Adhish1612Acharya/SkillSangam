import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  CircularProgress,
  Typography
} from '@mui/material';
import { Close, CheckCircle } from '@mui/icons-material';

const DepartmentModal = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        ...formData,
        ...(initialData ? { id: initialData.id } : {})
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
        setFormData({ name: '', description: '' });
      }, 1500);
    } catch (error) {
      // Error handling would be done in the parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <Dialog open={open} onClose={onClose}>
        <Box sx={{ textAlign: 'center', p: 4, minWidth: 300 }}>
          <CheckCircle color="success" sx={{ fontSize: 60, mb: 2 }} />
          <DialogTitle>
            {initialData ? 'Department Updated!' : 'Department Created!'}
          </DialogTitle>
          <DialogContent>
            <Typography>
              {initialData 
                ? 'The department has been successfully updated.' 
                : 'The new department has been successfully created.'}
            </Typography>
          </DialogContent>
        </Box>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {initialData ? 'Edit Department' : 'Create New Department'}
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Department Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {initialData ? 'Update Department' : 'Create Department'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DepartmentModal;