<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue';
import { useAuditStore } from '@/stores/audit/useAuditStore';
import { computed, onMounted, ref } from 'vue';
import { AlertCircleIcon } from 'lucide-vue-next'
import {
  Alert,
  AlertTitle,
} from '@/components/ui/alert'
import Log from '@/components/Log.vue';

const auditStore = useAuditStore();

const isAuthorized = ref<boolean>(true);
const audits = computed(() => auditStore.audits.data);

onMounted(() => {
	auditStore.getAudits()
  .then(() => {})
  .catch((err) => {
    if (err.status === 403) {
      isAuthorized.value = false
      console.log(err.data.message)
      return
    }
    console.log(err)
  })
})
</script>
<template>
  <AuthLayout>
    <Alert variant="destructive" v-if="!isAuthorized">
      <AlertCircleIcon />
      <AlertTitle>This page is for authorized users only.</AlertTitle>
    </Alert>
    <div v-else class="flex flex-col gap-2">
      <div class="border rounded p-4 text-muted-foreground" v-for="log, i in audits" :key="i">
        <div v-if="['login', 'logout'].includes(log.action)" class="flex flex-wrap gap-2 justify-between">
          <div class="flex flex-wrap gap-2 justify-between w-full">
            <p>{{ log.user.name }} {{ log.action === 'login' ? 'logged in' : 'logged out' }}</p>
            <p>{{ log.created_at }}</p>
          </div>
        </div>
        <div v-else>
          <div class="flex flex-wrap gap-2 justify-between">
            <p>{{ log.user.name }} {{ log.action }} a record</p>
            <p>{{ log.created_at }}</p>
          </div>
          <div class="grid grid-cols-2">
            <div class="flex flex-col">
              <Log
                :isNew="false"
                :address="log.old_values?.address"
                :label="log.old_values?.label"
                :comment="log.old_values?.comment"
              />
            </div>
            <div>
              <Log
                :isNew="true"
                :address="log.new_values?.address"
                :label="log.new_values?.label"
                :comment="log.new_values?.comment"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>
