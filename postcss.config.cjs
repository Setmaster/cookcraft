module.exports = {
    plugins: {
        'postcss-preset-mantine': {},
        'postcss-simple-vars': {
            variables: {
                // Breakpoints
                'mantine-breakpoint-xss': '22.5em',
                'mantine-breakpoint-xs': '36em',
                'mantine-breakpoint-sm': '48em',
                'mantine-breakpoint-md': '62em',
                'mantine-breakpoint-lg': '75em',
                'mantine-breakpoint-xl': '88em',
                'mantine-breakpoint-xxl': '120em',

                // Colors
                'color-primary': '#FF6500',
                'color-secondary': '#1E3E62',
                'color-tertiary': '#0B192C',
            },
        },
    },
};
