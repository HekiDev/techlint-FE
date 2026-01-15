import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/lib/http/axios'
import { type Ip } from '@/types/ip';

interface IpList {
	data: Ip[]
}

interface Payload {
	address: string
	label: string
	comment: string
}

export const useIpStore = defineStore('ipStore', () => {
  const addresses = ref<IpList>({ data: [] })
  const address = ref<Ip | null>(null);

  const submit = async (form: Payload) => {
    return await new Promise((resolve, reject) => {
      axios
        .post('/ip-address/store', form)
        .then((response) => {
          resolve(response.data)
        })
        .catch((errs) => {
          reject(errs.response.data)
        })
    })
  }

  const update = async (form: Payload, id: number | string) => {
    return await new Promise((resolve, reject) => {
      axios
        .post(`/ip-address/${id}/update`, form)
        .then((response) => {
          resolve(response.data)
        })
        .catch((errs) => {
          reject(errs.response)
        })
    })
  }

  const getIpAddresses = async () => {
    return await new Promise((resolve, reject) => {
      axios
        .get('/ip-address')
        .then((response) => {
          resolve(response.data)
          addresses.value = response.data
        })
        .catch((errs) => {
          reject(errs.response.data)
        })
    })
  }

  const show = async (id: number | string) => {
    return await new Promise((resolve, reject) => {
      axios
        .get(`/ip-address/${id}/show`)
        .then((response) => {
          resolve(response.data.data)
          address.value = response.data.data
        })
        .catch((errs) => {
          reject(errs.response.data)
        })
    })
  }

  const destroy = async (id: number | string) => {
    return await new Promise((resolve, reject) => {
      axios
        .delete(`/ip-address/${id}/delete`)
        .then((response) => {
          resolve(response.data)
        })
        .catch((errs) => {
          reject(errs.response)
        })
    })
  }

  return {
    submit,
    update,
    show,
    destroy,
    getIpAddresses,
		addresses,
    address,
  }
})
