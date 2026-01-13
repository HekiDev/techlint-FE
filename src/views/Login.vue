<script setup lang="ts">
import { ref, type HTMLAttributes } from "vue"
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Field,
    FieldGroup,
} from '@/components/ui/field'
import { 
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '@/components/ui/input-group'
import { Input } from '@/components/ui/input'

import { ArrowRight, EyeOff, Eye } from "lucide-vue-next"
import Spinner from "@/components/ui/spinner/Spinner.vue"
import { useAuthStore } from '@/stores/auth/useAuthStore';
import InputError from "@/components/InputError.vue"
import router from "@/router"

const authStore = useAuthStore()

const form = ref({
    email: '',
    password: '',
})
const isLoading = ref<boolean>(false)
const errors = ref<any>(null);
const isShowPassword = ref<boolean>(false)

const handleLogin = () => {
    isLoading.value = true
    authStore.handleLogin(form.value)
    .then(() => {
        router.push('/')
    })
    .catch(err => {
        errors.value = err.errors
    })
    .finally(() => {
        isLoading.value = false
    })
}
</script>

<template>
    <div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gray-50 relative">
        <div class="w-full max-w-md z-10">
            <div class="flex flex-col">
                <Card class="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle class="text-3xl text-center">Welcome</CardTitle>
                        <CardDescription class="text-center">
                            Please enter your email address and password
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form @submit.prevent="handleLogin">
                            <FieldGroup>
                                <Field class="flex flex-col gap-1">
                                    <Input
                                        class="h-10"
                                        id="email"
                                        type="email"
                                        v-model="form.email"
                                        placeholder="Email"
                                        required
                                    />
                                    <InputError v-if="errors && errors.email" :message="errors.email[0]" />
                                </Field>
                                <Field class="flex flex-col gap-1">
                                    <InputGroup class="h-10 rounded-sm">
                                        <InputGroupInput placeholder="Password" :type="isShowPassword ? 'text' : 'password'" v-model="form.password" />
                                        <InputGroupAddon align="inline-end">
                                            <InputGroupButton
                                                aria-label="Show"
                                                title="Show"
                                                size="icon-xs"
                                                @click.prevent="isShowPassword = !isShowPassword"
                                            >
                                                <EyeOff v-if="!isShowPassword" />
                                                <Eye v-else />
                                            </InputGroupButton>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <InputError v-if="errors && errors.password" :message="errors.password[0]" />
                                </Field>
                                <Field class="mt-6">
                                    <Button type="submit" class="uppercase h-10" :disabled="isLoading">
                                        <Spinner v-if="isLoading"/>
                                        Login
                                        <ArrowRight />
                                    </Button>
                                </Field>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
</template>
