export function useRegister() {
    const loading = ref(false);
    const error = ref<string | null>(null);
    const success = ref(false);

    const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    async function submit(form: {
        name: string;
        email: string;
        comment?: string;
    }) {
        error.value = null;
        success.value = false;
        loading.value = true;
        try {
            if (!form.name?.trim()) throw new Error("Name is required");
            if (!isEmail(form.email)) throw new Error("Enter a valid email");
            await new Promise((r) => setTimeout(r, 900)); // simula API
            success.value = true;
        } catch (e: any) {
            error.value = e?.message ?? "Something went wrong";
        } finally {
            loading.value = false;
        }
    }

    return { loading, error, success, submit };
}
