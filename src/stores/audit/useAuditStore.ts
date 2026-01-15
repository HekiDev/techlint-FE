import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/lib/http/axios'

interface Log {
	address?: string
	label?: string
	comment?: string
}

interface AuditList {
	data: {
		action: 'logout' | 'login' | 'created' | 'updated' | 'deleted'
		created_at: string
		new_values: Log | null,
		old_values: Log | null,
		user: {
			id: number
			name: string
		}
	}[]
}

export const useAuditStore = defineStore('auditStore', () => {
	const audits = ref<AuditList>({ data: [] })

  const getAudits = async () => {
    return await new Promise((resolve, reject) => {
      axios
        .get('/audits')
        .then((response) => {
          resolve(response.data)
          audits.value = response.data
        })
        .catch((errs) => {
          reject(errs.response)
        })
    })
  }

  return {
		audits,
    getAudits,
  }
})
