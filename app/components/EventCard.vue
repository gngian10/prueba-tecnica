<script setup lang="ts">
import { NuxtLink } from "#components";

const props = defineProps<{ show: TvShow }>();
</script>

<template>
    <div class="w-full">
        <NuxtLink :to="`/event/${show.id}`" class="block select-none">
            <div
                class="relative overflow-hidden rounded-[22px] bg-white/40 ring-1 ring-black/5 shadow-md transition hover:shadow-lg"
            >
                <img
                    :src="
                        show.image?.original ??
                        'https://placehold.co/480x640?text=No+Image'
                    "
                    :alt="show.name"
                    class="aspect-[3/4] w-full object-cover"
                    :style="{ viewTransitionName: `poster-${show.id}` }"
                    loading="lazy"
                />
            </div>

            <div
                class="mt-2 line-clamp-1 font-semibold text-gray-700 dark:text-slate-200 text-2xl mb-4"
            >
                {{ show.name }}
            </div>

            <div
                class="flex items-center gap-4 text-gray-700 dark:text-slate-200 text-sm"
            >
                <span v-if="show.rating?.average != null"
                    >⭐ {{ show.rating.average }}</span
                >
                <span class="w-0.5 h-3 bg-slate-300/30 block"></span>
                <span>{{
                    show.premiered
                        ? new Date(show.premiered).getFullYear()
                        : "—"
                }}</span>
            </div>
        </NuxtLink>
    </div>
</template>
