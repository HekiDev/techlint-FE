<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const user = computed(() => authStore.user);

const links = <{ label: string; name: string }[]>[
  { label: 'Home', name: 'home' },
  { label: 'Audits', name: 'logs' },
]

const handleLogout = () => {
  authStore.handleLogout()
	.then(() => {
		router.push({ name: 'login' })
	})
}
</script>
<template>
  <div class="flex items-center justify-center min-h-svh w-full p-6 md:p-10 bg-gray-50">
    <div class="flex flex-col gap-2 w-full max-w-2xl h-[calc(100vh-5rem)]">
      <div class="flex flex-col gap-2 items-center" v-if="user">
        <Avatar>
          <AvatarImage src="" alt="" />
          <AvatarFallback>{{ user.name.charAt(0) }}</AvatarFallback>
        </Avatar>
        <p class="text-sm text-muted-foreground">
          <span class="font-medium">Welcome</span> {{user.name }}!
        </p>
        <Button size="sm" @click="handleLogout">Logout</Button>
      </div>
      <div class="flex gap-2 items-center">
        <div class="flex gap-2 flex-1">
          <Button v-for="link in links" :key="link.name"
            :variant="route.name === link.name ? 'secondary' : 'link'"
            @click="router.push({name: link.name})"
          >
            {{ link.label }}
          </Button>
        </div>
        <Button @click="router.push({name: 'create'})">Add IP Address</Button>
      </div>
      <div class="flex-1 overflow-auto">
        <slot />
      </div>
    </div>
  </div>
</template>
