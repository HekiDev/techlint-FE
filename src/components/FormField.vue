<script setup lang="ts">
const props = defineProps<{
	label: string
	error?: string
}>();
</script>
<template>
  <div class="flex flex-col gap-1">
		<label class="text-sm font-medium text-muted-foreground">
			{{ props.label }}
		</label>
		<slot />
		<p v-if="props.error" class="text-sm text-red-500">{{ props.error }}</p>
	</div>
</template>