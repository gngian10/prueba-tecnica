<script setup lang="ts">
import {
    Dialog,
    DialogPanel,
    TransitionRoot,
    TransitionChild,
} from "@headlessui/vue";
import { useRegister } from "~/composables/useRegister";

const open = defineModel<boolean>({ default: false });
const form = reactive({ name: "", email: "", comment: "" });
const { loading, error, success, submit } = useRegister();

async function onSubmit() {
    await submit(form);

    if (success.value)
        setTimeout(() => {
            open.value = false;
        }, 900);
}
</script>

<template>
    <TransitionRoot :show="open" as="template">
        <Dialog @close="!loading && (open = false)" class="relative z-50">
            <TransitionChild
                as="template"
                enter="ease-out duration-200"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in duration-150"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black/40" />
            </TransitionChild>

            <div class="fixed inset-0 grid place-items-center p-4">
                <TransitionChild
                    as="template"
                    enter="ease-out duration-200"
                    enter-from="opacity-0 translate-y-2 scale-95"
                    enter-to="opacity-100 translate-y-0 scale-100"
                    leave="ease-in duration-150"
                    leave-from="opacity-100 scale-100"
                    leave-to="opacity-0 translate-y-1 scale-95"
                >
                    <DialogPanel
                        class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
                    >
                        <Dialog.Title class="text-lg font-semibold"
                            >Registrar a evento</Dialog.Title
                        >

                        <form class="mt-4 space-y-3" @submit.prevent="onSubmit">
                            <div>
                                <label class="text-sm font-medium">Name</label>

                                <input
                                    v-model="form.name"
                                    class="mt-1 w-full rounded-lg border px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label class="text-sm font-medium">Email</label>

                                <input
                                    v-model="form.email"
                                    type="email"
                                    class="mt-1 w-full rounded-lg border px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label class="text-sm font-medium"
                                    >Commentario (opcional)</label
                                >

                                <textarea
                                    v-model="form.comment"
                                    class="mt-1 w-full rounded-lg border px-3 py-2"
                                    rows="3"
                                />
                            </div>

                            <p v-if="error" class="text-sm text-red-600">
                                {{ error }}
                            </p>

                            <p v-if="success" class="text-sm text-green-600">
                                Registro exitoso
                            </p>

                            <button
                                :disabled="loading"
                                class="w-full rounded-xl bg-black py-2 font-medium text-white disabled:opacity-50 cursor-pointer hover:bg-black/40"
                            >
                                {{ loading ? "Enviando" : "Enviar" }}
                            </button>
                        </form>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
