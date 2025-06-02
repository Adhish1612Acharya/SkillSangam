import { 
  useState,
  useEffect 
} from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader, 
  Avatar, 
  Button, 
  TextField, 
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  Alert,
  CircularProgress,
  useTheme
} from '@mui/material';
import { 
  Search, 
  FilterList, 
  Description, 
  Security, 
  MedicalServices, 
  Home, 
  MenuBook, 
  Work 
} from '@mui/icons-material';

const AISmartSearch = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    rank: 'all',
    status: 'all'
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const sampleQuestions = [
    'Education Grant Application Process',
    'Pension Documents Checklist',
    'Housing Loan Subsidy - Eligibility',
    'Healthcare benefits for veterans'
  ];

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate API call
      const timer = setTimeout(() => {
        setSearchResults([
          {
            id: 1,
            title: 'Education Grant Application Process',
            type: 'scheme',
            category: 'education',
            rank: 'all',
            status: 'serving',
            excerpt: 'Step-by-step guide to apply for education grant for your children'
          },
          {
            id: 2,
            title: 'Pension Documents Checklist',
            type: 'article',
            category: 'pension',
            rank: 'all',
            status: 'retired',
            excerpt: 'List of required documents for pension processing'
          },
          {
            id: 3,
            title: 'Housing Loan Subsidy - Eligibility',
            type: 'scheme',
            category: 'housing',
            rank: 'havaldar',
            status: 'serving',
            excerpt: 'Details about housing loan subsidy for serving personnel'
          }
        ].filter(result => {
          const matchesSearch = result.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              result.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesCategory = filters.category === 'all' || result.category === filters.category;
          const matchesRank = filters.rank === 'all' || result.rank === filters.rank || result.rank === 'all';
          const matchesStatus = filters.status === 'all' || result.status === filters.status;
          
          return matchesSearch && matchesCategory && matchesRank && matchesStatus;
        }));
        setIsSearching(false);
      }, 800);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, filters]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'education': return <MenuBook color="primary" />;
      case 'health': return <MedicalServices color="error" />;
      case 'housing': return <Home color="success" />;
      case 'pension': return <Security color="warning" />;
      case 'employment': return <Work color="info" />;
      default: return <Description color="action" />;
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSampleQuestion = (question) => {
    setSearchQuery(question);
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
          <Search />
        </Avatar>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Smart Search
        </Typography>
      </Box>

      <Typography variant="body1" color="text.secondary" mb={4}>
        Find answers across schemes, documents, and resources using AI-powered search
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for schemes, documents, or information..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  label="Category"
                  startAdornment={
                    <InputAdornment position="start">
                      <FilterList />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="education">Education</MenuItem>
                  <MenuItem value="health">Health</MenuItem>
                  <MenuItem value="housing">Housing</MenuItem>
                  <MenuItem value="pension">Pension</MenuItem>
                  <MenuItem value="employment">Employment</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Rank</InputLabel>
                <Select
                  value={filters.rank}
                  onChange={(e) => handleFilterChange('rank', e.target.value)}
                  label="Rank"
                  startAdornment={
                    <InputAdornment position="start">
                      <FilterList />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="all">All Ranks</MenuItem>
                  <MenuItem value="sepoy">Sepoy</MenuItem>
                  <MenuItem value="naik">Naik</MenuItem>
                  <MenuItem value="havaldar">Havaldar</MenuItem>
                  <MenuItem value="subedar">Subedar</MenuItem>
                  <MenuItem value="officer">Officer</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  label="Status"
                  startAdornment={
                    <InputAdornment position="start">
                      <FilterList />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="serving">Serving</MenuItem>
                  <MenuItem value="retired">Retired</MenuItem>
                  <MenuItem value="veteran">Veteran</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {searchQuery && (
        <Box>
          <Typography variant="h5" component="h2" fontWeight="bold" mb={3}>
            {searchResults.length} Results for "{searchQuery}"
          </Typography>

          {isSearching ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress />
            </Box>
          ) : searchResults.length > 0 ? (
            <Grid container spacing={3}>
              {searchResults.map(result => (
                <Grid item xs={12} key={result.id}>
                  <Card sx={{ transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 6 } }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                        <Avatar sx={{ bgcolor: 'grey.100', mt: 1 }}>
                          {getCategoryIcon(result.category)}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" component="h3" mb={1}>
                            {result.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" mb={2}>
                            {result.excerpt}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Chip 
                              label={result.category} 
                              size="small" 
                              variant="outlined"
                            />
                            <Chip 
                              label={result.rank === 'all' ? 'All ranks' : result.rank} 
                              size="small" 
                              variant="outlined"
                            />
                            <Chip 
                              label={result.status} 
                              size="small" 
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                        <Button variant="contained" size="small">
                          View
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Card sx={{ textAlign: 'center', py: 8 }}>
              <CardContent>
                <Search sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" mb={1}>
                  No results found
                </Typography>
                <Typography variant="body2" color="text.disabled">
                  Try different keywords or adjust your filters
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      )}

      {!searchQuery && (
        <Card sx={{ textAlign: 'center', py: 8 }}>
          <CardContent>
            <Search sx={{ fontSize: 60, color: 'text.disabled', mb: 3 }} />
            <Typography variant="h5" component="h2" mb={2}>
              What are you looking for?
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Search across all schemes, documents, and resources using keywords or filters
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              {sampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  onClick={() => handleSampleQuestion(question)}
                  sx={{ textTransform: 'none' }}
                >
                  {question}
                </Button>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default AISmartSearch;