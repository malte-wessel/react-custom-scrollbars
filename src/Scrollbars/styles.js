export const containerStyleDefault = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
};

// Overrides containerStyleDefault properties
export const containerStyleAutoHeight = {
    height: 'auto'
};

export const viewStyleDefault = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'scroll',
    WebkitOverflowScrolling: 'touch'
};

// Overrides viewStyleDefault properties
export const viewStyleAutoHeight = {
    position: 'relative',
    top: undefined,
    left: undefined,
    right: undefined,
    bottom: undefined
};

export const viewStyleUniversalInitial = {
    overflow: 'hidden',
    marginRight: 0,
    marginBottom: 0,
};

export const trackHorizontalStyleDefault = {
    position: 'absolute',
    height: 6,
    right: 2,
    bottom: 2,
    left: 2,
    borderRadius: 3
};

export const trackVerticalStyleDefault = {
    position: 'absolute',
    width: 6,
    right: 2,
    bottom: 2,
    top: 2,
    borderRadius: 3
};

export const thumbHorizontalStyleDefault = {
    position: 'relative',
    display: 'block',
    height: '100%',
    cursor: 'pointer',
    borderRadius: 'inherit',
    backgroundColor: 'rgba(0,0,0,.2)'
};

export const thumbVerticalStyleDefault = {
    position: 'relative',
    display: 'block',
    width: '100%',
    cursor: 'pointer',
    borderRadius: 'inherit',
    backgroundColor: 'rgba(0,0,0,.2)'
};

export const disableSelectStyle = {
    userSelect: 'none'
};

export const disableSelectStyleReset = {
    userSelect: ''
};
