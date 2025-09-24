<script setup lang="ts">
useHead({ title: "Events" });

const route = useRoute();
const id = computed(() => String(route.params.id));

const {
    data: show,
    pending,
    error,
} = await useFetch<TvShow>(() => `https://api.tvmaze.com/shows/${id.value}`, {
    key: () => `show-${id.value}`,
    server: false,
});

const open = ref(false);
</script>

<template>
    <div>
        <div v-if="pending" class="py-12 text-center">Loading…</div>

        <div v-else-if="error" class="py-12 text-center text-red-600">
            Not found.
        </div>

        <div v-else>
            <EventDetail :show="show!">
                <template #actions>
                    <button
                        class="mt-4 rounded-xl bg-black px-4 py-2 font-medium text-white cursor-pointer hover:bg-black/40"
                        @click="open = true"
                    >
                        Registrarme
                    </button>
                </template>
            </EventDetail>

            <RegisterModal v-model="open" />
        </div>
    </div>
</template>
