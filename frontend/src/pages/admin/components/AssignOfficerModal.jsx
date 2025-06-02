// src/pages/admin/components/AssignOfficerModal.jsx
import { useState, useEffect } from 'react';
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
  Autocomplete,
  Avatar,
  Chip,
  Divider,
  Typography
} from '@mui/material';
import { Close, CheckCircle, PersonAdd } from '@mui/icons-material';

const AssignOfficerModal = ({ open, onClose, department, onAssign }) => {
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [availableOfficers, setAvailableOfficers] = useState([]);
  const [loadingOfficers, setLoadingOfficers] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      fetchAvailableOfficers();
    }
  }, [open]);

  const fetchAvailableOfficers = async () => {
    try {
      setLoadingOfficers(true);
      // In a real app, this would be an API call
      const mockApiResponse = {
        data: [
          { id: 1, name: 'Col. Rajesh Verma', email: 'rajesh.verma@mod.gov.in' },
          { id: 2, name: 'Maj. Priya Sharma', email: 'priya.sharma@mod.gov.in' },
          { id: 3, name: 'Capt. Arun Singh', email: 'arun.singh@mod.gov.in' },
          { id: 4, name: 'Lt. Neha Patel', email: 'neha.patel@mod.gov.in' },
          { id: 5, name: 'Maj. Gen. Amit Kumar', email: 'amit.kumar@mod.gov.in' },
          { id: 6, name: 'Col. Nisha Reddy', email: 'nisha.reddy@mod.gov.in' }
        ]
      };
      setAvailableOfficers(mockApiResponse.data);
    } catch (error) {
      console.error('Failed to fetch officers', error);
    } finally {
      setLoadingOfficers(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOfficer || !department) return;
    
    setIsSubmitting(true);
    
    try {
      await onAssign(department.id, selectedOfficer.id);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
        setSelectedOfficer(null);
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
          <DialogTitle>Officer Assigned!</DialogTitle>
          <DialogContent>
            <Typography>
              {selectedOfficer?.name} has been assigned to {department?.name}.
            </Typography>
          </DialogContent>
        </Box>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Assign Officer to {department?.name}
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Autocomplete
            options={availableOfficers}
            loading={loadingOfficers}
            getOptionLabel={(option) => `${option.name} (${option.email})`}
            value={selectedOfficer}
            onChange={(_, newValue) => setSelectedOfficer(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Officer"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingOfficers ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar>{option.name.charAt(0)}</Avatar>
                <Box>
                  <Typography>{option.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{option.email}</Typography>
                </Box>
              </Box>
            )}
          />

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" gutterBottom>
            Department Information
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {department?.description}
          </Typography>

          {department?.officerList && department.officerList.length > 0 && (
            <>
              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                Current Officers
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {department.officerList.map(officer => (
                  <Chip
                    key={officer.id}
                    label={officer.name}
                    avatar={<Avatar>{officer.name.charAt(0)}</Avatar>}
                  />
                ))}
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting || !selectedOfficer}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : <PersonAdd />}
          >
            {isSubmitting ? 'Assigning...' : 'Assign Officer'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AssignOfficerModal;