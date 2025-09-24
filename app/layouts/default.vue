<template>
    <div
        class="min-h-dvh bg-gray-50 text-gray-900 dark:bg-[oklch(18%_0_0)] dark:text-white"
    >
        <header
            class="sticky top-0 z-40 border-b bg-white/80 backdrop-blur dark:bg-white/5 border-slate-200/70 dark:border-slate-200/10"
        >
            <nav
                class="container mx-auto flex items-center justify-between px-3 py-4"
            >
                <NuxtLink to="/" class="font-semibold text-2xl"
                    >Eventos Tendencia</NuxtLink
                >

                <!-- Headless UI Switch como toggle de tema -->
                <Switch
                    v-model="enabled"
                    :class="[
                        'relative inline-flex h-7 w-12 cursor-pointer select-none items-center rounded-full p-1 transition outline-none',
                        enabled
                            ? 'bg-black/80 dark:bg-white/20'
                            : 'bg-black/10 dark:bg-white/10',
                    ]"
                >
                    <span class="sr-only">Toggle dark mode</span>

                    <span
                        :class="[
                            'pointer-events-none inline-block size-4.5 transform rounded-full bg-white shadow ring-1 ring-black/10 transition',
                            enabled ? 'translate-x-[1.3rem]' : 'translate-x-0',
                        ]"
                        aria-hidden="true"
                    />
                </Switch>
            </nav>
        </header>

        <main class="container mx-auto p-4">
            <NuxtPage />
        </main>
    </div>
</template>

<script setup lang="ts">
import { Switch } from "@headlessui/vue";
const { isDark, setTheme } = useTheme();

const enabled = computed({
    get: () => isDark.value,
    set: (val: boolean) => setTheme(val ? "dark" : "light"),
});
</script>
