import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import JBMVSchedule from './jbmv_schedule.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <JBMVSchedule />
  </StrictMode>
)
