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

export const viewStyleRtlUniversalInitial = {
    ...viewStyleUniversalInitial,
    marginRight: undefined,
    marginLeft: 0,
};

export const trackHorizontalStyleDefault = {
    position: 'absolute',
    height: 6
};

export const trackVerticalStyleDefault = {
    position: 'absolute',
    width: 6
};

export const thumbHorizontalStyleDefault = {
    position: 'relative',
    display: 'block',
    height: '100%'
};

export const thumbVerticalStyleDefault = {
    position: 'relative',
    display: 'block',
    width: '100%'
};

export const disableSelectStyle = {
    userSelect: 'none'
};

export const disableSelectStyleReset = {
    userSelect: ''
};
