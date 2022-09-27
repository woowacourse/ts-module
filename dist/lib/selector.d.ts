declare function $(selector: string): (HTMLElement & {
    setHTML: (html: string) => void;
    show: () => void;
    hide: () => void;
    addEvent: <EventType extends keyof HTMLElementEventMap>(type: EventType, handler: (event: HTMLElementEventMap[EventType]) => void) => void;
}) | undefined;
export default $;
