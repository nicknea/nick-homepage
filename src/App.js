import './App.css'
import Resume from './resume.pdf'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { WorkHistoryOutlined } from '@mui/icons-material'
import { LinkedIn, GitHub } from '@mui/icons-material'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='App'>
          <Stack
            sx={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              gap: '40px'
            }}
          >
            <Typography variant='h1' sx={{ color: 'black' }}>
              Hi. I'm Nick
            </Typography>
            <Typography variant='h2' sx={{ color: 'black' }}>
              This is my website
            </Typography>
            <Box display={'flex'} justifyContent={'center'} gap={'30px'}>
              <IconButton href={Resume} sx={{ color: 'black' }}>
                <WorkHistoryOutlined sx={{ height: '48px', width: '48px' }} />
              </IconButton>
              <IconButton
                href={'https://www.linkedin.com/in/nicknea/'}
                sx={{ color: 'black' }}
              >
                <LinkedIn sx={{ height: '48px', width: '48px' }} />
              </IconButton>
              <IconButton
                href={'https://github.com/nicknea'}
                sx={{ color: 'black' }}
              >
                <GitHub sx={{ height: '48px', width: '48px' }} />
              </IconButton>
            </Box>
          </Stack>
          <Analytics />
        </div>
      </header>
    </div>
  )
}

export default App
