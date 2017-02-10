
declare namespace __RCS {
    import React = __React;

    interface positionValues {
        top: number;
        left: number;
        clientWidth: number;
        clientHeight: number;
        scrollWidth: number;
        scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
    }

    interface props extends React.HTMLProps<ScrollBar> {
        onScroll?: React.UIEventHandler;
        onScrollFrame?: (values: positionValues) => void;
        onScrollStart?: () => void;
        onScrollStop?: () => void;
        onUpdate?: (values: positionValues) => void;

        renderView?: React.StatelessComponent<any>;
        renderTrackHorizontal?: React.StatelessComponent<any>;
        renderTrackVertical?: React.StatelessComponent<any>;
        renderThumbHorizontal?: React.StatelessComponent<any>;
        renderThumbVertical?: React.StatelessComponent<any>;

        autoHide?: boolean;
        autoHideTimeout?: number;
        autoHideDuration?: number;

        thumbSize?: number;
        thumbMinSize?: number;
        universal?: boolean;
    }

    class ScrollBar extends React.Component<props, {}> {
        scrollTop(top: number): void;
        scrollLeft(left: number): void;
        scrollToTop(): void;
        scrollToBottom(): void;
        scrollToLeft(): void;
        scrollToRight(): void;
        getScrollLeft(): number;
        getScrollTop(): number;
        getScrollWidth(): number;
        getScrollHeight(): number;
        getWidth(): number;
        getHeight(): number;
        getValues(): positionValues;
    }
}

declare module 'react-custom-scrollbars' {
    var Scrollbars: typeof __RCS.ScrollBar;
    export {
        Scrollbars,
    }
}
