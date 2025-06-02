import { useState, useEffect } from 'react';
import { 
  Send as SendIcon, 
  SmartToy as BotIcon, 
  Person as UserIcon, 
  AutoAwesome as SparklesIcon,
  ExpandLess,
  InfoOutlined
} from '@mui/icons-material';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  IconButton, 
  Button, 
  Chip,
  Avatar,
  Collapse,
  Tooltip,
  Fade,
  Grow,
  Slide
} from '@mui/material';
import { styled, keyframes } from '@mui/system';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const AnimatedCard = styled(Card)(({ theme }) => {
  // Fallback for MUI v6+ where theme.shadows is not an array
  const safeShadow = Array.isArray(theme.shadows) ? theme.shadows[6] : (theme.shadows?.lg || '0px 3px 6px rgba(0,0,0,0.1)');
  return {
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: safeShadow
    }
  };
});

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Sainik Sahayak AI assistant. How can I help you today?",
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [showWelcome, setShowWelcome] = useState(true);

  const sampleQuestions = [
    'How to apply for education grant?',
    'What documents are needed for pension?',
    'List benefits for retired personnel',
    'How to file a grievance?'
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setMessage('');

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(message),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('education grant')) {
      return 'To apply for education grant, go to Schemes section, select Education Grant, and submit the required documents including service certificate and admission proof.';
    } else if (lowerMessage.includes('pension') || lowerMessage.includes('documents')) {
      return 'For pension processing, you need: 1) Discharge book, 2) PPO copy, 3) Bank details, 4) Aadhaar card, and 5) Recent photograph.';
    } else if (lowerMessage.includes('benefit') || lowerMessage.includes('retired')) {
      return 'Retired personnel benefits include: 1) Pension, 2) ECHS medical facilities, 3) Canteen privileges, 4) Rail/air travel concessions, and 5) Re-employment assistance.';
    } else if (lowerMessage.includes('grievance')) {
      return 'To file a grievance: 1) Go to Grievance section, 2) Click "File Grievance", 3) Fill details, 4) Submit. You can track status in your dashboard.';
    } else {
      return 'I can help with information about schemes, benefits, grievances, and more. Please ask specific questions for best assistance.';
    }
  };

  const handleSampleQuestion = (question) => {
    setMessage(question);
  };

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', p: 2 }}>
      <Grow in={true} timeout={500}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
            <BotIcon fontSize="medium" />
          </Avatar>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            AI Assistant
          </Typography>
        </Box>
      </Grow>

      <Slide direction="up" in={true} timeout={800}>
        <AnimatedCard sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
            {showWelcome && (
              <Fade in={showWelcome} timeout={1000}>
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 4, 
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  mb: 2
                }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Welcome to Sainik Sahayak AI Assistant
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ask me anything about defense personnel benefits, schemes, or grievance procedures.
                  </Typography>
                </Box>
              </Fade>
            )}

            {messages.map((msg, index) => (
              <Fade key={msg.id} in={true} timeout={500}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    mb: 3,
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    animation: index === messages.length - 1 ? `${pulse} 0.5s ease` : 'none'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      maxWidth: '80%',
                      alignItems: 'flex-start',
                      gap: 1,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: msg.sender === 'user' ? 'primary.main' : 'grey.100',
                      color: msg.sender === 'user' ? 'common.white' : 'text.primary',
                      borderTopRightRadius: msg.sender === 'user' ? 0 : 6,
                      borderTopLeftRadius: msg.sender === 'bot' ? 0 : 6,
                      boxShadow: 1
                    }}
                  >
                    {msg.sender === 'bot' && (
                      <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                        <BotIcon fontSize="small" />
                      </Avatar>
                    )}
                    <Box>
                      <Typography variant="body1">{msg.text}</Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          display: 'block', 
                          mt: 0.5,
                          color: msg.sender === 'user' ? 'primary.light' : 'text.secondary'
                        }}
                      >
                        {msg.time}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Fade>
            ))}
          </CardContent>

          {messages.length === 1 && (
            <Collapse in={!showWelcome} timeout={1000}>
              <Box sx={{ px: 3, pb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                  <SparklesIcon fontSize="small" />
                  Try asking:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {sampleQuestions.map((question, index) => (
                    <Chip
                      key={index}
                      label={question}
                      onClick={() => handleSampleQuestion(question)}
                      sx={{ 
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: 'primary.light',
                          color: 'primary.contrastText'
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Collapse>
          )}

          <Box 
            component="form" 
            onSubmit={handleSendMessage}
            sx={{ 
              p: 2, 
              borderTop: '1px solid', 
              borderColor: 'divider',
              display: 'flex',
              gap: 1
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  bgcolor: 'background.paper'
                }
              }}
            />
            <IconButton 
              type="submit" 
              color="primary" 
              sx={{ 
                bgcolor: 'primary.main', 
                color: 'common.white',
                '&:hover': {
                  bgcolor: 'primary.dark'
                }
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </AnimatedCard>
      </Slide>

      <Fade in={true} timeout={1500}>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <InfoOutlined fontSize="small" sx={{ mr: 0.5 }} />
            AI assistant may occasionally generate incorrect information. Verify important details.
          </Typography>
        </Box>
      </Fade>
    </Box>
  );
};

export default Chatbot;