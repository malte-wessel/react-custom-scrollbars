const scrollTrackSize = 12;

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
    width: '100%',
    height: `${scrollTrackSize}px`,
    bottom: '0',
    left: '0',
    padding: `${scrollTrackSize / 4}px`,
    cursor: 'pointer',
};

export const trackVerticalStyleDefault = {
    position: 'absolute',
    width: `${scrollTrackSize}px`,
    height: '100%',
    top: '0',
    right: '0',
    padding: `${scrollTrackSize / 4}px`,
    cursor: 'pointer',
};

export const thumbHorizontalStyleDefault = {
    position: 'relative',
    display: 'block',
    height: `${scrollTrackSize / 2}px`,
    borderRadius: `${scrollTrackSize / 4}px`,
};

export const thumbVerticalStyleDefault = {
    position: 'relative',
    display: 'block',
    width: `${scrollTrackSize / 2}px`,
    borderRadius: `${scrollTrackSize / 4}px`,
};

export const disableSelectStyle = {
    userSelect: 'none'
};

export const disableSelectStyleReset = {
    userSelect: ''
};
