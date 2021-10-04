import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Button from '@material-ui/core/Button'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import { alpha, Card, Container, Grid, Menu, OutlinedInputProps } from '@material-ui/core'
import { styled, useTheme } from '@material-ui/core/styles'
import { blue, lightBlue } from '@material-ui/core/colors'
import { bgcolor, Box } from '@mui/system'
import useMediaQuery from '@mui/material/useMediaQuery'

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
})

const WithMaterialUI = () => {
  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  const theme = useTheme()
  const isWide = useMediaQuery(theme.breakpoints.up('sm'))
  const direction = isWide ? 'row' : 'column'

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={4} direction={direction} alignItems='stretch'>
        <Grid item style={{ background: blue['500'] }}>
          <Grid
            container
            alignItems='center'
            direction='column'
            alignContent='center'
            justifyContent='center'
            style={{ height: '100%', maxHeight: '100vh' }}
          >
            <Grid item>
              <p>
                {String(isWide)} - {direction}
              </p>
              <Box sx={{ my: 2 }}>
                <RedditTextField
                  fullWidth
                  id='email'
                  name='email'
                  label='Email'
                  variant='filled'
                  color='secondary'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  // inputProps={{ style: { background: 'white' } }}
                />
              </Box>
              <Box sx={{ my: 2 }}>
                <RedditTextField
                  fullWidth
                  variant='filled'
                  id='password'
                  name='password'
                  label='Password'
                  type='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  //inputProps={{ style: { background: 'white' } }}
                />
              </Box>
              <Box sx={{ my: 2 }}>
                <RedditTextField
                  label='Reddit'
                  defaultValue='react-reddit'
                  id='reddit-input'
                  variant='filled'
                  style={{ marginTop: 11 }}
                />
              </Box>
              <Box sx={{ my: 2 }}>
                <Button color='primary' variant='contained' fullWidth type='submit'>
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Box sx={{ p: 3, m: 4 }}>hello there</Box>
          <Box sx={{ p: 3, m: 4 }}>hello there</Box>
          <Box sx={{ p: 3, m: 4 }}>hello there</Box>
          <Box sx={{ p: 3, m: 4 }}>hello there</Box>
          <Box sx={{ p: 3, m: 4 }}>hello there</Box>
          <Box sx={{ p: 3, m: 4 }}>hello there</Box>
          <Box sx={{ p: 3, m: 4 }}>hello there</Box>
          <Box sx={{ p: 3, m: 4 }}>hello there</Box>
          <Box sx={{ p: 3, m: 4 }}>hello there</Box>
          <Box sx={{ p: 3, m: 4 }}>hello there</Box>
        </Grid>
      </Grid>
    </form>
  )
}

const RedditTextField = styled((props: TextFieldProps) => (
  <TextField InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>} {...props} />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    borderColor: theme.palette.primary.dark,
    boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    borderWidth: '5px',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#fcfcfb',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    '&.Mui-focused': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.5)} 0 0 3px 3px`,
      borderColor: theme.palette.secondary.main,
    },
  },
}))

function App() {
  const theme = useTheme()
  return (
    <div>
      <Box style={{ background: blue['700'], padding: '2em 1em', color: theme.palette.secondary.light }}>
        Hello World
      </Box>
      <main>
        <Container maxWidth='md'>
          <Card style={{ background: lightBlue[100], padding: '2em' }}>
            <WithMaterialUI />
          </Card>
        </Container>
      </main>
    </div>
  )
}

export default App
