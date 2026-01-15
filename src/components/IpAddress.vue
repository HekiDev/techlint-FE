<script setup lang="ts">
import { type Ip } from '@/types/ip';
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from "lucide-vue-next";

const props = defineProps<{
	address: Ip
}>();

const emit = defineEmits<{
	(e: 'onEditClick', address: Ip): void
	(e: 'onDeleteClick', id: number): void
}>();
</script>
<template>
	<div class="flex flex-wrap items-center border rounded p-4 gap-2">
		<div class="flex flex-col flex-wrap flex-1">
			<div class="flex flex-wrap gap-2 items-center">
				<p class="whitespace-pre-line break-all">{{ address.address }}</p>
				<Badge variant="outline">
					{{ address.label }}
				</Badge>
			</div>
			<p class="text-sm text-muted-foreground" v-if="address.comment">{{ address.comment }}</p>
		</div>
		<div class="flex gap-2">
			<Button variant="secondary"
				@click="emit('onEditClick', address)"
			>
				<Pencil />
			</Button>
			<Button variant="destructive"
				@click="emit('onDeleteClick', address.id)"
			>
				<Trash />
			</Button>
		</div>
	</div>
</template>