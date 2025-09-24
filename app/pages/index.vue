<script setup lang="ts">
const route = useRoute();
const router = useRouter();

// pagination
function getPageFromQuery(q: unknown) {
    const n = Number(Array.isArray(q) ? q[0] : q);
    return n && n >= 1 ? n : 1;
}

const page = ref(getPageFromQuery(route.query.page));

if (import.meta.client) {
    const initial = getPageFromQuery(route.query.page);

    if (initial === 1 && "page" in route.query) {
        const { page: _omit, ...rest } = route.query;
        router.replace({ query: rest });
    } else if (initial > 1 && String(initial) !== route.query.page) {
        router.replace({ query: { ...route.query, page: String(initial) } });
    }
}

watch(
    () => route.query.page,
    (qp) => {
        const n = getPageFromQuery(qp);
        if (n !== page.value) page.value = n;
    }
);

watch(page, (p) => {
    const current = getPageFromQuery(route.query.page);
    if (p === current) return;

    if (p === 1) {
        const { page: _omit, ...rest } = route.query;
        router.replace({ query: rest });
    } else {
        router.push({ query: { ...route.query, page: String(p) } });
    }

    if (import.meta.client) {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
});

const apiPage = computed(() => Math.max(0, page.value - 1));

const { data, pending, error } = await useFetch<TvShow[]>(
    () => `https://api.tvmaze.com/shows?page=${apiPage.value}`,
    { key: () => `shows-${apiPage.value}` }
);
const shows = computed(() => data.value ?? []);

const VISIBLE = 40;
const visibleShows = computed(() => (shows.value ?? []).slice(0, VISIBLE));

function next() {
    page.value++;
}
function prev() {
    if (page.value > 1) page.value--;
}
</script>

<template>
    <section class="shelf p-10">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-11">
            <div v-if="error" class="col-span-4 py-12 text-center text-red-600">
                Failed to load.
            </div>

            <div
                v-else-if="!visibleShows.length"
                class="col-span-4 py-12 text-center text-gray-600"
            >
                No events to show.
            </div>

            <EventCard v-for="s in visibleShows" :key="s.id" :show="s" />
        </div>
    </section>

    <!-- Paginación -->
    <div class="mt-2 flex justify-center gap-2 *:cursor-pointer">
        <button
            class="rounded-lg border px-3 py-1 disabled:opacity-50"
            :disabled="page === 1"
            @click="prev"
        >
            Anterior
        </button>

        <button class="rounded-lg border px-3 py-1" @click="next">
            Siguiente
        </button>
    </div>
</template>
