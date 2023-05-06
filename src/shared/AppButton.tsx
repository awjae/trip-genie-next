"use client";

import React from 'react'
import { Stack, Button } from '@mui/material'

function AppButton() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  )
}

export default AppButton