export type Theme = "light" | "dark";
const KEY = "theme";

export function useTheme() {
    const theme = ref<Theme>("light");

    const apply = (t: Theme) => {
        const root = document.documentElement; // <html>
        root.classList.toggle("dark", t === "dark");
        sessionStorage.setItem(KEY, t);
    };

    onMounted(() => {
        const saved = sessionStorage.getItem(KEY) as Theme | null;
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        const initial: Theme = saved ?? (prefersDark ? "dark" : "light");
        theme.value = initial;
        apply(initial);
    });

    const setTheme = (t: Theme) => {
        theme.value = t;
        apply(t);
    };
    const toggle = () => setTheme(theme.value === "dark" ? "light" : "dark");

    return {
        theme,
        isDark: computed(() => theme.value === "dark"),
        setTheme,
        toggle,
    };
}
