<script setup lang="ts">
import FormField from '@/components/FormField.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useIpStore } from '@/stores/home/useIpStore';
import { toast } from 'vue-sonner'

const router = useRouter();
const route = useRoute();
const ipStore = useIpStore();
const form = ref({
  address: '',
  label: '',
  comment: '',
})
const errors = ref<any>(null);
const id = route.params.id as string;
const address = computed(() => ipStore.address);

const handleUpdate = () => {
	ipStore.update(form.value, id)
	.then((res: any) => {
		router.push({name: 'home'})
		toast.success(res.message)
	})
	.catch((err) => {
		if (err.status === 403) {
			toast.error(err.data.message)
			return
		}
		errors.value = err.data.errors
	})
}

onMounted(() => {
	ipStore.show(id)
	.then(() => {
		if (!address.value) return
		form.value.address = address.value.address
		form.value.label = address.value.label
		form.value.comment = address.value.comment ?? ''
	})
})

onBeforeUnmount(() => {
	ipStore.address = null
	form.value.address = ''
	form.value.label = ''
	form.value.comment = ''
})
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
				<Button @click="handleUpdate">Save Changes</Button>
			</div>
		</div>
  </AuthLayout>
</template>
