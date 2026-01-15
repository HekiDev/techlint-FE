<script setup lang="ts">
import FormField from '@/components/FormField.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useIpStore } from '@/stores/home/useIpStore';
import { toast } from 'vue-sonner'

const router = useRouter();
const ipStore = useIpStore();
const form = ref({
  address: '',
  label: '',
  comment: '',
})
const errors = ref<any>(null);

const handleSubmit = () => {
	ipStore.submit(form.value)
	.then((res: any) => {
		router.push({name: 'home'})
		toast.success(res.message)
	})
	.catch((err) => {
		errors.value = err.errors
	})
}
</script>
<template>
  <AuthLayout>
		<div class="flex flex-col gap-3 p-4">
			<div class="space-y-2">
				<FormField label="IP Address" :error="errors?.address?.[0]">
					<Input placeholder="IP Address" v-model="form.address" />
				</FormField>
				<FormField label="Label" :error="errors?.label?.[0]">
					<Input placeholder="Label" v-model="form.label" />
				</FormField>
				<FormField label="Comment" :error="errors?.comment?.[0]">
					<Input placeholder="Comment" v-model="form.comment" />
				</FormField>
			</div>
			<div class="space-x-2">
				<Button variant="outline"
					@click="router.push({name: 'home'})"
				>
					Cancel
				</Button>
				<Button @click="handleSubmit">Save</Button>
			</div>
		</div>
		
  </AuthLayout>
</template>
