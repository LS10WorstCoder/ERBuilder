import React, { useState } from 'react';
import './App.css';
import { Box } from '@mui/system';
import { Button, InputBase, Typography, Modal, TextField } from '@mui/material';
import { sendMessageToChatGPT, sendStatsToGPT } from './components/chatService';
import EldenRingLogo from './assets/theRing.png';

function App() {
    const [navbarDropdownOpen, setNavbarDropdownOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', content: "Hi, I'm the ERBuilder Bot, version 1.0.0. Either upload a picture of your current stats or ask me anything related to Elden Ring builds, and I will do my best to help!" },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);

    const [vigValue, setVigValue] = useState('');
    const [mindValue, setMindValue] = useState('');
    const [endValue, setEndValue] = useState('');
    const [strValue, setStrValue] = useState('');
    const [dexValue, setDexValue] = useState('');
    const [faithValue, setFaithValue] = useState('');
    const [intValue, setIntValue] = useState('');
    const [arcValue, setArcValue] = useState('');


    const handleSendMessage = async () => {
        if (inputValue.trim() === '') return;

        const userMessage = { role: 'user', content: inputValue };
        setMessages([...messages, userMessage]);

        try {
            const botResponse = await sendMessageToChatGPT(inputValue);
            const botMessage = { role: 'bot', content: botResponse };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error getting response:', error);
        }

        setInputValue('');
    };

    const [outputValue, setOutputValue] = useState('');

    const statProcessHandler = async () => {
        const prompt = `Here are the stats: 
            Vigor: ${vigValue}, 
            Mind: ${mindValue}, 
            Endurance: ${endValue}, 
            Strength: ${strValue}, 
            Dexterity: ${dexValue}, 
            Intelligence: ${intValue}, 
            Faith: ${faithValue}, 
            Arcane: ${arcValue}.`;

        try {
            const botResponse = await sendStatsToGPT(prompt);
            setOutputValue(botResponse);
        } catch (error) {
            console.error('Error getting response:', error);
            setOutputValue('Failed to get a response from the bot.');
        }
    };

    

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const modalStyle = {
        position: 'fixed',
        bottom: '70px',
        right: '20px',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        width: '80%',
        maxWidth: '400px',
        maxHeight: '60vh',
        overflowY: 'auto',
    };

    return (
        <div style={{
            width: '100vw',
            minHeight: '100vh',
            backgroundColor: '#1a1a1a',
            color: '#d4af37',
            backgroundImage: `url(${EldenRingLogo})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }}>
            <Box
                sx={{
                    width: '100vw',
                    backgroundColor: '#282828',
                    alignItems: 'center',
                    height: 75,
                    display: 'block',
                    overflow: 'hidden',
                    borderBottom: '2px solid #d4af37',
                }}
            >
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: 'Garamond, serif',
                            color: '#d4af37',
                            fontSize: { xs: 24, md: 36 },
                            padding: 2,
                            userSelect: 'none',
                        }}
                    >
                        ERBuilder
                    </Typography>

                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 4,
                            ml: 'auto',
                            padding: 2,
                            mr: 2,
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: 'Garamond, serif',
                                color: '#d4af37',
                                fontSize: 24,
                                cursor: 'pointer',
                            }}
                            onClick={() => window.open('https://github.com/LS10WorstCoder/ERBuilder', '_blank')}
                        >
                            GitHub
                        </Typography>
                    </Box>

                    <Typography
                        sx={{
                            fontSize: 30,
                            ml: 'auto',
                            padding: 2,
                            color: '#d4af37',
                            display: { xs: 'flex', md: 'none' },
                            cursor: 'pointer',
                            userSelect: 'none',
                        }}
                        onClick={() => setNavbarDropdownOpen(!navbarDropdownOpen)}
                    >
                        ☰
                    </Typography>
                </Box>

                <Box
                    sx={{
                        position: 'fixed',
                        top: 75,
                        width: '100vw',
                        backgroundColor: '#282828',
                        opacity: navbarDropdownOpen ? 1 : 0,
                        transition: 'all .25s ease-out',
                        padding: 2,
                        pt: 0,
                        alignItems: 'center',
                        justifyContent: 'left',
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: 'Garamond, serif',
                            color: '#d4af37',
                            fontSize: 24,
                            cursor: 'pointer',
                            mb: 1,
                        }}
                        onClick={() => window.open('https://github.com/LS10WorstCoder/ERBuilder', '_blank')}
                    >
                        GitHub
                    </Typography>

                </Box>
            </Box>
            
            <Box
                sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                }}
            >
                <Box  
                    sx={{
                        width: '1300px',
                        height: '450px',
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            padding: 4,
                            width: '200px',
                            transform: 'translate(-150px, 0px)'
                        }}
                    >
                        <h2>Input Your Stats:</h2>
                        <TextField label="Vigor" variant="outlined" size = "small" type="number"
                            value={vigValue} onChange={(e) => setVigValue(e.target.value)}
                            sx={{
                                width: "200px",
                                "& .MuiOutlinedInput-root": {
                                    color: "#ffd700",
                                    fontFamily: "Arial",
                                    fontWeight: "bold",
                                    // Class for the border around the input field
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#ffd700",
                                        borderWidth: "2px",
                                    }
                                },
                                "& .MuiInputLabel-outlined": {
                                    color: "#ffd700",
                                    fontWeight: "bold",
                                },
                            }}
                        />
                        <TextField label="Mind" variant="outlined" size = "small" type="number"
                            value={mindValue} onChange={(e) => setMindValue(e.target.value)}
                            sx={{
                                width: "200px",
                                "& .MuiOutlinedInput-root": {
                                    color: "#ffd700",
                                    fontFamily: "Arial",
                                    fontWeight: "bold",
                                    // Class for the border around the input field
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#ffd700",
                                        borderWidth: "2px",
                                    }
                                },
                                "& .MuiInputLabel-outlined": {
                                    color: "#ffd700",
                                    fontWeight: "bold",
                                },
                            }}
                        />
                        <TextField label="Endurance" variant="outlined" size = "small" type="number"
                            value={endValue} onChange={(e) => setEndValue(e.target.value)}
                            sx={{
                                width: "200px",
                                "& .MuiOutlinedInput-root": {
                                    color: "#ffd700",
                                    fontFamily: "Arial",
                                    fontWeight: "bold",
                                    // Class for the border around the input field
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#ffd700",
                                        borderWidth: "2px",
                                    }
                                },
                                "& .MuiInputLabel-outlined": {
                                    color: "#ffd700",
                                    fontWeight: "bold",
                                },
                            }}
                        />
                        <TextField label="Strength" variant="outlined" size = "small" type="number"
                            value={strValue} onChange={(e) => setStrValue(e.target.value)}
                            sx={{
                                width: "200px",
                                "& .MuiOutlinedInput-root": {
                                    color: "#ffd700",
                                    fontFamily: "Arial",
                                    fontWeight: "bold",
                                    // Class for the border around the input field
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#ffd700",
                                        borderWidth: "2px",
                                    }
                                },
                                "& .MuiInputLabel-outlined": {
                                    color: "#ffd700",
                                    fontWeight: "bold",
                                },
                            }}
                        />
                        <TextField label="Dexterity" variant="outlined" size = "small" type="number"
                            value={dexValue} onChange={(e) => setDexValue(e.target.value)}
                            sx={{
                                width: "200px",
                                "& .MuiOutlinedInput-root": {
                                    color: "#ffd700",
                                    fontFamily: "Arial",
                                    fontWeight: "bold",
                                    // Class for the border around the input field
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#ffd700",
                                        borderWidth: "2px",
                                    }
                                },
                                "& .MuiInputLabel-outlined": {
                                    color: "#ffd700",
                                    fontWeight: "bold",
                                },
                            }}
                        />
                        <TextField label="Intelligence" variant="outlined" size = "small" type="number"
                            value={intValue} onChange={(e) => setIntValue(e.target.value)}
                            sx={{
                                width: "200px",
                                "& .MuiOutlinedInput-root": {
                                    color: "#ffd700",
                                    fontFamily: "Arial",
                                    fontWeight: "bold",
                                    // Class for the border around the input field
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#ffd700",
                                        borderWidth: "2px",
                                    }
                                },
                                "& .MuiInputLabel-outlined": {
                                    color: "#ffd700",
                                    fontWeight: "bold",
                                },
                            }}
                        />
                        <TextField label="Faith" variant="outlined" size = "small" type="number"
                            value={faithValue} onChange={(e) => setFaithValue(e.target.value)}
                            sx={{
                                width: "200px",
                                "& .MuiOutlinedInput-root": {
                                    color: "#ffd700",
                                    fontFamily: "Arial",
                                    fontWeight: "bold",
                                    // Class for the border around the input field
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#ffd700",
                                        borderWidth: "2px",
                                    }
                                },
                                "& .MuiInputLabel-outlined": {
                                    color: "#ffd700",
                                    fontWeight: "bold",
                                },
                            }}

                        />
                        <TextField label="Arcane" variant="outlined" size = "small" type="number"
                            value={arcValue} onChange={(e) => setArcValue(e.target.value)}
                            sx={{
                                width: "200px",
                                "& .MuiOutlinedInput-root": {
                                    color: "#ffd700",
                                    fontFamily: "Arial",
                                    fontWeight: "bold",
                                    // Class for the border around the input field
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#ffd700",
                                        borderWidth: "2px",
                                    }
                                },
                                "& .MuiInputLabel-outlined": {
                                    color: "#ffd700",
                                    fontWeight: "bold",
                                },
                            }}
                        />
            </Box>
                    <Button variant="contained"
                        sx={{
                            color: '#d4af37',
                            backgroundColor: '#282828',
                            padding: 3,
                            borderRadius: '10px',
                            zIndex: 1000,
                            width: '300px',
                            '&:hover': {
                                backgroundColor: '#3a3a3a',
                            },
                            transform: 'translate(-40px, 0px)'
                            }}
                        onClick={statProcessHandler}
                    >
                        <h3>Process Your Stats</h3>
                    </Button>
                    <Box
                        sx={{
                            width: '400px',
                            padding: 4,
                            height: '450px',
                            transform: 'translate(50px, 0px)'
                        }}
                        
                    >
                        <h3>ERBuilder Bot Response:</h3>
                        <p>{outputValue}</p>
                    </Box>
                </Box>
      </Box>

            <Button onClick={toggleChat} sx={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                color: '#d4af37',
                backgroundColor: '#282828',
                zIndex: 1000,
                '&:hover': {
                    backgroundColor: '#3a3a3a',
                }
            }}>
                Open Chat
            </Button>

            <Modal open={isChatOpen} onClose={toggleChat}>
                <Box 
                sx={modalStyle}
                >
                    <Box>
                        {messages.map((message, index) => (
                            <Box
                                key={index}
                                sx={{
                                    fontFamily: 'Garamond, serif',
                                    width: '90%',
                                    backgroundColor: message.role === 'bot' ? '#3a3a3a' : '#1f1f1f',
                                    color: message.role === 'bot' ? '#d4af37' : '#fff',
                                    padding: 2,
                                    borderRadius: 4,
                                    border: '1px solid #d4af37',
                                }}
                            >
                                {message.content}
                            </Box>
                        ))}
                         <Box
                        sx={{
                            height: 50,
                            width: '100%',
                            display: 'flex',
                            position: 'fixed',
                            bottom: 0,
                            left: 0,
                            backgroundColor: '#282828',
                            borderTop: '1px solid #d4af37',
                        }}
                    >
                        <InputBase
                            sx={{
                                width: '100%',
                                height: 50,
                                fontFamily: 'Garamond, serif',
                                padding: 2,
                                color: '#d4af37',
                            }}
                            placeholder='Send Message'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') handleSendMessage();
                            }}
                        />
                        <Button
                            sx={{
                                fontFamily: 'Garamond, serif',
                                borderRadius: 0,
                                borderLeft: 0,
                                color: '#d4af37',
                                background: 'linear-gradient(164deg, rgba(10,10,10,1) 0%, rgba(50,50,50,1) 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(164deg, rgba(15,15,15,1) 0%, rgba(60,60,60,1) 100%)',
                                }
                            }}
                            onClick={handleSendMessage}
                        >
                            <img src={EldenRingLogo} alt="Elden Ring Logo" style={{ height: '100%' }} />
                        </Button>
                    </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default App;