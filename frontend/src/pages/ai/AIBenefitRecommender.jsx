import { useState, useEffect, useRef } from "react";
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  Divider,
  Alert,
  useTheme,
  CircularProgress,
} from "@mui/material";
import {
  Stars,
  AutoAwesome,
  CheckCircle,
  Warning,
  School,
  HomeWork,
  HealthAndSafety,
  Person,
  Search as SearchIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
} from "@mui/icons-material";

const AIBenefitRecommender = () => {
  const theme = useTheme();
  const recognitionRef = useRef(null);
  const [serviceDetails, setServiceDetails] = useState({
    status: "serving",
    rank: "havaldar",
    yearsOfService: 8,
    familyMembers: 2,
    children: 1,
    disabilities: "none",
  });

  const [recommendedSchemes, setRecommendedSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [speechError, setSpeechError] = useState(null);
  const [isBrowserSupported, setIsBrowserSupported] = useState(true);

  useEffect(() => {
    // Initialize speech recognition
    if (!("webkitSpeechRecognition" in window)) {
      setSpeechError("Your browser doesn't support speech recognition");
      setIsBrowserSupported(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setSpeechError(null);
    };

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTranscript(transcript);
    };

    recognitionRef.current.onerror = (event) => {
      setIsListening(false);
      setSpeechError(`Error occurred in recognition: ${event.error}`);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (transcript) {
      setQuery(transcript);
    }
  }, [transcript]);

  const startListening = () => {
    try {
      setTranscript("");
      setSpeechError(null);
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (err) {
      setSpeechError("Could not start microphone. Please check permissions.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSearch = () => {
    console.log("Searching for:", query);
    // Implement your search functionality here
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    // Simulate API call for recommended schemes
    const timer = setTimeout(() => {
      setRecommendedSchemes([
        {
          id: 1,
          name: "Education Grant for Children",
          match: 95,
          description:
            "Financial assistance for education of soldiers children up to ₹50,000 per child annually",
          reason: "Matches your profile: Serving personnel with children",
          icon: <School color="primary" />,
          category: "education",
        },
        {
          id: 2,
          name: "Housing Loan Subsidy",
          match: 85,
          description:
            "Interest subsidy on home loans for serving personnel with minimum 5 years service",
          reason: "You qualify with 8 years of service",
          icon: <HomeWork color="primary" />,
          category: "housing",
        },
        {
          id: 3,
          name: "Family Health Care Plan",
          match: 75,
          description: "Comprehensive healthcare coverage for family members",
          reason: "You have 2 family members eligible for coverage",
          icon: <HealthAndSafety color="primary" />,
          category: "health",
        },
      ]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [serviceDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsLoading(true);
  };

  const getMatchColor = (match) => {
    if (match > 90) return "success";
    if (match > 75) return "primary";
    return "warning";
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
          <AutoAwesome />
        </Avatar>
        <Typography variant="h4" component="h1" fontWeight="bold">
          AI Benefit Recommender
        </Typography>
      </Box>

      <Typography variant="body1" color="text.secondary" mb={4}>
        Get personalized scheme recommendations based on your service profile
        and family details.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title="Ask About Benefits"
              avatar={
                <Avatar sx={{ bgcolor: "info.main" }}>
                  <AutoAwesome />
                </Avatar>
              }
            />
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask about benefits, schemes, eligibility..."
                    onKeyDown={handleKeyDown}
                    sx={{ flexGrow: 1 }}
                    fullWidth
                  />
                  <Button
                    onClick={handleSearch}
                    disabled={!query.trim()}
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: "auto" }}
                  >
                    <SearchIcon />
                  </Button>
                  {isBrowserSupported && (
                    <Button
                      onClick={toggleListening}
                      variant={isListening ? "contained" : "outlined"}
                      color={isListening ? "error" : "primary"}
                      sx={{ minWidth: "auto" }}
                    >
                      {isListening ? <MicOffIcon /> : <MicIcon />}
                    </Button>
                  )}
                </Box>

                {isListening && (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Chip
                      icon={
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            bgcolor: "error.main",
                            animation: "pulse 1.5s infinite",
                            "@keyframes pulse": {
                              "0%": { opacity: 1 },
                              "50%": { opacity: 0.5 },
                              "100%": { opacity: 1 },
                            },
                          }}
                        />
                      }
                      label="Listening..."
                      sx={{ bgcolor: "primary.light", color: "primary.dark" }}
                    />
                  </Box>
                )}

                {speechError && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {speechError}
                  </Alert>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Alert
              severity="info"
              icon={<Stars />}
              sx={{
                backgroundColor: theme.palette.info.light,
                color: theme.palette.info.dark,
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                AI-Powered Recommendations
              </Typography>
              <Typography variant="body2">
                These schemes are personalized for you based on your service
                profile and family details.
              </Typography>
            </Alert>

            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress />
              </Box>
            ) : (
              recommendedSchemes.map((scheme) => (
                <Card
                  key={scheme.id}
                  sx={{
                    transition: "box-shadow 0.3s",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs="auto">
                        <Avatar sx={{ bgcolor: `${scheme.category}.light` }}>
                          {scheme.icon}
                        </Avatar>
                      </Grid>
                      <Grid item xs>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <Typography
                            variant="h6"
                            component="h3"
                            sx={{ mr: 2 }}
                          >
                            {scheme.name}
                          </Typography>
                          <Chip
                            label={`${scheme.match}% match`}
                            color={getMatchColor(scheme.match)}
                            size="small"
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paragraph
                        >
                          {scheme.description}
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <AutoAwesome fontSize="small" color="primary" />
                          <Typography variant="caption" color="primary">
                            {scheme.reason}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs="auto">
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          <Button variant="contained" size="small">
                            View Details
                          </Button>
                          <Button variant="text" size="small" color="primary">
                            Save for later
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))
            )}

            <Alert
              severity="warning"
              icon={<Warning />}
              sx={{
                backgroundColor: theme.palette.warning.light,
                color: theme.palette.warning.dark,
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                Improve Recommendations
              </Typography>
              <Typography variant="body2">
                Update your profile details for more accurate suggestions. The
                AI learns as you provide more information.
              </Typography>
            </Alert>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AIBenefitRecommender;
