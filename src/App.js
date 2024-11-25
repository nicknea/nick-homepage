import './App.css'
import Resume from './resume.pdf'
import Button from '@mui/material/Button'
import { Box, IconButton, Stack, SvgIcon, Typography } from '@mui/material'
import { WorkHistory, WorkHistoryOutlined } from '@mui/icons-material'
import { LinkedIn } from '@mui/icons-material'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='App'>
          <Stack sx={{backgroundColor: 'white', borderRadius: '8px', padding: '20px'}}>
            <Typography variant="h1" sx={{color: 'black'}}> 
              Hi. I'm Nick
            </Typography>
            <Typography variant="h2" sx={{color: 'black'}}> 
              This is my website
            </Typography>
            <Typography variant="subtitle2" sx={{color: 'black'}}> 
              {'(Not a designer)'}
            </Typography>
            <Box>

            
            <IconButton
              href={Resume}
              sx={{ color: 'black' }}
            >
              <WorkHistoryOutlined />
            </IconButton>
            <IconButton
              href={'https://www.linkedin.com/in/nicknea/'}
              sx={{ color: 'black' }}
            >
              <LinkedIn />
            </IconButton>
            </Box>
          </Stack>
        </div>
      </header>
    </div>
  )
}

export default App
