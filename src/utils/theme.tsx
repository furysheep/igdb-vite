import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultVariant,
} from '@chakra-ui/react'

const inputSelectStyles = {
  variants: {
    filled: {
      field: {
        _focus: {
          borderColor: 'brand.500',
        },
      },
    },
    sizes: {
      md: {
        field: {
          borderRadius: 'none',
        },
      },
    },
  },
}
const theme = extendTheme(
  {
    colors: {
      brand: {
        100: '#f7fafc',
        // ...
        900: '#1a202c',
      },
    },
    sizes: {
      container: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    styles: {
      global: {
        // styles for the `body`
        body: {
          bg: '#181d22',
          color: 'white',
        },
        // styles for the `a`
        h1: {
          fontWeight: 'bold',
        },
        h2: {
          color: 'gray.400',
        },
      },
    },
    fonts: {
      heading: 'Open Sans, sans-serif',
      body: 'Raleway, sans-serif',
    },
    components: {
      Input: {
        ...inputSelectStyles,
      },
      Select: { ...inputSelectStyles },
      Checkbox: {
        baseStyle: {
          control: {
            borderRadius: 'none',
            _focus: {
              ring: 2,
              ringColor: 'brand.500',
            },
          },
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: 'brand',
    components: ['Checkbox'],
  }),
  withDefaultVariant({
    variant: 'filled',
    components: ['Input', 'Select'],
  })
)

export default theme
