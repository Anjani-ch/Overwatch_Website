import axios, { AxiosError } from 'axios'
import { ref } from 'vue'

import RequestError from '@/types/RequestError'
import IGameMode from '@/interfaces/overwatch/IGameMode'
import IComposable from '@/interfaces/IComposable'

const getGameModes: IComposable<undefined> = () => {
  const isLoading = ref<boolean>(true)
  const data = ref<IGameMode[]>()
  const error = ref<RequestError>()

  const load = async (): Promise<void> => {
      try {
          const results = (await axios.get('/api/overwatch/game-modes')).data
          
          data.value = results
        } catch (err: any) {
          if(err.response.status === 500) {
            error.value = 'Error getting maps'
          } else if(err instanceof AxiosError) {
            error.value = err.message
          }
        } finally {
          isLoading.value = false
        }
  }

  return {
    data,
    error,
    isLoading,
    load
  }
}

export default getGameModes