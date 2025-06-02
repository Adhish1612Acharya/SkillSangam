// src/pages/admin/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { 
  Business, 
  People, 
  Description, 
  Add, 
  ArrowForward,
  Search,
  GroupAdd,
  Edit,
  Delete
} from '@mui/icons-material';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Grid,
  Chip,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DepartmentModal from './components/DepartmentModal';
import AssignOfficerModal from './components/AssignOfficerModal';
import ConfirmationDialog from './components/ConfirmationDialog';

// Mock API service
const mockApi = {
  getDepartments: () => new Promise(resolve => {
    setTimeout(() => resolve({
      data: [
        {
          id: 1,
          name: 'Defense Benefits',
          description: 'Handles all benefit schemes for serving personnel',
          officers: 5,
          schemes: 12,
          created: '2023-01-15',
          officerList: [
            { id: 1, name: 'Col. Rajesh Verma', email: 'rajesh.verma@mod.gov.in' },
            { id: 2, name: 'Maj. Priya Sharma', email: 'priya.sharma@mod.gov.in' }
          ]
        },
        {
          id: 2,
          name: 'Veteran Affairs',
          description: 'Schemes and support for retired personnel',
          officers: 3,
          schemes: 8,
          created: '2023-02-20',
          officerList: [
            { id: 3, name: 'Capt. Arun Singh', email: 'arun.singh@mod.gov.in' }
          ]
        },
        {
          id: 3,
          name: 'Family Welfare',
          description: 'Support programs for families of personnel',
          officers: 4,
          schemes: 6,
          created: '2023-03-10',
          officerList: [
            { id: 4, name: 'Lt. Neha Patel', email: 'neha.patel@mod.gov.in' }
          ]
        }
      ]
    }), 500);
  }),
  createDepartment: (data) => new Promise(resolve => {
    setTimeout(() => resolve({ 
      data: { ...data, id: Math.floor(Math.random() * 1000), officers: 0, schemes: 0, officerList: [] }
    }), 800);
  }),
  updateDepartment: (id, data) => new Promise(resolve => {
    setTimeout(() => resolve({ data }), 800);
  }),
  deleteDepartment: (id) => new Promise(resolve => {
    setTimeout(() => resolve({ success: true }), 600);
  }),
  assignOfficer: (deptId, officerId) => new Promise(resolve => {
    setTimeout(() => resolve({ success: true }), 700);
  }),
  getAvailableOfficers: () => new Promise(resolve => {
    setTimeout(() => resolve({
      data: [
        { id: 1, name: 'Col. Rajesh Verma', email: 'rajesh.verma@mod.gov.in' },
        { id: 2, name: 'Maj. Priya Sharma', email: 'priya.sharma@mod.gov.in' },
        { id: 3, name: 'Capt. Arun Singh', email: 'arun.singh@mod.gov.in' },
        { id: 4, name: 'Lt. Neha Patel', email: 'neha.patel@mod.gov.in' },
        { id: 5, name: 'Maj. Gen. Amit Kumar', email: 'amit.kumar@mod.gov.in' },
        { id: 6, name: 'Col. Nisha Reddy', email: 'nisha.reddy@mod.gov.in' }
      ]
    }), 500);
  })
};

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6]
  }
}));

const AdminDashboard = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeptModal, setShowDeptModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deptToDelete, setDeptToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await mockApi.getDepartments();
      setDepartments(response.data);
    } catch (error) {
      showSnackbar('Failed to load departments', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDepartment = async (data) => {
    try {
      const response = await mockApi.createDepartment(data);
      setDepartments(prev => [...prev, response.data]);
      showSnackbar('Department created successfully!', 'success');
    } catch (error) {
      showSnackbar('Failed to create department', 'error');
    }
  };

  const handleUpdateDepartment = async (data) => {
    try {
      await mockApi.updateDepartment(data.id, data);
      setDepartments(prev => 
        prev.map(dept => dept.id === data.id ? { ...dept, ...data } : dept)
      );
      showSnackbar('Department updated successfully!', 'success');
    } catch (error) {
      showSnackbar('Failed to update department', 'error');
    }
  };

  const handleDeleteDepartment = async () => {
    try {
      await mockApi.deleteDepartment(deptToDelete);
      setDepartments(prev => prev.filter(dept => dept.id !== deptToDelete));
      showSnackbar('Department deleted successfully!', 'success');
    } catch (error) {
      showSnackbar('Failed to delete department', 'error');
    } finally {
      setShowDeleteDialog(false);
    }
  };

  const handleAssignOfficer = async (deptId, officerId) => {
    try {
      await mockApi.assignOfficer(deptId, officerId);
      // In a real app, we would update the specific department's officer list
      await fetchDepartments();
      showSnackbar('Officer assigned successfully!', 'success');
    } catch (error) {
      showSnackbar('Failed to assign officer', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const filteredDepts = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalOfficers = departments.reduce((sum, dept) => sum + dept.officers, 0);
  const totalSchemes = departments.reduce((sum, dept) => sum + dept.schemes, 0);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4
      }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Department Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => {
            setEditData(null);
            setShowDeptModal(true);
          }}
          sx={{ textTransform: 'none' }}
        >
          New Department
        </Button>
      </Box>

      {/* Search */}
      <Card sx={{ mb: 3, p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search departments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Card>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    Total Departments
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {departments.length}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                  <Business />
                </Avatar>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    Total Officers
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {totalOfficers}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.light', color: 'success.main' }}>
                  <People />
                </Avatar>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    Active Schemes
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {totalSchemes}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'secondary.light', color: 'secondary.main' }}>
                  <Description />
                </Avatar>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Departments List */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredDepts.length > 0 ? (
            filteredDepts.map(dept => (
              <Grid item xs={12} sm={6} md={4} key={dept.id}>
                <StyledCard>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <Business />
                      </Avatar>
                    }
                    action={
                      <>
                        <IconButton 
                          onClick={() => {
                            setEditData(dept);
                            setShowDeptModal(true);
                          }}
                        >
                          <Edit color="primary" />
                        </IconButton>
                        <IconButton 
                          onClick={() => {
                            setDeptToDelete(dept.id);
                            setShowDeleteDialog(true);
                          }}
                        >
                          <Delete color="error" />
                        </IconButton>
                      </>
                    }
                    title={
                      <Typography variant="h6" fontWeight="bold">
                        {dept.name}
                      </Typography>
                    }
                    subheader={
                      <Typography variant="body2" color="text.secondary">
                        {new Date(dept.created).toLocaleDateString()}
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {dept.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip 
                        label={`${dept.schemes} schemes`} 
                        size="small" 
                        color="info" 
                        variant="outlined" 
                      />
                      <Chip 
                        label={`${dept.officers} officers`} 
                        size="small" 
                        color="success" 
                        variant="outlined" 
                      />
                    </Box>

                    {dept.officerList.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" color="text.secondary">
                          Assigned Officers:
                        </Typography>
                        <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {dept.officerList.map(officer => (
                            <Chip
                              key={officer.id}
                              label={officer.name}
                              size="small"
                              avatar={<Avatar>{officer.name.charAt(0)}</Avatar>}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}

                    <Button
                      fullWidth
                      variant="outlined"
                      color="primary"
                      endIcon={<GroupAdd />}
                      onClick={() => {
                        setSelectedDept(dept);
                        setShowAssignModal(true);
                      }}
                      sx={{ mt: 1 }}
                    >
                      Manage Officers
                    </Button>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Card sx={{ textAlign: 'center', p: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  {searchTerm ? 'No departments match your search' : 'No departments found'}
                </Typography>
              </Card>
            </Grid>
          )}
        </Grid>
      )}

      {/* Modals */}
      <DepartmentModal
        open={showDeptModal}
        onClose={() => setShowDeptModal(false)}
        onSubmit={editData ? handleUpdateDepartment : handleCreateDepartment}
        initialData={editData}
      />
      
      <AssignOfficerModal
        open={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        department={selectedDept}
        onAssign={handleAssignOfficer}
      />
      
      <ConfirmationDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteDepartment}
        title="Delete Department"
        message="Are you sure you want to delete this department? This action cannot be undone."
      />
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminDashboard;