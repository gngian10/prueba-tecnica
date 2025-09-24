<script setup lang="ts">
const props = defineProps<{ show: TvShow }>();
const img = computed(
    () =>
        props.show.image?.original ||
        "https://placehold.co/1200x675?text=No+Image"
);
</script>

<template>
    <article
        class="w-full lg:max-w-[900px] mx-auto flex flex-col lg:flex-row gap-7 mt-5"
    >
        <div
            class="overflow-hidden rounded-2xl bg-white/60 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg w-full md:w-[400px] h-[600px]"
        >
            <img
                :src="img"
                :alt="show.name"
                class="w-full h-full object-cover"
            />
        </div>

        <!-- Panel de info -->
        <div
            class="rounded-2xl border bg-white/70 dark:bg-white/10 border-black/10 dark:border-white/10 p-6 shadow-lg backdrop-blur-md flex-1"
        >
            <h2 class="text-2xl lg:text-3xl font-bold tracking-tight">
                {{ show.name }}
            </h2>

            <!-- Badges -->
            <div class="mt-3 flex flex-wrap gap-2 text-xs">
                <span
                    v-if="show.language"
                    class="rounded-md bg-black/5 px-2 py-1 dark:bg-white/10"
                >
                    {{ show.language }}
                </span>
                <span
                    v-if="show.premiered"
                    class="rounded-md bg-black/5 px-2 py-1 dark:bg-white/10"
                >
                    {{ new Date(show.premiered).getFullYear() }}
                </span>
                <span
                    v-for="g in show.genres"
                    :key="g"
                    class="rounded-md bg-black/5 px-2 py-1 dark:bg-white/10"
                >
                    {{ g }}
                </span>
            </div>

            <!-- Descripción -->
            <div class="prose prose-sm mt-6 max-w-none dark:prose-invert">
                <div v-dompurify-html="show.summary" />
            </div>

            <!-- Slot de acciones -->
            <div class="mt-6">
                <slot name="actions" />
            </div>
        </div>
    </article>
</template>

<style scoped>
@media (max-width: 768px) {
    .prose {
        font-size: 0.875rem;
    }

    h2 {
        font-size: 1.5rem;
    }
}

@media (min-width: 768px) {
    h2 {
        font-size: 2rem;
    }
}
</style>
