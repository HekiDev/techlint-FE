<script setup lang="ts">
  const props = defineProps<{
		address?: string
		label?: string
		comment?: string | null
		isNew: boolean
	}>();
</script>
<template>
	<table class="w-full">
		<tr>
			<td colspan="2" class="font-bold">{{ isNew ? 'Modified Values' : 'Old Values' }}</td>
		</tr>
		<tr>
			<td>Address</td>
			<td>{{ props.address ?? '-' }}</td>
		</tr>
		<tr>
			<td>Label</td>
			<td>{{ props.label ?? '-' }}</td>
		</tr>
		<tr>
			<td>Comment</td>
			<td>{{ props.comment ?? '-' }}</td>
		</tr>
	</table>
</template>