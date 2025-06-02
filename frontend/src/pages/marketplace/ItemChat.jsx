import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowBack, Send, Person, Message } from '@mui/icons-material';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  TextField,
  InputAdornment,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';

const MessageBubble = styled(Paper)(({ theme, sender }) => ({
  maxWidth: '70%',
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  borderRadius: sender === 'buyer' 
    ? '18px 18px 4px 18px' 
    : '18px 18px 18px 4px',
  backgroundColor: sender === 'buyer' 
    ? theme.palette.primary.main 
    : theme.palette.grey[100],
  color: sender === 'buyer' ? '#fff' : theme.palette.text.primary,
  alignSelf: sender === 'buyer' ? 'flex-end' : 'flex-start',
}));

const ItemChat = () => {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello, is this item still available?',
      sender: 'buyer',
      time: '10:30 AM'
    },
    {
      id: 2,
      text: 'Yes, it is available. Are you interested?',
      sender: 'seller',
      time: '10:32 AM'
    },
    {
      id: 3,
      text: 'Yes, can you share more details about the condition?',
      sender: 'buyer',
      time: '10:33 AM'
    }
  ]);

  // Mock item data
  const item = {
    id: id,
    title: 'Tactical Backpack',
    price: '₹2500',
    seller: 'Maj. Singh'
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'buyer',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <Box sx={{ maxWidth: 'md', mx: 'auto', p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => window.history.back()} color="primary">
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" component="h1" sx={{ ml: 1, fontWeight: 'bold' }}>
          Chat with Seller
        </Typography>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'medium' }}>
                {item.title}
              </Typography>
              <Typography variant="body1" color="primary" sx={{ fontWeight: 'medium' }}>
                {item.price}
              </Typography>
            </Box>
            <Chip
              avatar={<Avatar><Person /></Avatar>}
              label={item.seller}
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          <List sx={{ width: '100%' }}>
            {messages.map((msg) => (
              <ListItem key={msg.id} sx={{ 
                display: 'flex', 
                justifyContent: msg.sender === 'buyer' ? 'flex-end' : 'flex-start',
                px: 0,
                py: 0.5
              }}>
                <MessageBubble sender={msg.sender} elevation={2}>
                  <Typography variant="body1">{msg.text}</Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      display: 'block',
                      mt: 0.5,
                      color: msg.sender === 'buyer' ? 'primary.light' : 'text.secondary'
                    }}
                  >
                    {msg.time}
                  </Typography>
                </MessageBubble>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider />
        <Box component="form" onSubmit={handleSendMessage} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      type="submit" 
                      color="primary"
                      disabled={!message.trim()}
                    >
                      <Send />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </Card>

      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
        For your safety, keep all communications within the platform
      </Typography>
    </Box>
  );
};

export default ItemChat;