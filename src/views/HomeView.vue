<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue';
import { useIpStore } from '@/stores/home/useIpStore';
import { computed, onMounted } from 'vue';
import Empty from '@/components/Empty.vue';
import IpAddress from '@/components/IpAddress.vue';
import type { Ip } from '@/types/ip';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner'

const ipStore = useIpStore();
const router = useRouter();
const addresses = computed(() => ipStore.addresses.data);

const toggleEdit = (e: Ip) => {
  router.push({name: 'edit', params: {id: e.id}})
}

const toggleDelete = (e: number) => {
  ipStore.destroy(e)
  .then((res: any) => {
    ipStore.getIpAddresses()
    toast.success(res.message)
  })
  .catch((err) => {
		if (err.status === 403) {
      toast.error(err.data.message)
			return
		}
	})
}

onMounted(() => {
	ipStore.getIpAddresses()
})
</script>
<template>
  <AuthLayout>
    <Empty v-if="!addresses.length" />
    <div class="flex flex-col gap-2" v-else>
      <IpAddress
        v-for="address in addresses"
        :key="address.id"
        :address="address"
        @onEditClick="toggleEdit($event)"
        @onDeleteClick="toggleDelete"
      />
    </div>
  </AuthLayout>
</template>
