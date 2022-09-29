declare function debounce<TargetFunction extends (...args: any[]) => unknown>(targetFunction: TargetFunction, delay: number): ((...args: Parameters<TargetFunction>) => void) & {
    cancel: () => false | void;
};
export default debounce;